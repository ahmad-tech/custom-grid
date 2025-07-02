import React, { useEffect, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { List, Sigma, GripHorizontal } from "lucide-react";
import type { ColumnDef } from "@/types/grid";
import { GroupPanel } from "./GroupPanel";

interface ColumnSidebarProps {
  columns: ColumnDef[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnDef[]>>;
  search: string;
  setSearch: (val: string) => void;
  showGroupByPanel?: boolean;
  groupedColumns?: string[];
  setColumnGrouped?: (field: string, grouped: boolean) => void;
  handleGroupDrop?: (e: React.DragEvent) => void;
  enablePivot?: boolean; // can be updated
  togglePivot?: () => void;
  pivotColumns?: string[];
  setPivotColumns?: React.Dispatch<React.SetStateAction<string[]>>;
  selectedAggFn?: string;
  columnAggFnMap?: Record<string, string>;
  setColumnAggFnMap?: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;

  handleAggDrop: (e: React.DragEvent) => void;
  setAggCols?: React.Dispatch<
    React.SetStateAction<{ field: string; aggFunc: string }[]>
  >;
  pivotMode?: boolean; // from the column def
}

const ColumnSidebar: React.FC<ColumnSidebarProps> = ({
  columns,
  setColumns,
  search,
  setSearch,
  showGroupByPanel,
  groupedColumns = [],
  setColumnGrouped,
  handleGroupDrop,
  enablePivot = false,
  togglePivot,
  pivotColumns,
  setPivotColumns,
  selectedAggFn,
  columnAggFnMap,
  setColumnAggFnMap,
  handleAggDrop,
  setAggCols,
  pivotMode = false,
}) => {
  const aggregationOptions = ["sum", "min", "max", "count", "avg"];

  const aggColumns = useMemo(
    () =>
      columns.filter(
        (item) =>
          item.aggFunc &&
          !item.pivot &&
          item.type === "number" &&
          columnAggFnMap?.[item.field]
      ),
    [columns, columnAggFnMap]
  );

  // Helper function to remove column from aggregation
  const removeFromAggregation = (columnField: string) => {
    setColumnAggFnMap?.((prev) => {
      const updated = { ...prev };
      delete updated[columnField];

      // Convert to array for aggCols
      const newAggCols = Object.entries(updated).map(([field, aggFunc]) => ({
        field,
        aggFunc,
      }));

      setAggCols?.(newAggCols);
      return updated;
    });
  };

  useEffect(() => {
    if (!setColumnAggFnMap) return;

    setColumnAggFnMap((prev) => {
      const updatedMap = { ...prev };

      columns.forEach((col) => {
        if (
          col.type?.toLowerCase() === "number" &&
          col.field !== "year" &&
          col.visible !== false &&
          !(col.field in updatedMap)
        ) {
          updatedMap[col.field] = selectedAggFn || "sum";
        }
      });
      return updatedMap;
    });
  }, [columns, selectedAggFn]);

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
        maxHeight: "780px",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {/* Pivot Mode Toggle */}
      <div
        style={{
          padding: "0.75rem 1rem",
          borderBottom: "1px solid #353945",
        }}
        className="flex flex-col gap-2 items-center cursor-pointer"
      >
        {pivotMode && (
          <div className="w-full border-b-[1px] pb-1 border-[#353945]">
            <Checkbox
              className={undefined}
              style={{
                borderWidth: 1,
                borderColor: "#9ca3af",
                cursor: "pointer",
              }}
              checked={enablePivot}
              onCheckedChange={togglePivot}
            />
            <span style={{ marginLeft: "0.5rem" }}>Pivot Mode</span>
          </div>
        )}

        {/* Pivotable Columns */}
        <div
          className="w-full"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.1rem",
            maxHeight: "15rem",
            overflowY: "auto",
          }}
        >
          <div className="max-h-[450px] overflow-auto hide-scrollbar">
            {columns
              .filter((col) =>
                col.headerName.toLowerCase().includes(search.toLowerCase())
              )
              ?.map((col) => {
                const isDraggable = col.type?.toLowerCase() === "number";

                return (
                  <div
                    key={col.field}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                    draggable={isDraggable}
                    onDragStart={(e) => {
                      // e.dataTransfer.setData("text/plain", col.field);
                      e.dataTransfer.setData("text/plain", col.field); // optional for browser preview
                      e.dataTransfer.setData("columnField", col.field); // used in your custom drop logic
                    }}
                  >
                    <Checkbox
                      checked={col.visible !== false}
                      onCheckedChange={(checked: boolean) => {
                        setColumns((cols) =>
                          cols.map((c) =>
                            c.field === col.field
                              ? { ...c, visible: checked }
                              : c
                          )
                        );

                        // Remove from pivotColumns if hiding
                        if (!checked && setPivotColumns && pivotColumns) {
                          setPivotColumns(
                            pivotColumns.filter((f) => f !== col.field)
                          );
                        }

                        // Remove from aggregation if it exists
                        if (columnAggFnMap?.[col.field]) {
                          removeFromAggregation(col.field);
                        }

                        // Remove from groupedColumns if hiding
                        if (
                          !checked &&
                          setColumnGrouped &&
                          groupedColumns.includes(col.field)
                        ) {
                          setColumnGrouped(col.field, false);

                          setColumns((cols) =>
                            cols.map((c) =>
                              c.field === col.field
                                ? { ...c, visible: checked }
                                : c
                            )
                          );
                        }
                      }}
                      style={{
                        borderWidth: 1,
                        borderColor: "#9ca3af",
                        cursor: "pointer",
                        height: "25px",
                        width: "25px",
                      }}
                      className={undefined}
                    />
                    <GripHorizontal
                      style={{
                        width: "1rem",
                        height: "1rem",
                        color: "#9ca3af",
                        cursor: "move",
                      }}
                    />
                    <span className={``}>{col.headerName}</span>
                  </div>
                );
              })}
          </div>

          {/* Aggregation Drop Zone */}
          {enablePivot && (
            <>
              <div
                className="mt-4"
                style={{
                  // marginBottom: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Sigma style={{ width: "1rem" }} />
                <span style={{ fontWeight: 600 }}>Values</span>
              </div>

              <div
                className="min-h-[40px] hide-scrollbar scroll-smooth overflow-y-scroll border border-dashed border-[#3a3d45] rounded p-2 bg-[#232733]"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                }}
                onDrop={handleAggDrop}
              >
                {/* List of columns having aggFunc */}
                {aggColumns && aggColumns.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {aggColumns.map((col) => {
                      const aggFn = columnAggFnMap?.[col.field] || "sum";

                      return (
                        <div
                          key={col.field}
                          className="flex justify-between items-center px-2 py-1 bg-[#1f2937] border border-[#353945] rounded"
                        >
                          <div className="w-[50%] flex justify-between items-center gap-2 text-sm text-white">
                            {col.headerName || col.field}
                          </div>

                          <div className=" w-[40%] flex items-center justify-end">
                            <select
                              className="py-1 pl-2"
                              value={aggFn}
                              onChange={(e) => {
                                setColumnAggFnMap?.((prev) => ({
                                  ...prev,
                                  [col.field]: e.target.value,
                                }));
                              }}
                              style={{
                                backgroundColor: "#232733",
                                border: "1px solid #353945",
                                borderRadius: "0.25rem",
                                outline: "none",
                                fontSize: "0.75rem",
                              }}
                            >
                              {aggregationOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>

                            <button
                              className="text-red-400 text-xs ml-2 cursor-pointer"
                              onClick={() => removeFromAggregation(col.field)}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">
                    Drag columns here for aggregation
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search and Visibility Toggles */}
      {!columnAggFnMap && !setColumnAggFnMap && (
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
            <Checkbox
              className={undefined}
              style={{
                borderWidth: 1,
                borderColor: "#9ca3af",
                cursor: "pointer",
                height: "25px",
                width: "25px",
              }}
              checked={columns.every((col) => col.visible !== false)}
              onCheckedChange={(checked: boolean) =>
                setColumns((cols) =>
                  cols.map((c) => ({ ...c, visible: checked }))
                )
              }
            />
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
                  <Checkbox
                    className={undefined}
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
                      height: "25px",
                      width: "25px",
                    }}
                  />
                  <GripHorizontal
                    style={{
                      width: "1rem",
                      height: "1rem",
                      color: "#9ca3af",
                      cursor: "move",
                    }}
                  />
                  <span>{col.headerName}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Row Grouping Section */}
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
