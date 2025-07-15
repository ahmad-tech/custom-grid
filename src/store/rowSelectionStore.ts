import { create } from "zustand";

export type SelectedRowsMap = Record<string, boolean>;

type SelectionMode = "single" | "multiple";

type ToggleOptions = {
  parentKey?: string;
  cascade?: boolean;
  descendants?: string[];
};

type RowSelectionState = {
  selectedRows: SelectedRowsMap;
  mode: SelectionMode;
  setMode: (mode: SelectionMode) => void;
  setSelectedRows: (
    updater: (prev: SelectedRowsMap) => SelectedRowsMap
  ) => void;
  clearSelection: () => void;
  isSelected: (key: string) => boolean;
  isAllSelected: (dataLength: number) => boolean;
  toggleSelection: (
    key: string,
    selected: boolean,
    options?: ToggleOptions
  ) => void;
  getSelectedRows: () => SelectedRowsMap;
};

export const useRowSelectionStore = create<RowSelectionState>((set, get) => ({
  selectedRows: {},
  mode: "single",

  setMode: (mode) => set({ mode }),

  setSelectedRows: (updater) =>
    set((state) => ({ selectedRows: updater(state.selectedRows) })),

  clearSelection: () => set({ selectedRows: {} }),

  isSelected: (key) => {
    const { selectedRows } = get();
    return !!selectedRows[key];
  },
  isAllSelected: (dataLength: number) => {
    const { selectedRows } = get();
    return Object.keys(selectedRows).length >= dataLength;
  },

  toggleSelection: (key, selected) => {
    const { selectedRows, mode } = get();
    const count = mode === "single" ? (key.match(/_/g) || []).length : 0;
    const filteredRows =
      mode === "single"
        ? Object.fromEntries(
            Object.entries(selectedRows).filter(
              ([key]) => (key.match(/_/g) || []).length !== count
            )
          )
        : {};
    const updated =
      mode === "single" ? { ...filteredRows } : { ...selectedRows };

    if (selected) {
      updated[key] = true;
    } else {
      delete updated[key];
    }

    set({ selectedRows: updated });
  },

  getSelectedRows: () => get().selectedRows,
}));
