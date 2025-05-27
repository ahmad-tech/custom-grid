import React from "react";
import type { ColumnDef } from "@/types/grid";
interface GroupPanelProps {
    showGroupByPanel: boolean;
    groupedColumns: string[];
    columns: ColumnDef[];
    setColumnGrouped: (field: string, grouped: boolean) => void;
    handleGroupDrop: (e: React.DragEvent) => void;
}
export declare const GroupPanel: React.FC<GroupPanelProps>;
export {};
//# sourceMappingURL=GroupPanel.d.ts.map