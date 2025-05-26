import { ColumnDef, ColumnDefProps } from "@/types/grid";
import { useCallback } from "react";

type CookedRow = Record<string, unknown>;

// --- MAIN HOOK ---
export function useCookedData(columnDefs: ColumnDefProps) {
  const getCookedSingleRow = useCallback(
    (
      row: Record<string, unknown>,
      columns: ColumnDef[],
      parentData?: Record<string, unknown>
    ) => {
      let updatedRow = { row };
      columns.map((col) => {
        if (col.valueGetter) {
          const computedValue = col.valueGetter({
            data: row,
            parentData,
          });
          updatedRow = { ...updatedRow, [col.field]: computedValue };
        } else {
          updatedRow = { ...updatedRow, [col.field]: row[col.field] };
        }
        return col.field;
      });

      return updatedRow;
    },
    []
  );

  const processChildRow = useCallback(
    (
      childRow: Record<string, unknown>,
      parentRow: Record<string, unknown>
    ): CookedRow => {
      const cookedChild: CookedRow = { ...childRow };

      columnDefs.detailGridOptions?.columns?.forEach((col) => {
        if (typeof col.valueGetter === "function") {
          const cookedRow = getCookedSingleRow(
            childRow,
            columnDefs.detailGridOptions?.columns || [],
            parentRow
          );
          cookedChild[col.field] = col.valueGetter({
            data: childRow,
            cookedRow: cookedRow,
            parentData: parentRow,
          });
        } else {
          cookedChild[col.field] = childRow[col.field];
        }
      });

      return cookedChild;
    },
    [columnDefs.detailGridOptions]
  );

  const getCookedRow = useCallback(
    (row: Record<string, unknown>): CookedRow => {
      const cookedRow: CookedRow = { ...row };

      // 1. Process children first (bottom-up)
      if (
        Array.isArray(row.children) &&
        columnDefs.detailGridOptions?.columns
      ) {
        cookedRow.children = row.children.map((childRow) =>
          processChildRow(childRow, row)
        );
      }
      // 2. Then process parent row using current cookedRow
      columnDefs.columns?.forEach((col) => {
        if (typeof col.valueGetter === "function") {
          cookedRow[col.field] = col.valueGetter({
            data: row,
            cookedRow: { ...row, ...cookedRow },
          });
        } else {
          cookedRow[col.field] = row[col.field];
        }
      });
      return cookedRow;
    },
    [columnDefs.columns, columnDefs.detailGridOptions, processChildRow]
  );

  const getCookedData = useCallback(
    (data: Record<string, unknown>[]): CookedRow[] => {
      return data.map((row) => getCookedRow(row));
    },
    [getCookedRow]
  );

  return { getCookedData };
}
