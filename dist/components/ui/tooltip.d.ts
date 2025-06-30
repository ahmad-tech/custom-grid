import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
interface TooltipProviderProps extends TooltipPrimitive.TooltipProviderProps {
    delayDuration?: number;
}
declare function TooltipProvider({ delayDuration, ...props }: TooltipProviderProps): React.JSX.Element;
declare function Tooltip(props: TooltipPrimitive.TooltipProps): React.JSX.Element;
declare function TooltipTrigger(props: TooltipPrimitive.TooltipTriggerProps): React.JSX.Element;
interface TooltipContentProps extends TooltipPrimitive.TooltipContentProps {
    className?: string;
    children?: React.ReactNode;
    sideOffset?: number;
}
declare function TooltipContent({ className, sideOffset, children, ...props }: TooltipContentProps): React.JSX.Element;
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
//# sourceMappingURL=tooltip.d.ts.map