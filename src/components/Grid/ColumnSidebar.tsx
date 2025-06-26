import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { GripVertical, List } from "lucide-react";
import type { ColumnDef } from "@/types/grid";
import { GroupPanel } from "./GroupPanel";

// Props for the ColumnSidebar component
interface ColumnSidebarProps {
  columns: ColumnDef[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnDef[]>>;
  search: string;
  setSearch: (val: string) => void;
  // Row grouping props
  showGroupByPanel?: boolean;
  groupedColumns?: string[];
  setColumnGrouped?: (field: string, grouped: boolean) => void;
  handleGroupDrop?: (e: React.DragEvent) => void;
}

/**
 * Sidebar component for toggling column visibility, searching columns,
 * and managing row grouping in the DataGrid.
 */
const ColumnSidebar: React.FC<ColumnSidebarProps> = ({
  columns,
  setColumns,
  search,
  setSearch,
  showGroupByPanel,
  groupedColumns = [],
  setColumnGrouped,
  handleGroupDrop,
}) => {
  return (
    <aside
      style={{
        backgroundColor: "#1f2937",
        color: "#ffffff",
        padding: "1rem",
        borderLeft: "1px solid #374151",
        width: "280px",
        display: "flex",
        flexDirection: "column",
        height: "480px",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {/* Search input and "toggle all" checkbox */}
      <div
        style={{
          padding: "0.75rem 1rem",
          borderBottom: "1px solid #353945",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.75rem",
          }}
        >
          {/* Checkbox to toggle all columns' visibility */}
          <Checkbox
            style={{
              borderWidth: 1,
              borderColor: "#9ca3af",
              cursor: "pointer",
            }}
            checked={columns.every((col) => col.visible !== false)}
            onCheckedChange={(checked: boolean) =>
              setColumns((cols) =>
                cols.map((c) => ({ ...c, visible: checked }))
              )
            }
            className={undefined}
          />

          {/* Search input for filtering columns */}
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              backgroundColor: "#232733",
              border: "1px solid #353945",
              borderRadius: "0.25rem",
              padding: "0.25rem 0.5rem",
              color: "#ffffff",
              width: "100%",
              outline: "none",
            }}
          />
        </div>

        {/* List of columns with individual visibility toggles */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            maxHeight: "10rem",
            overflowY: "auto",
          }}
        >
          {columns
            .filter((col) =>
              col.headerName.toLowerCase().includes(search.toLowerCase())
            )
            .map((col, idx) => (
              <div
                key={col.field}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {/* Checkbox for individual column visibility */}
                <Checkbox
                  checked={col.visible !== false}
                  onCheckedChange={(checked: boolean) =>
                    setColumns((cols) =>
                      cols.map((c, i) =>
                        i === idx ? { ...c, visible: checked } : c
                      )
                    )
                  }
                  style={{
                    borderWidth: 1,
                    borderColor: "#9ca3af",
                    cursor: "pointer",
                  }}
                  className={undefined}
                />
                {/* Drag handle icon (for future drag-and-drop support) */}
                <GripVertical
                  style={{
                    width: "1rem",
                    height: "1rem",
                    color: "#9ca3af",
                    cursor: "move",
                  }}
                />
                {/* Column header name */}
                <span>{col.headerName}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Row Groups Section */}
      {showGroupByPanel && setColumnGrouped && handleGroupDrop && (
        <div
          style={{
            padding: "0.75rem 1rem",
            borderBottom: "1px solid #353945",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <List style={{ width: "1rem", height: "1rem" }} />
            <span style={{ fontWeight: 600 }}>Row Groups</span>
          </div>
          <GroupPanel
            showGroupByPanel={showGroupByPanel}
            groupedColumns={groupedColumns}
            columns={columns}
            setColumnGrouped={setColumnGrouped}
            handleGroupDrop={handleGroupDrop}
          />
        </div>
      )}
    </aside>
  );
};

export default ColumnSidebar;
