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
}
export interface RowSelection {
  mode: "single" | "multiple";
  getSelectedRows?: (data: Record<string, unknown>[]) => void;
}

export interface DataGridProps {
  isChild?: boolean;
  data?: Record<string, unknown>[];
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
