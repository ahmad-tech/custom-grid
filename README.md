# CIS Grid Tool

A powerful and flexible data grid component for React applications with support for sorting, filtering, pagination, grouping, pivoting, editing, tree data, row dragging, and more.

## Features

- **Client-side and server-side data handling** - Choose between client-side or server-side row models
- **Column customization** - Various data types (text, number, date, boolean, select, time, dateTime)
- **Advanced editing** - Cell-level and full-row editing with custom editors
- **Sorting and filtering** - Multi-column sorting and advanced filtering capabilities
- **Pagination** - Configurable page sizes with server-side pagination support
- **Row grouping and aggregation** - Group data and apply aggregation functions
- **Master-detail views** - Expandable rows with nested grid data
- **Row selection** - Single and multiple row selection with tree selection support
- **Custom cell rendering** - Custom cell renderers, tooltips, and value formatters
- **Loading states** - Built-in loading indicators with custom messages
- **Pivoting** - Transform data into pivot tables with server-side pivot support
- **Tree data support** - Hierarchical data display with expandable nodes
- **Row dragging** - Drag and drop rows for reordering (tree data)
- **Inline row addition** - Add new rows directly in the grid
- **Custom aggregation functions** - Define your own aggregation logic
- **Value getters and setters** - Custom data transformation and editing
- **Grand total rows** - Display totals at top, bottom, or none
- **Group by panel** - Interactive grouping interface
- **Data export** - Excel and CSV export functionality
- **Enhanced editing events** - Parent-child context in edit callbacks

## Installation

```bash
npm install grid-tool-internal
# or
yarn add grid-tool-internal
# or
pnpm add grid-tool-internal
```

## CSS Import

After installation, you need to import the CSS file to apply the grid styles:

```js
import 'grid-tool-internal/dist/grid-tool.css';
```

## Usage

### Basic Grid

```tsx
import { DataGrid } from 'grid-tool-internal';
import 'grid-tool-internal/dist/grid-tool.css';

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

### Tree Data Grid

```tsx
import { DataGrid } from 'grid-tool-internal';
import 'grid-tool-internal/dist/grid-tool.css';

