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
