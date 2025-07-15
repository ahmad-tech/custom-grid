import { create } from "zustand";

type RowSelectionState = {
  selectedRows: Record<string, boolean>;
  setSelectedRows: (
    updater: (prev: Record<string, boolean>) => Record<string, boolean>
  ) => void;
  clearSelection: () => void;
};

export const useRowSelectionStore = create<RowSelectionState>((set) => ({
  selectedRows: {},
  setSelectedRows: (updater) =>
    set((state) => ({ selectedRows: updater(state.selectedRows) })),
  clearSelection: () => set({ selectedRows: {} }),
}));
