import React from "react";
import { GripHorizontal, X } from "lucide-react";
import type { ColumnDef } from "@/types/grid";

interface GroupPanelProps {
  showGroupByPanel: boolean;
  groupedColumns: string[];
  columns: ColumnDef[];
  setColumnGrouped: (field: string, grouped: boolean) => void;
  handleGroupDrop: (e: React.DragEvent) => void;
}

export const GroupPanel: React.FC<GroupPanelProps> = ({
  showGroupByPanel,
  groupedColumns,
  columns,
  setColumnGrouped,
  handleGroupDrop,
}) => {
  if (!showGroupByPanel) return null;

  return (
    <>
      <div
        className="min-h-[40px] border border-dashed border-[#353945] rounded flex flex-wrap gap-2 items-center p-2 bg-[#232733]"
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
        }}
        onDrop={handleGroupDrop}
      >
        <span className="text-gray-400 text-sm">
          Drag columns here to group
        </span>
      </div>
      <div className="p-2 flex flex-col gap-2">
        {groupedColumns.map((field, ind) => {
          const col = columns.find((c) => c.field === field);

          return (
            <div
              key={ind}
              className="flex items-center justify-between bg-gray-700 px-2 py-1 rounded-full"
            >
              <span className="flex items-center">
                <GripHorizontal className="w-3 h-3 mr-1" />
                {col?.headerName}
              </span>

              <button
                onClick={() => setColumnGrouped(field, false)}
                className="ml-1 hover:bg-gray-600 rounded-full p-1 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
