export interface IPivotColumnDef {
    field: string;
    aggFunc: string;
}
export interface IGroupedPivotedData {
    groupKey: string;
    children: any[];
    totalAggregations: Record<string, number>;
    totalMedals: number;
}
export type AvgTrackerType = Record<string, {
    sum: number;
    count: number;
}>;
export declare const applyPivotAgg: (aggFunc: string, current: number | undefined, value: number) => number;
export declare function pivotAndAggregateByGroup(data: any[], groupBy: string, pivotColumns: string[], columnDefs: IPivotColumnDef[]): IGroupedPivotedData[];
//# sourceMappingURL=pivot.utils.d.ts.map