import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronRight,
  ListFilter,
  Calendar,
  GripVertical,
  // Sigma,
  List,
  // X,
} from "lucide-react";
import type { DataGridProps, ColumnDef, GroupObject } from "@/types/grid";
import { PulseLoader } from "react-spinners";
import { debounce } from "lodash";
import CellEditor from "./CellEditor";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { useCookedData } from "./useCookedData";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { CellFilter, GetDefaultFilterType } from "./CellFilter";
import { GroupPanel } from "./GroupPanel";

export const DataGrid = forwardRef<HTMLDivElement, DataGridProps>(
  (
    {
      data = [],
      onDataChange,
      columnDefs,
      loading = false,
      loadingMessage = "Loading...",
      onRowClick,
      showGroupByPanel = false,
      isChild = false,
      rowSelection,
    }: DataGridProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { getCookedData } = useCookedData(columnDefs);
    const {
      columns: propColumns = [],
      masterDetail = false,
      detailGridOptions = {},
      getDetailRowData = undefined,
      aggFuncs = {},
      grandTotalRow = "none",
      tableLayout = "fixed",
    } = columnDefs;

    // State
    const [gridData, setGridData] = useState<Record<string, unknown>[]>([]);
    const [columns, setColumns] = useState<ColumnDef[]>([]);
    const [sortConfig, setSortConfig] = useState<{
      key: string | null;
      direction: "asc" | "desc";
    }>({ key: null, direction: "asc" });
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [filterTypes, setFilterTypes] = useState<Record<string, string>>({});
    const [debouncedFilters, setDebouncedFilters] = useState<
      Record<string, string>
    >({});
    const [groupedColumns, setGroupedColumns] = useState<string[]>([]);
    const [expandedGroups, setExpandedGroups] = useState<
      Record<string, boolean>
    >({});
    const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>(
      {}
    );

    // Column drag & drop
    const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
    const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
    const columnDragCounter = useRef(0);
    const tableRef = useRef<HTMLTableElement>(null);

    // Cell editing
    const [editingCell, setEditingCell] = useState<{
      rowIndex: number;
      field: string;
    } | null>(null);
    const [editValue, setEditValue] = useState("");

    // Master/Detail
    const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>(
      {}
    );
    const [detailData, setDetailData] = useState<
      Record<number, Record<string, unknown>[]>
    >({});

    // Create debounced filter handler using useCallback to maintain reference
    const debouncedFnRef = useRef<ReturnType<typeof debounce> | undefined>(
      undefined
    );

    const debouncedSetFilters = useCallback(
      (newFilters: Record<string, string>) => {
        if (debouncedFnRef.current) {
          debouncedFnRef.current.cancel();
        }
        debouncedFnRef.current = debounce((filters: Record<string, string>) => {
          setDebouncedFilters(filters);
        }, 300);
        debouncedFnRef.current(newFilters);
      },
      []
    );

    // Add undo/redo state
    const [history, setHistory] = useState<{
      past: Array<Record<string, unknown>[]>;
      present: Record<string, unknown>[];
      future: Array<Record<string, unknown>[]>;
    }>({
      past: [],
      present: data,
      future: [],
    });

    // Add undo/redo handlers
    const canUndo = history.past.length > 0;
    const canRedo = history.future.length > 0;
    const undo = useCallback(() => {
      if (!canUndo) return;

      const newPast = history.past.slice(0, -1);
      const newPresent = history.past[history.past.length - 1];
      const newFuture = [history.present, ...history.future];

      setHistory({
        past: newPast,
        present: newPresent,
        future: newFuture,
      });
      setGridData(newPresent);
    }, [history, canUndo]);

    const redo = useCallback(() => {
      if (!canRedo) return;

      const newPast = [...history.past, history.present];
      const newPresent = history.future[0];
      const newFuture = history.future.slice(1);
      setHistory({
        past: newPast,
        present: newPresent,
        future: newFuture,
      });

      setGridData(newPresent);
    }, [history, canRedo]);

    // Add keyboard event listener for undo/redo
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.metaKey || e.ctrlKey) {
          if (e.key === "z" && !e.shiftKey) {
            e.preventDefault();
            undo();
          } else if (e.key === "z" && e.shiftKey) {
            e.preventDefault();
            redo();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [undo, redo]);

    useImperativeHandle<HTMLDivElement, HTMLDivElement>(ref, () => {
      const div = document.createElement("div");
      Object.assign(div, {
        resetSelection: () => {
          setSelectedRows({});
        },
      });
      return div;
    }, []);

    // Initial Setup
    useEffect(() => {
      if (data && data.length > 0) {
        const cookedData = isChild ? data : getCookedData(data);
        setGridData(cookedData);
        // Initialize history with current data
        setHistory({
          past: [],
          present: cookedData,
          future: [],
        });

        const firstItem = cookedData[0];
        const extracted = Object.keys(firstItem)
          .filter((key) => key !== "children")
          .map(
            (key) =>
              ({
                field: key,
                headerName:
                  key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1"),
                type: typeof firstItem[key] === "number" ? "number" : "text",
                editable: true,
                width: 150,
                visible: true,
                rowGroup: false,
                aggFunc: typeof firstItem[key] === "number" ? "sum" : undefined,
              }) as ColumnDef
          );

        setColumns(extracted);
      }

      if (propColumns && propColumns.length > 0) {
        // Separate grouped and non-grouped columns
        const groupedCols = propColumns.filter(
          (col) => col.rowGroup && col.visible !== false
        );
        const nonGroupedCols = propColumns.filter(
          (col) => !col.rowGroup && col.visible !== false
        );

        // Combine with grouped columns first
        setColumns([...groupedCols, ...nonGroupedCols]);

        // Initialize groupedColumns from columns with rowGroup=true
        const initialGroupedColumns = groupedCols.map((col) => col.field);
        if (initialGroupedColumns.length > 0) {
          setGroupedColumns(initialGroupedColumns);
        }

        return;
      }
    }, [data, propColumns]);

    // Update filters and trigger debounced update
    const handleFilterChange = useCallback(
      (field: string, value: string) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        debouncedSetFilters(newFilters);
      },
      [filters, debouncedSetFilters]
    );

    // Cleanup debounce on unmount
    useEffect(() => {
      return () => {
        if (debouncedFnRef.current) {
          debouncedFnRef.current.cancel();
        }
      };
    }, []);

    const handleFilterTypeChange = useCallback(
      (field: string, type: string) => {
        setFilterTypes((prev) => ({ ...prev, [field]: type }));
      },
      []
    );

    // Update filteredData to use filter types
    const filteredData = useMemo(() => {
      if (!gridData || gridData.length === 0) {
        return [];
      }

      const filtered = gridData.filter((row) => {
        return Object.keys(debouncedFilters).every((field) => {
          if (!debouncedFilters[field]) return true;
          const col = columns.find((c) => c.field === field);
          if (!col) return true;

          const cellValue = row[field];
          const filterValue = debouncedFilters[field];
          const filterType = filterTypes[field] || GetDefaultFilterType(col);

          // Handle null/undefined values
          if (cellValue == null) return false;

          if (col.type === "number") {
            const numValue = Number(cellValue);
            const filterNum = Number(filterValue);

            switch (filterType) {
              case "equals":
                return numValue === filterNum;
              case "greaterThan":
                return numValue > filterNum;
              case "lessThan":
                return numValue < filterNum;
              case "between": {
                const [min, max] = filterValue.split(",").map(Number);
                return numValue >= min && numValue <= max;
              }
              default:
                return true;
            }
          }

          if (col.type === "date") {
            const dateValue = new Date(cellValue as string);
            const filterDate = new Date(filterValue);

            switch (filterType) {
              case "equals":
                return dateValue.toDateString() === filterDate.toDateString();
              case "before":
                return dateValue < filterDate;
              case "after":
                return dateValue > filterDate;
              case "between": {
                const [start, end] = filterValue
                  .split(",")
                  .map((d) => new Date(d));
                return dateValue >= start && dateValue <= end;
              }
              default:
                return true;
            }
          }

          // Text comparison
          const cellString = String(cellValue).toLowerCase();
          const filterString = filterValue.toLowerCase();

          switch (filterType) {
            case "equals":
              return cellString === filterString;
            case "startsWith":
              return cellString.startsWith(filterString);
            case "endsWith":
              return cellString.endsWith(filterString);
            case "contains":
            default:
              return cellString.includes(filterString);
          }
        });
      });

      return filtered;
    }, [gridData, debouncedFilters, filterTypes, columns]);

    // ----------------------------
    // 2) Sorting
    // ----------------------------
    const handleSort = useCallback(
      (field: string) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig.key === field && sortConfig.direction === "asc") {
          direction = "desc";
        }
        setSortConfig({ key: field, direction });

        // Sort the data
        const sorted = [...gridData].sort((a, b) => {
          const aValue = a[field] as string | number;
          const bValue = b[field] as string | number;
          if (aValue < bValue) return direction === "asc" ? -1 : 1;
          if (aValue > bValue) return direction === "asc" ? 1 : -1;
          return 0;
        });
        setGridData(sorted);
      },
      [sortConfig, gridData]
    );

    // If you also want multi-sort with shiftKey, you can adapt accordingly.
    const handleMultiSort = useCallback(
      (field: string, e: React.MouseEvent) => {
        if (e?.shiftKey) {
          // Multi-sort scenario
          // For simplicity, we'll just do single-column sort here
        }
        handleSort(field);
      },
      [handleSort]
    );

    // ----------------------------
    // 5) Column Drag & Drop
    // ----------------------------
    const handleColumnDragStart = useCallback(
      (e: React.DragEvent, field: string) => {
        setDraggedColumn(field);
        columnDragCounter.current = 0;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("columnField", field);
      },
      []
    );

    const handleColumnDragOver = useCallback(
      (e: React.DragEvent, field: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        if (dragOverColumn !== field) {
          setDragOverColumn(field);
        }
      },
      [dragOverColumn]
    );

    const handleColumnDragEnter = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      columnDragCounter.current++;
    }, []);

    const handleColumnDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      columnDragCounter.current--;
      if (columnDragCounter.current === 0) {
        setDragOverColumn(null);
      }
    }, []);

    const handleColumnDrop = useCallback(
      (e: React.DragEvent, targetField: string) => {
        e.preventDefault();
        columnDragCounter.current = 0;
        setDragOverColumn(null);

        if (!draggedColumn || draggedColumn === targetField) return;

        const sourceIndex = columns.findIndex(
          (col) => col.field === draggedColumn
        );
        const targetIndex = columns.findIndex(
          (col) => col.field === targetField
        );

        if (sourceIndex === targetIndex) return;

        // Create new columns array with reordered columns
        const newCols = [...columns];
        const [moved] = newCols.splice(sourceIndex, 1);
        newCols.splice(targetIndex, 0, moved);

        // Important: Preserve column properties and only update order
        setColumns(newCols);

        // Reset drag state
        setDraggedColumn(null);
      },
      [draggedColumn, columns]
    );

    const handleColumnDragEnd = useCallback(() => {
      columnDragCounter.current = 0;
      setDraggedColumn(null);
      setDragOverColumn(null);
    }, []);

    // ----------------------------
    // 6) Editing
    // ----------------------------
    const startEditing = useCallback(
      (rowIndex: number, field: string, value: string) => {
        setEditingCell({ rowIndex, field });
        setEditValue(value);
      },
      []
    );

    const handleEditChange = useCallback(
      (value: string | number | boolean | Date | null, editorType?: string) => {
        if (
          editorType === "select" ||
          editorType === "date" ||
          editorType === "time" ||
          editorType === "dateTime" ||
          editorType === "checkbox"
        ) {
          if (!editingCell) return;
          const { field } = editingCell;
          const newRow = { ...gridData[editingCell.rowIndex], [field]: value };
          const idxInAll = gridData.findIndex(
            (r) => r === gridData[editingCell.rowIndex]
          );

          if (idxInAll !== -1) {
            const previousRecord = gridData[editingCell.rowIndex];
            const newData = [...gridData];
            const cookedData = getCookedData(newData);
            newData[idxInAll] = newRow;

            //For notify parent with new record, previous record and field
            if (onDataChange) {
              onDataChange(newRow, previousRecord, field);
            }
            setGridData(cookedData);

            // Update history with current state before making changes
            setHistory((prev) => ({
              past: [...prev.past, prev.present],
              present: cookedData,
              future: [],
            }));
          }
          setEditingCell(null);
          setEditValue("");
        } else {
          setEditValue(String(value));
        }
      },
      [editingCell, gridData, onDataChange]
    );

    const handleEditChangeCheckbox = useCallback(
      (value: boolean, rowIndex: number, field: string) => {
        const newRow = { ...gridData[rowIndex], [field]: value };
        const idxInAll = gridData.findIndex((r) => r === gridData[rowIndex]);

        if (idxInAll !== -1) {
          const newData = [...gridData];
          newData[idxInAll] = newRow;
          const cookedData = getCookedData(newData);
          setGridData(cookedData);

          // Update history with current state before making changes
          setHistory((prev) => ({
            past: [...prev.past, prev.present],
            present: cookedData,
            future: [],
          }));

          //For notify parent with new record, previous record and field
          if (onDataChange) {
            onDataChange(newRow, gridData[rowIndex], field);
          }
        }
        setEditingCell(null);
        setEditValue("");
      },
      [gridData, onDataChange]
    );

    // ----------------------------
    // 7) Master/Detail
    // ----------------------------
    const toggleRowExpand = useCallback(
      (rowIndex: number) => {
        setExpandedRows((prev) => {
          const newState = { ...prev };
          if (newState[rowIndex]) {
            delete newState[rowIndex];
          } else {
            newState[rowIndex] = true;
            // Get detail data from children if available
            const row = gridData[rowIndex];
            if (row && row.children) {
              setDetailData((old) => ({
                ...old,
                [rowIndex]: row.children as Record<string, unknown>[],
              }));
            } else if (getDetailRowData) {
              // Fallback to getDetailRowData if no children
              getDetailRowData({
                data: row,
                successCallback: (detail) => {
                  setDetailData((old) => ({ ...old, [rowIndex]: detail }));
                },
              });
            }
          }
          return newState;
        });
      },
      [gridData, getDetailRowData]
    );

    // ----------------------------
    // 8) Row Grouping
    // ----------------------------
    const toggleGroupExpand = useCallback((groupKey: string) => {
      setExpandedGroups((prev) => {
        const newState = { ...prev };
        if (newState[groupKey]) {
          delete newState[groupKey];
        } else {
          newState[groupKey] = true;
        }
        return newState;
      });
    }, []);

    const setColumnGrouped = useCallback(
      (field: string, grouped: boolean) => {
        // Update columns
        const newColumns = columns.map((col) => {
          if (col.field === field) {
            return { ...col, rowGroup: grouped };
          }
          return col;
        });

        // If grouping is enabled, move the grouped column to the start
        if (grouped) {
          const groupedColumn = newColumns.find((col) => col.field === field);
          if (groupedColumn) {
            const filteredColumns = newColumns.filter(
              (col) => col.field !== field
            );
            setColumns([groupedColumn, ...filteredColumns]);
          }
        } else {
          setColumns(newColumns);
        }

        // Update groupedColumns
        setGroupedColumns((prev) => {
          if (grouped) {
            if (!prev.includes(field)) {
              return [...prev, field];
            }
            return prev;
          } else {
            return prev.filter((f) => f !== field);
          }
        });
      },
      [columns]
    );

    // ----------------------------
    // Group & Flatten Data for Virtualization
    // ----------------------------
    const calculateAggregation = useCallback(
      (values: unknown[], aggFunc: string) => {
        if (!values || values.length === 0) return 0;
        // Check if it's a custom aggregation function
        if (typeof aggFunc === "string" && aggFuncs[aggFunc]) {
          return aggFuncs[aggFunc]({ values });
        }

        // Handle built-in aggregation functions
        switch (aggFunc) {
          case "sum":
            return values.reduce(
              (acc: number, val) => acc + (Number(val) || 0),
              0
            );
          case "avg": {
            const sum = values.reduce(
              (acc: number, val) => acc + (Number(val) || 0),
              0
            );
            return sum / values.length;
          }
          case "min":
            return Math.min(...values.map((v) => Number(v)));
          case "max":
            return Math.max(...values.map((v) => Number(v)));
          case "count":
            return values.length;
          default:
            return values[0];
        }
      },
      [aggFuncs]
    );

    const groupedData = useMemo(() => {
      if (!filteredData || filteredData.length === 0) {
        return null;
      }

      if (groupedColumns.length === 0) return null;

      const groupFields = groupedColumns;

      // Recursively group the data
      function groupData(
        rows: Record<string, unknown>[],
        level = 0,
        parentKey = ""
      ): GroupObject[] {
        if (level >= groupFields.length)
          return rows as unknown as GroupObject[];

        const field = groupFields[level];
        const groupsMap: Record<string, GroupObject> = {};

        rows.forEach((item) => {
          const gVal = item[field];
          const gKey = parentKey
            ? `${parentKey}__${String(gVal)}`
            : `${field}__${String(gVal)}`;

          if (!groupsMap[gKey]) {
            groupsMap[gKey] = {
              field,
              value: gVal,
              key: gKey,
              level,
              children: [],
              isGroup: true,
              originalChildren: item.children as
                | Record<string, unknown>[]
                | undefined,
              aggregations: {},
            };
          }
          groupsMap[gKey].children.push(item);
        });

        // Calculate aggregations for all numeric columns
        Object.values(groupsMap).forEach((groupObj) => {
          columns.forEach((col) => {
            if (col.type === "number" && col.aggFunc) {
              const values = groupObj.children
                .map((child: Record<string, unknown>) => child[col.field])
                .filter((val: unknown) => val != null);
              if (values.length > 0) {
                groupObj.aggregations[col.field] = calculateAggregation(
                  values,
                  col.aggFunc
                );
              }
            }
          });

          if (level < groupFields.length - 1) {
            groupObj.children = groupData(
              groupObj.children,
              level + 1,
              groupObj.key
            );
          }
        });

        return Object.values(groupsMap);
      }

      const result = groupData(filteredData, 0, "");
      return result;
    }, [filteredData, groupedColumns, columns]);

    const flattenedRows = useMemo(() => {
      const flatList: Array<{
        type: string;
        groupKey?: string;
        groupField?: string;
        groupValue?: unknown;
        level?: number;
        indent?: number;
        itemCount?: number;
        aggregations?: Record<string, unknown>;
        row?: Record<string, unknown>;
        rowIndex?: number;
        parentRow?: Record<string, unknown>;
        parentIndex?: number;
      }> = [];

      if (!filteredData || filteredData.length === 0) {
        return flatList;
      }

      if (groupedData) {
        // Handle grouped data
        const walkGroups = (
          groups: GroupObject[],
          indentLevel = 0,
          parentIndex = 0
        ) => {
          groups.forEach((group, groupIndex) => {
            // Add group header with aggregations
            flatList.push({
              type: "group",
              groupKey: group.key,
              groupField: group.field,
              groupValue: group.value,
              level: group.level,
              indent: indentLevel,
              itemCount: group.children.length,
              aggregations: group.aggregations,
            });

            // If group is expanded, add children
            if (expandedGroups[group.key]) {
              if (group.children[0]?.isGroup) {
                // Nested groups - cast to GroupObject[]
                walkGroups(
                  group.children as unknown as GroupObject[],
                  indentLevel + 1,
                  parentIndex + groupIndex
                );
              } else {
                // Data rows
                group.children.forEach(
                  (row: Record<string, unknown>, index: number) => {
                    const absoluteIndex = parentIndex + groupIndex + index;
                    flatList.push({
                      type: "data",
                      row,
                      rowIndex: absoluteIndex,
                      indent: indentLevel + 1,
                    });
                    // Add detail row if expanded
                    if (masterDetail && expandedRows[absoluteIndex]) {
                      flatList.push({
                        type: "detail",
                        parentRow: row,
                        parentIndex: absoluteIndex,
                        indent: indentLevel + 2,
                      });
                    }
                  }
                );
              }
            }
          });
        };

        walkGroups(groupedData, 0, 0);
      } else {
        // Handle flat data
        filteredData.forEach((row, index) => {
          flatList.push({
            type: "data",
            row,
            rowIndex: index,
            indent: 0,
          });
          if (masterDetail && expandedRows[index]) {
            flatList.push({
              type: "detail",
              parentRow: row,
              parentIndex: index,
              indent: 1,
            });
          }
        });
      }

      return flatList;
    }, [filteredData, groupedData, expandedGroups, expandedRows, masterDetail]);

    // Or modify it to only expand on initial load if you want that behavior
    useEffect(() => {
      if (groupedData && groupedColumns.length === 1) {
        // Only for first grouping
        setExpandedGroups({}); // Reset expanded groups when grouping changes
      }
    }, [groupedData, groupedColumns]);

    // ----------------------------
    // 9) Virtualization Setup
    // ----------------------------
    const scrollParentRef = useRef<HTMLTableSectionElement>(null);

    const rowVirtualizer = useVirtualizer({
      count: flattenedRows.length,
      getScrollElement: () => scrollParentRef.current,
      estimateSize: (index) => {
        const item = flattenedRows[index];
        // Dynamically calculate detail row height based on content
        if (item?.type === "detail") {
          const detailRows = detailData[item.parentIndex || 0]?.length || 0;
          // Calculate height: header (40px) + rows (40px each) + padding (16px) + extra padding to prevent overlap (16px)
          const calculatedHeight = Math.min(detailRows * 40 + 72, 600); // Cap at 600px
          return calculatedHeight;
        }
        return 40; // Standard row height
      },
      useAnimationFrameWithResizeObserver: true,
      overscan: 5,
    });

    // ----------------------------
    // 10) Rendering: Flattened Virtual Rows
    // ----------------------------
    // Which columns do we show? (Ignore rowGroup columns except the first if needed)
    const displayColumns = useMemo(() => {
      return columns.filter((col) => col.visible !== false);
    }, [columns]);

    // Add a helper function to get cell value
    const getCellValue = (
      row: Record<string, unknown>,
      field: string,
      col: ColumnDef
    ): unknown => {
      // If the row has aggregations and this is an aggregated column, use the aggregation value
      if (
        (row as GroupObject).aggregations &&
        col.aggFunc &&
        (row as GroupObject).aggregations[field] !== undefined
      ) {
        return (row as GroupObject).aggregations[field];
      }

      // Otherwise, use the field value
      return row[field];
    };

    // Add a helper function to format cell value using valueFormatter if available
    const formatCellValue = (
      value: unknown,
      row: Record<string, unknown>,
      col: ColumnDef
    ) => {
      if (col.valueFormatter) {
        return col.valueFormatter({ value, data: row });
      }
      return value ? String(value) : "";
    };

    /**
     * Inline helper: Render a single "virtual item" row.
     * We'll handle group vs. data vs. detail row by checking flattenedRows[idx].type.
     */
    const renderRow = (virtualRow: VirtualItem) => {
      const item = flattenedRows[virtualRow.index];
      if (!item) {
        return null;
      }

      // 1) Group Header Row
      if (item.type === "group") {
        const isExpanded = item.groupKey
          ? expandedGroups[item.groupKey]
          : false;
        const groupColumn = columns.find(
          (col) => col.field === item.groupField
        );

        return (
          <TableRow
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            style={{
              position: "absolute",
              transform: `translateY(${virtualRow.start}px)`,
              width: "100%",
              display: "table",
              tableLayout: "fixed",
              top: 0,
            }}
            className={cn("hover:bg-gray-100")}
          >
            {displayColumns.map((col, colIndex) => {
              const isGroupColumn = col.field === item.groupField;
              return (
                <TableCell
                  key={`${colIndex}-${col.field}`}
                  style={{
                    ...getCellWidth(col),
                    textWrap: "initial",
                    overflow: "hidden",
                    cursor: "text",
                  }}
                  className="p-0"
                >
                  {isGroupColumn ? (
                    <div
                      className="flex items-center cursor-pointer w-full"
                      onClick={() =>
                        item.groupKey && toggleGroupExpand(item.groupKey)
                      }
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5 mr-1" />
                      ) : (
                        <ChevronRight className="h-5 w-5 mr-1" />
                      )}
                      <div>
                        <p className="font-medium">
                          {groupColumn
                            ? `${String(item.groupValue)}`
                            : String(item.groupValue)}
                        </p>
                        <p className="text-gray-500 font-[10px]">
                          ({item.itemCount} items)
                        </p>
                      </div>
                    </div>
                  ) : col.aggFunc &&
                    item.aggregations &&
                    item.aggregations[col.field] !== undefined ? (
                    <div className="w-full">
                      <div className="flex items-center bg-gray-100 px-2 w-[min-content] rounded-md text-sm">
                        <span className="text-gray-600 capitalize">
                          {col.aggFunc}
                        </span>
                        <span className="mx-1 text-gray-500">:</span>
                        <span className="font-semibold text-gray-900">
                          {(() => {
                            const value = item.aggregations[col.field];
                            switch (col.aggFunc) {
                              case "avg":
                                return (value as number).toFixed(2);
                              case "count":
                                return Math.round(value as number).toString();
                              default:
                                return (value as number).toLocaleString();
                            }
                          })()}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </TableCell>
              );
            })}
          </TableRow>
        );
      }

      // 2) Data Row
      if (item.type === "data") {
        const { row, indent, rowIndex } = item;
        const isExpanded =
          rowIndex !== undefined ? expandedRows[rowIndex] : false;
        let expandButton: React.ReactNode = null;
        if (
          row?.children &&
          Array.isArray(row.children) &&
          row.children.length > 0
        ) {
          expandButton = (
            <button
              className="mr-2 focus:outline-none"
              onClick={() =>
                rowIndex !== undefined && toggleRowExpand(rowIndex)
              }
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          );
        }
        return (
          <TableRow
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            style={{
              position: "absolute",
              transform: `translateY(${virtualRow.start}px)`,
              width: "100%",
              display: "table",
              tableLayout: "fixed",
              top: 0,
            }}
            className={cn({
              "bg-blue-100": rowIndex !== undefined && selectedRows[rowIndex],
              "hover:bg-gray-100": true,
            })}
            onClick={() =>
              onRowClick?.({
                data: row as Record<string, unknown>,
                rowIndex: rowIndex as number,
              })
            }
          >
            {rowSelection && (
              <TableCell key={`checkbox-cell-${rowIndex}`} className="w-[50px]">
                <div className="w-[30px] flex justify-center items-center">
                  <Checkbox
                    checked={
                      rowIndex !== undefined ? !!selectedRows[rowIndex] : false
                    }
                    onCheckedChange={(checked: boolean) => {
                      handleRowCheckboxChange(rowIndex, checked);
                    }}
                    onClick={(e: { stopPropagation: () => void }) => {
                      e.stopPropagation();
                    }}
                    className={"border-1 border-gray-400 cursor-pointer"}
                  />
                </div>
              </TableCell>
            )}

            {displayColumns.map((col, colIndex) => {
              const cellRenderer = col.cellRenderer;
              const cellValue = row
                ? getCellValue(row, col.field, col)
                : undefined;
              const isEditing =
                editingCell &&
                editingCell.rowIndex === rowIndex &&
                editingCell.field === col.field;

              // If it's the first column and there's master detail, show expand button
              if (colIndex === 0 && masterDetail) {
                return (
                  <TableCell
                    key={`${colIndex}-${col.field}`}
                    style={{
                      ...getCellWidth(col),
                      overflow: "hidden",
                      cursor: col.editable ? "pointer" : "text",
                      textWrap: "initial",
                    }}
                  >
                    <div
                      className="flex items-center w-full"
                      style={{ paddingLeft: `${(indent || 0) * 20}px` }}
                    >
                      {expandButton}
                      {formatCellValue(cellValue, row || {}, col)}
                    </div>
                  </TableCell>
                );
              }

              return (
                <TableCell
                  key={col.field}
                  style={{
                    ...getCellWidth(col),
                    overflow: "hidden",
                    cursor: col.editable ? "pointer" : "text",
                    textWrap: "wrap",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                  className={cn(isEditing ? "p-[0px]" : "")}
                  onDoubleClick={() => {
                    if (
                      !cellRenderer &&
                      col.editable &&
                      rowIndex !== undefined &&
                      col.editorType !== "checkbox" &&
                      !col.rowGroup
                    ) {
                      startEditing(rowIndex, col.field, String(cellValue));
                    }
                  }}
                >
                  {cellRenderer ? (
                    React.createElement(
                      cellRenderer as React.ComponentType<{
                        value: unknown;
                        data: Record<string, unknown> | undefined;
                        rowIndex: number | undefined;
                      }>,
                      {
                        value: cellValue,
                        data: row,
                        rowIndex: rowIndex,
                      }
                    )
                  ) : isEditing && col.editorType !== "checkbox" ? (
                    <CellEditor
                      value={editValue}
                      columnDef={{
                        editorType: col.editorType || "text",
                        editorParams: col.editorParams,
                      }}
                      onChange={(value) =>
                        handleEditChange(value, col.editorType)
                      }
                      onBlur={() => {
                        // Commit changes
                        if (
                          !editingCell &&
                          col.editorType !== "select" &&
                          col.editorType !== "date" &&
                          col.editorType !== "checkbox"
                        )
                          return;
                        const { field } = editingCell;
                        const updatedData = col.valueSetter
                          ? col.valueSetter({ value: editValue })
                          : { [field]: editValue };

                        const newRow = { ...row, ...updatedData };
                        const idxInAll = gridData.findIndex((r) => r === row);
                        if (idxInAll !== -1) {
                          const newData = [...gridData];
                          newData[idxInAll] = newRow;
                          const cookedData = getCookedData(newData);
                          setGridData([...cookedData]);
                          setHistory((prev) => ({
                            past: [...prev.past, prev.present],
                            present: cookedData,
                            future: [],
                          }));
                        }
                        //For notify parent with new record, previous record and field
                        if (onDataChange) {
                          onDataChange(newRow, gridData[rowIndex], field);
                        }
                        setEditingCell(null);
                        setEditValue("");
                      }}
                      onKeyDown={(e: React.KeyboardEvent<Element>) => {
                        if (e.key === "Enter" || e.key === "Escape") {
                          (e.currentTarget as HTMLElement).blur();
                        }
                      }}
                    />
                  ) : col.editorType === "checkbox" && col.editable ? (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`${rowIndex}-${col.field}`}
                        className="cursor-pointer"
                        onCheckedChange={(value: boolean) =>
                          handleEditChangeCheckbox(value, rowIndex!, col.field)
                        }
                        checked={cellValue as boolean}
                      />
                    </div>
                  ) : (
                    <div className="w-full">
                      {col.tooltipField ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>
                              {col.rowGroup
                                ? ""
                                : formatCellValue(cellValue, row || {}, col)}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="">
                            {col.tooltipField && row?.[col.tooltipField]
                              ? String(row[col.tooltipField])
                              : col.rowGroup
                                ? ""
                                : formatCellValue(cellValue, row || {}, col)}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        formatCellValue(cellValue, row || {}, col)
                      )}
                    </div>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        );
      }

      // 3) Detail Row
      if (item.type === "detail") {
        const { parentIndex } = item;

        return (
          <TableRow
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            style={{
              position: "absolute",
              transform: `translateY(${virtualRow.start}px)`,
              width: "100%",
              display: "table",
              tableLayout: "fixed",
              top: 0,
            }}
          >
            <TableCell
              colSpan={displayColumns.length}
              style={{
                padding: 0,
                backgroundColor: "white",
                position: "relative",
                overflow: "hidden",
                width: "100%",
                zIndex: 30,
              }}
            >
              <div
                className="detail-grid-container"
                style={{
                  padding: "20px",
                  overflow: "auto",
                  position: "relative",
                  backgroundColor: "white",
                  width: "100%",
                  zIndex: 30,
                }}
              >
                {parentIndex !== undefined && detailData[parentIndex] ? (
                  <div
                    className="h-full w-full datagrid-container"
                    style={{
                      position: "relative",
                      zIndex: 30,
                      overflow: "visible", // Allow dropdowns to overflow
                    }}
                  >
                    <DataGrid
                      columnDefs={detailGridOptions}
                      data={detailData[parentIndex]}
                      isChild={true}
                    />
                  </div>
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    Loading detail data...
                  </div>
                )}
              </div>
            </TableCell>
          </TableRow>
        );
      }

      return null;
    };

    // Modify the group drop handler
    const handleGroupDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        const field = e.dataTransfer.getData("columnField");
        if (field && !groupedColumns.includes(field)) {
          setColumnGrouped(field, true);
        }
      },
      [groupedColumns, setColumnGrouped]
    );

    // // Add this effect to ensure data consistency
    // useEffect(() => {
    //   if (data && data.length > 0 && columns.length > 0) {
    //     setGridData(data);
    //   }
    // }, [data, columns]);

    // Add total row calculation
    const calculateTotals = useMemo(() => {
      const totals: Record<string, number> = {};

      // Only calculate for numeric columns
      columns.forEach((col) => {
        if (col.type === "number") {
          const sum = gridData.reduce((acc, row) => {
            const value = Number(row[col.field]) || 0;
            return acc + value;
          }, 0);
          totals[col.field] = sum;
        }
      });

      return totals;
    }, [gridData, columns]);

    const getCellWidth = (col: ColumnDef) => {
      if (tableLayout === "auto") {
        return {
          width: col.width ? Math.min(col.width, 250) : 220,
          minWidth: col.width ? Math.min(col.width, 250) : 220,
          maxWidth: 250,
        };
      }
      return {
        width: "intital",
      };
    };

    const renderTotalRow = () => (
      <div
        className={`bg-gray-100  ${
          grandTotalRow === "bottom" ? "sticky bottom-0" : "sticky top-0"
        }`}
      >
        <Table
          className={`${
            tableLayout === "fixed" ? "table-fixed" : "table-auto"
          } border-b border-gray-200`}
        >
          <TableBody>
            <TableRow>
              {displayColumns.map((col, index) => (
                <TableCell
                  key={col.field}
                  style={{
                    ...getCellWidth(col),
                  }}
                >
                  {col.type === "number" ? (
                    <div className="font-semibold">
                      {calculateTotals[col.field]?.toLocaleString()}
                    </div>
                  ) : (
                    <div className="font-semibold">
                      {index === 0 ? "Total" : ""}
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );

    /**
     * Handles the selection and deselection of a single row in the DataGrid.
     * Updates the selectedRows state based on the checkbox state.
     */
    const handleRowCheckboxChange = (
      rowIndex: number | undefined,
      checked: boolean
    ) => {
      if (rowIndex === undefined) return;
      setSelectedRows((prev) => {
        if (rowSelection && rowSelection.mode === "single") {
          // Only allow one row to be selected at a time
          return checked ? { [rowIndex]: true } : {};
        }
        const updated = { ...prev };
        if (checked) {
          updated[rowIndex] = true;
        } else {
          delete updated[rowIndex];
        }
        return updated;
      });
    };

    /**
     * Handles the selection and deselection of all rows in the DataGrid when the header checkbox is toggled.
     */
    const handleHeaderCheckboxChange = (checked: boolean) => {
      if (rowSelection && rowSelection.mode === "single") {
        // In single mode, header checkbox should select only the first row or deselect all
        if (checked && gridData.length > 0) {
          setSelectedRows({ 0: true });
        } else {
          setSelectedRows({});
        }
        return;
      }
      if (checked) {
        const allSelected: Record<string, boolean> = {};
        gridData.forEach((row, idx) => {
          allSelected[idx] = true;
        });
        setSelectedRows(allSelected);
      } else {
        setSelectedRows({});
      }
    };

    // Add useEffect to call onRowSelectionChange when selectedRows changes
    useEffect(() => {
      if (rowSelection && typeof rowSelection?.getSelectedRows === "function") {
        const selectedData = Object.entries(selectedRows)
          .filter(([, isSelected]) => isSelected)
          .map(([index]) => data[+index]);
        rowSelection?.getSelectedRows(selectedData);
      }
    }, [selectedRows]);

    const [search, setSearch] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Update the main grid container JSX
    return (
      <div className="relative w-[100%] h-full">
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <div className="text-center">
              <PulseLoader color="#4f46e5" size={15} />
              <p className="mt-4 text-gray-600">{loadingMessage}</p>
            </div>
          </div>
        )}

        {/* Grand Total Row (Top) */}
        {gridData.length > 0 && grandTotalRow === "top" && renderTotalRow()}
        <div className="flex h-full max-h-[100vh]">
          {/* Scrollable container for the virtualized rows */}
          <div
            style={{
              overflow: "auto",
              height: "100%",
            }}
            ref={scrollParentRef}
          >
            <Table
              ref={tableRef}
              className={cn(
                "w-full border-b border-l border-r border-gray-200"
              )}
              style={{
                tableLayout,
              }}
            >
              <TableHeader className="sticky top-0 z-30 bg-gray-200 shadow-sm">
                <TableRow className="divide-x divide-gray-300">
                  {rowSelection && (
                    <TableHead className="w-[50px]">
                      <div className="w-[30px] flex justify-center items-center">
                        <Checkbox
                          checked={
                            Object.keys(selectedRows).length > 0 &&
                            Object.keys(selectedRows).length === gridData.length
                          }
                          onCheckedChange={handleHeaderCheckboxChange}
                          className={"border-1 border-gray-400 cursor-pointer"}
                        />
                      </div>
                    </TableHead>
                  )}

                  {displayColumns.map((col) => {
                    const isDragged = draggedColumn === col.field;
                    const isDragOver = dragOverColumn === col.field;

                    return (
                      <TableHead
                        key={col.field}
                        draggable={showGroupByPanel}
                        className={cn("top-0 z-10 transition-colors", {
                          "opacity-50": isDragged,
                          "border-1 border-gray-400": isDragOver,
                          "cursor-move": showGroupByPanel,
                        })}
                        style={{
                          ...getCellWidth(col),
                        }}
                        onDragStart={(e) => {
                          handleColumnDragStart(e, col.field);
                          e.dataTransfer.setData("columnField", col.field);
                        }}
                        onDragOver={(e) => handleColumnDragOver(e, col.field)}
                        onDragEnter={handleColumnDragEnter}
                        onDragLeave={handleColumnDragLeave}
                        onDrop={(e) => handleColumnDrop(e, col.field)}
                        onDragEnd={handleColumnDragEnd}
                      >
                        <div className="w-inherit flex items-center">
                          <div className="flex-1 flex items-center justify-between w-[85%]">
                            <div
                              className="group flex items-center cursor-pointer font-semibold w-full text-gray-700"
                              onClick={(e) => handleMultiSort(col.field, e)}
                            >
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className="w-[85%] break-words whitespace-normal"
                                    style={{ textWrap: "initial" }}
                                  >
                                    <p>{col.headerName}</p>
                                  </div>
                                </TooltipTrigger>
                                {col.headerTooltip && (
                                  <TooltipContent className={""}>
                                    {col.headerTooltip}
                                  </TooltipContent>
                                )}
                              </Tooltip>

                              <span className="ml-1 w-[10%] opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                                {sortConfig.key === col.field ? (
                                  sortConfig.direction === "asc" ? (
                                    <ChevronUp className="h-4 w-4 text-gray-400" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                  )
                                ) : (
                                  <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                                )}
                              </span>
                            </div>
                            {col.showFilter !== false && (
                              <div className="relative group">
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <div
                                      className="p-1 hover:bg-gray-200 rounded cursor-pointer filter-icon"
                                      data-column={col.field}
                                    >
                                      <ListFilter
                                        className={`h-4 w-4 ${
                                          filters[col.field]
                                            ? "text-blue-500"
                                            : "text-gray-500"
                                        }`}
                                      />
                                    </div>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto min-w-[220px] max-w-[250px] p-3 rounded-md shadow-lg bg-white border border-gray-200">
                                    <CellFilter
                                      column={col}
                                      value={filters[col.field] || ""}
                                      filterType={filterTypes[col.field]}
                                      onFilterChange={(value) =>
                                        handleFilterChange(col.field, value)
                                      }
                                      onFilterTypeChange={(type) =>
                                        handleFilterTypeChange(col.field, type)
                                      }
                                      onClear={() =>
                                        handleFilterChange(col.field, "")
                                      }
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            )}
                          </div>
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              </TableHeader>

              {/* Virtualized Body */}
              <TableBody
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  position: "relative",
                }}
              >
                {rowVirtualizer
                  .getVirtualItems()
                  .map((virtualRow) => renderRow(virtualRow))}

                {/* If no data: simple fallback */}
                {flattenedRows.length === 0 && (
                  <TableRow className="h-24 text-center">
                    <TableCell
                      colSpan={displayColumns.length}
                      className="h-24 text-center"
                    >
                      No results found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {showGroupByPanel && flattenedRows.length !== 0 && (
            <div
              style={{
                width: "auto",
                display: "flex",
              }}
            >
              {/* Right Sidebar (inside table view) */}
              {sidebarOpen && (
                <aside
                  style={{
                    backgroundColor: "#1f2937", // bg-gray-900
                    color: "#ffffff", // text-white
                    padding: "1rem", // p-4
                    borderLeft: "1px solid #374151", // border-l border-gray-700
                    width: "280px", // w-[280px]
                    display: "flex", // flex
                    flexDirection: "column", // flex-col
                    height: "480px",
                    overflowY: "auto", // overflow-y-auto
                    overflowX: "hidden", // overflow-x-hidden
                  }}
                >
                  {/* Search and Columns List */}
                  <div
                    style={{
                      padding: "0.75rem 1rem", // px-4 py-3
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
                        style={{
                          borderWidth: 1,
                          borderColor: "#9ca3af", // border-gray-400
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
                        maxHeight: "10rem", // max-h-40 = 160px
                        overflowY: "auto",
                      }}
                    >
                      {columns
                        .filter((col) =>
                          col.headerName
                            .toLowerCase()
                            .includes(search.toLowerCase())
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
                            <GripVertical
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

                  {/* Row Groups Section */}
                  <div
                    style={{
                      padding: "0.75rem 1rem", // px-4 py-3
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
                </aside>
              )}
              {/* Sidebar Toggle Button (when closed) */}
              <div style={{ height: "100%", background: "#404c58" }}>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="px-2 py-1 p-2"
                  style={{
                    cursor: "pointer",
                    writingMode: "vertical-rl",
                    background: sidebarOpen ? "#2d353d" : "#404c58",
                    color: "#ffffff",
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: sidebarOpen
                      ? "1px solid #848484"
                      : "transparent",
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  Columns
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="sticky bottom-0 bg-white">
          {/* Grand Total Row (Bottom) */}
          {gridData.length > 0 &&
            grandTotalRow === "bottom" &&
            renderTotalRow()}
        </div>
      </div>
    );
  }
);

DataGrid.displayName = "DataGrid";

export default DataGrid;
