# CIS Grid Tool

A powerful and flexible data grid component for React applications with support for sorting, filtering, pagination, grouping, and more.

## Features

- Client-side and server-side data handling
- Column customization
- Sorting and filtering
- Pagination
- Row grouping and aggregation
- Master-detail views
- Row selection
- Custom cell rendering
- Tooltips
- Loading states

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
        editable: true
      },
      // ... more columns
    ]
  };

  return (
    <DataGrid
      data={myData}
      columnDefs={columnDefs}
      rowModelType="clientSide"
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
  showFilter?: boolean;       // Show filter for this column
  editorType?: 'text' | 'number' | 'date' | 'checkbox' | 'select' | 'time' | 'dateTime';
  editorParams?: Record<string, unknown>;  // Parameters for the editor
  headerTooltip?: string;     // Tooltip for the header
  tooltipField?: string;      // Field to use for cell tooltip
  cellRenderer?: unknown;     // Custom cell renderer
}
```

### Grid Properties

The grid component accepts the following props:

```typescript
interface DataGridProps {
  // Data and Column Configuration
  data?: Record<string, unknown>[];
  columnDefs: ColumnDefProps;
  rowModelType?: 'clientSide' | 'serverSide';
  
  // Sorting
  sortModel?: SortModelType;
  onSortChange?: (sortModel: SortModelType) => void;
  
  // Filtering
  onFilterChange?: (filterModel: IFilterModel) => void;
  
  // Pagination
  pagination?: IPagination;
  
  // Row Selection
  rowSelection?: {
    mode: 'single' | 'multiple';
    getSelectedRows?: (data: Record<string, unknown>[]) => void;
  };
  
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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
