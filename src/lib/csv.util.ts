export function flattenMasterDetailData(
  data: Record<string, any>[],
  childField = "children"
): Record<string, any>[] {
  const result: Record<string, any>[] = [];

  data.forEach((parent) => {
    // Add parent row
    const parentRow: Record<string, any> = { ...parent, __rowType: "parent" };
    result.push(parentRow);

    // Add child rows (if any)
    if (Array.isArray(parent[childField])) {
      parent[childField].forEach((child: Record<string, any>) => {
        // Merge parent key fields into child row for context
        const childRow: Record<string, any> = {
          ...parent,
          ...child,
          __rowType: "child",
        };
        // Optionally, remove the children field from child row
        delete childRow[childField];
        result.push(childRow);
      });
    }
  });

  return result;
}

export function exportDataToCSV(
  data: Record<string, unknown>[],
  columns: { field: string; headerName: string }[],
  filename = "data.csv"
) {
  if (!data || !data.length) return;

  const headers = columns.map((col) => col.headerName || col.field);
  const fields = columns.map((col) => col.field);

  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      fields
        .map((field) => {
          const val = row[field];
          if (val == null) return "";
          // Escape quotes and commas
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ];

  const csvContent = csvRows.join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Flattens grouped pivoted data for CSV export.
 * @param groupedData The grouped/aggregated data array (e.g., groupedPivotedData)
 * @param groupField The main group field (e.g., "country")
 * @param pivotFields Array of pivot fields (e.g., ["year", "game"])
 * @param metrics Array of metric fields (e.g., ["gold", "silver"])
 * @returns { columns, rows }
 */
export function flattenPivotedDataForCSV(
  groupedData: any[],
  groupField: string,
  pivotFields: string[],
  metrics: string[]
) {
  // 1. Get all unique combinations of pivot values
  const pivotCombos = new Set<string>();
  groupedData.forEach((group) => {
    group.children.forEach((row: any) => {
      const combo = pivotFields.map((f) => row[f]).join("_");
      pivotCombos.add(combo);
    });
  });

  // 2. Build columns: groupField, then all combos x metrics
  const columns = [
    {
      field: groupField,
      headerName: groupField.charAt(0).toUpperCase() + groupField.slice(1),
    },
    ...Array.from(pivotCombos).flatMap((combo) =>
      metrics.map((metric) => ({
        field: `${combo}_${metric}`,
        headerName: `${combo.replace(/_/g, " / ")} ${
          metric.charAt(0).toUpperCase() + metric.slice(1)
        }`,
      }))
    ),
  ];

  // 3. Build rows with total medals in group label
  const rows = groupedData.map((group) => {
    const row: Record<string, any> = {};
    let totalMedals = 0;

    group.children.forEach((child: any) => {
      const combo = pivotFields.map((f) => child[f]).join("_");
      metrics.forEach((metric) => {
        const val = Number(child[metric]) || 0;
        row[`${combo}_${metric}`] = val;
        totalMedals += val;
      });
    });

    // Set group label with total medals
    row[groupField] = `${group.groupKey} (${totalMedals})`;
    return row;
  });

  return { columns, rows };
}
