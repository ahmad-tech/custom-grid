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
    type?: "text" | "number" | "date" | "boolean" | "select" | "time" | "dateTime";
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
    valueSetter?: (params: {
        value: string;
    }) => Record<string, unknown>;
    valueFormatter?: (params: {
        value: unknown;
        data: Record<string, unknown>;
    }) => string;
    showFilter?: boolean;
    editorType?: "text" | "number" | "date" | "checkbox" | "select" | "time" | "dateTime";
    editorParams?: Record<string, unknown>;
    valueParser?: (params: {
        value: string;
    }) => unknown;
    headerTooltip?: string;
    tooltipField?: string;
    cellRenderer?: unknown;
    aggSourceField?: string | unknown;
    aggSourceFields?: [string, string] | any;
    pivot?: boolean;
}
export interface RowSelection {
    mode: "single" | "multiple";
    getSelectedRows?: (data: Record<string, unknown>[]) => void;
}
export interface IFilterModelItem {
    filterType: string;
    type: string;
    filter: string | number | boolean | Date;
}
export interface IFilterModel {
    [field: string]: IFilterModelItem;
}
type RowModelType = "clientSide" | "serverSide";
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
    paginationPageSize: number;
    paginationPageSizeSelector: number[];
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
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
    serverPivotCols: string[];
    serverAggCols: IAggCol[];
    serverGroupedCol: string;
    setServerGroupedCols: React.Dispatch<React.SetStateAction<string>>;
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
    sortModel?: SortModelType;
    rowModelType?: RowModelType;
    isChild?: boolean;
    data?: Record<string, unknown>[];
    pivotedData?: Record<string, unknown>[];
    columnDefs: ColumnDefProps;
    onDataChange?: (newRecord: Record<string, unknown>, previousRecord: Record<string, unknown>, field: string) => void;
    loading?: boolean;
    loadingMessage?: string;
    masterDetail?: boolean;
    detailGridOptions?: ColumnDefProps;
    getDetailRowData?: (params: {
        data: Record<string, unknown>;
        successCallback: (data: Record<string, unknown>[]) => void;
    }) => void;
    aggFuncs?: {
        [key: string]: (params: {
            values: unknown[];
        }) => unknown;
    };
    grandTotalRow?: "top" | "bottom" | "none";
    showGroupByPanel?: boolean;
    onRowClick?: (params: {
        data: Record<string, unknown>;
        rowIndex: number;
    }) => void;
    rowSelection?: RowSelection;
    onSortChange?: (sortModel: SortModelType) => void;
    onFilterChange?: (filterModel: IFilterModel) => void;
    pagination?: IPagination;
    onRowGroup?: (groupItem: string[]) => void;
    pivotMode?: boolean;
    serverPivoting?: IServerSidePivoting;
    addRowConfig?: AddRowConfig;
    editType?: "fullRow" | "cell";
    onRowValueChanged?: (params: {
        data: Record<string, unknown>;
    }) => void;
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
        [key: string]: (params: {
            values: unknown[];
        }) => unknown;
    };
    grandTotalRow?: "top" | "bottom" | "none";
}
export {};
//# sourceMappingURL=grid.d.ts.map