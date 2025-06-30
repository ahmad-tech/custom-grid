import { TreeDataChildrenFieldType } from "@/types/grid";

/**
 * Converts flat data with path arrays into a tree structure.
 */
export function buildTreeData(
  flatData: Record<string, unknown>[],
  treeDataChildrenField: TreeDataChildrenFieldType,
  getDataPath?: (data: Record<string, unknown>) => string[] // optional for parentId/children formats
): any[] {
  if (!flatData || flatData.length === 0) return [];

  // Case 1: Already has children (tree structure)
  if (treeDataChildrenField === "children") {
    return flatData;
  }

  // Case 2: path[] based (AG Grid-style treeData)
  if (treeDataChildrenField === "path" && getDataPath) {
    const root: any[] = [];
    const pathMap = new Map<string, any>();

    flatData.forEach((row) => {
      const path = getDataPath(row);
      let parent: any = null;

      path.forEach((segment, idx) => {
        const currentPath = path.slice(0, idx + 1).join("/");

        if (!pathMap.has(currentPath)) {
          const node =
            idx === path.length - 1
              ? { ...row, children: [] }
              : { name: segment, path: path.slice(0, idx + 1), children: [] };

          pathMap.set(currentPath, node);
          if (parent) {
            parent.children.push(node);
          } else {
            root.push(node);
          }
        }

        parent = pathMap.get(currentPath);
      });
    });

    return root;
  }

  // Case 3: Flat parentId/id structure
  if (treeDataChildrenField === "parentId") {
    const idMap = new Map<string, any>();
    const root: any[] = [];

    flatData.forEach((row) => {
      const id = String((row as any).id); // safely cast to string
      idMap.set(id, { ...row, children: [] });
    });

    flatData.forEach((row) => {
      const id = String((row as any).id);
      const parentId = (row as any).parentId;

      const node = idMap.get(id);
      if (row.parentId) {
        const parent = idMap.get(parentId);
        if (parent) {
          parent.children.push(node);
        }
      } else {
        root.push(node);
      }
    });

    return root;
  }

  // Fallback: return as-is
  return flatData;
}

/**
 * Flattens tree data for rendering, respecting expanded state.
 */
export function flattenTree(
  nodes: Record<string, unknown>[],
  expanded: Record<string, boolean>,
  level = 0,
  rowIndexRef = { current: 0 },
  parentPath: string[] = []
): Array<{
  type: "data";
  row: Record<string, unknown>;
  rowIndex: number;
  indent: number;
  nodeKey: string;
}> {
  const flat: any[] = [];

  nodes.forEach((node) => {
    const currentIndex = rowIndexRef.current++;
    // Ensure node.name is a string
    const nodeName =
      typeof node.name === "string" ? node.name : String(node.name ?? "");
    const nodePath = [...parentPath, nodeName];
    const nodeKey = nodePath.join("/");

    flat.push({
      type: "data",
      row: node,
      rowIndex: currentIndex,
      indent: level,
      nodeKey,
    });

    if (
      node.children &&
      Array.isArray(node.children) &&
      node.children.length > 0 &&
      expanded[nodeKey]
    ) {
      flat.push(
        ...flattenTree(
          node.children as Record<string, unknown>[],
          expanded,
          level + 1,
          rowIndexRef,
          nodePath
        )
      );
    }
  });

  return flat;
}

/**
 * Recursively adds aggregation values to each node in the tree.
 * - aggregatedCount: total number of descendant leaf files
 * - provided: only 1 for leaf nodes (files), not folders
 */
export function addAggregations(node: Record<string, any>): number {
  if (!node.children || node.children.length === 0) {
    node.aggregatedCount = 1;
    node.provided = 1;
    return 1;
  }

  let total = 0;
  for (const child of node.children) {
    total += addAggregations(child);
  }

  node.aggregatedCount = total;
  return total;
}

/**
 * Add aggregations to a full tree list (root-level array)
 */
export function computeAggregationsForTree(tree: any[]) {
  tree.forEach((node) => addAggregations(node));
}

/**
 * Recursively collect all nodeKeys (including self) for a node and its descendants.
 */
