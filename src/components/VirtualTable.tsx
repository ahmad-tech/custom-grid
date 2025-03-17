import React from "react";
import {
  GroupingState,
  useReactTable,
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  Column,
  flexRender,
  SortingState,
  getSortedRowModel,
  ColumnResizeMode,
  ColumnSizingState,
  ColumnFiltersState,
  ColumnDef,
  ExpandedState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

interface VirtualTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  initialState?: {
    grouping?: GroupingState;
    sorting?: SortingState;
    columnSizing?: ColumnSizingState;
    columnFilters?: ColumnFiltersState;
    expanded?: ExpandedState;
  };
}

function VirtualTable<T>({ data, columns, initialState }: VirtualTableProps<T>) {
  // State management
  const [grouping, setGrouping] = React.useState<GroupingState>(initialState?.grouping || []);
  const [expanded, setExpanded] = React.useState(initialState?.expanded || {});
  const [sorting, setSorting] = React.useState<SortingState>(initialState?.sorting || []);
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>(initialState?.columnSizing || {});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(initialState?.columnFilters || []);
  const [draggedColumn, setDraggedColumn] = React.useState<string | null>(null);
  
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

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

  const renderColumnFilter = (column: Column<T>) => {
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

  // Drag handlers
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
                            <span className="sort-indicator">
                              {header.column.getIsSorted() === "asc" 
                                ? " ↑" 
                                : header.column.getIsSorted() === "desc" 
                                ? " ↓" 
                                : " ↕"}
                            </span>
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

export default VirtualTable; 