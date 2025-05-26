# Grid Tool

A powerful React component library with advanced grid functionality, featuring virtualization, grouping, filtering, and master-detail views.

## Features

- 🚀 Built with TanStack Table for powerful table functionality
- 📊 Virtualized scrolling for handling large datasets
- 🎨 Built-in Tailwind CSS styling with customizable theme
- 📱 Responsive design
- 🔍 Sortable columns
- ⚡ High performance with virtualization
- **Grouping**: Group data by one or more columns
- **Filtering**: Filter data by column values
- **Master-Detail**: Expand rows to show detailed information
- **Aggregation**: Calculate totals and other aggregations for grouped data
- **Customizable**: Extensive options for customizing appearance and behavior
- **Editable Cells**: Support for various editor types
- **Tooltips**: Custom tooltips for cells and headers
- **Custom Cell Rendering**: Support for custom cell renderers
- **Row Selection**: Single and multiple row selection modes
- **Undo/Redo**: Built-in undo/redo functionality for data changes
- **Column Reordering**: Drag and drop column reordering
- **Column Visibility**: Toggle column visibility with a sidebar panel

## Installation

```bash
npm install grid-tool
# or
yarn add grid-tool
# or
pnpm add grid-tool
```

### Tailwind CSS Integration

This package comes with built-in Tailwind CSS styling. The styles are prefixed with `grid-tool-` to avoid conflicts with your project's styles. You don't need to install Tailwind CSS separately.

If you want to customize the theme, you can extend the default configuration in your project's `tailwind.config.js`:

```js
module.exports = {
  // ... your other config
  theme: {
    extend: {
      // Extend the grid-tool theme
      colors: {
        // Add your custom colors
      },
      spacing: {
        // Add your custom spacing
      },
    },
  },
}
```

## Usage

```tsx
import { DataGrid } from 'grid-tool';

const MyComponent = () => {
  const data = [
    { id: 1, name: 'John', age: 30, department: 'Engineering', joinDate: '2023-01-15', active: true },
    { id: 2, name: 'Jane', age: 25, department: 'Marketing', joinDate: '2023-02-20', active: true },
    // ... more data
  ];

  const columnDefs = {
    columns: [
      { 
        field: 'id', 
        headerName: 'ID', 
        type: 'number',
        editable: false,
        width: 80
      },
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
        valueFormatter: ({ value }) => `${value} years`
      },
      { 
        field: 'department', 
        headerName: 'Department', 
        type: 'select',
        editorType: 'select',
        editorParams: {
          options: ['Engineering', 'Marketing', 'Sales', 'HR']
        }
      },
      {
        field: 'joinDate',
        headerName: 'Join Date',
        type: 'date',
        editorType: 'date',
        valueFormatter: ({ value }) => new Date(value).toLocaleDateString()
      },
      {
        field: 'active',
        headerName: 'Active',
        type: 'boolean',
        editorType: 'checkbox'
      }
    ],
    masterDetail: true,
    showGroupByPanel: true,
    grandTotalRow: 'bottom'
  };

  const handleDataChange = (newRecord, previousRecord, field) => {
    console.log('Data changed:', { newRecord, previousRecord, field });
  };

  return (
    <DataGrid
      data={data}
      columnDefs={columnDefs}
      onDataChange={handleDataChange}
      loading={false}
      loadingMessage="Loading data..."
      showGroupByPanel={true}
      rowSelection={{
        mode: 'multiple',
        getSelectedRows: (selectedRows) => {
          console.log('Selected rows:', selectedRows);
        }
      }}
    />
  );
};
```

## API Reference

### DataGrid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Record<string, unknown>[]` | `[]` | The data to display in the grid |
| `columnDefs` | `ColumnDefProps` | Required | Configuration for columns and grid behavior |
| `onDataChange` | `(newRecord: Record<string, unknown>, previousRecord: Record<string, unknown>, field: string) => void` | - | Callback when data changes |
| `loading` | `boolean` | `false` | Whether the grid is in a loading state |
| `loadingMessage` | `string` | `"Loading..."` | Message to display during loading |
| `onRowClick` | `(params: { data: Record<string, unknown>, rowIndex: number }) => void` | - | Callback when a row is clicked |
| `showGroupByPanel` | `boolean` | `false` | Show grouping panel |
| `isChild` | `boolean` | `false` | Whether this is a child grid (for master-detail) |
| `rowSelection` | `{ mode: 'single' \| 'multiple', getSelectedRows: (rows: Record<string, unknown>[]) => void }` | - | Row selection configuration |

### ColumnDefProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ColumnDef[]` | Required | Array of column definitions |
| `masterDetail` | `boolean` | `false` | Enable master-detail view |
| `detailGridOptions` | `ColumnDefProps` | - | Options for detail grid |
| `getDetailRowData` | `(params: { data: Record<string, unknown>, successCallback: (data: Record<string, unknown>[]) => void }) => void` | - | Function to fetch detail data |
| `aggFuncs` | `Record<string, (params: { values: unknown[] }) => unknown>` | `{}` | Custom aggregation functions |
| `grandTotalRow` | `"top" \| "bottom" \| "none"` | `"none"` | Position of grand total row |
| `tableLayout` | `"fixed" \| "auto"` | `"fixed"` | Table layout mode |

### ColumnDef

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `field` | `string` | Required | Field name in data |
| `headerName` | `string` | Required | Display name for column header |
| `type` | `"text" \| "number" \| "date" \| "boolean" \| "select" \| "time" \| "dateTime"` | - | Data type for formatting |
| `editable` | `boolean` | `true` | Whether column is editable |
| `width` | `number` | - | Column width in pixels |
| `visible` | `boolean` | `true` | Whether column is visible |
| `rowGroup` | `boolean` | `false` | Enable row grouping by this column |
| `aggFunc` | `string` | - | Aggregation function for grouped rows |
| `valueGetter` | `(params: { data: Record<string, unknown>, node?: unknown }) => unknown` | - | Custom value getter |
| `tooltipValueGetter` | `(params: Record<string, unknown>) => string` | - | Custom tooltip value getter |
| `valueSetter` | `(params: { value: string }) => Record<string, unknown>` | - | Custom value setter |
| `valueFormatter` | `(params: { value: unknown, data: Record<string, unknown>, node?: unknown }) => string` | - | Custom value formatter |
| `showFilter` | `boolean` | `true` | Whether to show filter for this column |
| `editorType` | `"text" \| "number" \| "date" \| "checkbox" \| "select" \| "time" \| "dateTime"` | - | Type of editor for editable cells |
| `editorParams` | `Record<string, unknown>` | - | Parameters for the editor |
| `valueParser` | `(params: { value: string }) => unknown` | - | Custom value parser |
| `headerTooltip` | `string` | - | Tooltip for column header |
| `tooltipField` | `string` | - | Field to use for cell tooltip |
| `cellRenderer` | `React.FC<any>` | - | Custom cell renderer component |

### GroupObject

| Prop | Type | Description |
|------|------|-------------|
| `field` | `string` | Field name used for grouping |
| `value` | `unknown` | Value of the group |
| `key` | `string` | Unique key for the group |
| `level` | `number` | Nesting level of the group |
| `children` | `Record<string, unknown>[]` | Child records in the group |
| `isGroup` | `boolean` | Whether this is a group object |
| `originalChildren` | `Record<string, unknown>[]` | Original child records before any transformations |
| `aggregations` | `Record<string, unknown>` | Aggregated values for the group |

## Advanced Features

### Row Selection

The grid supports both single and multiple row selection modes:

```tsx
<DataGrid
  // ... other props
  rowSelection={{
    mode: 'multiple', // or 'single'
    getSelectedRows: (selectedRows) => {
      console.log('Selected rows:', selectedRows);
    }
  }}
/>
```

### Master-Detail View

Enable master-detail view to show detailed information for each row:

```tsx
const columnDefs = {
  columns: [...],
  masterDetail: true,
  getDetailRowData: ({ data, successCallback }) => {
    // Fetch detail data
    fetchDetailData(data.id).then(detailData => {
      successCallback(detailData);
    });
  },
  detailGridOptions: {
    // Options for the detail grid
    columns: [...]
  }
};
```

### Column Grouping

Enable column grouping with the group panel:

```tsx
<DataGrid
  // ... other props
  showGroupByPanel={true}
  columnDefs={{
    columns: [
      {
        field: 'department',
        headerName: 'Department',
        rowGroup: true,
        aggFunc: 'count'
      },
      // ... other columns
    ]
  }}
/>
```

## Dependencies

This package uses the following major dependencies:

- @tanstack/react-table
- @tanstack/react-virtual
- react-window
- tailwindcss
- tailwindcss-animate
- lodash
- lucide-react

## License

MIT © [ahmad-tech](https://github.com/ahmad-tech)