export function getAllDescendantNodeKeys(
  node: any,
  parentPath: string[] = []
): string[] {
  const nodeName =
    typeof node.name === "string" ? node.name : String(node.name ?? "");
  const nodePath = [...parentPath, nodeName];
  const nodeKey = nodePath.join("/");
  let keys = [nodeKey];

  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      keys = keys.concat(getAllDescendantNodeKeys(child, nodePath));
    }
  }
  return keys;
}

/**
 * Get the parent nodeKey for a given nodeKey.
 */
export function getParentNodeKey(nodeKey: string): string | null {
  const parts = nodeKey.split("/");
  if (parts.length <= 1) return null;
  return parts.slice(0, -1).join("/");
}

/**
 * Given a nodeKey and the flattenedRows, find the node object.
 */
export function findNodeByNodeKey(
  flattenedRows: any[],
  nodeKey: string
): any | undefined {
  return flattenedRows.find((item) => item.nodeKey === nodeKey);
}

/**
 * Move a node from one location to another in a tree structure.
 * @param tree The tree data array (root level).
 * @param sourcePath The path array of the node to move.
 * @param targetPath The path array of the new parent node (or [] for root).
 * @returns A new tree with the node moved.
 */
export function moveTreeNode(
  tree: any[],
  sourcePath: string[],
  targetPath: string[]
): any[] {
  if (!tree || !Array.isArray(tree) || sourcePath.length === 0) return tree;

  // Helper to deep clone the tree
  const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));

  const clonedTree = deepClone(tree);

  // Helper to find and remove node by path
  function removeNode(nodes: any[], path: string[]): any | null {
    if (path.length === 0) return null;
    const [segment, ...rest] = path;
    const idx = nodes.findIndex((n) => n.name === segment);
    if (idx === -1) return null;
    if (rest.length === 0) {
      // Remove and return the node
      return nodes.splice(idx, 1)[0];
    }
    if (nodes[idx].children) {
      return removeNode(nodes[idx].children, rest);
    }
    return null;
  }

  // Helper to insert node at target path
  function insertNode(nodes: any[], path: string[], node: any) {
    if (path.length === 0) {
      nodes.push(node);
      return;
    }
    const [segment, ...rest] = path;
    let target = nodes.find((n) => n.name === segment);
    if (!target) {
      // If target path doesn't exist, create it as a folder
      target = { name: segment, children: [] };
      nodes.push(target);
    }
    if (!target.children) target.children = [];
    insertNode(target.children, rest, node);
  }

  // Remove node from source
  const nodeToMove = removeNode(clonedTree, sourcePath);
  if (!nodeToMove) return tree;

  // Update the node's path property
  nodeToMove.path = [...targetPath, nodeToMove.name];

  // Insert node at target
  insertNode(clonedTree, targetPath, nodeToMove);

  return clonedTree;
}

/**
 * Checks if a node or any of its descendants match the filter function.
 * @param node The current node to check.
 * @param filterFn The filter function to apply to each node.
 * @param childrenField The field name for children (default: "children").
 * @returns True if the node or any descendant matches, false otherwise.
 */
export function nodeOrDescendantMatches(
  node: Record<string, unknown>,
  filterFn: (row: Record<string, unknown>) => boolean,
  childrenField: string = "children"
): boolean {
  if (filterFn(node)) return true;
  if (Array.isArray(node[childrenField])) {
    return (node[childrenField] as any[]).some((child) =>
      nodeOrDescendantMatches(child, filterFn, childrenField)
    );
  }
  return false;
}

// Recursively filter tree data --- for tree data filtering on parent level

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
export function filterTreeData(
  nodes: any[],
  filterFn: (row: Record<string, unknown>) => boolean,
  childrenField: string = "children"
): any[] {
  return nodes
    .map((node) => {
      let children = node[childrenField];
      let filteredChildren: any[] = [];
      if (Array.isArray(children)) {
        filteredChildren = filterTreeData(children, filterFn, childrenField);
      }
      // If this node matches, keep it with all its children
      if (filterFn(node)) {
        return {
          ...node,
          [childrenField]: children,
        };
      }
      // If any child matches, keep this node with all its children (not just filtered)
      if (filteredChildren.length > 0) {
        return {
          ...node,
          [childrenField]: children,
        };
      }
      // Otherwise, discard this node
      return null;
    })
    .filter(Boolean);
}
