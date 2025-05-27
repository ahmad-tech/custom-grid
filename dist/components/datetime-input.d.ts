import * as React from "react";
type DateTimeInputProps = {
    className?: string;
    value?: Date;
    onChange?: (date?: Date) => void;
    onKeyDown?: (event: React.KeyboardEvent<Element>) => void;
    onBlur?: (event: React.FocusEvent<Element>) => void;
    format?: string;
    disabled?: boolean;
    clearable?: boolean;
    timezone?: string;
    hideCalendarIcon?: boolean;
    onCalendarClick?: () => void;
};
declare const DateTimeInput: React.ForwardRefExoticComponent<DateTimeInputProps & React.RefAttributes<HTMLInputElement>>;
export { DateTimeInput };
export declare function useEventCallback<T extends Function>(fn: T, deps: any[]): (...args: any[]) => any;
export declare const useIsomorphicLayoutEffect: typeof React.useEffect;
//# sourceMappingURL=datetime-input.d.ts.map