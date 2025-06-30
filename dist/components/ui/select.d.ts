import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
declare function Select(props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>): React.JSX.Element;
declare function SelectGroup(props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>): React.JSX.Element;
declare function SelectValue(props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>): React.JSX.Element;
interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
    className?: string;
    size?: "default" | "sm";
    children?: React.ReactNode;
}
declare function SelectTrigger({ className, size, children, ...props }: SelectTriggerProps): React.JSX.Element;
interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
    className?: string;
    children?: React.ReactNode;
    position?: "item-aligned" | "popper";
}
declare function SelectContent({ className, children, position, ...props }: SelectContentProps): React.JSX.Element;
declare function SelectLabel({ className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>): React.JSX.Element;
interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
    className?: string;
    children?: React.ReactNode;
}
declare function SelectItem({ className, children, ...props }: SelectItemProps): React.JSX.Element;
declare function SelectSeparator({ className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>): React.JSX.Element;
declare function SelectScrollUpButton({ className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>): React.JSX.Element;
declare function SelectScrollDownButton({ className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>): React.JSX.Element;
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, };
//# sourceMappingURL=select.d.ts.map