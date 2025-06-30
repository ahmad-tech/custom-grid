import React from "react";
import type { ColumnDef } from "@/types/grid";
interface PivotPanelProps {
    pivotColumns: string[];
    columns: ColumnDef[];
    setPivotColumns: (fields: string[]) => void;
    handlePivotDrop: (e: React.DragEvent) => void;
}
export declare const PivotPanel: React.FC<PivotPanelProps>;
export {};
//# sourceMappingURL=PivotPanel.d.ts.map