import React from "react";
export declare function SimpleTimePicker({ value, onChange, use12HourFormat, min, max, disabled, modal, onSubmit, }: {
    use12HourFormat?: boolean;
    value: Date;
    onChange: (date: Date) => void;
    min?: Date;
    max?: Date;
    disabled?: boolean;
    className?: string;
    modal?: boolean;
    onSubmit?: (value: Date) => void;
}): React.JSX.Element;
//# sourceMappingURL=simple-time-picker.d.ts.map