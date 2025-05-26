import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

// Tooltip Provider
function TooltipProvider({ delayDuration = 0, ...props }) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
  );
}

// Root wrapper
function Tooltip({ children, ...props }) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root {...props}>
        {children}
      </TooltipPrimitive.Root>
    </TooltipProvider>
  );
}

// Trigger element
function TooltipTrigger({ ...props }) {
  return <TooltipPrimitive.Trigger {...props} />;
}

// Tooltip content shown below the trigger
function TooltipContent({
  className,
  sideOffset = 8,
  side = "bottom",
  children,
  ...props
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        side={side}
        sideOffset={sideOffset}
        className={cn(
          "bg-white text-black border border-gray-200 shadow-lg rounded-md " +
          "px-3 py-1 text-xs font-normal z-50 w-fit " + // 👈 updated here
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
        <TooltipPrimitive.Arrow
          className="fill-white stroke-gray-200 drop-shadow-md"
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}


export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
