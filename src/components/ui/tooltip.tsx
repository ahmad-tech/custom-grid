import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

// TooltipProvider props
type TooltipProviderProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Provider
>;

function TooltipProvider({
  delayDuration = 0,
  ...props
}: TooltipProviderProps) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />;
}

// Tooltip root props
type TooltipProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Root
>;

function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
    </TooltipProvider>
  );
}

// Tooltip trigger props
type TooltipTriggerProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Trigger
>;

function TooltipTrigger(props: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger {...props} />;
}

// Tooltip content props
type TooltipContentProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
> & {
  className?: string;
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
  children?: React.ReactNode;
};

function TooltipContent({
  className,
  sideOffset = 8,
  side = "bottom",
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        side={side}
        sideOffset={sideOffset}
        className={cn(
          "bg-white text-black border border-gray-200 shadow-lg rounded-md " +
            "px-3 py-1 text-xs font-normal z-50 w-fit " +
            "animate-in fade-in-0 zoom-in-95 " +
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 " +
            "data-[state=closed]:zoom-out-95 " +
            "data-[side=bottom]:slide-in-from-top-2 " +
            "data-[side=top]:slide-in-from-bottom-2 " +
            "data-[side=left]:slide-in-from-right-2 " +
            "data-[side=right]:slide-in-from-left-2",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="fill-white stroke-gray-200 drop-shadow-md" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
