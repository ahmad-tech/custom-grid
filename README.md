# CIS Grid Tool

A powerful and flexible data grid component for React applications with support for sorting, filtering, pagination, grouping, pivoting, editing, and more.

## Features

- Client-side and server-side data handling
- Column customization with various data types
- Sorting and filtering
- Pagination with configurable page sizes
- Row grouping and aggregation
- Master-detail views
- Row selection (single/multiple)
- Custom cell rendering and tooltips
- Loading states
- **Pivoting** - Transform data into pivot tables
- **Server-side pivoting** - Handle pivot operations on the server
- **Inline editing** - Cell and full-row editing modes
- **Add row functionality** - Inline row addition
- **Custom aggregation functions** - Define your own aggregation logic

## Installation

```bash
npm install @cis/grid-tool
# or
yarn add @cis/grid-tool
```

## Usage

```tsx
import { DataGrid } from '@cis/grid-tool';

const MyGrid = () => {
  const columnDefs = {
    columns: [
      {
        field: 'name',
        headerName: 'Name',
        type: 'text',
        editable: true,
        showFilter: true
      },
      {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        editable: true,
        aggFunc: 'sum'
      },
      {
        field: 'date',
        headerName: 'Date',
        type: 'date',
        editable: true,
        editorType: 'date'
      }
    ]
  };

  return (
    <DataGrid
      data={myData}
      columnDefs={columnDefs}
      rowModelType="clientSide"
      editType="cell"
      onCellValueChanged={({ data, field, value }) => {
        console.log('Cell changed:', field, value, data);
      }}
      pagination={{
        paginationInfo: {
          page: 1,
          pageSize: 10,
          totalCount: 100,
          totalPages: 10
        },
        paginationPageSize: 10,
        paginationPageSizeSelector: [10, 20, 50],
        onPageChange: (page) => console.log('Page changed:', page),
        onPageSizeChange: (pageSize) => console.log('Page size changed:', pageSize)
      }}
      rowSelection={{
        mode: 'multiple',
        getSelectedRows: (selectedRows) => console.log('Selected:', selectedRows)
      }}
    />
  );
};
```

## Configuration

### Column Definition

Columns can be configured with the following properties:

```typescript
interface ColumnDef {
  field: string;              // Field name in the data
  headerName: string;         // Column header text
  type?: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'time' | 'dateTime';
  editable?: boolean;         // Whether the cell is editable
  width?: number;             // Column width
  visible?: boolean;          // Column visibility
  rowGroup?: boolean;         // Enable row grouping
  aggFunc?: string;           // Aggregation function
  valueGetter?: (params: {    // Custom value getter
    data: Record<string, unknown>;
    cookedRow?: Record<string, unknown>;
    parentData?: Record<string, unknown>;
  }) => unknown;
  tooltipValueGetter?: (params: Record<string, unknown>) => string;
  valueSetter?: (params: { value: string }) => Record<string, unknown>;
  valueFormatter?: (params: {  // Custom value formatter
    value: unknown;
    data: Record<string, unknown>;
  }) => string;
  showFilter?: boolean;       // Show filter for this column
  editorType?: 'text' | 'number' | 'date' | 'checkbox' | 'select' | 'time' | 'dateTime';
  editorParams?: Record<string, unknown>;  // Parameters for the editor
  valueParser?: (params: { value: string }) => unknown;
  headerTooltip?: string;     // Tooltip for the header
  tooltipField?: string;      // Field to use for cell tooltip
  cellRenderer?: unknown;     // Custom cell renderer
  aggSourceField?: string | unknown;  // Source field for aggregation
  aggSourceFields?: [string, string] | any;  // Multiple source fields
  pivot?: boolean;            // Whether the column is used for pivoting
}
```

### Grid Properties

The grid component accepts the following props:

