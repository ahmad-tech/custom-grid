export interface IPivotColumnDef {
  field: string;
  aggFunc: string;
}

export interface IGroupedPivotedData {
  groupKey: string;
  children: Record<string, unknown>[];
  totalAggregations: Record<string, number>;
  totalMedals: number;
}

export const getCombinations = <T>(arrays: T[][]): T[][] => {
  return arrays.reduce(
    (acc: T[][], values: T[]) =>
      acc.flatMap((comb) => values.map((val) => [...comb, val])),
    [[]]
  );
};

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
  data: Record<string, unknown>[],
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
    const newRow: Record<string, unknown> = {};
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
      groupValue: string;
      childrenMap: Map<string, Record<string, unknown>>;
      totalAggregations: Record<string, number>;
      avgTracking: AvgTrackerType;
      totalMedalsRaw: number;
    }
  >();

  const groupByValues = Array.from(
    new Set(cleanedData.map((row) => row[groupBy]))
  );
  const pivotValuesMap: Record<string, Set<string>> = {};
  pivotColumns.forEach((col) => {
    pivotValuesMap[col] = new Set(cleanedData.map((row) => String(row[col])));
  });

  const allCombinations: Record<string, unknown>[] = [];

  // Recursively create all combinations of pivot columns
  function generateCombinations(
    keys: string[],
    prefix: Record<string, unknown> = {}
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
        groupValue: String(groupValue),
        childrenMap: new Map<string, Record<string, unknown>>(),
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
      const newRow: Record<string, unknown> = {
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
          if (existingRow) {
            const sum =
              ((existingRow[`__${field}_sum`] as number) || 0) + rawValue;
            const count =
              ((existingRow[`__${field}_count`] as number) || 0) + 1;
            existingRow[`__${field}_sum`] = sum;
            existingRow[`__${field}_count`] = count;
            existingRow[field] = sum / count;
          }
          childSum += rawValue;
        } else {
          const isCount = aggFunc === "count";
          const value = isCount ? 1 : rawValue;
          if (existingRow) {
            existingRow[field] = applyPivotAgg(
              aggFunc,
              existingRow[field] as number,
              value
            );
          }
          if (!isCount) childSum += (existingRow?.[field] as number) || 0;
        }
      });

      if (existingRow) {
        existingRow.totalMedals = childSum;
      }
    }
  });

  // Fill empty pivot combinations per group
  for (const groupValue of groupByValues) {
    const groupKey = String(groupValue);
    const groupEntry = groupMap.get(groupKey)!;

    for (const combo of allCombinations) {
      const pivotKey = pivotColumns.map((k) => combo[k]).join("||");
      if (!groupEntry.childrenMap.has(pivotKey)) {
        const newRow = {
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
