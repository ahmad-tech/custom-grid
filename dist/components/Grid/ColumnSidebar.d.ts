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
    enablePivot?: boolean;
    togglePivot?: () => void;
    pivotColumns?: string[];
    setPivotColumns?: React.Dispatch<React.SetStateAction<string[]>>;
    selectedAggFn?: string;
    columnAggFnMap?: Record<string, string>;
    setColumnAggFnMap?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    handleAggDrop: (e: React.DragEvent) => void;
    setAggCols?: React.Dispatch<React.SetStateAction<{
        field: string;
        aggFunc: string;
    }[]>>;
    pivotMode?: boolean;
}
declare const ColumnSidebar: React.FC<ColumnSidebarProps>;
export default ColumnSidebar;
//# sourceMappingURL=ColumnSidebar.d.ts.map