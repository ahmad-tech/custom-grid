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
  Row,
  Cell,
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
  groupDisplayType?: 'single' | 'multiple' | 'groupRows';
  groupDefaultExpanded?: number;
  showOpenedGroup?: boolean;
  groupHideOpenParents?: boolean;
}

function VirtualTable<T>({
  data,
  columns,
  initialState,
  groupDisplayType = 'groupRows',
  showOpenedGroup = true,
  groupHideOpenParents = false,
}: VirtualTableProps<T>) {
  // State management
  const [grouping, setGrouping] = React.useState<GroupingState>(initialState?.grouping || []);
  const [expanded, setExpanded] = React.useState<ExpandedState>(initialState?.expanded || {});
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
    enableGrouping: true,
    enableExpanding: true,
    groupedColumnMode: groupDisplayType === 'multiple' ? 'remove' : 'reorder',
    getRowCanExpand: row => row.subRows && row.subRows.length > 0,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  // Initialize expanded state for all groups
  React.useEffect(() => {
    if (grouping.length > 0) {
      const newExpanded: Record<string, boolean> = {};
      const expandGroups = (rows: Row<T>[]) => {
        rows.forEach(row => {
          if (row.getIsGrouped()) {
            newExpanded[row.id] = true;
            if (row.subRows && row.subRows.length > 0) {
              expandGroups(row.subRows);
            }
          }
        });
      };
      
      expandGroups(table.getRowModel().rows);
      setExpanded(newExpanded);
    }
  }, [grouping, table]);

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

  const scrollToExpandedContent = React.useCallback(() => {
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
  }, []);

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

  const getGroupIndentation = (row: Row<T>) => {
    let depth = 0;
    let currentRow = row;
    while (currentRow.depth > 0) {
      depth++;
      currentRow = currentRow.parentId ? rows.find(r => r.id === currentRow.parentId) as Row<T> : currentRow;
    }
    return depth * 20; // 20px per level
  };

  const renderGroupCell = (cell: Cell<T, unknown>, row: Row<T>) => {
    const isGrouped = cell.getIsGrouped();
    const isAggregated = cell.getIsAggregated();
    const isPlaceholder = cell.getIsPlaceholder();
    const indentation = getGroupIndentation(row);

    if (isGrouped) {
      return (
        <button
          onClick={() => {
            row.toggleExpanded();
            if (!row.getIsExpanded()) {
              scrollToExpandedContent();
            }
          }}
          className="group-button"
          style={{ paddingLeft: `${indentation}px` }}
        >
          <span className="group-icon">{row.getIsExpanded() ? "▼" : "▶"}</span>
          <span className="group-value">
            {typeof cell.column.columnDef.header === 'string' 
              ? cell.column.columnDef.header 
              : cell.column.id}: {String(cell.getValue())}
          </span>
          <span className="group-count">({row.subRows?.length || 0})</span>
        </button>
      );
    }

    if (isAggregated) {
      return (
        <div style={{ paddingLeft: `${indentation}px` }}>
          {flexRender(
            cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
            cell.getContext()
          )}
        </div>
      );
    }

    if (isPlaceholder) {
      return null;
    }

    return (
      <div style={{ paddingLeft: showOpenedGroup ? `${indentation}px` : 0 }}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </div>
    );
  };

  return (
    <div className="virtual-table-container">
      <div 
        className="grouping-zone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="grouping-indicator">
          <span className="grouping-text">
            {grouping.length === 0 
              ? "Drag columns here to group by them" 
              : "Grouped by:"}
          </span>
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
                    title="Remove grouping"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div ref={tableContainerRef} className="table-container">
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
                      ${header.column.getCanGroup() ? 'groupable' : ''}
                    `}
                    style={{
                      width: header.getSize(),
                    }}
                    draggable={!header.isPlaceholder && header.column.getCanGroup()}
                    onDragStart={() => handleDragStart(header.column.id)}
                    onDragEnd={handleDragEnd}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="th-content">
                        <div className="header-content">
                          <div
                            className="header-cell"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <span className="sort-indicator">
                                {header.column.getIsSorted() === "asc" 
                                  ? " ↑" 
                                  : header.column.getIsSorted() === "desc" 
                                  ? " ↓" 
                                  : " ↕"}
                              </span>
                            )}
                          </div>
                          {!header.isPlaceholder && renderColumnFilter(header.column)}
                        </div>
                        {header.column.getCanResize() && (
                          <div
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={`resizer ${
                              header.column.getIsResizing() ? 'isResizing' : ''
                            }`}
                          />
                        )}
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

              if (groupHideOpenParents && row.getIsGrouped() && row.getIsExpanded()) {
                return null;
              }

              return (
                <tr
                  key={row.id}
                  data-index={virtualRow.index}
                  className={`
                    virtual-row
                    ${row.getIsGrouped() ? 'group-row' : ''}
                    ${row.getIsExpanded() ? 'expanded-row' : ''}
                    ${row.depth > 0 ? `indent-${row.depth}` : ''}
                  `}
                  style={{
                    position: 'absolute',
                    top: `${virtualRow.start}px`,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`
                        virtual-cell
                        ${cell.getIsGrouped() ? 'grouped' : ''}
                        ${cell.getIsAggregated() ? 'aggregated' : ''}
                      `}
                      style={{
                        width: `${cell.column.getSize()}px`,
                        minWidth: `${cell.column.columnDef.minSize}px`,
                      }}
                    >
                      {renderGroupCell(cell, row)}
                    </td>
                  ))}
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
      <div className="table-footer">
        <span className="row-count">
          {table.getRowModel().rows.length} Rows
        </span>
      </div>
    </div>
  );
}

export default VirtualTable; 