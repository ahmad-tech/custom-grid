export interface IPivotColumnDef {
  field: string;
  aggFunc: string;
}

export interface IGroupedPivotedData {
  groupKey: string;
  children: any[];
  totalAggregations: Record<string, number>;
  totalMedals: number;
}

// Used internally to help compute average: { sum, count }
export type AvgTrackerType = Record<string, { sum: number; count: number }>;

// Handles how each aggregation function works
export const applyPivotAgg = (
  aggFunc: string,
  current: number | undefined,
  value: number
): number => {
  switch (aggFunc) {
    case "sum":
      return (current || 0) + value;
    case "min":
      return current !== undefined ? Math.min(current, value) : value;
    case "max":
      return current !== undefined ? Math.max(current, value) : value;
    case "count":
      return (current || 0) + 1;
    default:
      return value;
  }
};

// Main pivot and aggregation function
export function pivotAndAggregateByGroup(
  data: any[],
  groupBy: string,
  pivotColumns: string[],
  columnDefs: IPivotColumnDef[]
): IGroupedPivotedData[] {
  const allowedNumericFields = new Set([
    "year",
    ...columnDefs.map((def) => def.field),
  ]);

  // Clean and filter numeric fields
  const cleanedData = data.map((row) => {
    const newRow: Record<string, any> = {};
    for (const [key, value] of Object.entries(row)) {
      const isNumeric = typeof value === "number";
      if (!isNumeric || allowedNumericFields.has(key)) {
        newRow[key] = value;
      }
    }
    return newRow;
  });

  const result: IGroupedPivotedData[] = [];

  const groupMap = new Map<
    string,
    {
      groupValue: any;
      childrenMap: Map<string, any>;
      totalAggregations: Record<string, number>;
      avgTracking: AvgTrackerType;
      totalMedalsRaw: number;
    }
  >();

  const groupByValues = Array.from(
    new Set(cleanedData.map((row) => row[groupBy]))
  );
  const pivotValuesMap: Record<string, Set<any>> = {};

  pivotColumns.forEach((col) => {
    pivotValuesMap[col] = new Set(cleanedData.map((row) => row[col]));
  });

  const allCombinations: Array<{ [key: string]: any }> = [];

  // Recursively create all combinations of pivot columns
  function generateCombinations(
    keys: string[],
    prefix: Record<string, any> = {}
  ) {
    if (keys.length === 0) {
      allCombinations.push(prefix);
      return;
    }
    const [first, ...rest] = keys;
    for (const val of Array.from(pivotValuesMap[first])) {
      generateCombinations(rest, { ...prefix, [first]: val });
    }
  }

  generateCombinations(pivotColumns);

  // Main aggregation loop
  cleanedData.forEach((row) => {
    const groupValue = row[groupBy];
    const groupKey = String(groupValue);
    const pivotKey = pivotColumns.map((key) => row[key]).join("||");

    // Initialize group entry
    if (!groupMap.has(groupKey)) {
      groupMap.set(groupKey, {
        groupValue,
        childrenMap: new Map<string, any>(),
        totalAggregations: {},
        avgTracking: {},
        totalMedalsRaw: 0,
      });
    }

    const groupEntry = groupMap.get(groupKey)!;
    let rawMedalSum = 0;

    columnDefs.forEach((col) => {
      const { field, aggFunc } = col;
      const rawValue = Number(row[field]) || 0;

      if (aggFunc === "avg") {
        // Track both sum and count for averaging
        if (!groupEntry.avgTracking[field]) {
          groupEntry.avgTracking[field] = { sum: 0, count: 0 };
        }
        groupEntry.avgTracking[field].sum += rawValue;
        groupEntry.avgTracking[field].count += 1;
        rawMedalSum += rawValue;
      } else {
        const isCount = aggFunc === "count";
        const value = isCount ? 1 : rawValue;
        groupEntry.totalAggregations[field] = applyPivotAgg(
          aggFunc,
          groupEntry.totalAggregations[field],
          value
        );
        // Always add value to rawMedalSum, even for count
        rawMedalSum += value;
      }
    });

    groupEntry.totalMedalsRaw += rawMedalSum;

    // Populate pivoted row (childrenMap)
    if (!groupEntry.childrenMap.has(pivotKey)) {
      const newRow: any = {
        [groupBy]: groupValue,
        ...Object.fromEntries(pivotColumns.map((key) => [key, row[key]])),
      };

      let childSum = 0;

      columnDefs.forEach((col) => {
        const { field, aggFunc } = col;
        const rawValue = Number(row[field]) || 0;

        if (aggFunc === "avg") {
          // Track sum and count per cell
          newRow[`__${field}_sum`] = rawValue;
          newRow[`__${field}_count`] = 1;
          newRow[field] = rawValue;
          childSum += rawValue;
        } else {
          const isCount = aggFunc === "count";
          const value = isCount ? 1 : rawValue;
          newRow[field] = value;
          if (!isCount) childSum += value;
        }
      });

      newRow.totalMedals = childSum;
      groupEntry.childrenMap.set(pivotKey, newRow);
    } else {
      const existingRow = groupEntry.childrenMap.get(pivotKey);
      let childSum = 0;

      columnDefs.forEach((col) => {
        const { field, aggFunc } = col;
        const rawValue = Number(row[field]) || 0;

        if (aggFunc === "avg") {
          existingRow[`__${field}_sum`] =
            (existingRow[`__${field}_sum`] || 0) + rawValue;
          existingRow[`__${field}_count`] =
            (existingRow[`__${field}_count`] || 0) + 1;
          existingRow[field] =
            existingRow[`__${field}_sum`] / existingRow[`__${field}_count`];
          childSum += rawValue;
        } else {
          const isCount = aggFunc === "count";
          const value = isCount ? 1 : rawValue;
          existingRow[field] = applyPivotAgg(
            aggFunc,
            existingRow[field],
            value
          );
          if (!isCount) childSum += existingRow[field];
        }
      });

      existingRow.totalMedals = childSum;
    }
  });

  // Fill empty pivot combinations per group
  for (const groupValue of groupByValues) {
    const groupKey = String(groupValue);
    const groupEntry = groupMap.get(groupKey)!;

    for (const combo of allCombinations) {
      const pivotKey = pivotColumns.map((k) => combo[k]).join("||");
      if (!groupEntry.childrenMap.has(pivotKey)) {
        const newRow: any = {
          [groupBy]: groupValue,
          ...combo,
        };
        columnDefs.forEach((col) => {
          newRow[col.field] = 0;
        });
        newRow.totalMedals = 0;
        groupEntry.childrenMap.set(pivotKey, newRow);
      }
    }
  }

  // Final pass to compute group-level averages
  for (const [
    groupKey,
    { childrenMap, totalAggregations, totalMedalsRaw, avgTracking },
  ] of Array.from(groupMap.entries())) {
    for (const col of columnDefs) {
      if (col.aggFunc === "avg") {
        const stats = avgTracking[col.field];
        if (stats) {
          totalAggregations[col.field] =
            stats.count > 0 ? stats.sum / stats.count : 0;
        } else {
          totalAggregations[col.field] = 0;
        }
      }
    }

    totalAggregations.total = Object.values(totalAggregations).reduce(
      (sum, val) => sum + val,
      0
    );

    result.push({
      groupKey,
      children: Array.from(childrenMap.values()),
      totalAggregations,
      totalMedals: totalMedalsRaw,
    });
  }

  return result;
}
