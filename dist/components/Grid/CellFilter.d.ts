import { ColumnDef } from "@/types/grid";
import React from "react";
export declare const IsDateType: (type?: string) => type is "date";
export declare const IsTimeType: (type?: string) => type is "time";
export declare const IsDateTimeType: (type?: string) => type is "dateTime" | "datetime";
export declare const GetDefaultFilterType: (col: ColumnDef) => "equals" | "contains";
export declare const GetAvailableFilterTypes: (col: ColumnDef) => {
    value: string;
    label: string;
}[];
interface CellFilterProps {
    column: ColumnDef;
    value: string;
    filterType: string;
    onFilterChange: (value: string) => void;
    onFilterTypeChange: (type: string) => void;
    onClear: () => void;
}
export declare const CellFilter: ({ column, value, filterType, onFilterChange, onFilterTypeChange, onClear, }: CellFilterProps) => React.JSX.Element;
export {};
//# sourceMappingURL=CellFilter.d.ts.map