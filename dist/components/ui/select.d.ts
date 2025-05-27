import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
type SelectProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>;
type SelectGroupProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>;
type SelectValueProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>;
type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    className?: string;
    size?: "sm" | "default";
    children?: React.ReactNode;
};
type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    className?: string;
    children?: React.ReactNode;
    position?: "popper" | "item-aligned";
};
type SelectLabelProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & {
    className?: string;
};
type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    className?: string;
    children?: React.ReactNode;
};
type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> & {
    className?: string;
};
type ScrollButtonProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> & {
    className?: string;
};
declare function Select(props: SelectProps): React.JSX.Element;
declare function SelectGroup(props: SelectGroupProps): React.JSX.Element;
declare function SelectValue(props: SelectValueProps): React.JSX.Element;
declare function SelectTrigger({ className, size, children, ...props }: SelectTriggerProps): React.JSX.Element;
declare function SelectContent({ className, children, position, ...props }: SelectContentProps): React.JSX.Element;
declare function SelectLabel({ className, ...props }: SelectLabelProps): React.JSX.Element;
declare function SelectItem({ className, children, ...props }: SelectItemProps): React.JSX.Element;
declare function SelectSeparator({ className, ...props }: SelectSeparatorProps): React.JSX.Element;
declare function SelectScrollUpButton({ className, ...props }: ScrollButtonProps): React.JSX.Element;
declare function SelectScrollDownButton({ className, ...props }: ScrollButtonProps): React.JSX.Element;
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, };
//# sourceMappingURL=select.d.ts.map