import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
type TooltipProviderProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>;
declare function TooltipProvider({ delayDuration, ...props }: TooltipProviderProps): React.JSX.Element;
type TooltipProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>;
declare function Tooltip({ children, ...props }: TooltipProps): React.JSX.Element;
type TooltipTriggerProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>;
declare function TooltipTrigger(props: TooltipTriggerProps): React.JSX.Element;
type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    className?: string;
    sideOffset?: number;
    side?: "top" | "right" | "bottom" | "left";
    children?: React.ReactNode;
};
declare function TooltipContent({ className, sideOffset, side, children, ...props }: TooltipContentProps): React.JSX.Element;
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
//# sourceMappingURL=tooltip.d.ts.map