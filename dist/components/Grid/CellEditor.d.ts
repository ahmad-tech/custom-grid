import React from "react";
interface SelectOption {
    value: string;
    label: string;
}
interface CellEditorProps {
    columnDef: {
        editorType: EditorType;
        editorParams?: EditorParamsType;
    };
    value: string | boolean | Date | number | null;
    onChange: (value: string | boolean | Date | number | null) => void;
    onBlur?: () => void;
    onKeyDown?: (e: React.KeyboardEvent<Element>) => void;
    valueFormatter?: (params: {
        value: unknown;
        data: Record<string, unknown>;
        node?: unknown;
    }) => string;
}
interface EditorParamsType {
    placeholder?: string;
    label?: string;
    options?: SelectOption[];
    min?: number;
    max?: number;
    step?: number;
}
type EditorType = "text" | "number" | "select" | "date" | "time" | "dateTime";
declare const CellEditor: ({ columnDef, value, onChange, onBlur, onKeyDown, valueFormatter, }: CellEditorProps) => React.JSX.Element;
export default CellEditor;
//# sourceMappingURL=CellEditor.d.ts.map