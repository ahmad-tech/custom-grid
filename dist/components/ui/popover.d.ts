import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
type PopoverProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;
type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>;
type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    className?: string;
    align?: "start" | "center" | "end";
    sideOffset?: number;
};
type PopoverAnchorProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Anchor>;
declare function Popover(props: PopoverProps): React.JSX.Element;
declare function PopoverTrigger(props: PopoverTriggerProps): React.JSX.Element;
declare function PopoverContent({ className, align, sideOffset, ...props }: PopoverContentProps): React.JSX.Element;
declare function PopoverAnchor(props: PopoverAnchorProps): React.JSX.Element;
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
//# sourceMappingURL=popover.d.ts.map