"use client";
import React from "react";
import {
  GroupingState,
  useReactTable,
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  ColumnResizeMode,
  ColumnSizingState,
  FilterFn,
  Column,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { makeData, Person } from "./makeData";

function App() {
  // State and handlers
  const [data, setData] = React.useState(() => makeData(100000));
  const [grouping, setGrouping] = React.useState<GroupingState>([]);
  const [expanded, setExpanded] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [draggedColumn, setDraggedColumn] = React.useState<string | null>(null);
  
  const refreshData = () => setData(() => makeData(100000));
  const rerender = React.useReducer(() => ({}), {})[1];

  // Filter function
  const filterFunction: FilterFn<Person> = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);
    return cellValue?.toString().toLowerCase().includes(value.toLowerCase()) ?? false;
  };

  // Column configuration
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
        getGroupingValue: (row) => `${row.firstName} ${row.lastName}`,
        cell: (info) => info.getValue(),
        footer: () => "Total",
        enableSorting: true,
        enableResizing: true,
        minSize: 100,
        filterFn: filterFunction,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        header: () => <span>Last Name</span>,
        cell: (info) => info.getValue(),
        footer: () => "",
        enableSorting: true,
        enableResizing: true,
        minSize: 100,
        filterFn: filterFunction,
      },
      {
        accessorKey: "age",
        header: () => "Age",
        aggregatedCell: ({ getValue }) =>
          Math.round(getValue<number>() * 100) / 100,
        aggregationFn: "median",
        footer: props => {
          const values = props.table.getFilteredRowModel().rows.map(row => row.getValue("age") as number);
          const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
          return `Avg: ${Math.round(avg * 100) / 100}`;
        },
        enableSorting: true,
        enableResizing: true,
        minSize: 80,
        filterFn: filterFunction,
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        aggregationFn: "sum",
        aggregatedCell: ({ getValue }) => getValue<number>(),
        footer: props => {
          const total = props.table.getFilteredRowModel().rows.reduce<number>(
            (sum, row) => sum + (row.getValue("visits") as number),
            0
          );
          return `Total: ${total}`;
        },
        enableSorting: true,
        enableResizing: true,
        minSize: 80,
        filterFn: filterFunction,
      },
      {
        accessorKey: "status",
        header: "Status",
        footer: props => {
          const statuses = props.table.getFilteredRowModel().rows.map(row => row.getValue("status"));
          const uniqueStatuses = new Set(statuses);
          return `${uniqueStatuses.size} statuses`;
        },
        enableSorting: true,
        enableResizing: true,
        minSize: 100,
        filterFn: filterFunction,
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        cell: ({ getValue }) =>
          `${Math.round(getValue<number>() * 100) / 100}%`,
        aggregationFn: "mean",
        aggregatedCell: ({ getValue }) =>
          `${Math.round(getValue<number>() * 100) / 100}%`,
        footer: props => {
          const values = props.table.getFilteredRowModel().rows.map(row => row.getValue("progress"));
          const avg = values.reduce((sum, val) => sum + (val as number), 0) / values.length;
          return `Avg: ${Math.round(avg * 100) / 100}%`;
        },
        enableSorting: true,
        enableResizing: true,
        minSize: 100,
        filterFn: filterFunction,
      },
    ],
    []
  );

  // Table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      grouping,
      expanded,
      sorting,
      columnSizing,
      columnFilters,
    },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    onGroupingChange: setGrouping,
    onColumnSizingChange: setColumnSizing,
    onColumnFiltersChange: setColumnFilters,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: 'onChange' as ColumnResizeMode,
    enableColumnResizing: true,
    debugTable: true,
    enableRowSelection: true,
    enableColumnFooters: true,
  });

  // Add window resize handler
  React.useEffect(() => {
    const updateColumnSizes = () => {
      if (tableContainerRef.current) {
        const containerWidth = tableContainerRef.current.clientWidth;
        const columnCount = columns.length;
        const equalWidth = Math.max(
          Math.floor(containerWidth / columnCount),
          100 // Minimum width
        );
        
        const newColumnSizing: ColumnSizingState = {};
        table.getAllColumns().forEach((column) => {
          newColumnSizing[column.id] = equalWidth;
        });
        
        setColumnSizing(newColumnSizing);
      }
    };

    updateColumnSizes();
    window.addEventListener('resize', updateColumnSizes);
    
    return () => {
      window.removeEventListener('resize', updateColumnSizes);
    };
  }, [table, columns]);

  const { rows } = table.getRowModel();

  // Set up virtualizer
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 45,
    overscan: 5,
  });

  // Render helpers
  const renderGroupingButton = (header: Column<Person>) => (
    <button
      onClick={header.column.getToggleGroupingHandler()}
      className="group-button"
    >
      {header.column.getIsGrouped() ? (
        <span className="group-indicator">
          {header.column.getGroupedIndex() + 1}
        </span>
      ) : (
        "➡️"
      )}
    </button>
  );

  const renderSortingIndicator = (header: Column<Person>) => {
    if (!header.column.getCanSort()) return null;
    
    const sorted = header.column.getIsSorted();
    return (
      <span className="sort-indicator">
        {sorted === "asc" ? " ↑" : sorted === "desc" ? " ↓" : " ↕"}
      </span>
    );
  };

  const scrollToExpandedContent = () => {
    if (tableContainerRef.current) {
      const containerRect = tableContainerRef.current.getBoundingClientRect();
      const virtualRows = tableContainerRef.current.getElementsByClassName('virtual-row');
      const lastVirtualRow = virtualRows[virtualRows.length - 1];
      
      if (lastVirtualRow) {
        const rowRect = lastVirtualRow.getBoundingClientRect();
        const isFullyVisible = rowRect.bottom <= containerRect.bottom && rowRect.top >= containerRect.top;
        if (!isFullyVisible && rowRect.bottom > containerRect.bottom) {
          tableContainerRef.current.scrollTo({
            top: tableContainerRef.current.scrollTop + (rowRect.bottom - containerRect.bottom) + 100,
            behavior: 'smooth',
          });
        }
      }
    }
  };

  const renderCell = (cell: any, row: any) => {
    if (cell.getIsGrouped()) {
      return (
        <button
          onClick={(e) => {
            row.getToggleExpandedHandler()(e);
            if (!row.getIsExpanded()) {
              const rowElement = (e.target as HTMLElement).closest('tr');
              if (rowElement) {
                setTimeout(() => {
                  scrollToExpandedContent();
                }, 0);
              }
            }
          }}
          className="group-button"
        >
          {row.getIsExpanded() ? "▼" : "▶"} {flexRender(cell.column.columnDef.cell, cell.getContext())} ({row.subRows.length})
        </button>
      );
    }

    if (cell.getIsAggregated()) {
      return flexRender(
        cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
        cell.getContext()
      );
    }

    if (cell.getIsPlaceholder()) {
      return null;
    }

    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  const renderColumnFilter = (column: Column<Person>) => {
    if (!column.getCanFilter()) return null;

    const currentFilter = columnFilters.find(f => f.id === column.id)?.value || '';

    return (
      <input
        type="text"
        value={currentFilter as string}
        onChange={e => {
          const value = e.target.value;
          setColumnFilters(prev => 
            value
              ? [...prev.filter(f => f.id !== column.id), { id: column.id, value }]
              : prev.filter(f => f.id !== column.id)
          );
        }}
        placeholder={`Filter ${column.id}...`}
        className="column-filter"
      />
    );
  };

  // Add drag handlers
  const handleDragStart = (columnId: string) => {
    setDraggedColumn(columnId);
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedColumn) {
      const newGrouping = [...grouping];
      if (!newGrouping.includes(draggedColumn)) {
        newGrouping.push(draggedColumn);
        setGrouping(newGrouping);
      }
    }
    setDraggedColumn(null);
  };

  const removeGrouping = (columnId: string) => {
    setGrouping(grouping.filter(g => g !== columnId));
  };

  return (
    <div className="p-4">
      <div 
        className="grouping-zone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="grouping-indicator">
          <span className="grouping-text">Drag here to set row groups</span>
          <div className="active-groups">
            {grouping.map((columnId) => {
              const column = table.getColumn(columnId);
              if (!column) return null;
              
              return (
                <div key={columnId} className="group-tag">
                  <span>{typeof column.columnDef.header === 'string' 
                    ? column.columnDef.header 
                    : columnId}</span>
                  <button
                    onClick={() => removeGrouping(columnId)}
                    className="remove-group"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div ref={tableContainerRef} className="overflow-auto">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th 
                    key={header.id} 
                    colSpan={header.colSpan}
                    className={`
                      ${header.column.getCanSort() ? 'sortable' : ''}
                      ${header.column.getIsResizing() ? 'isResizing' : ''}
                    `}
                    style={{
                      width: header.getSize(),
                    }}
                    draggable={!header.isPlaceholder}
                    onDragStart={() => handleDragStart(header.column.id)}
                    onDragEnd={handleDragEnd}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="th-content">
                        <div className="header-content">
                          <div
                            className="flex items-center gap-2"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {renderSortingIndicator(header)}
                          </div>
                          {!header.isPlaceholder && renderColumnFilter(header.column)}
                        </div>
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`resizer ${
                            header.column.getIsResizing() ? 'isResizing' : ''
                          }`}
                        />
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              if (!row) return null;

              return (
                <tr
                  key={row.id}
                  data-index={virtualRow.index}
                  className={`virtual-row ${row.getIsGrouped() ? 'group-row' : ''} ${row.getIsExpanded() ? 'expanded-row' : ''}`}
                  style={{
                    position: 'absolute',
                    top: `${virtualRow.start}px`,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isGrouped = cell.getIsGrouped();
                    const isAggregated = cell.getIsAggregated();
                    const isPlaceholder = cell.getIsPlaceholder();

                    return (
                      <td
                        key={cell.id}
                        className={`virtual-cell ${isGrouped ? 'grouped' : ''} ${isAggregated ? 'aggregated' : ''}`}
                        style={{
                          width: `${cell.column.getSize()}px`,
                          minWidth: `${cell.column.columnDef.minSize}px`,
                        }}
                      >
                        {isGrouped ? (
                          <button
                            onClick={() => {
                              row.toggleExpanded();
                              if (!row.getIsExpanded()) {
                                setTimeout(scrollToExpandedContent, 0);
                              }
                            }}
                            className="group-button"
                          >
                            {row.getIsExpanded() ? "▼" : "▶"} {flexRender(cell.column.columnDef.cell, cell.getContext())} ({row.subRows?.length || 0})
                          </button>
                        ) : isAggregated ? (
                          flexRender(
                            cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        ) : isPlaceholder ? null : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
      <div className="text-secondary">
        {table.getRowModel().rows.length} Rows
      </div>
    </div>
  );
}

export default App;
