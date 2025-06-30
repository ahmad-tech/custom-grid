import React from "react";
export interface GroupObject {
  field: string;
  value: unknown;
  key: string;
  level: number;
  children: Record<string, unknown>[];
  isGroup: boolean;
  originalChildren?: Record<string, unknown>[];
  aggregations: Record<string, unknown>;
  [key: string]: unknown;
}

export interface ColumnDef {
  field: string;
  headerName: string;
  type?:
    | "text"
    | "number"
    | "date"
    | "boolean"
    | "select"
    | "time"
    | "dateTime";
  editable?: boolean;
  width?: number;
  visible?: boolean;
  rowGroup?: boolean;
  aggFunc?: string;
  valueGetter?: (params: {
    data: Record<string, unknown>;
    cookedRow?: Record<string, unknown>;
    parentData?: Record<string, unknown>;
  }) => unknown;
  tooltipValueGetter?: (params: Record<string, unknown>) => string;
  valueSetter?: (params: { value: string }) => Record<string, unknown>;
  valueFormatter?: (params: {
    value: unknown;
    data: Record<string, unknown>;
  }) => string;
  showFilter?: boolean;
  editorType?:
    | "text"
    | "number"
    | "date"
    | "checkbox"
    | "select"
    | "time"
    | "dateTime";
  editorParams?: Record<string, unknown>;
  valueParser?: (params: { value: string }) => unknown;
  headerTooltip?: string;
  tooltipField?: string;
  cellRenderer?: unknown;
  aggSourceField?: string | unknown;
  aggSourceFields?: [string, string] | any;
  pivot?: boolean; // whether the column is used for pivoting
}
export interface IRowSelection {
  mode: "single" | "multiple";
  getSelectedRows?: (data: Record<string, unknown>[]) => void;
  treeSelectChildren?: boolean; // NEW: select all children when parent is selected (treeData only)
}

// for filtering
export interface IFilterModelItem {
  filterType: string; // datatype -  e.g. 'text', 'number', etc.
  type: string; // e.g. 'contains', 'equals', etc.
  filter: string | number | boolean | Date; // value to filter by
}

export interface IFilterModel {
  [field: string]: IFilterModelItem;
}

type RowModelType = "clientSide" | "serverSide";

// for sorting
export interface ISortModelItem {
  colName: string;
  sort: "asc" | "desc";
}

export interface IPaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface IPagination {
  paginationInfo: IPaginationProps;
  paginationPageSize: number; // number of rows per page
  paginationPageSizeSelector: number[]; // allows the user to select the page size from a predefined list of page sizes
  onPageChange: (page: number) => void; // callback when the page changes
  onPageSizeChange: (pageSize: number) => void; // callback when the page size changes
}
export type SortModelType = ISortModelItem[];

export type PivotColumnValuesType = {
  [field: string]: Array<string | number>;
};

export type IPivotDataColumns = PivotColumnValuesType[];

type SetStateFnType<T> = (value: T | ((prev: T) => T)) => void;

export interface IAggCol {
  field: string;
  aggFunc: string;
}
export interface IServerSidePivoting {
  serverPivotedData: Record<string, unknown>[];
  serverPivotDataColumns: IPivotDataColumns;

  // like game, year
  serverPivotCols: string[];
  serverAggCols: IAggCol[];

  serverGroupedCol: string;
  setServerGroupedCols: React.Dispatch<React.SetStateAction<string>>;

  // Callback setters
  setServerPivotColsFn: React.Dispatch<React.SetStateAction<string[]>>;
  setServerAggColsFn: (aggCols: IAggCol[]) => void;
  setServerPivotDataColumns: SetStateFnType<IPivotDataColumns>;
}

export interface AddRowConfig {
  /**
   * Callback triggered when a new row is added via the grid UI.
   * Receives the full row object as the first argument,
   * and optionally the parent id or parent row as the second argument.
   */
  onAdd?: (
    newRow: Record<string, unknown>,
    parentId?: string | number | null
    // Or, if you want to pass the full parent row:
    // parentRow?: Record<string, unknown> | null
  ) => void;
}

export interface DataGridProps {
  sortModel?: SortModelType; // sorting model, default is 'asc'
  rowModelType?: RowModelType; // type of row model, default is 'clientSide'

  isChild?: boolean;
  data?: Record<string, unknown>[];
  pivotedData?: Record<string, unknown>[];

  columnDefs: ColumnDefProps;
  onDataChange?: (
    newRecord: Record<string, unknown>,
    previousRecord: Record<string, unknown>,
    field: string
  ) => void;
  loading?: boolean;
  loadingMessage?: string;
  masterDetail?: boolean;
  detailGridOptions?: ColumnDefProps;
  getDetailRowData?: (params: {
    data: Record<string, unknown>;
    successCallback: (data: Record<string, unknown>[]) => void;
  }) => void;
  aggFuncs?: {
    [key: string]: (params: { values: unknown[] }) => unknown;
  };
  grandTotalRow?: "top" | "bottom" | "none";
  showGroupByPanel?: boolean;
  onRowClick?: (params: {
    data: Record<string, unknown>;
    rowIndex: number;
  }) => void;
  rowSelection?: IRowSelection;

  // for sorting
  onSortChange?: (sortModel: SortModelType) => void;

  // for filtering
  onFilterChange?: (filterModel: IFilterModel) => void;

  // props for pagination
  pagination?: IPagination;

  // for row grouping
  onRowGroup?: (groupItem: string[]) => void;

  // for pivoting
  pivotMode?: boolean;

  serverPivoting?: IServerSidePivoting;

  // for full row editing
  editType?: "fullRow" | "cell";
  onRowValueChanged?: (params: { data: Record<string, unknown> }) => void;
  onCellValueChanged?: (params: {
    data: Record<string, unknown>;
    field: string;
    value: unknown;
  }) => void;
  fullRowButtons?: boolean;

  // for TREE Data
  treeData?: boolean;
  groupDefaultExpanded?: number; // -1 = all expanded, 0 = none, 1 = first, etc.
  getDataPath?: (data: Record<string, unknown>) => string[];
  treeDataChildrenField?: TreeDataChildrenFieldType; // don't format the data if it's true as the data will be in the children like structure

  /**
   * If true, enables row dragging for tree data.
   * Should be set on the column definition as well.
   */
  rowDragManaged?: boolean;

  showChildCount?: boolean; //to show the number of children in the row

  /**
   * Callback fired when a row drag ends.
   * Receives an object with the dragged row, target row, and the new data array.
   */
  onRowDragEnd?: (params: {
    draggedRow: Record<string, unknown>;
    targetRow: Record<string, unknown> | null;
    newData: Record<string, unknown>[];
    draggedRows?: Record<string, unknown>[];
  }) => void;

  parentRow?: any;
}

export type TreeDataChildrenFieldType = "children" | "path" | "parentId";

export interface ColumnDefProps {
  // Configuration for adding a new row inline.
  addRowConfig?: AddRowConfig;
  tableLayout?: "fixed" | "auto";
  columns?: ColumnDef[];
  masterDetail?: boolean;
  detailGridOptions?: ColumnDefProps;
  getDetailRowData?: (params: {
    data: Record<string, unknown>;
    successCallback: (data: Record<string, unknown>[]) => void;
  }) => void;
  aggFuncs?: {
    [key: string]: (params: { values: unknown[] }) => unknown;
  };
  grandTotalRow?: "top" | "bottom" | "none";
}