const TreeDataGrid = () => {
  const columnDefs = {
    columns: [
      {
        field: 'name',
        headerName: 'Name',
        type: 'text',
        editable: true
      },
      {
        field: 'size',
        headerName: 'Size',
        type: 'number',
        aggFunc: 'sum'
      }
    ]
  };

  return (
    <DataGrid
      data={treeData}
      columnDefs={columnDefs}
      treeData={true}
      groupDefaultExpanded={1}
      getDataPath={(data) => data.path}
      treeDataChildrenField="children"
      rowDragManaged={true}
      showChildCount={true}
      onRowDragEnd={({ draggedRow, targetRow, newData }) => {
        console.log('Row dragged:', { draggedRow, targetRow, newData });
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
  rowSelection?: IRowSelection;
  
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
  
  // Tree Data
  treeData?: boolean;
  groupDefaultExpanded?: number; // -1 = all expanded, 0 = none, 1 = first, etc.
  getDataPath?: (data: Record<string, unknown>) => string[];
  treeDataChildrenField?: 'children' | 'path' | 'parentId';
  rowDragManaged?: boolean;
  showChildCount?: boolean;
  onRowDragEnd?: (params: {
    draggedRow: Record<string, unknown>;
    targetRow: Record<string, unknown> | null;
    newData: Record<string, unknown>[];
    draggedRows?: Record<string, unknown>[];
  }) => void;
  
  parentRow?: any;
  
  // Export options
  suppressExcelExport?: boolean;
  csvFileName?: string;
  
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

Configure row selection with tree selection support:

```typescript
interface IRowSelection {
  mode: 'single' | 'multiple';
  getSelectedRows?: (data: Record<string, unknown>[]) => void;
  treeSelectChildren?: boolean; // Select all children when parent is selected (treeData only)
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

Configure inline row addition with parent support:

```typescript
interface AddRowConfig {
  /**
   * Callback triggered when a new row is added via the grid UI.
   * Receives the full row object as the first argument,
   * and optionally the parent id or parent row as the second argument.
   */
  onAdd?: (
    newRow: Record<string, unknown>,
    parentId?: string | number | null
  ) => void;
}
```

### Full Row Edit Configuration

Configure full row editing with enhanced event handling:

```typescript
interface IFullRowEditConfig {
  editType: "fullRow" | "cell";
  
  /**
   * Callback fired when a row (parent or child) is edited and saved.
   * If editing a child row, `parentId` will be provided to identify the parent row.
   */
  onRowValueChanged: (params: RowValueChangedEventType) => void;
  onCellValueChanged: (params: CellValueChangedEventType) => void;
}

/**
 * Event type for row value changes in the grid.
 */
type RowValueChangedEventType = {
  data: Record<string, unknown>;
  parentId?: string;
};

/**
 * Event type for cell value changes in the grid.
 */
type CellValueChangedEventType = {
  data: Record<string, unknown>;
  field: string;
  value: unknown;
};
```

### Column Definition Properties

Configure the overall column definitions and grid behavior:

```typescript
interface ColumnDefProps {
  // Configuration for adding a new row inline
  addRowConfig?: AddRowConfig;
  
  // Configuration for editing full row
  fullRowEditConfig?: IFullRowEditConfig;
  
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

### Tree Data

Enable hierarchical data display:

```tsx
import { DataGrid } from 'grid-tool-internal';
import 'grid-tool-internal/dist/grid-tool.css';

<DataGrid
  data={treeData}
  columnDefs={columnDefs}
  treeData={true}
  groupDefaultExpanded={1}
  getDataPath={(data) => data.path}
  treeDataChildrenField="children"
  rowDragManaged={true}
  showChildCount={true}
  onRowDragEnd={({ draggedRow, targetRow, newData }) => {
    // Handle row drag end
  }}
/>
```

### Pivoting

Enable pivot mode to transform your data into pivot tables:

```tsx
import { DataGrid } from 'grid-tool-internal';
import 'grid-tool-internal/dist/grid-tool.css';

<DataGrid
  data={myData}
  columnDefs={columnDefs}
  pivotMode={true}
  serverPivoting={{
    serverPivotedData: pivotedData,
    serverPivotDataColumns: pivotColumns,
    serverPivotCols: ['category', 'region'],
    serverAggCols: [{ field: 'sales', aggFunc: 'sum' }],
    serverGroupedCol: 'product',
    setServerGroupedCols: setGroupedCol,
    setServerPivotColsFn: setPivotCols,
    setServerAggColsFn: setAggCols,
    setServerPivotDataColumns: setPivotColumns
  }}
/>
```

### Editing

Configure editing behavior with enhanced full row editing support:

```tsx
import { DataGrid } from 'grid-tool-internal';
import 'grid-tool-internal/dist/grid-tool.css';

const columnDefs = {
  columns: [
    {
      field: 'name',
      headerName: 'Name',
      type: 'text',
      editable: true
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      editable: true
    }
  ],
  fullRowEditConfig: {
    editType: 'fullRow', // or 'cell'
    onRowValueChanged: ({ data, parentId }) => {
      // Handle full row changes with parent context
      console.log('Row changed:', data, 'Parent ID:', parentId);
    },
    onCellValueChanged: ({ data, field, value }) => {
      // Handle individual cell changes
      console.log('Cell changed:', field, value, data);
    }
  }
};

<DataGrid
  data={myData}
  columnDefs={columnDefs}
/>
```

### Custom Aggregation Functions

Define custom aggregation functions:

```tsx
import { DataGrid } from 'grid-tool-internal';
import 'grid-tool-internal/dist/grid-tool.css';

const customAggFuncs = {
  customSum: ({ values }) => values.reduce((sum, val) => sum + (val || 0), 0),
  customAvg: ({ values }) => {
    const validValues = values.filter(v => v != null);
    return validValues.length > 0 ? validValues.reduce((sum, val) => sum + val, 0) / validValues.length : 0;
  },
  customCount: ({ values }) => values.filter(v => v != null).length
};

<DataGrid
  data={myData}
  columnDefs={columnDefs}
  aggFuncs={customAggFuncs}
/>
```

### Master-Detail Views

Configure expandable rows with nested grid data:

```tsx
import { DataGrid } from 'grid-tool-internal';
import 'grid-tool-internal/dist/grid-tool.css';

<DataGrid
  data={myData}
  columnDefs={columnDefs}
  masterDetail={true}
  detailGridOptions={detailColumnDefs}
  getDetailRowData={({ data, successCallback }) => {
    // Fetch detail data for the row
    fetchDetailData(data.id).then(detailData => {
      successCallback(detailData);
    });
  }}
/>
```

### Value Getters and Formatters

Use custom value transformation:

```tsx
const columnDefs = {
  columns: [
    {
      field: 'fullName',
      headerName: 'Full Name',
      valueGetter: ({ data }) => `${data.firstName} ${data.lastName}`,
      valueFormatter: ({ value, data }) => `${value} (${data.department})`
    },
    {
      field: 'salary',
      headerName: 'Salary',
      valueFormatter: ({ value }) => `$${value.toLocaleString()}`
    }
  ]
};
```

### Export Options

Configure data export functionality:

```tsx
import { DataGrid } from 'grid-tool-internal';
import 'grid-tool-internal/dist/grid-tool.css';

<DataGrid
  data={myData}
  columnDefs={columnDefs}
  suppressExcelExport={false} // Enable/disable Excel export
  csvFileName="my-grid-data" // Custom filename for CSV export
/>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
