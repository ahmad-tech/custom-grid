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
export interface RowSelection {
  mode: "single" | "multiple";
  getSelectedRows?: (data: Record<string, unknown>[]) => void;
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
   * Receives the full row object as argument.
   */
  onAdd?: (newRow: Record<string, unknown>) => void;
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
  rowSelection?: RowSelection;

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

  // Configuration for adding a new row inline.

  addRowConfig?: AddRowConfig;

  // for full row editing
  editType?: "fullRow" | "cell";
  onRowValueChanged?: (params: { data: Record<string, unknown> }) => void;
  onCellValueChanged?: (params: {
    data: Record<string, unknown>;
    field: string;
    value: unknown;
  }) => void;
  fullRowButtons?: boolean;
}

export interface ColumnDefProps {
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
