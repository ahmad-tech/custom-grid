import React from "react";
import { GripHorizontal, X } from "lucide-react";
import type { ColumnDef } from "@/types/grid";

interface PivotPanelProps {
  pivotColumns: string[];
  columns: ColumnDef[];
  setPivotColumns: (fields: string[]) => void;
  handlePivotDrop: (e: React.DragEvent) => void;
}

export const PivotPanel: React.FC<PivotPanelProps> = ({
  pivotColumns,
  columns,
  setPivotColumns,
  handlePivotDrop,
}) => {
  return (
    <div
      className="flex items-center gap- border p-1 py-2"
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onDrop={handlePivotDrop}
    >
      {/* Display the pivot columns in the panel */}
      {pivotColumns.length > 0 && (
        <div className="p-2 flex gap-2 max-w-full">
          {pivotColumns.map((field) => {
            const col = columns.find((c) => c.field === field);
            return (
              <div
                key={field}
                className="table-row-pop flex items-center justify-between bg-gray-300 px-2 rounded-full"
              >
                <span key={field} className="flex items-center">
                  <GripHorizontal className="size-4 mr-1" />
                  {col?.headerName}
                </span>

                <button
                  onClick={() =>
                    setPivotColumns(pivotColumns.filter((f) => f !== field))
                  }
                  className="ml-1 hover:bg-gray-600 rounded-full p-1 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="rounded flex flex-wrap gap-2 items-center max-w-full justify-start">
        <span className="text-gray-400 text-sm ">
          Drag here to set column labels
        </span>
      </div>
    </div>
  );
};
