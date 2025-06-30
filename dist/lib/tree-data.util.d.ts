import { TreeDataChildrenFieldType } from "@/types/grid";
/**
 * Converts flat data with path arrays into a tree structure.
 */
export declare function buildTreeData(flatData: Record<string, unknown>[], treeDataChildrenField: TreeDataChildrenFieldType, getDataPath?: (data: Record<string, unknown>) => string[]): any[];
/**
 * Flattens tree data for rendering, respecting expanded state.
 */
export declare function flattenTree(nodes: Record<string, unknown>[], expanded: Record<string, boolean>, level?: number, rowIndexRef?: {
    current: number;
}, parentPath?: string[]): Array<{
    type: "data";
    row: Record<string, unknown>;
    rowIndex: number;
    indent: number;
    nodeKey: string;
}>;
/**
 * Recursively adds aggregation values to each node in the tree.
 * - aggregatedCount: total number of descendant leaf files
 * - provided: only 1 for leaf nodes (files), not folders
 */
export declare function addAggregations(node: Record<string, any>): number;
/**
 * Add aggregations to a full tree list (root-level array)
 */
export declare function computeAggregationsForTree(tree: any[]): void;
/**
 * Recursively collect all nodeKeys (including self) for a node and its descendants.
 */
export declare function getAllDescendantNodeKeys(node: any, parentPath?: string[]): string[];
/**
 * Get the parent nodeKey for a given nodeKey.
 */
export declare function getParentNodeKey(nodeKey: string): string | null;
/**
 * Given a nodeKey and the flattenedRows, find the node object.
 */
export declare function findNodeByNodeKey(flattenedRows: any[], nodeKey: string): any | undefined;
/**
 * Move a node from one location to another in a tree structure.
 * @param tree The tree data array (root level).
 * @param sourcePath The path array of the node to move.
 * @param targetPath The path array of the new parent node (or [] for root).
 * @returns A new tree with the node moved.
 */
export declare function moveTreeNode(tree: any[], sourcePath: string[], targetPath: string[]): any[];
/**
 * Checks if a node or any of its descendants match the filter function.
 * @param node The current node to check.
 * @param filterFn The filter function to apply to each node.
 * @param childrenField The field name for children (default: "children").
 * @returns True if the node or any descendant matches, false otherwise.
 */
export declare function nodeOrDescendantMatches(node: Record<string, unknown>, filterFn: (row: Record<string, unknown>) => boolean, childrenField?: string): boolean;
/**
 * Recursively filters a tree structure.
 * - If a node matches the filter, it is kept with all its children.
 * - If any descendant matches, the parent is kept with all its children.
 * - If neither the node nor any descendant matches, the node is removed.
 *
 * This is useful for tree UIs where you want to show the full path and all siblings
 * when any child matches the filter.
 *
 * @param nodes The array of tree nodes to filter.
 * @param filterFn The filter function to apply to each node.
 * @param childrenField The field name for children (default: "children").
 * @returns The filtered tree array.
 */
export declare function filterTreeData(nodes: any[], filterFn: (row: Record<string, unknown>) => boolean, childrenField?: string): any[];
//# sourceMappingURL=tree-data.util.d.ts.map