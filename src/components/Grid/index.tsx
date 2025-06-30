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
  SquareX,
  Plus,
  GripHorizontal,
  // Sigma,
  // X,
} from "lucide-react";
import type {
  DataGridProps,
  ColumnDef,
  GroupObject,
  IFilterModelItem,
  ColumnDefProps,
} from "@/types/grid";
import { PulseLoader } from "react-spinners";
import { debounce } from "lodash";
import CellEditor, { EditorType } from "./CellEditor";
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
import ServerPagination from "./ServerPagination";
import ColumnSidebar from "./ColumnSidebar";
import { PivotPanel } from "./PivotPanel";
import {
  IGroupedPivotedData,
  IPivotColumnDef,
  pivotAndAggregateByGroup,
} from "@/lib/pivot.utils";
import {
  buildTreeData,
  computeAggregationsForTree,
  findNodeByNodeKey,
  flattenTree,
  getAllDescendantNodeKeys,
  getParentNodeKey,
  moveTreeNode,
} from "@/lib/tree-data.util";

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

      // props for pagination
      pagination,

      // prop for filtering
      onFilterChange,

      rowModelType = "clientSide", // default to client-side row model

      onSortChange, // for sorting
      sortModel,
      onRowGroup,
      pivotMode = false,
      serverPivoting,
      editType,
      onCellValueChanged,
      onRowValueChanged,
      fullRowButtons,
      treeData,
      getDataPath,
      treeDataChildrenField,
      groupDefaultExpanded = -1,
      rowDragManaged,
      onRowDragEnd,
      showChildCount,
      parentRow,
    }: DataGridProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { addRowConfig } = columnDefs;
    const [treeExpandedRows, setTreeExpandedRows] = useState<
      Record<string, boolean>
    >({});

    //Add state to track the drag-over row
    const [dragOverRowKey, setDragOverRowKey] = useState<string | null>(null);
    const [treeInit, setTreeInit] = useState(false);

    // for full row editing

    const [editingRowId, setEditingRowId] = useState<unknown | null>(null);
    const [editingRowData, setEditingRowData] = useState<Record<
      string,
      unknown
    > | null>(null);

    // Tracks whether the user is currently editing/adding a new row
    const [isAddingRow, setIsAddingRow] = useState<boolean>(false);

    // Holds the data being entered for the new row
    const [newRowData, setNewRowData] = useState<Record<string, unknown>>({});

    const generateInitialRowData = (): Record<string, unknown> => {
      const initial: Record<string, unknown> = {};

      columns?.forEach((col) => {
        if (!(col.field in initial)) {
          initial[col.field] = ""; // or default for col.type
        }
      });

      return initial;
    };

    // get server-pivoting props

    const {
      serverPivotedData,
      serverPivotDataColumns,
      serverPivotCols,
      setServerPivotColsFn,
      setServerGroupedCols: setServerGroupedColsFn,
      setServerAggColsFn,
      serverAggCols,
    } = serverPivoting || {};

    const isServerSide = rowModelType === "serverSide";

    const [enablePivot, setEnablePivot] = useState<boolean>(pivotMode);

    const defaultPivotColumns = useMemo(
      () =>
        columnDefs.columns
          ?.filter((item) => item.pivot)
          .map((item) => item.field) || [],
      [columnDefs]
    );

    // To apply pivot on like game, year etc
    const [pivotColumns, setPivotColumns] =
      useState<string[]>(defaultPivotColumns);

    const [_columnDefs, _setColumnDefs] = useState<ColumnDefProps>(columnDefs);

    // sort data on pivoting mode
    const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
      null
    );

    const toggleSortByTotalMedals = () => {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    const [columnAggFnMap, setColumnAggFnMap] = useState<
      Record<string, string>
    >({});

    const aggCols = useMemo(() => {
      if (!enablePivot) return;

      return columnDefs?.columns
        ?.filter(
          (col) =>
            typeof data?.[0]?.[col.field] === "number" &&
            col.pivot !== true &&
            col.field !== "year" // exclude year column as you wanted
        )
        ?.map((col) => ({
          field: col.field,
          aggFunc: columnAggFnMap[col.field] || "sum", // fallback to sum if not set
        }));
    }, [columnDefs, data, columnAggFnMap]);

    // eg field, aggFunc - silver, sum
    const [_aggCols, _setAggCols] = useState<IPivotColumnDef[]>(
      serverAggCols ? serverAggCols : aggCols || []
    );

    // 🧠 Automatically filter when columnDefs or _aggCols change

    const [selectedAggFn, setSelectedAggFn] = useState<string>("sum");

    // drag and drop of the column while applying agg
    const handleAggDrop = (e: React.DragEvent) => {
      if (!enablePivot) return;

      const field = e.dataTransfer.getData("text/plain");
      if (!field) return;

      setColumnAggFnMap((prev) => ({
        ...prev,
        [field]: selectedAggFn || "sum",
      }));
    };

    const groupByField = useMemo(() => {
      return columnDefs?.columns?.find((col) => col.rowGroup)?.field;
    }, [columnDefs]);

    // set the grouped column via setter function
    useEffect(() => {
      if (setServerGroupedColsFn && groupByField) {
        setServerGroupedColsFn(groupByField);
      }
    }, [groupByField, setServerGroupedColsFn]);

    // on removing the the column from the ColumnSide bar
    useEffect(() => {
      if (!enablePivot) return;

      const fromMap = Object.entries(columnAggFnMap).map(
        ([field, aggFunc]) => ({
          field,
          aggFunc,
        })
      );

      if (fromMap.length > 0) {
        setServerAggColsFn ? setServerAggColsFn(fromMap) : _setAggCols(fromMap);
      } else if (aggCols && _aggCols.length === 0 && aggCols.length > 0) {
        setServerAggColsFn
          ? setServerAggColsFn(aggCols || [])
          : _setAggCols(aggCols || []);
      }
    }, [columnAggFnMap, enablePivot, aggCols, setServerAggColsFn]);

    const groupedPivotedData: IGroupedPivotedData[] = useMemo(() => {
      if (!enablePivot || !pivotMode) return [];

      if (groupByField && _aggCols) {
        const grouped: IGroupedPivotedData[] =
          serverPivoting && serverPivotedData
            ? (serverPivotedData as unknown as IGroupedPivotedData[])
            : (pivotAndAggregateByGroup(
                data,
                groupByField,
                pivotColumns,
                serverAggCols ? serverAggCols : _aggCols
              ) ?? []);

        if (sortDirection && grouped.length > 0) {
          return [...grouped].sort((a, b) =>
            sortDirection === "asc"
              ? (a.totalMedals ?? 0) - (b.totalMedals ?? 0)
              : (b.totalMedals ?? 0) - (a.totalMedals ?? 0)
          );
        }

        return grouped;
      }

      return [];
    }, [
      data,
      groupByField,
      pivotColumns,
      _aggCols,
      sortDirection,
      serverAggCols,
      enablePivot,
      serverPivoting,
      serverPivotedData,
    ]);

    function getPivotDataColumns(data: any[], pivotColumns: string[]) {
      if (!enablePivot) return;

      if (serverPivotDataColumns) {
        return serverPivotDataColumns;
      }

      return pivotColumns.map((key) => {
        const values = Array.from(new Set(data.map((row) => row[key])));
        return { [key]: values };
      });
    }

    // get all the unique values for the pivot columns
    const pivotDataColumns = useMemo(() => {
      return serverPivoting && serverPivotCols
        ? getPivotDataColumns(data, serverPivotCols)
        : getPivotDataColumns(data, pivotColumns);
    }, [data, serverPivotCols, pivotColumns, serverPivoting]);

    const togglePivot = useCallback(() => {
      setEnablePivot((prev) => !prev);
    }, []);

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

    // State for selected rows (nodeKey: boolean)
    const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>(
      {}
    );

    // Handler for tree row selection
    const handleTreeRowCheckboxChange = (nodeKey: string, checked: boolean) => {
      setSelectedRows((prev) => {
        let updated = { ...prev };
        // Find the node in the flattenedRows
        const node = findNodeByNodeKey(flattenedRows, nodeKey);
        if (!node) return updated;

        // Only select/deselect this node and its descendants (not the whole tree)
        const allKeys = getAllDescendantNodeKeys(
          node.row,
          nodeKey.split("/").slice(0, -1)
        );
        if (checked) {
          allKeys.forEach((key) => (updated[key] = true));
        } else {
          allKeys.forEach((key) => delete updated[key]);
        }

        // Bubble up: If all siblings are selected, select parent
        let parentKey: string | null = getParentNodeKey(nodeKey);

        while (parentKey !== null) {
          const parent = findNodeByNodeKey(flattenedRows, parentKey);
          if (parent && parent.row && parent.row.children) {
            const allChildrenKeys = parent.row.children.map((child: any) =>
              [...parentKey!.split("/"), child.name].join("/")
            );
            const allSelected = allChildrenKeys.every(
              (key: any) => updated[key]
            );
            if (allSelected && checked) {
              updated[parentKey] = true;
            } else if (!checked) {
              delete updated[parentKey];
            }
          }
          parentKey = getParentNodeKey(parentKey);
        }

        return updated;
      });
    };

    const handlePivotDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();

        if (!enablePivot) return;

        const field = e.dataTransfer.getData("columnField");

        // Find the column from the full column list
        // const col = columns.find((c) => c.field === field);

        // If pivot is not allowed on this column, exit early
        // if (!col || !col.pivot) return;

        if (field && !pivotColumns.includes(field)) {
          setPivotColumns((prev) => [...prev, field]);
        }
        if (
          serverPivotCols &&
          field &&
          !serverPivotCols.includes(field) &&
          serverPivoting &&
          setServerPivotColsFn
        ) {
          setServerPivotColsFn((prev) => [...prev, field]);
        }
      },
      [pivotColumns, serverPivotCols]
    );

    // for server-side row grouping
    useEffect(() => {
      if (isServerSide && onRowGroup) {
        onRowGroup(groupedColumns);
      }
    }, [groupedColumns, isServerSide, onRowGroup]);

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
        let cookedData: Record<string, unknown>[];

        if (treeData && treeDataChildrenField) {
          // Build the tree
          cookedData = buildTreeData(data, treeDataChildrenField, getDataPath);

          // Add aggregations ONLY if columns include them
          const requiresAggregation = propColumns?.some(
            (col) => col.field === "aggregatedCount" || col.field === "provided"
          );

          // Step 2: Add aggregations (Sum & Provided columns)

          if (requiresAggregation) {
            computeAggregationsForTree(cookedData);
          }
        } else if (isChild) {
          cookedData = data;
        } else {
          cookedData = getCookedData(data);
        }
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
    }, [data, propColumns, treeData, getDataPath, isChild, getCookedData]);

    const toggleTreeRowExpand = useCallback((nodeKey: string) => {
      setTreeExpandedRows((prev) => ({
        ...prev,
        [nodeKey]: !prev[nodeKey],
      }));
    }, []);

    // Update: Set initial expanded rows for tree data based on groupDefaultExpanded
    useEffect(() => {
      if (treeData && gridData && Array.isArray(gridData) && !treeInit) {
        let initialExpanded: Record<string, boolean> = {};

        const getNodeKey = (node: any, parentPath: string[] = []) => {
          const nodeName =
            typeof node.name === "string" ? node.name : String(node.name ?? "");
          return [...parentPath, nodeName].join("/");
        };

        const expandAll = (nodes: any[], parentPath: string[] = []) => {
          nodes.forEach((node) => {
            const nodeName =
              typeof node.name === "string"
                ? node.name
                : String(node.name ?? "");
            const nodeKey = getNodeKey(node, parentPath);
            if (node.children && node.children.length > 0) {
              initialExpanded[nodeKey] = true;
              expandAll(node.children, [...parentPath, nodeName]);
            }
          });
        };

        const expandLevels = (
          nodes: any[],
          levels: number,
          parentPath: string[] = []
        ) => {
          if (levels <= 0) return;
          nodes.forEach((node) => {
            const nodeName =
              typeof node.name === "string"
                ? node.name
                : String(node.name ?? "");
            const nodeKey = getNodeKey(node, parentPath);
            if (node.children && node.children.length > 0) {
              initialExpanded[nodeKey] = true;
              expandLevels(node.children, levels - 1, [
                ...parentPath,
                nodeName,
              ]);
            }
          });
        };

        if (groupDefaultExpanded === -1) {
          expandAll(gridData);
        } else if (groupDefaultExpanded > 0) {
          expandLevels(gridData, groupDefaultExpanded);
        }
        setTreeExpandedRows(initialExpanded);
        setTreeInit(true);
      }
    }, [treeData, gridData, groupDefaultExpanded, treeInit]);

    useEffect(() => {
      setTreeInit(false);
    }, [gridData]);

    // Update filters and trigger debounced update
    const handleFilterChange = useCallback(
      (field: string, value: string) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        debouncedSetFilters(newFilters);
      },

      [filters, debouncedSetFilters]
    );

    // for filtering on server side
    useEffect(() => {
      if (isServerSide && onFilterChange && filters) {
        // Build AG Grid-style filterModel
        const filterModel: Record<string, IFilterModelItem> = {};

        Object.entries(filters).forEach(([field, value]) => {
          if (value !== undefined && value !== "") {
            const col = columns.find((c) => c.field === field);
            filterModel[field] = {
              filterType: col?.type || "text",
              type: filterTypes[field] || "contains",
              filter: value,
            };
          }
        });

        onFilterChange(filterModel);
      }
    }, [filters]);

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
      // If server-side filtering is enabled, just return all gridData (parent will handle filtering)
      if (isServerSide) {
        return gridData;
      }

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
        if (isServerSide && onSortChange) {
          // Get current sort direction for this field from sortModel prop
          const currentSort = (typeof sortModel !== "undefined"
            ? sortModel.find((s) => s.colName === field)
            : undefined) || { sort: undefined };

          let direction: "asc" | "desc" | undefined;
          if (!currentSort.sort) {
            direction = "asc";
          } else if (currentSort.sort === "asc") {
            direction = "desc";
          } else if (currentSort.sort === "desc") {
            direction = "asc"; // Remove sort
          }

          // Remove this column from previous sorts
          const filtered =
            typeof sortModel !== "undefined"
              ? sortModel.filter((s) => s.colName !== field)
              : [];

          // If direction is undefined, just remove the sort for this column
          const newSortModel = direction
            ? [{ colName: field, sort: direction }]
            : filtered;

          onSortChange(newSortModel);
          return;
        }

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
        if (editType === "fullRow") {
          setEditingRowId(rowIndex);
          setEditingRowData((prev) => ({
            ...prev,
            [field]: value,
          }));
        } else {
          setEditingCell({ rowIndex, field });
          setEditValue(value);
        }
      },
      [editType]
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

    useEffect(() => {
      // Update detailData for all expanded rows when gridData changes
      setDetailData((prev) => {
        const updated: typeof prev = {};
        Object.keys(expandedRows).forEach((rowIndexStr) => {
          const rowIndex = Number(rowIndexStr);
          const row = gridData[rowIndex];
          if (row && row.children) {
            updated[rowIndex] = row.children as Record<string, unknown>[];
          }
        });
        return updated;
      });
    }, [gridData, expandedRows]);

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
        // If server-side grouping is enabled, notify parent and skip client grouping
        if (isServerSide && onRowGroup) {
          // Build the new groupedColumns array
          setGroupedColumns((prev) => {
            let newGrouped;
            if (grouped) {
              newGrouped = prev.includes(field) ? prev : [...prev, field];
            } else {
              newGrouped = prev.filter((f) => f !== field);
            }
            // Notify parent to fetch grouped data from server
            onRowGroup(newGrouped);
            return newGrouped;
          });
          return; // Do not do client-side grouping
        }
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
      [columns, isServerSide, onRowGroup]
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
      // If server-side grouping is enabled, always use the data as provided by the parent
      if (isServerSide && onRowGroup) {
        // Only use data if it's grouped (has isGroup), otherwise return null (no grouping)
        if (Array.isArray(data) && data.length > 0 && data[0]?.isGroup) {
          return data as GroupObject[];
        }
        // If not grouped, return null to show flat data (no grouping)
        return null;
      }

      // Otherwise, do client-side grouping
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
    }, [filteredData, groupedColumns, columns, isServerSide, data]);

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

      if (treeData && gridData && Array.isArray(gridData)) {
        // Use the flattenTree helper for tree data
        return flattenTree(gridData, treeExpandedRows, 0, { current: 0 });
      }

      const dataToRender = filteredData;

      if (!dataToRender || dataToRender.length === 0) {
        return flatList;
      }

      if (!filteredData || filteredData.length === 0) {
        return flatList;
      }

      if (groupedData && groupedData.length > 0) {
        // Handle grouped data
        const walkGroups = (
          groups: GroupObject[],
          indentLevel = 0,
          parentIndex = 0
        ) => {
          groups?.forEach((group, groupIndex) => {
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
        dataToRender.forEach((row, index) => {
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
    }, [
      filteredData,
      groupedData,
      expandedGroups,
      expandedRows,
      masterDetail,
      enablePivot,
      pivotColumns,
      treeData,
      gridData,
      expandedRows,
      treeExpandedRows,
    ]);

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

    // Add this function above your return statement in DataGrid

    const handleTreeRowDrop = useCallback(
      (draggedNodeKey: string, targetNodeKey: string) => {
        if (!rowDragManaged || !treeData) return;

        // Prevent dropping onto itself
        if (draggedNodeKey === targetNodeKey) return;

        // Prevent dropping into its own descendant
        const draggedItem = flattenedRows.find(
          (
            item
          ): item is {
            type: "data";
            nodeKey: string;
            row: Record<string, unknown>;
          } =>
            item.type === "data" &&
            "nodeKey" in item &&
            item.nodeKey === draggedNodeKey
        );

        const targetItem = flattenedRows.find(
          (
            item
          ): item is {
            type: "data";
            nodeKey: string;
            row: Record<string, unknown>;
          } =>
            item.type === "data" &&
            "nodeKey" in item &&
            item.nodeKey === targetNodeKey
        );
        if (!draggedItem || !targetItem) return;

        // Don't allow dropping into a descendant
        const descendantKeys = getAllDescendantNodeKeys(
          draggedItem.row,
          draggedNodeKey.split("/").slice(0, -1)
        );
        if (descendantKeys.includes(targetNodeKey)) return;

        // Get source and target paths
        const sourcePath = draggedNodeKey.split("/");
        const targetPath = targetNodeKey.split("/");

        // Move the node in the tree
        const newTree = moveTreeNode(gridData, sourcePath, targetPath);

        setGridData(newTree);

        // Optionally update history for undo/redo
        setHistory((prev) => ({
          past: [...prev.past, prev.present],
          present: newTree,
          future: [],
        }));

        // Call the callback if provided
        if (onRowDragEnd) {
          onRowDragEnd({
            draggedRow: draggedItem.row,
            targetRow: targetItem.row,
            newData: newTree,
          });
        }
      },
      [
        rowDragManaged,
        treeData,
        flattenedRows,
        gridData,
        setGridData,
        setHistory,
        onRowDragEnd,
      ]
    );

    // ----------------------------
    // 10) Rendering: Flattened Virtual Rows
    // ----------------------------

    // Which columns do we show? (Ignore rowGroup columns except the first if needed)

    // This guarantees that all grouped columns (in the order of groupedColumns) are
    // always at the start of your visible columns.
    const displayColumns = useMemo(() => {
      // Grouped columns first, then the rest, but hide columns with aggSourceField
      const grouped = columns.filter(
        (col) =>
          groupedColumns.includes(col.field) &&
          col.visible !== false &&
          !col.aggSourceField // hide if aggSourceField is set
      );
      const nonGrouped = columns.filter(
        (col) =>
          !groupedColumns.includes(col.field) &&
          col.visible !== false &&
          !col.aggSourceField // hide if aggSourceField is set
      );
      return [...grouped, ...nonGrouped];
    }, [columns, groupedColumns, enablePivot, pivotColumns, enablePivot]);

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

      if (col.editorType === "date" && value) {
        // Format as YYYY-MM-DD or your preferred format
        const date = new Date(value as string);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString(); // or use date-fns/format for custom format
        }
      }
      return value ? String(value) : "";
    };

    const handleTreeRowsDrop = useCallback(
      (draggedNodeKeys: string[], targetNodeKey: string) => {
        if (!rowDragManaged || !treeData) return;
        if (draggedNodeKeys.includes(targetNodeKey)) return;

        let newTree = gridData;
        draggedNodeKeys.forEach((draggedNodeKey) => {
          const draggedItem = flattenedRows.find(
            (
              item
            ): item is {
              type: "data";
              nodeKey: string;
              row: Record<string, unknown>;
            } =>
              item.type === "data" &&
              "nodeKey" in item &&
              item.nodeKey === draggedNodeKey
          );
          const targetItem = flattenedRows.find(
            (
              item
            ): item is {
              type: "data";
              nodeKey: string;
              row: Record<string, unknown>;
            } =>
              item.type === "data" &&
              "nodeKey" in item &&
              item.nodeKey === targetNodeKey
          );
          if (!draggedItem || !targetItem) return;

          const descendantKeys = getAllDescendantNodeKeys(
            draggedItem.row,
            draggedNodeKey.split("/").slice(0, -1)
          );
          if (descendantKeys.includes(targetNodeKey)) return;

          const sourcePath = draggedNodeKey.split("/");
          const targetPath = targetNodeKey.split("/");

          newTree = moveTreeNode(newTree, sourcePath, targetPath);
        });

        setGridData(newTree);

        setHistory((prev) => ({
          past: [...prev.past, prev.present],
          present: newTree,
          future: [],
        }));

        if (onRowDragEnd) {
          const draggedRowsArr = draggedNodeKeys
            .map((key) => {
              const item = flattenedRows.find(
                (item) =>
                  item.type === "data" &&
                  "nodeKey" in item &&
                  item.nodeKey === key
              );
              return item?.row;
            })
            .filter((row): row is Record<string, unknown> => !!row);

          onRowDragEnd({
            draggedRow: draggedRowsArr[0] ?? null, // required
            draggedRows: draggedRowsArr, // optional
            targetRow:
              flattenedRows.find(
                (item) =>
                  item.type === "data" &&
                  "nodeKey" in item &&
                  item.nodeKey === targetNodeKey
              )?.row ?? null,
            newData: newTree,
          });
        }
      },
      [
        rowDragManaged,
        treeData,
        flattenedRows,
        gridData,
        setGridData,
        setHistory,
        onRowDragEnd,
      ]
    );

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
                  ) : "aggFunc" in col &&
                    col.aggFunc &&
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

        const hasChildren =
          row?.children &&
          Array.isArray(row.children) &&
          row.children.length > 0;

        const isExpanded =
          rowIndex !== undefined ? expandedRows[rowIndex] : false;

        let expandButton: React.ReactNode = null;

        if (treeData && hasChildren && item.type === "data") {
          const nodeKey = (item as { nodeKey: string }).nodeKey;

          expandButton = (
            <button
              className="mr-2 focus:outline-none cursor-pointer"
              onClick={() => toggleTreeRowExpand(nodeKey)}
            >
              {treeExpandedRows[nodeKey] ? (
                <ChevronDown className="size-4 " />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </button>
          );
        } else if (
          row?.children &&
          Array.isArray(row.children) &&
          row.children.length > 0
        ) {
          expandButton = (
            <button
              className="mr-2 focus:outline-none cursor-pointer"
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

        // Full row editing logic
        const isFullRowEditing =
          editType === "fullRow" &&
          typeof onRowValueChanged === "function" &&
          typeof onCellValueChanged === "function" &&
          editingRowId === rowIndex;

        // Get the nodeKey if availble - for dragging the selected rows in TREE data
        const nodeKey =
          treeData && "nodeKey" in item && typeof item.nodeKey === "string"
            ? item.nodeKey
            : undefined;

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
              "border-b-[3px] border-indigo-200":
                item.type === "data" &&
                "nodeKey" in item &&
                dragOverRowKey === item.nodeKey,
            })}
            onClick={() =>
              onRowClick?.({
                data: row as Record<string, unknown>,
                rowIndex: rowIndex as number,
              })
            }
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragOverRowKey(null);
            }}
            onDragStart={(e) => {
              e.stopPropagation();
              e.dataTransfer.effectAllowed = "move";
              // We'll use nodeKey as the identifier
              // Only set if item is a data row and has nodeKey
              if (
                item.type === "data" &&
                "nodeKey" in item &&
                typeof item.nodeKey === "string"
              ) {
                // e.dataTransfer.setData("dragNodeKey", item.nodeKey);
                const selectedNodeKeys = Object.keys(selectedRows).filter(
                  (key) => selectedRows[key]
                );
                const dragKeys =
                  selectedNodeKeys.length > 0 &&
                  selectedNodeKeys.includes(item.nodeKey)
                    ? selectedNodeKeys
                    : [item.nodeKey];
                e.dataTransfer.setData(
                  "dragNodeKeys",
                  JSON.stringify(dragKeys)
                );
              }
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragOverRowKey(null);
              // const draggedNodeKey = e.dataTransfer.getData("dragNodeKey");
              // if (
              //   !draggedNodeKey ||
              //   !(
              //     item.type === "data" &&
              //     "nodeKey" in item &&
              //     typeof item.nodeKey === "string"
              //   ) ||
              //   draggedNodeKey === item.nodeKey
              // )
              //   return;
              // handleTreeRowDrop?.(draggedNodeKey, item.nodeKey);

              const draggedNodeKeysRaw = e.dataTransfer.getData("dragNodeKeys");
              if (
                !draggedNodeKeysRaw ||
                !(
                  item.type === "data" &&
                  "nodeKey" in item &&
                  typeof item.nodeKey === "string"
                )
              )
                return;
              const draggedNodeKeys: string[] = JSON.parse(draggedNodeKeysRaw);
              if (draggedNodeKeys.includes(item.nodeKey)) return;
              handleTreeRowsDrop?.(draggedNodeKeys, item.nodeKey);
            }}
            // make the row draggable in TREE data where we've a selected
            draggable={
              treeData && rowSelection && !!nodeKey && selectedRows[nodeKey]
            } // allow drag if selected
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();

              if (
                item.type === "data" &&
                "nodeKey" in item &&
                typeof item.nodeKey === "string"
              ) {
                setDragOverRowKey(item.nodeKey);
              }
            }}
          >
            {rowSelection && (
              <TableCell key={`checkbox-cell-${rowIndex}`} className="w-[50px]">
                <div className="w-[30px] flex justify-center items-center">
                  <Checkbox
                    // checked={
                    //   rowIndex !== undefined ? !!selectedRows[rowIndex] : false
                    // }

                    checked={
                      treeData && rowSelection.treeSelectChildren
                        ? item.type === "data" &&
                          "nodeKey" in item &&
                          !!selectedRows[item.nodeKey]
                        : rowIndex !== undefined && !!selectedRows[rowIndex]
                    }
                    // onCheckedChange={(checked: boolean) => {
                    //   handleRowCheckboxChange(rowIndex, checked);
                    // }}
                    onCheckedChange={(checked: boolean) => {
                      if (treeData && rowSelection.treeSelectChildren) {
                        if (item.type === "data" && "nodeKey" in item) {
                          handleTreeRowCheckboxChange(item.nodeKey, checked);
                        }
                      } else {
                        if (rowIndex !== undefined) {
                          handleFlatRowCheckboxChange(rowIndex, checked);
                        }
                      }
                    }}
                    onClick={(e: any) => e.stopPropagation()}
                    // onClick={(e: { stopPropagation: () => void }) => {
                    //   e.stopPropagation();
                    // }}
                    className={"border-1 border-gray-400 cursor-pointer"}
                  />
                </div>
              </TableCell>
            )}

            {displayColumns.map((col, colIndex) => {
              if (isFullRowEditing && col.editable) {
                return (
                  <TableCell key={col.field}>
                    <CellEditor
                      value={
                        (editingRowData?.[col.field] ?? row?.[col.field]) as
                          | string
                          | number
                          | boolean
                          | Date
                          | null
                      }
                      columnDef={{
                        ...col,
                        editorType: (col.editorType || "text") as EditorType,
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const updatedRow = { ...row, ...editingRowData };
                          onRowValueChanged?.({ data: updatedRow });
                          setEditingRowData({});
                          setEditingRowId(null);
                        }

                        if (e.key === "Escape") {
                          handleStopEditing();
                        }
                      }}
                      onChange={(value) => {
                        if (!col || !col.field) return;

                        setEditingRowData((prev) => ({
                          ...prev,
                          [col.field]: value,
                        }));
                        onCellValueChanged({
                          value: value,
                          field: col.field,

                          data: {
                            ...row,
                            ...editingRowData,
                            [col.field]: value,
                          },
                        });
                      }}
                    />
                  </TableCell>
                );
              }

              const cellRenderer =
                "cellRenderer" in col ? col.cellRenderer : undefined;

              const cellValue = row
                ? getCellValue(row, col.field, col)
                : undefined;

              const isEditing =
                editingCell &&
                editingCell.rowIndex === rowIndex &&
                editingCell.field === col.field;

              // Indent first column for treeData
              if (colIndex === 0 && treeData) {
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
                      className="flex items-center w-full transition-all duration-300 ease-in-out"
                      style={{ paddingLeft: `${(indent || 0) * 20}px` }}
                    >
                      {expandButton}

                      {/* Row Drag Handle */}
                      {rowDragManaged && treeData && (
                        <span
                          draggable
                          onDragStart={(e) => {
                            e.stopPropagation();
                            e.dataTransfer.effectAllowed = "move";
                            // We'll use nodeKey as the identifier
                            // Only set if item is a data row and has nodeKey
                            if (
                              item.type === "data" &&
                              "nodeKey" in item &&
                              typeof item.nodeKey === "string"
                            ) {
                              e.dataTransfer.setData(
                                "dragNodeKey",
                                item.nodeKey
                              );
                            }
                          }}
                          className="cursor-grab mr-2 px-1 py-0.5 rounded hover:bg-gray-200 active:cursor-grabbing"
                          title="Drag to move"
                          tabIndex={-1}
                          aria-label="Drag row"
                        >
                          <GripHorizontal className="size-4" />
                        </span>
                      )}
                      {/* {formatCellValue(cellValue, row || {}, col)}*/}
                      <span>
                        {formatCellValue(cellValue, row || {}, col)}
                        {showChildCount &&
                          Array.isArray(row?.children) &&
                          row.children.length > 0 && (
                            <span className="ml-2 text-xs text-gray-500">
                              ({row.children.length})
                            </span>
                          )}
                      </span>
                    </div>
                  </TableCell>
                );
              }

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

              const editorType =
                "editorType" in col ? col.editorType : undefined;

              // Option 2: Custom render for country column
              if (
                "rowGroup" in col &&
                col.rowGroup &&
                enablePivot &&
                pivotColumns.length > 0
              ) {
                // Calculate total medals for this row (sum all number fields except the grouped field)
                const totalMedals = Object.keys(row || {})
                  .filter(
                    (k) =>
                      k !== col.field &&
                      typeof row?.[k] === "number" &&
                      !isNaN(row?.[k] as number)
                  )
                  .reduce((acc, k) => acc + (Number(row?.[k]) || 0), 0);

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
                        editorType !== "checkbox" &&
                        (!("rowGroup" in col) || !col.rowGroup)
                      ) {
                        startEditing(rowIndex, col.field, String(cellValue));
                      }
                    }}
                  >
                    <div>
                      {String(row?.[col.field])} ({totalMedals})
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
                      editorType !== "checkbox" &&
                      (!("rowGroup" in col) || !col.rowGroup)
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
                  ) : isEditing && editorType !== "checkbox" ? (
                    <CellEditor
                      value={editValue}
                      columnDef={{
                        editorType: editorType || "text",
                        // editorParams: col.editorParams,
                        editorParams:
                          "editorParams" in col ? col.editorParams : undefined,
                      }}
                      onChange={(value) => handleEditChange(value, editorType)}
                      onBlur={() => {
                        // Commit changes
                        if (
                          !editingCell &&
                          editorType !== "select" &&
                          editorType !== "date" &&
                          (editorType as ColumnDef["editorType"]) !== "checkbox"
                        )
                          return;
                        const { field } = editingCell;
                        // const updatedData = col.valueSetter
                        //   ? col.valueSetter({ value: editValue })
                        //   : { [field]: editValue };

                        const updatedData =
                          "valueSetter" in col && col.valueSetter
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
                  ) : editorType === "checkbox" && col.editable ? (
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
                      {
                        // col.tooltipField
                        "tooltipField" in col && col.tooltipField ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>
                                {col.rowGroup
                                  ? ""
                                  : formatCellValue(cellValue, row || {}, col)}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="">
                              {(() => {
                                const tooltipValue = row?.[col.tooltipField];
                                const result =
                                  col.tooltipField &&
                                  tooltipValue != null &&
                                  tooltipValue !== ""
                                    ? tooltipValue
                                    : col.rowGroup
                                      ? ""
                                      : formatCellValue(
                                          cellValue,
                                          row || {},
                                          col
                                        );

                                return result != null ? String(result) : ""; // Ensure it's a valid string or ReactNode
                              })()}
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          formatCellValue(cellValue, row || {}, col)
                        )
                      }
                    </div>
                  )}
                </TableCell>
              );
            })}
            {addRowConfig && <TableCell className="w-[50px]"></TableCell>}
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
                      parentRow={item.parentRow} // <-- pass parentRow
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

        if (enablePivot && !pivotColumns.includes(field)) {
          setColumnGrouped(field, true);
        }
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
                    <div className="font-semibold ">
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

    // Handler for flat (non-tree) row selection
    const handleFlatRowCheckboxChange = (
      rowIndex: number | string,
      checked: boolean
    ) => {
      setSelectedRows((prev) => {
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
        if (treeData && rowSelection?.treeSelectChildren) {
          // Select all nodeKeys for treeData
          flattenedRows
            .filter((item) => item.type === "data")
            .forEach((item) => {
              allSelected[(item as { nodeKey: string }).nodeKey] = true;
            });
        } else {
          // Flat data: select by index
          gridData.forEach((row, idx) => {
            allSelected[idx] = true;
          });
        }
        setSelectedRows(allSelected);
      } else {
        setSelectedRows({});
      }
    };

    // Add useEffect to call onRowSelectionChange when selectedRows changes
    // Call getSelectedRows callback with selected data
    // Update the useEffect for getSelectedRows:
    useEffect(() => {
      if (rowSelection && typeof rowSelection?.getSelectedRows === "function") {
        let selectedData: any[] = [];
        if (treeData && rowSelection.treeSelectChildren) {
          selectedData = flattenedRows
            .filter(
              (
                item
              ): item is {
                type: "data";
                nodeKey: string;
                row: Record<string, unknown>;
              } =>
                item.type === "data" &&
                "nodeKey" in item &&
                !!selectedRows[(item as any).nodeKey]
            )
            .map((item) => item.row);
        } else {
          selectedData = Object.entries(selectedRows)
            .filter(([, isSelected]) => isSelected)
            .map(
              ([index]) =>
                data[+index] ||
                data.find(
                  (row: any, i: number) =>
                    row.id === index || row.documentNumber === index
                )
            );
        }
        rowSelection?.getSelectedRows(selectedData.filter(Boolean));
      }
    }, [selectedRows, flattenedRows, treeData, rowSelection, data]);

    // useEffect(() => {
    //   if (rowSelection && typeof rowSelection?.getSelectedRows === "function") {
    //     const selectedData = Object.entries(selectedRows)
    //       .filter(([, isSelected]) => isSelected)
    //       .map(([index]) => data[+index]);
    //     rowSelection?.getSelectedRows(selectedData);
    //   }
    // }, [selectedRows]);

    const [search, setSearch] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // to exit from the editing mode - full row edit mode
    const handleStopEditing = useCallback(() => {
      setEditingRowId(null);
      setEditingRowData(null);
    }, [setEditingRowId, setEditingRowData]);

    // to  start editing the second row - full row edit mode
    const handleEditSecondRow = useCallback(() => {
      const rowIndex = 1;
      // 2nd row means index 1 (0-based)

      const row = gridData[rowIndex];
      if (!row) return;
      setEditingRowId(rowIndex);
      setEditingRowData(row);
    }, [gridData, setEditingRowId, setEditingRowData]);

    // Add this above your return statement
    const aggregationStats = useMemo(() => {
      if (isServerSide) return [];

      if (!columns || !columns.length || !gridData.length) return {};
      const stats: Record<string, number> = {};

      columns.forEach((col) => {
        if (!col.aggFunc) return;
        // Only use aggSourceField if it's a string, otherwise use col.field
        const sourceField =
          typeof col.aggSourceField === "string" && col.aggSourceField
            ? col.aggSourceField
            : col.field;
        const values = gridData
          .map((row) => Number(row[sourceField]))
          .filter((v) => !isNaN(v));
        let aggValue = 0;
        switch (col.aggFunc) {
          case "sum":
            aggValue = values.reduce((acc, val) => acc + val, 0);
            break;
          case "avg":
            aggValue = values.length
              ? values.reduce((acc, val) => acc + val, 0) / values.length
              : 0;
            break;
          case "min":
            aggValue = values.length ? Math.min(...values) : 0;
            break;
          case "max":
            aggValue = values.length ? Math.max(...values) : 0;
            break;
          default:
            aggValue = 0;
        }
        stats[col.field] = aggValue;
      });

      return stats;
    }, [columns, gridData, isServerSide]);

    // Add keyboard event listener for adding a new row when we have addRowConfig CTRL + A
    useEffect(() => {
      if (!addRowConfig) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        console.log("yes");
        const isCtrlOrMeta = e.ctrlKey || e.metaKey;
        const isPlusKey = e.key === "+" || e.key === "="; // some keyboards require Shift + = for +

        if (isCtrlOrMeta && isPlusKey) {
          e.preventDefault(); // prevent browser zoom
          const initial = generateInitialRowData();
          setNewRowData(initial);
          setIsAddingRow(true);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [addRowConfig]);

    // Update the main grid container JSX
    return (
      <div className="relative w-[100%] h-full">
        {editType === "fullRow" && fullRowButtons && (
          <div className="gap-2 flex items-center mb-2">
            {[
              {
                title: "Start Editing Line 2",
                onClick: handleEditSecondRow,
                hide: gridData?.length < 2,
              },
              {
                title: "Stop Editing",
                onClick: handleStopEditing,
                hide: false,
              },
            ]
              .filter((btn) => !btn.hide)
              .map((btn) => (
                <button
                  className="border px-[12px] py-[5px] cursor-pointer text-[12px] rounded-[6px]"
                  onClick={btn.onClick}
                >
                  {btn.title}
                </button>
              ))}
          </div>
        )}
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <div className="text-center">
              <PulseLoader color="#4f46e5" size={15} />
              <p className="mt-4 text-gray-600">{loadingMessage}</p>
            </div>
          </div>
        )}
        {/* Pivot Columns  */}
        {/* Pivot panel for managing pivot columns */}
        {/* Only render if pivotMode is enabled */}
        {enablePivot && setPivotColumns && (
          <PivotPanel
            pivotColumns={
              serverPivoting && serverPivotCols ? serverPivotCols : pivotColumns
            }
            columns={columns}
            setPivotColumns={
              serverPivoting && setServerPivotColsFn
                ? setServerPivotColsFn
                : setPivotColumns
            }
            handlePivotDrop={handlePivotDrop}
          />
        )}

        {/* Grand Total Row (Top) */}
        {gridData.length > 0 && grandTotalRow === "top" && renderTotalRow()}
        <div className="flex h-[100%] max-h-[80vh] overflow-y-scroll hide-scrollbar">
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
              {/* Pivoting Start here */}
              <>
                {enablePivot &&
                  pivotDataColumns &&
                  pivotDataColumns.length !== 0 && (
                    <thead className="bg-indigo-100  w-full">
                      {(() => {
                        const pivotFields = pivotDataColumns.map(
                          (obj) => Object.keys(obj)[0]
                        );
                        const pivotValues = pivotDataColumns.map(
                          (obj) => Object.values(obj)[0]
                        );

                        const combinations = pivotValues.reduce(
                          (acc, values) =>
                            acc.flatMap((comb) =>
                              values.map((val) => [...comb, val])
                            ),
                          [[]] as any[]
                        );

                        const activeAggFields = serverPivoting
                          ? new Set(serverAggCols?.map((def) => def.field))
                          : new Set(_aggCols?.map((def) => def.field));

                        const metrics = columns.filter(
                          (col) => col.aggFunc && activeAggFields.has(col.field)
                        );

                        return (
                          <>
                            {/* Each pivot field row */}
                            {pivotFields.map((pivotField, rowIndex) => {
                              const repeatFactor =
                                pivotValues
                                  .slice(rowIndex + 1)
                                  .reduce((acc, cur) => acc * cur.length, 1) *
                                metrics.length;

                              const headerCells: React.JSX.Element[] = [];

                              let lastValue = null;

                              for (
                                let i = 0;
                                i < combinations.length * metrics.length;
                                i += repeatFactor
                              ) {
                                const comboIndex = Math.floor(
                                  i / metrics.length
                                );
                                const value =
                                  combinations[comboIndex][rowIndex];

                                if (value !== lastValue) {
                                  headerCells.push(
                                    <th
                                      key={`${pivotField}-${value}-${i}`}
                                      colSpan={repeatFactor}
                                      className="text-center border border-gray-200 bg-gray-100 px-4 py-2"
                                    >
                                      {value}
                                    </th>
                                  );
                                  lastValue = value;
                                }
                              }

                              return (
                                <tr key={`${pivotField}-${rowIndex}`}>
                                  {rowIndex === 0 &&
                                    groupedColumns.length !== 0 && (
                                      <th
                                        rowSpan={pivotFields.length + 1}
                                        onClick={toggleSortByTotalMedals}
                                        className="cursor-pointer sticky left-0 z-20 border border-gray-200 px-4 py-2 bg-gray-100 "
                                      >
                                        Group
                                        {sortDirection === "asc"
                                          ? "↑"
                                          : sortDirection === "desc"
                                            ? "↓"
                                            : ""}
                                      </th>
                                    )}
                                  {headerCells}
                                </tr>
                              );
                            })}

                            {/* Metrics row */}
                            <tr>
                              {combinations.map((combo, index) =>
                                metrics.map((metric) => (
                                  <th
                                    key={`metric-${index}-${metric.field}`}
                                    className="text-center border border-gray-200 px-4 py-2 font-normal text-sm text-gray-700"
                                  >
                                    {columnAggFnMap?.[metric.field] || "sum"}(
                                    {metric.headerName || metric.field})
                                  </th>
                                ))
                              )}
                            </tr>
                          </>
                        );
                      })()}
                    </thead>
                  )}

                {/* Pivot table data */}
                {groupedPivotedData &&
                  groupedPivotedData.length > 0 &&
                  enablePivot &&
                  pivotColumns.length > 0 &&
                  !(
                    serverPivoting &&
                    serverPivotCols &&
                    serverPivotCols.length < 1
                  ) && (
                    <TableBody>
                      {groupedPivotedData.map((group) => {
                        return (
                          <TableRow
                            key={`${group.groupKey}-${sortDirection}`}
                            className="table-row-pop"
                          >
                            {/* Group Label + Total */}

                            {groupedColumns.length !== 0 && (
                              <th className="text-center border border-gray-200 px-4 py-2 font-normal text-sm text-gray-700">
                                {group.groupKey} (
                                {group.totalMedals?.toLocaleString()})
                              </th>
                            )}

                            {/* Only render non-group/pivot columns */}
                            {group?.children?.flatMap((childRow, childIndex) =>
                              displayColumns
                                .filter((col) => {
                                  const def = columnDefs?.columns?.find(
                                    (def) => def.field === col.field
                                  );
                                  return !def?.rowGroup && !def?.pivot; // Exclude rowGroup & pivot columns
                                })
                                .filter((col) =>
                                  group?.children?.some(
                                    (row) => row[col.field] !== undefined
                                  )
                                )
                                .map((col) => {
                                  return (
                                    <th
                                      key={`${group.groupKey}-${childIndex}-${col.field}`}
                                      className="text-center border border-gray-200 px-4 py-2 font-normal text-sm text-gray-700"
                                    >
                                      {childRow[col.field]?.toLocaleString()}
                                    </th>
                                  );
                                })
                            )}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  )}
              </>
              {/* Pivoting End here */}

              <TableHeader className="sticky top-0 z-30 bg-gray-200 shadow-sm">
                <TableRow className="divide-x divide-gray-300">
                  {rowSelection && (
                    <TableHead className="w-[50px]">
                      <div className="w-[30px] flex justify-center items-center">
                        {rowSelection.mode === "multiple" && (
                          <Checkbox
                            checked={
                              treeData && rowSelection?.treeSelectChildren
                                ? flattenedRows
                                    .filter(
                                      (
                                        item
                                      ): item is {
                                        type: "data";
                                        nodeKey: string;
                                      } =>
                                        item.type === "data" &&
                                        "nodeKey" in item
                                    )
                                    .every((item) => selectedRows[item.nodeKey])
                                : Object.keys(selectedRows).length > 0 &&
                                  Object.keys(selectedRows).length ===
                                    gridData.length
                            }
                            data-indeterminate={
                              treeData && rowSelection?.treeSelectChildren
                                ? (() => {
                                    const dataRows = flattenedRows.filter(
                                      (
                                        item
                                      ): item is {
                                        type: "data";
                                        nodeKey: string;
                                      } =>
                                        item.type === "data" &&
                                        "nodeKey" in item
                                    );
                                    return (
                                      dataRows.some(
                                        (item) => selectedRows[item.nodeKey]
                                      ) &&
                                      !dataRows.every(
                                        (item) => selectedRows[item.nodeKey]
                                      )
                                    );
                                  })()
                                : Object.keys(selectedRows).length > 0 &&
                                  Object.keys(selectedRows).length <
                                    gridData.length
                            }
                            onCheckedChange={handleHeaderCheckboxChange}
                            className={
                              "border-1 border-gray-400 cursor-pointer"
                            }
                          />
                        )}
                      </div>
                    </TableHead>
                  )}

                  {/* Column/Table header */}
                  {(!enablePivot ||
                    (!serverPivoting && pivotColumns.length < 1) ||
                    (serverPivoting && !serverPivotCols?.length)) &&
                    displayColumns.map((col, ind) => {
                      const isDragged = draggedColumn === col.field;
                      const isDragOver = dragOverColumn === col.field;

                      return (
                        <TableHead
                          key={`${col.field}-${ind}`}
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
                                  {
                                    // col.headerTooltip &&
                                    "headerTooltip" in col &&
                                      col.headerTooltip && (
                                        <TooltipContent className={""}>
                                          {col.headerTooltip}
                                        </TooltipContent>
                                      )
                                  }
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
                              {
                                // col.showFilter !== false &&
                                "showFilter" in col &&
                                  col.showFilter !== false && (
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
                                              handleFilterChange(
                                                col.field,
                                                value
                                              )
                                            }
                                            onFilterTypeChange={(type) =>
                                              handleFilterTypeChange(
                                                col.field,
                                                type
                                              )
                                            }
                                            onClear={() =>
                                              handleFilterChange(col.field, "")
                                            }
                                          />
                                        </PopoverContent>
                                      </Popover>
                                    </div>
                                  )
                              }
                            </div>
                          </div>
                        </TableHead>
                      );
                    })}
                  {addRowConfig && (
                    <TableHead
                      className="w-[50px]"
                      style={{
                        paddingLeft: "12px",
                        paddingTop: "6px",
                      }}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="cursor-pointer text-white text-lg hover:bg-[#d3d3d3] transition rounded-md"
                            style={{
                              color: "#a0a2a4",
                            }}
                            onClick={() => {
                              const initial = generateInitialRowData();
                              setNewRowData(initial);
                              setIsAddingRow(true); // explicitly here instead
                            }}
                          >
                            <Plus strokeWidth={1.5} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="">+ Add Row</TooltipContent>
                      </Tooltip>
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>

              {/* Adding new row in the table start here */}
              <TableBody>
                {newRowData && isAddingRow && (
                  <TableRow className="bg-yellow-50">
                    {rowSelection && (
                      <TableCell className="w-[50px]">
                        <div className="w-[30px] flex justify-center items-center"></div>
                      </TableCell>
                    )}
                    {displayColumns.map((col) => (
                      <TableCell
                        key={`new-${col.field}`}
                        className="border-2 py-1"
                      >
                        <CellEditor
                          columnDef={{
                            editorType: (col.editorType ||
                              "text") as EditorType, // Default to "text"

                            editorParams: col.editorParams,
                          }}
                          value={
                            newRowData[col.field] as
                              | string
                              | number
                              | boolean
                              | Date
                              | null
                          }
                          onChange={(val) =>
                            setNewRowData((prev) => ({
                              ...prev,
                              [col.field]: val,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const isValid = displayColumns
                                .filter((c) => !!c.editorType)
                                .every((col) => {
                                  const value = newRowData[col.field];
                                  return (
                                    value !== null &&
                                    value !== undefined &&
                                    value !== ""
                                  );
                                });

                              if (isValid) {
                                addRowConfig?.onAdd?.(newRowData, parentRow);
                                setNewRowData({});
                                setIsAddingRow(false);
                              } else {
                                // Optional: show error UI

                                alert(
                                  "Please fill all required fields before saving."
                                );
                                console.warn(
                                  "Please fill all required fields before saving."
                                );
                              }
                            }

                            if (e.key === "Escape") {
                              setNewRowData({});
                              setIsAddingRow(false);
                            }
                          }}
                        />
                      </TableCell>
                    ))}
                    {addRowConfig && (
                      <TableCell className="flex justify-center items-center">
                        <button
                          className="cursor-pointer text-white text-lg transition rounded-md"
                          style={{
                            color: "red",
                          }}
                          onClick={() => {
                            setNewRowData({});
                            setIsAddingRow(false);
                          }}
                        >
                          <SquareX strokeWidth={1.5} />
                        </button>
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
              {/* Adding new row in the table end here */}

              {(!enablePivot ||
                (!serverPivoting && pivotColumns.length < 1) ||
                (serverPivoting && !serverPivotCols?.length)) && (
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
              )}
            </Table>
          </div>

          {showGroupByPanel && (
            <div
              style={{
                width: "auto",
                display: "flex",
              }}
            >
              {/* Right Sidebar (inside table view) Search, Columns List and grouping */}

              {sidebarOpen && (
                <ColumnSidebar
                  columns={columns}
                  setColumns={setColumns}
                  search={search}
                  setSearch={setSearch}
                  showGroupByPanel={showGroupByPanel}
                  groupedColumns={groupedColumns}
                  setColumnGrouped={setColumnGrouped}
                  handleGroupDrop={handleGroupDrop}
                  togglePivot={togglePivot}
                  enablePivot={enablePivot}
                  setPivotColumns={
                    serverPivoting && setServerPivotColsFn
                      ? setServerPivotColsFn
                      : setPivotColumns
                  }
                  pivotColumns={
                    serverPivoting && serverPivotCols
                      ? serverPivotCols
                      : pivotColumns
                  }
                  selectedAggFn={selectedAggFn}
                  columnAggFnMap={columnAggFnMap}
                  setColumnAggFnMap={setColumnAggFnMap}
                  handleAggDrop={handleAggDrop}
                  setAggCols={_setAggCols}
                  pivotMode={pivotMode}
                />
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

        {/* For server side pagination */}
        {isServerSide && pagination && data?.length && (
          <ServerPagination data={data} paginationProps={pagination} />
        )}

        {/* For server side aggregation stats */}
        {isServerSide &&
          aggregationStats &&
          Object.keys(aggregationStats).length > 0 && (
            <>
              <h2 className="my-2 italic">Aggregation Stats:</h2>

              <ul className="flex gap-4 items-center flex-wrap mb-2">
                {columns
                  .filter((col) => !!col.aggFunc)
                  .map((col) => (
                    <li key={col.field}>
                      {col.headerName}:{" "}
                      <span className="font-bold">
                        {(aggregationStats as Record<string, number>)[
                          col.field
                        ]?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </li>
                  ))}
              </ul>
            </>
          )}
      </div>
    );
  }
);

DataGrid.displayName = "DataGrid";

export default DataGrid;