```typescript
interface DataGridProps {
  // Data and Column Configuration
  data?: Record<string, unknown>[];
  pivotedData?: Record<string, unknown>[];
  columnDefs: ColumnDefProps;
  rowModelType?: 'clientSide' | 'serverSide';
  isChild?: boolean;
  
  // Sorting
  sortModel?: SortModelType;
  onSortChange?: (sortModel: SortModelType) => void;
  
  // Filtering
  onFilterChange?: (filterModel: IFilterModel) => void;
  
  // Pagination
  pagination?: IPagination;
  
  // Row Selection
  rowSelection?: RowSelection;
  
  // Master-Detail
  masterDetail?: boolean;
  detailGridOptions?: ColumnDefProps;
  getDetailRowData?: (params: {
    data: Record<string, unknown>;
    successCallback: (data: Record<string, unknown>[]) => void;
  }) => void;
  
  // Grouping and Aggregation
  aggFuncs?: {
    [key: string]: (params: { values: unknown[] }) => unknown;
  };
  grandTotalRow?: 'top' | 'bottom' | 'none';
  showGroupByPanel?: boolean;
  onRowGroup?: (groupItem: string[]) => void;
  
  // Pivoting
  pivotMode?: boolean;
  serverPivoting?: IServerSidePivoting;
  
  // Editing
  editType?: 'fullRow' | 'cell';
  onRowValueChanged?: (params: { data: Record<string, unknown> }) => void;
  onCellValueChanged?: (params: {
    data: Record<string, unknown>;
    field: string;
    value: unknown;
  }) => void;
  fullRowButtons?: boolean;
  
  // Add Row Configuration
  addRowConfig?: AddRowConfig;
  
  // Events
  onDataChange?: (
    newRecord: Record<string, unknown>,
    previousRecord: Record<string, unknown>,
    field: string
  ) => void;
  onRowClick?: (params: {
    data: Record<string, unknown>;
    rowIndex: number;
  }) => void;
  
  // Loading State
  loading?: boolean;
  loadingMessage?: string;
}
```

### Row Selection

Configure row selection with:

```typescript
interface RowSelection {
  mode: 'single' | 'multiple';
  getSelectedRows?: (data: Record<string, unknown>[]) => void;
}
```

### Pagination

Configure pagination with the following options:

```typescript
interface IPagination {
  paginationInfo: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  paginationPageSize: number;
  paginationPageSizeSelector: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}
```

### Filtering

Filters can be configured with:

```typescript
interface IFilterModel {
  [field: string]: {
    filterType: string;  // 'text', 'number', etc.
    type: string;       // 'contains', 'equals', etc.
    filter: string | number | boolean | Date;
  };
}
```

### Sorting

Sort configuration:

```typescript
interface ISortModelItem {
  colName: string;
  sort: 'asc' | 'desc';
}
```

### Server-Side Pivoting

For server-side pivot operations:

```typescript
interface IServerSidePivoting {
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

interface IAggCol {
  field: string;
  aggFunc: string;
}
```

### Add Row Configuration

Configure inline row addition:

```typescript
interface AddRowConfig {
  onAdd?: (newRow: Record<string, unknown>) => void;
}
```

### Group Objects

For grouped data:

```typescript
interface GroupObject {
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
```

## Advanced Features

### Pivoting

Enable pivot mode to transform your data into pivot tables:

```tsx
<DataGrid
  data={myData}
  columnDefs={columnDefs}
  pivotMode={true}
  serverPivoting={{
    serverPivotedData: pivotedData,
    serverPivotDataColumns: pivotColumns,
    serverPivotCols: ['category', 'region'],
    serverAggCols: [{ field: 'sales', aggFunc: 'sum' }],
    // ... other pivot configuration
  }}
/>
```

### Editing

Configure editing behavior:

```tsx
<DataGrid
  data={myData}
  columnDefs={columnDefs}
  editType="cell" // or "fullRow"
  onCellValueChanged={({ data, field, value }) => {
    // Handle cell value changes
  }}
  onRowValueChanged={({ data }) => {
    // Handle full row changes
  }}
  fullRowButtons={true}
/>
```

### Custom Aggregation Functions

Define custom aggregation functions:

```tsx
const customAggFuncs = {
  customSum: ({ values }) => values.reduce((sum, val) => sum + (val || 0), 0),
  customAvg: ({ values }) => {
    const validValues = values.filter(v => v != null);
    return validValues.length > 0 ? validValues.reduce((sum, val) => sum + val, 0) / validValues.length : 0;
  }
};

<DataGrid
  data={myData}
  columnDefs={columnDefs}
  aggFuncs={customAggFuncs}
/>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
