import React from "react";
import type { ColumnDef } from "@/types/grid";
interface ColumnSidebarProps {
    columns: ColumnDef[];
    setColumns: React.Dispatch<React.SetStateAction<ColumnDef[]>>;
    search: string;
    setSearch: (val: string) => void;
    showGroupByPanel?: boolean;
    groupedColumns?: string[];
    setColumnGrouped?: (field: string, grouped: boolean) => void;
    handleGroupDrop?: (e: React.DragEvent) => void;
}
/**
 * Sidebar component for toggling column visibility, searching columns,
 * and managing row grouping in the DataGrid.
 */
declare const ColumnSidebar: React.FC<ColumnSidebarProps>;
export default ColumnSidebar;
//# sourceMappingURL=ColumnSidebar.d.ts.map