import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
declare function Popover(props: PopoverPrimitive.PopoverProps): React.JSX.Element;
declare function PopoverTrigger(props: PopoverPrimitive.PopoverTriggerProps): React.JSX.Element;
interface PopoverContentProps extends PopoverPrimitive.PopoverContentProps {
    className?: string;
    align?: PopoverPrimitive.PopoverContentProps["align"];
    sideOffset?: number;
}
declare function PopoverContent({ className, align, sideOffset, ...props }: PopoverContentProps): React.JSX.Element;
declare function PopoverAnchor(props: PopoverPrimitive.PopoverAnchorProps): React.JSX.Element;
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
//# sourceMappingURL=popover.d.ts.map