import { ColumnDefProps } from "@/types/grid";
type CookedRow = Record<string, unknown>;
export declare function useCookedData(columnDefs: ColumnDefProps): {
    getCookedData: (data: Record<string, unknown>[]) => CookedRow[];
};
export {};
//# sourceMappingURL=useCookedData.d.ts.map