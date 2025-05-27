import { __rest, __assign, __spreadArray } from 'tslib';
import * as React from 'react';
import React__default, { useState, useMemo, useCallback, useEffect, useRef, useLayoutEffect, forwardRef, useImperativeHandle } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { debounce } from 'lodash';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, Calendar, XCircle, ChevronLeftIcon, ChevronRightIcon, Clock, CalendarIcon, CircleCheck, CircleAlert, X, Search, GripVertical, ChevronUp, ChevronDown, ChevronsUpDown, ListFilter, List, ChevronRight } from 'lucide-react';
import { PulseLoader } from 'react-spinners';
import * as SelectPrimitive from '@radix-ui/react-select';
import { setYear, getYear, addMonths, subMonths, format, startOfYear, endOfYear, startOfMonth, setMonth, endOfMonth, getMonth, setHours, startOfHour, endOfHour, setMinutes, startOfMinute, endOfMinute, setMilliseconds, setSeconds, startOfDay, endOfDay, addHours, subHours, parse, isValid } from 'date-fns';
import { TZDate, DayPicker } from 'react-day-picker';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import moment from 'moment';
import * as SwitchPrimitive from '@radix-ui/react-switch';

/**
 * Combines multiple class names and merges Tailwind CSS classes
 * @param inputs - Class names to combine
 * @returns Merged class string
 */
function cn() {
  var inputs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    inputs[_i] = arguments[_i];
  }
  return twMerge(clsx(inputs));
}

var Table = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/React.createElement("div", {
    "data-slot": "table-container",
    className: "relative w-full h-[100%]"
  }, /*#__PURE__*/React.createElement("table", __assign({
    ref: ref,
    "data-slot": "table",
    className: cn("w-full caption-bottom text-sm h-[100%]", className)
  }, props)));
});
Table.displayName = "Table";
var TableHeader = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/React.createElement("thead", __assign({
    ref: ref,
    "data-slot": "table-header",
    className: cn("[&_tr]:border-b", className)
  }, props));
});
TableHeader.displayName = "TableHeader";
var TableBody = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/React.createElement("tbody", __assign({
    ref: ref,
    "data-slot": "table-body",
    className: cn("[&_tr:last-child]:border-0", className)
  }, props));
});
TableBody.displayName = "TableBody";
var TableFooter = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/React.createElement("tfoot", __assign({
    ref: ref,
    "data-slot": "table-footer",
    className: cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)
  }, props));
});
TableFooter.displayName = "TableFooter";
var TableRow = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/React.createElement("tr", __assign({
    ref: ref,
    "data-slot": "table-row",
    className: cn("data-[state=selected]:bg-muted border-b border-gray-200 transition-colors", className)
  }, props));
});
TableRow.displayName = "TableRow";
var TableHead = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/React.createElement("th", __assign({
    ref: ref,
    "data-slot": "table-head",
    className: cn("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)
  }, props));
});
TableHead.displayName = "TableHead";
var TableCell = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/React.createElement("td", __assign({
    ref: ref,
    "data-slot": "table-cell",
    className: cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)
  }, props));
});
TableCell.displayName = "TableCell";
var TableCaption = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/React.createElement("caption", __assign({
    ref: ref,
    "data-slot": "table-caption",
    className: cn("text-muted-foreground mt-4 text-sm", className)
  }, props));
});
TableCaption.displayName = "TableCaption";

function Checkbox(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/React.createElement(CheckboxPrimitive.Root, __assign({
    "data-slot": "checkbox",
    className: cn("peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className)
  }, props), /*#__PURE__*/React.createElement(CheckboxPrimitive.Indicator, {
    "data-slot": "checkbox-indicator",
    className: "flex items-center justify-center text-current transition-none"
  }, /*#__PURE__*/React.createElement(CheckIcon, {
    className: "size-3.5"
  })));
}

var Input = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    type = _a.type,
    props = __rest(_a, ["className", "type"]);
  return /*#__PURE__*/React.createElement("input", __assign({
    type: type,
    "data-slot": "input",
    className: cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
    ref: ref
  }, props));
});
Input.displayName = "Input";

function Select(props) {
  return /*#__PURE__*/React.createElement(SelectPrimitive.Root, __assign({
    "data-slot": "select"
  }, props));
}
function SelectGroup(props) {
  return /*#__PURE__*/React.createElement(SelectPrimitive.Group, __assign({
    "data-slot": "select-group"
  }, props));
}
function SelectValue(props) {
  return /*#__PURE__*/React.createElement(SelectPrimitive.Value, __assign({
    "data-slot": "select-value"
  }, props));
}
function SelectTrigger(_a) {
  var className = _a.className,
    _b = _a.size,
    size = _b === void 0 ? "default" : _b,
    children = _a.children,
    props = __rest(_a, ["className", "size", "children"]);
  return /*#__PURE__*/React.createElement(SelectPrimitive.Trigger, __assign({
    "data-slot": "select-trigger",
    "data-size": size,
    className: cn("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)
  }, props), children, /*#__PURE__*/React.createElement(SelectPrimitive.Icon, {
    asChild: true
  }, /*#__PURE__*/React.createElement(ChevronDownIcon, {
    className: "size-4 opacity-50"
  })));
}
function SelectContent(_a) {
  var className = _a.className,
    children = _a.children,
    _b = _a.position,
    position = _b === void 0 ? "popper" : _b,
    props = __rest(_a, ["className", "children", "position"]);
  return /*#__PURE__*/React.createElement(SelectPrimitive.Portal, null, /*#__PURE__*/React.createElement(SelectPrimitive.Content, __assign({
    "data-slot": "select-content",
    className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
    position: position
  }, props), /*#__PURE__*/React.createElement(SelectScrollUpButton, null), /*#__PURE__*/React.createElement(SelectPrimitive.Viewport, {
    className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1")
  }, children), /*#__PURE__*/React.createElement(SelectScrollDownButton, null)));
}
function SelectItem(_a) {
  var className = _a.className,
    children = _a.children,
    props = __rest(_a, ["className", "children"]);
  return /*#__PURE__*/React.createElement(SelectPrimitive.Item, __assign({
    "data-slot": "select-item",
    className: cn("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className)
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "absolute right-2 flex size-3.5 items-center justify-center"
  }, /*#__PURE__*/React.createElement(SelectPrimitive.ItemIndicator, null, /*#__PURE__*/React.createElement(CheckIcon, {
    className: "size-4"
  }))), /*#__PURE__*/React.createElement(SelectPrimitive.ItemText, null, children));
}
function SelectScrollUpButton(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/React.createElement(SelectPrimitive.ScrollUpButton, __assign({
    "data-slot": "select-scroll-up-button",
    className: cn("flex cursor-default items-center justify-center py-1", className)
  }, props), /*#__PURE__*/React.createElement(ChevronUpIcon, {
    className: "size-4"
  }));
}
function SelectScrollDownButton(_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/React.createElement(SelectPrimitive.ScrollDownButton, __assign({
    "data-slot": "select-scroll-down-button",
    className: cn("flex cursor-default items-center justify-center py-1", className)
  }, props), /*#__PURE__*/React.createElement(ChevronDownIcon, {
    className: "size-4"
  }));
}

var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
      destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
var Button = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    variant = _a.variant,
    size = _a.size,
    _b = _a.asChild,
    asChild = _b === void 0 ? false : _b,
    props = __rest(_a, ["className", "variant", "size", "asChild"]);
  var Comp = asChild ? Slot : "button";
  return /*#__PURE__*/React.createElement(Comp, __assign({
    className: cn(buttonVariants({
      variant: variant,
      size: size,
      className: className
    })),
    ref: ref
  }, props));
});
Button.displayName = "Button";

function Popover(props) {
  return /*#__PURE__*/React.createElement(PopoverPrimitive.Root, __assign({
    "data-slot": "popover"
  }, props));
}
function PopoverTrigger(props) {
  return /*#__PURE__*/React.createElement(PopoverPrimitive.Trigger, __assign({
    "data-slot": "popover-trigger"
  }, props));
}
function PopoverContent(_a) {
  var className = _a.className,
    _b = _a.align,
    align = _b === void 0 ? "center" : _b,
    _c = _a.sideOffset,
    sideOffset = _c === void 0 ? 4 : _c,
    props = __rest(_a, ["className", "align", "sideOffset"]);
  return /*#__PURE__*/React.createElement(PopoverPrimitive.Portal, null, /*#__PURE__*/React.createElement(PopoverPrimitive.Content, __assign({
    "data-slot": "popover-content",
    align: align,
    sideOffset: sideOffset,
    className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-[--radix-popover-content-transform-origin] rounded-md border p-4 shadow-md outline-hidden", className)
  }, props)));
}

// ⬅️ Move ScrollBar component first
var ScrollBar = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    _b = _a.orientation,
    orientation = _b === void 0 ? "vertical" : _b,
    props = __rest(_a, ["className", "orientation"]);
  return /*#__PURE__*/React.createElement(ScrollAreaPrimitive.ScrollAreaScrollbar, __assign({
    ref: ref,
    orientation: orientation,
    className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className)
  }, props), /*#__PURE__*/React.createElement(ScrollAreaPrimitive.ScrollAreaThumb, {
    className: "relative flex-1 rounded-full bg-border"
  }));
});
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
// ⬇️ ScrollArea defined after ScrollBar
var ScrollArea = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    children = _a.children,
    props = __rest(_a, ["className", "children"]);
  return /*#__PURE__*/React.createElement(ScrollAreaPrimitive.Root, __assign({
    ref: ref,
    className: cn("relative overflow-hidden", className)
  }, props), /*#__PURE__*/React.createElement(ScrollAreaPrimitive.Viewport, {
    className: "h-full w-full rounded-[inherit]"
  }, children), /*#__PURE__*/React.createElement(ScrollBar, null), /*#__PURE__*/React.createElement(ScrollAreaPrimitive.Corner, null));
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

var AM_VALUE$1 = 0;
var PM_VALUE$1 = 1;
function DateTimePicker(_a) {
  var value = _a.value,
    onChange = _a.onChange,
    renderTrigger = _a.renderTrigger,
    min = _a.min,
    max = _a.max,
    timezone = _a.timezone,
    hideTime = _a.hideTime,
    use12HourFormat = _a.use12HourFormat,
    disabled = _a.disabled,
    clearable = _a.clearable,
    classNames = _a.classNames,
    timePicker = _a.timePicker,
    _b = _a.modal,
    modal = _b === void 0 ? false : _b,
    props = __rest(_a, ["value", "onChange", "renderTrigger", "min", "max", "timezone", "hideTime", "use12HourFormat", "disabled", "clearable", "classNames", "timePicker", "modal"]);
  var _c = useState(false),
    open = _c[0],
    setOpen = _c[1];
  var _d = useState(false),
    monthYearPicker = _d[0],
    setMonthYearPicker = _d[1];
  var initDate = useMemo(function () {
    return new TZDate(value || new Date(), timezone);
  }, [value, timezone]);
  var _e = useState(initDate),
    month = _e[0],
    setMonth = _e[1];
  var _f = useState(initDate),
    date = _f[0],
    setDate = _f[1];
  var endMonth = useMemo(function () {
    return setYear(month, getYear(month) + 1);
  }, [month]);
  var minDate = useMemo(function () {
    return min ? new TZDate(min, timezone) : undefined;
  }, [min, timezone]);
  var maxDate = useMemo(function () {
    return max ? new TZDate(max, timezone) : undefined;
  }, [max, timezone]);
  var onDayChanged = useCallback(function (d) {
    d.setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    if (min && d < min) {
      d.setHours(min.getHours(), min.getMinutes(), min.getSeconds());
    }
    if (max && d > max) {
      d.setHours(max.getHours(), max.getMinutes(), max.getSeconds());
    }
    setDate(d);
  }, [setDate, setMonth]);
  var onSubmit = useCallback(function () {
    onChange(new Date(date));
    setOpen(false);
  }, [date, onChange]);
  var onMonthYearChanged = useCallback(function (d, mode) {
    setMonth(d);
    if (mode === "year") {
      setMonthYearPicker("month");
    } else {
      setMonthYearPicker(false);
    }
  }, [setMonth, setMonthYearPicker]);
  var onNextMonth = useCallback(function () {
    setMonth(addMonths(month, 1));
  }, [month]);
  var onPrevMonth = useCallback(function () {
    setMonth(subMonths(month, 1));
  }, [month]);
  useEffect(function () {
    if (open) {
      setDate(initDate);
      setMonth(initDate);
      setMonthYearPicker(false);
    }
  }, [open, initDate]);
  var displayValue = useMemo(function () {
    if (!open && !value) return value;
    return open ? date : initDate;
  }, [date, value, open]);
  var dislayFormat = useMemo(function () {
    if (!displayValue) return "Pick a date";
    return format(displayValue, "".concat(!hideTime ? "MMM" : "MMMM", " d, yyyy").concat(!hideTime ? use12HourFormat ? " hh:mm:ss a" : " HH:mm:ss" : ""));
  }, [displayValue, hideTime, use12HourFormat]);
  return /*#__PURE__*/React.createElement(Popover, {
    open: open,
    onOpenChange: setOpen,
    modal: modal
  }, /*#__PURE__*/React.createElement(PopoverTrigger, {
    asChild: true
  }, renderTrigger ? renderTrigger({
    value: displayValue,
    open: open,
    timezone: timezone,
    disabled: disabled,
    use12HourFormat: use12HourFormat,
    setOpen: setOpen
  }) : (/*#__PURE__*/React.createElement("div", {
    className: cn("flex w-full cursor-pointer items-center h-9 ps-3 pe-1 font-normal border border-input rounded-md text-sm shadow-sm", !displayValue && "text-muted-foreground", (!clearable || !value) && "pe-3", disabled && "opacity-50 cursor-not-allowed", classNames === null || classNames === void 0 ? void 0 : classNames.trigger),
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-grow flex items-center"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "mr-2 size-4"
  }), dislayFormat), clearable && value && (/*#__PURE__*/React.createElement(Button, {
    disabled: disabled,
    variant: "ghost",
    size: "sm",
    role: "button",
    "aria-label": "Clear date",
    className: "size-6 p-1 ms-1",
    onClick: function (e) {
      e.stopPropagation();
      e.preventDefault();
      onChange(undefined);
      setOpen(false);
    }
  }, /*#__PURE__*/React.createElement(XCircle, {
    className: "size-4"
  })))))), /*#__PURE__*/React.createElement(PopoverContent, {
    className: "w-auto p-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-md font-bold ms-2 flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    onClick: function () {
      return setMonthYearPicker(monthYearPicker === "month" ? false : "month");
    }
  }, format(month, "MMMM")), /*#__PURE__*/React.createElement("span", {
    className: "ms-1",
    onClick: function () {
      return setMonthYearPicker(monthYearPicker === "year" ? false : "year");
    }
  }, format(month, "yyyy"))), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon",
    onClick: function () {
      return setMonthYearPicker(monthYearPicker ? false : "year");
    }
  }, monthYearPicker ? /*#__PURE__*/React.createElement(ChevronUpIcon, null) : /*#__PURE__*/React.createElement(ChevronDownIcon, null))), /*#__PURE__*/React.createElement("div", {
    className: cn("flex space-x-2", monthYearPicker ? "hidden" : "")
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon",
    onClick: onPrevMonth
  }, /*#__PURE__*/React.createElement(ChevronLeftIcon, null)), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon",
    onClick: onNextMonth
  }, /*#__PURE__*/React.createElement(ChevronRightIcon, null)))), /*#__PURE__*/React.createElement("div", {
    className: "relative overflow-hidden"
  }, /*#__PURE__*/React.createElement(DayPicker, __assign({
    timeZone: timezone,
    mode: "single",
    selected: date,
    onSelect: function (d) {
      return d && onDayChanged(d);
    },
    month: month,
    endMonth: endMonth,
    disabled: [max ? {
      after: max
    } : null, min ? {
      before: min
    } : null].filter(Boolean),
    onMonthChange: setMonth,
    classNames: {
      dropdowns: "flex w-full gap-2",
      months: "flex w-full h-fit",
      month: "flex flex-col w-full",
      month_caption: "hidden",
      button_previous: "hidden",
      button_next: "hidden",
      month_grid: "w-full border-collapse",
      weekdays: "flex justify-between mt-2",
      weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
      week: "flex w-full justify-between mt-2",
      day: "h-9 w-9 text-center text-sm p-0 relative flex items-center justify-center [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 rounded-1",
      day_button: cn(buttonVariants({
        variant: "ghost"
      }), "size-9 rounded-md p-0 font-normal aria-selected:opacity-100"),
      range_end: "day-range-end",
      selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-l-md rounded-r-md",
      today: "bg-accent text-accent-foreground",
      outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
      disabled: "text-muted-foreground opacity-50",
      range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
      hidden: "invisible"
    },
    showOutsideDays: true
  }, props)), /*#__PURE__*/React.createElement("div", {
    className: cn("absolute top-0 left-0 bottom-0 right-0", monthYearPicker ? "bg-popover" : "hidden")
  }), /*#__PURE__*/React.createElement(MonthYearPicker, {
    value: month,
    mode: monthYearPicker,
    onChange: onMonthYearChanged,
    minDate: minDate,
    maxDate: maxDate,
    className: cn("absolute top-0 left-0 bottom-0 right-0", monthYearPicker ? "" : "hidden")
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, !hideTime && (/*#__PURE__*/React.createElement(TimePicker, {
    timePicker: timePicker,
    value: date,
    onChange: setDate,
    use12HourFormat: use12HourFormat,
    min: minDate,
    max: maxDate
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row-reverse items-center justify-between"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "ms-2 h-7 px-2",
    onClick: onSubmit
  }, "Done"), timezone && (/*#__PURE__*/React.createElement("div", {
    className: "text-sm"
  }, /*#__PURE__*/React.createElement("span", null, "Timezone:"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold ms-1"
  }, timezone)))))));
}
function MonthYearPicker(_a) {
  var value = _a.value,
    minDate = _a.minDate,
    maxDate = _a.maxDate,
    _b = _a.mode,
    mode = _b === void 0 ? "month" : _b,
    onChange = _a.onChange,
    className = _a.className;
  var yearRef = useRef(null);
  var years = useMemo(function () {
    var years = [];
    for (var i = 1912; i < 2100; i++) {
      var disabled = false;
      var startY = startOfYear(setYear(value, i));
      var endY = endOfYear(setYear(value, i));
      if (minDate && endY < minDate) disabled = true;
      if (maxDate && startY > maxDate) disabled = true;
      years.push({
        value: i,
        label: i.toString(),
        disabled: disabled
      });
    }
    return years;
  }, [value]);
  var months = useMemo(function () {
    var months = [];
    for (var i = 0; i < 12; i++) {
      var disabled = false;
      var startM = startOfMonth(setMonth(value, i));
      var endM = endOfMonth(setMonth(value, i));
      if (minDate && endM < minDate) disabled = true;
      if (maxDate && startM > maxDate) disabled = true;
      months.push({
        value: i,
        label: format(new Date(0, i), "MMM"),
        disabled: disabled
      });
    }
    return months;
  }, [value]);
  var onYearChange = useCallback(function (v) {
    var newDate = setYear(value, v.value);
    if (minDate && newDate < minDate) {
      newDate = setMonth(newDate, getMonth(minDate));
    }
    if (maxDate && newDate > maxDate) {
      newDate = setMonth(newDate, getMonth(maxDate));
    }
    onChange(newDate, "year");
  }, [onChange, value, minDate, maxDate]);
  useEffect(function () {
    var _a;
    if (mode === "year") {
      (_a = yearRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
        behavior: "auto",
        block: "center"
      });
    }
  }, [mode, value]);
  return /*#__PURE__*/React.createElement("div", {
    className: cn(className)
  }, /*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-full"
  }, mode === "year" && (/*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-4"
  }, years.map(function (year) {
    return /*#__PURE__*/React.createElement("div", {
      key: year.value,
      ref: year.value === getYear(value) ? yearRef : undefined
    }, /*#__PURE__*/React.createElement(Button, {
      disabled: year.disabled,
      variant: getYear(value) === year.value ? "default" : "ghost",
      className: "rounded-full",
      onClick: function () {
        return onYearChange(year);
      }
    }, year.label));
  }))), mode === "month" && (/*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, months.map(function (month) {
    return /*#__PURE__*/React.createElement(Button, {
      key: month.value,
      size: "lg",
      disabled: month.disabled,
      variant: getMonth(value) === month.value ? "default" : "ghost",
      className: "rounded-full",
      onClick: function () {
        return onChange(setMonth(value, month.value), "month");
      }
    }, month.label);
  })))));
}
function TimePicker(_a) {
  var value = _a.value,
    onChange = _a.onChange,
    use12HourFormat = _a.use12HourFormat,
    min = _a.min,
    max = _a.max,
    timePicker = _a.timePicker;
  // hours24h = HH
  // hours12h = hh
  var formatStr = useMemo(function () {
    return use12HourFormat ? "yyyy-MM-dd hh:mm:ss.SSS a xxxx" : "yyyy-MM-dd HH:mm:ss.SSS xxxx";
  }, [use12HourFormat]);
  var _b = useState(format(value, "a") === "AM" ? AM_VALUE$1 : PM_VALUE$1),
    ampm = _b[0],
    setAmpm = _b[1];
  var _c = useState(use12HourFormat ? +format(value, "hh") : value.getHours()),
    hour = _c[0],
    setHour = _c[1];
  var _d = useState(value.getMinutes()),
    minute = _d[0],
    setMinute = _d[1];
  var _e = useState(value.getSeconds()),
    second = _e[0],
    setSecond = _e[1];
  useEffect(function () {
    onChange(buildTime$1({
      use12HourFormat: use12HourFormat,
      value: value,
      formatStr: formatStr,
      hour: hour,
      minute: minute,
      second: second,
      ampm: ampm
    }));
  }, [hour, minute, second, ampm, formatStr, use12HourFormat]);
  var _hourIn24h = useMemo(function () {
    // if (use12HourFormat) {
    //   return (hour % 12) + ampm * 12;
    // }
    return use12HourFormat ? hour % 12 + ampm * 12 : hour;
  }, [value, use12HourFormat, ampm]);
  var hours = useMemo(function () {
    return Array.from({
      length: use12HourFormat ? 12 : 24
    }, function (_, i) {
      var disabled = false;
      var hourValue = use12HourFormat ? i === 0 ? 12 : i : i;
      var hDate = setHours(value, use12HourFormat ? i + ampm * 12 : i);
      var hStart = startOfHour(hDate);
      var hEnd = endOfHour(hDate);
      if (min && hEnd < min) disabled = true;
      if (max && hStart > max) disabled = true;
      return {
        value: hourValue,
        label: hourValue.toString().padStart(2, "0"),
        disabled: disabled
      };
    });
  }, [value, min, max, use12HourFormat, ampm]);
  var minutes = useMemo(function () {
    var anchorDate = setHours(value, _hourIn24h);
    return Array.from({
      length: 60
    }, function (_, i) {
      var disabled = false;
      var mDate = setMinutes(anchorDate, i);
      var mStart = startOfMinute(mDate);
      var mEnd = endOfMinute(mDate);
      if (min && mEnd < min) disabled = true;
      if (max && mStart > max) disabled = true;
      return {
        value: i,
        label: i.toString().padStart(2, "0"),
        disabled: disabled
      };
    });
  }, [value, min, max, _hourIn24h]);
  var seconds = useMemo(function () {
    var anchorDate = setMilliseconds(setMinutes(setHours(value, _hourIn24h), minute), 0);
    var _min = min ? setMilliseconds(min, 0) : undefined;
    var _max = max ? setMilliseconds(max, 0) : undefined;
    return Array.from({
      length: 60
    }, function (_, i) {
      var disabled = false;
      var sDate = setSeconds(anchorDate, i);
      if (_min && sDate < _min) disabled = true;
      if (_max && sDate > _max) disabled = true;
      return {
        value: i,
        label: i.toString().padStart(2, "0"),
        disabled: disabled
      };
    });
  }, [value, minute, min, max, _hourIn24h]);
  var ampmOptions = useMemo(function () {
    var startD = startOfDay(value);
    var endD = endOfDay(value);
    return [{
      value: AM_VALUE$1,
      label: "AM"
    }, {
      value: PM_VALUE$1,
      label: "PM"
    }].map(function (v) {
      var disabled = false;
      var start = addHours(startD, v.value * 12);
      var end = subHours(endD, (1 - v.value) * 12);
      if (min && end < min) disabled = true;
      if (max && start > max) disabled = true;
      return __assign(__assign({}, v), {
        disabled: disabled
      });
    });
  }, [value, min, max]);
  var _f = useState(false),
    open = _f[0],
    setOpen = _f[1];
  var hourRef = useRef(null);
  var minuteRef = useRef(null);
  var secondRef = useRef(null);
  useEffect(function () {
    var timeoutId = setTimeout(function () {
      var _a, _b, _c;
      if (open) {
        (_a = hourRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
          behavior: "auto"
        });
        (_b = minuteRef.current) === null || _b === void 0 ? void 0 : _b.scrollIntoView({
          behavior: "auto"
        });
        (_c = secondRef.current) === null || _c === void 0 ? void 0 : _c.scrollIntoView({
          behavior: "auto"
        });
      }
    }, 1);
    return function () {
      return clearTimeout(timeoutId);
    };
  }, [open]);
  var onHourChange = useCallback(function (v) {
    if (min) {
      var newTime = buildTime$1({
        use12HourFormat: use12HourFormat,
        value: value,
        formatStr: formatStr,
        hour: v.value,
        minute: minute,
        second: second,
        ampm: ampm
      });
      if (newTime < min) {
        setMinute(min.getMinutes());
        setSecond(min.getSeconds());
      }
    }
    if (max) {
      var newTime = buildTime$1({
        use12HourFormat: use12HourFormat,
        value: value,
        formatStr: formatStr,
        hour: v.value,
        minute: minute,
        second: second,
        ampm: ampm
      });
      if (newTime > max) {
        setMinute(max.getMinutes());
        setSecond(max.getSeconds());
      }
    }
    setHour(v.value);
  }, [setHour, use12HourFormat, value, formatStr, minute, second, ampm]);
  var onMinuteChange = useCallback(function (v) {
    if (min) {
      var newTime = buildTime$1({
        use12HourFormat: use12HourFormat,
        value: value,
        formatStr: formatStr,
        hour: v.value,
        minute: minute,
        second: second,
        ampm: ampm
      });
      if (newTime < min) {
        setSecond(min.getSeconds());
      }
    }
    if (max) {
      var newTime = buildTime$1({
        use12HourFormat: use12HourFormat,
        value: value,
        formatStr: formatStr,
        hour: v.value,
        minute: minute,
        second: second,
        ampm: ampm
      });
      if (newTime > max) {
        setSecond(newTime.getSeconds());
      }
    }
    setMinute(v.value);
  }, [setMinute, use12HourFormat, value, formatStr, hour, second, ampm]);
  var onAmpmChange = useCallback(function (v) {
    if (min) {
      var newTime = buildTime$1({
        use12HourFormat: use12HourFormat,
        value: value,
        formatStr: formatStr,
        hour: hour,
        minute: minute,
        second: second,
        ampm: v.value
      });
      if (newTime < min) {
        var minH = min.getHours() % 12;
        setHour(minH === 0 ? 12 : minH);
        setMinute(min.getMinutes());
        setSecond(min.getSeconds());
      }
    }
    if (max) {
      var newTime = buildTime$1({
        use12HourFormat: use12HourFormat,
        value: value,
        formatStr: formatStr,
        hour: hour,
        minute: minute,
        second: second,
        ampm: v.value
      });
      if (newTime > max) {
        var maxH = max.getHours() % 12;
        setHour(maxH === 0 ? 12 : maxH);
        setMinute(max.getMinutes());
        setSecond(max.getSeconds());
      }
    }
    setAmpm(v.value);
  }, [setAmpm, use12HourFormat, value, formatStr, hour, minute, second, min, max]);
  var display = useMemo(function () {
    var arr = [];
    for (var _i = 0, _a = ["hour", "minute", "second"]; _i < _a.length; _i++) {
      var element = _a[_i];
      if (!timePicker || timePicker[element]) {
        if (element === "hour") {
          arr.push(use12HourFormat ? "hh" : "HH");
        } else {
          arr.push(element === "minute" ? "mm" : "ss");
        }
      }
    }
    return format(value, arr.join(":") + (use12HourFormat ? " a" : ""));
  }, [value, use12HourFormat, timePicker]);
  return /*#__PURE__*/React.createElement(Popover, {
    open: open,
    onOpenChange: setOpen
  }, /*#__PURE__*/React.createElement(PopoverTrigger, {
    asChild: true
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    role: "combobox",
    "aria-expanded": open,
    className: "justify-between"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "mr-2 size-4"
  }), display, /*#__PURE__*/React.createElement(ChevronDownIcon, {
    className: "ml-2 size-4 shrink-0 opacity-50"
  }))), /*#__PURE__*/React.createElement(PopoverContent, {
    className: "p-0",
    side: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-col gap-2 p-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex h-56 grow"
  }, (!timePicker || timePicker.hour) && (/*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2 pb-48"
  }, hours.map(function (v) {
    return /*#__PURE__*/React.createElement("div", {
      key: v.value,
      ref: v.value === hour ? hourRef : undefined
    }, /*#__PURE__*/React.createElement(TimeItem$1, {
      option: v,
      selected: v.value === hour,
      onSelect: onHourChange,
      className: "h-8",
      disabled: v.disabled
    }));
  })))), (!timePicker || timePicker.minute) && (/*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2 pb-48"
  }, minutes.map(function (v) {
    return /*#__PURE__*/React.createElement("div", {
      key: v.value,
      ref: v.value === minute ? minuteRef : undefined
    }, /*#__PURE__*/React.createElement(TimeItem$1, {
      option: v,
      selected: v.value === minute,
      onSelect: onMinuteChange,
      className: "h-8",
      disabled: v.disabled
    }));
  })))), (!timePicker || timePicker.second) && (/*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2 pb-48"
  }, seconds.map(function (v) {
    return /*#__PURE__*/React.createElement("div", {
      key: v.value,
      ref: v.value === second ? secondRef : undefined
    }, /*#__PURE__*/React.createElement(TimeItem$1, {
      option: v,
      selected: v.value === second,
      onSelect: function (v) {
        return setSecond(v.value);
      },
      className: "h-8",
      disabled: v.disabled
    }));
  })))), use12HourFormat && (/*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2"
  }, ampmOptions.map(function (v) {
    return /*#__PURE__*/React.createElement(TimeItem$1, {
      key: v.value,
      option: v,
      selected: v.value === ampm,
      onSelect: onAmpmChange,
      className: "h-8",
      disabled: v.disabled
    });
  }))))))));
}
var TimeItem$1 = function (_a) {
  var option = _a.option,
    selected = _a.selected,
    onSelect = _a.onSelect,
    className = _a.className,
    disabled = _a.disabled;
  return /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    className: cn("flex justify-center px-1 pe-2 ps-1", className),
    onClick: function () {
      return onSelect(option);
    },
    disabled: disabled
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-4"
  }, selected && /*#__PURE__*/React.createElement(CheckIcon, {
    className: "my-auto size-4"
  })), /*#__PURE__*/React.createElement("span", {
    className: "ms-2"
  }, option.label));
};
function buildTime$1(options) {
  var use12HourFormat = options.use12HourFormat,
    value = options.value,
    formatStr = options.formatStr,
    hour = options.hour,
    minute = options.minute,
    second = options.second,
    ampm = options.ampm;
  var date;
  if (use12HourFormat) {
    var dateStrRaw = format(value, formatStr);
    // yyyy-MM-dd hh:mm:ss.SSS a zzzz
    // 2024-10-14 01:20:07.524 AM GMT+00:00
    var dateStr = dateStrRaw.slice(0, 11) + hour.toString().padStart(2, "0") + dateStrRaw.slice(13);
    dateStr = dateStr.slice(0, 14) + minute.toString().padStart(2, "0") + dateStr.slice(16);
    dateStr = dateStr.slice(0, 17) + second.toString().padStart(2, "0") + dateStr.slice(19);
    dateStr = dateStr.slice(0, 24) + (ampm == AM_VALUE$1 ? "AM" : "PM") + dateStr.slice(26);
    date = parse(dateStr, formatStr, value);
  } else {
    date = setHours(setMinutes(setSeconds(value, second), minute), hour);
  }
  return date;
}

var AM_VALUE = 0;
var PM_VALUE = 1;
function SimpleTimePicker(_a) {
  var value = _a.value,
    onChange = _a.onChange,
    use12HourFormat = _a.use12HourFormat,
    min = _a.min,
    max = _a.max,
    disabled = _a.disabled,
    modal = _a.modal,
    onSubmit = _a.onSubmit;
  // hours24h = HH
  // hours12h = hh
  var formatStr = useMemo(function () {
    return use12HourFormat ? "yyyy-MM-dd hh:mm:ss.SSS a xxxx" : "yyyy-MM-dd HH:mm:ss.SSS xxxx";
  }, [use12HourFormat]);
  var _b = useState(format(value, "a") === "AM" ? AM_VALUE : PM_VALUE),
    ampm = _b[0],
    setAmpm = _b[1];
  var _c = useState(use12HourFormat ? +format(value, "hh") : value.getHours()),
    hour = _c[0],
    setHour = _c[1];
  var _d = useState(value.getMinutes()),
    minute = _d[0],
    setMinute = _d[1];
  var _e = useState(value.getSeconds()),
    second = _e[0],
    setSecond = _e[1];
  useEffect(function () {
    onChange(buildTime({
      use12HourFormat: use12HourFormat,
      value: value,
      formatStr: formatStr,
      hour: hour,
      minute: minute,
      second: second,
      ampm: ampm
    }));
  }, [hour, minute, second, ampm, formatStr, use12HourFormat]);
  var _hourIn24h = useMemo(function () {
    return use12HourFormat ? hour % 12 + ampm * 12 : hour;
  }, [hour, use12HourFormat, ampm]);
  var hours = useMemo(function () {
    return Array.from({
      length: use12HourFormat ? 12 : 24
    }, function (_, i) {
      var disabled = false;
      var hourValue = use12HourFormat ? i === 0 ? 12 : i : i;
      var hDate = setHours(value, use12HourFormat ? i + ampm * 12 : i);
      var hStart = startOfHour(hDate);
      var hEnd = endOfHour(hDate);
      if (min && hEnd < min) disabled = true;
      if (max && hStart > max) disabled = true;
      return {
        value: hourValue,
        label: hourValue.toString().padStart(2, "0"),
        disabled: disabled
      };
    });
  }, [value, min, max, use12HourFormat, ampm]);
  var minutes = useMemo(function () {
    var anchorDate = setHours(value, _hourIn24h);
    return Array.from({
      length: 60
    }, function (_, i) {
      var disabled = false;
      var mDate = setMinutes(anchorDate, i);
      var mStart = startOfMinute(mDate);
      var mEnd = endOfMinute(mDate);
      if (min && mEnd < min) disabled = true;
      if (max && mStart > max) disabled = true;
      return {
        value: i,
        label: i.toString().padStart(2, "0"),
        disabled: disabled
      };
    });
  }, [value, min, max, _hourIn24h]);
  var seconds = useMemo(function () {
    var anchorDate = setMilliseconds(setMinutes(setHours(value, _hourIn24h), minute), 0);
    var _min = min ? setMilliseconds(min, 0) : undefined;
    var _max = max ? setMilliseconds(max, 0) : undefined;
    return Array.from({
      length: 60
    }, function (_, i) {
      var disabled = false;
      var sDate = setSeconds(anchorDate, i);
      if (_min && sDate < _min) disabled = true;
      if (_max && sDate > _max) disabled = true;
      return {
        value: i,
        label: i.toString().padStart(2, "0"),
        disabled: disabled
      };
    });
  }, [value, minute, min, max, _hourIn24h]);
  var ampmOptions = useMemo(function () {
    var startD = startOfDay(value);
    var endD = endOfDay(value);
    return [{
      value: AM_VALUE,
      label: "AM"
    }, {
      value: PM_VALUE,
      label: "PM"
    }].map(function (v) {
      var disabled = false;
      var start = addHours(startD, v.value * 12);
      var end = subHours(endD, (1 - v.value) * 12);
      if (min && end < min) disabled = true;
      if (max && start > max) disabled = true;
      return __assign(__assign({}, v), {
        disabled: disabled
      });
    });
  }, [value, min, max]);
  var _f = useState(false),
    open = _f[0],
    setOpen = _f[1];
  var hourRef = useRef(null);
  var minuteRef = useRef(null);
  var secondRef = useRef(null);
  useEffect(function () {
    var timeoutId = setTimeout(function () {
      var _a, _b, _c;
      if (open) {
        (_a = hourRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
          behavior: "auto"
        });
        (_b = minuteRef.current) === null || _b === void 0 ? void 0 : _b.scrollIntoView({
          behavior: "auto"
        });
        (_c = secondRef.current) === null || _c === void 0 ? void 0 : _c.scrollIntoView({
          behavior: "auto"
        });
      }
    }, 1);
    return function () {
      return clearTimeout(timeoutId);
    };
  }, [open]);
  var onHourChange = useCallback(function (v) {
    if (min) {
      var newTime = buildTime({
        use12HourFormat: use12HourFormat,
        value: value,
        formatStr: formatStr,
        hour: v.value,
        minute: minute,
        second: second,
        ampm: ampm
      });
      if (newTime < min) {
        setMinute(min.getMinutes());
        setSecond(min.getSeconds());
      }
    }
    if (max) {
      var newTime = buildTime({
        use12HourFormat: use12HourFormat,
        value: value,
        formatStr: formatStr,
        hour: v.value,
        minute: minute,
        second: second,
        ampm: ampm
      });
      if (newTime > max) {
        setMinute(max.getMinutes());
        setSecond(max.getSeconds());
      }
    }
    setHour(v.value);
  }, [setHour, use12HourFormat, value, formatStr, minute, second, ampm]);
  var onMinuteChange = useCallback(function (v) {
    if (min) {
      var newTime = buildTime({
        use12HourFormat: use12HourFormat,
        value: value,
        formatStr: formatStr,
        hour: v.value,
        minute: minute,
        second: second,
        ampm: ampm
      });
      if (newTime < min) {
        setSecond(min.getSeconds());
      }
    }
    if (max) {
      var newTime = buildTime({
        use12HourFormat: use12HourFormat,
        value: value,
        formatStr: formatStr,
        hour: v.value,
        minute: minute,
        second: second,
        ampm: ampm
      });
      if (newTime > max) {
        setSecond(newTime.getSeconds());
      }
    }
    setMinute(v.value);
  }, [setMinute, use12HourFormat, value, formatStr, hour, second, ampm]);
  var onAmpmChange = useCallback(function (v) {
    if (min) {
      var newTime = buildTime({
        use12HourFormat: use12HourFormat,
        value: value,
        formatStr: formatStr,
        hour: hour,
        minute: minute,
        second: second,
        ampm: v.value
      });
      if (newTime < min) {
        var minH = min.getHours() % 12;
        setHour(minH === 0 ? 12 : minH);
        setMinute(min.getMinutes());
        setSecond(min.getSeconds());
      }
    }
    if (max) {
      var newTime = buildTime({
        use12HourFormat: use12HourFormat,
        value: value,
        formatStr: formatStr,
        hour: hour,
        minute: minute,
        second: second,
        ampm: v.value
      });
      if (newTime > max) {
        var maxH = max.getHours() % 12;
        setHour(maxH === 0 ? 12 : maxH);
        setMinute(max.getMinutes());
        setSecond(max.getSeconds());
      }
    }
    setAmpm(v.value);
  }, [setAmpm, use12HourFormat, value, formatStr, hour, minute, second, min, max]);
  var display = useMemo(function () {
    return format(value, use12HourFormat ? "hh:mm:ss a" : "HH:mm:ss");
  }, [value, use12HourFormat]);
  return /*#__PURE__*/React.createElement(Popover, {
    open: open,
    onOpenChange: setOpen,
    modal: modal
  }, /*#__PURE__*/React.createElement(PopoverTrigger, {
    asChild: true
  }, /*#__PURE__*/React.createElement("div", {
    role: "combobox",
    "aria-expanded": open,
    className: cn("flex h-9 px-3 items-center justify-between cursor-pointer font-normal border border-input rounded-md text-sm shadow-sm", disabled && "opacity-50 cursor-not-allowed"),
    tabIndex: 0
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "mr-2 size-4"
  }), display, /*#__PURE__*/React.createElement(ChevronDownIcon, {
    className: "ml-2 size-4 shrink-0 opacity-50"
  }))), /*#__PURE__*/React.createElement(PopoverContent, {
    className: "p-0",
    side: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-col gap-2 p-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex h-56 grow"
  }, /*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2 pb-48"
  }, hours.map(function (v) {
    return /*#__PURE__*/React.createElement("div", {
      ref: v.value === hour ? hourRef : undefined,
      key: v.value
    }, /*#__PURE__*/React.createElement(TimeItem, {
      option: v,
      selected: v.value === hour,
      onSelect: onHourChange,
      disabled: v.disabled,
      className: "h-8"
    }));
  }))), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2 pb-48"
  }, minutes.map(function (v) {
    return /*#__PURE__*/React.createElement("div", {
      ref: v.value === minute ? minuteRef : undefined,
      key: v.value
    }, /*#__PURE__*/React.createElement(TimeItem, {
      option: v,
      selected: v.value === minute,
      onSelect: onMinuteChange,
      disabled: v.disabled,
      className: "h-8"
    }));
  }))), /*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2 pb-48"
  }, seconds.map(function (v) {
    return /*#__PURE__*/React.createElement("div", {
      ref: v.value === second ? secondRef : undefined,
      key: v.value
    }, /*#__PURE__*/React.createElement(TimeItem, {
      option: v,
      selected: v.value === second,
      onSelect: function (v) {
        return setSecond(v.value);
      },
      className: "h-8",
      disabled: v.disabled
    }));
  }))), use12HourFormat && (/*#__PURE__*/React.createElement(ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2"
  }, ampmOptions.map(function (v) {
    return /*#__PURE__*/React.createElement(TimeItem, {
      key: v.value,
      option: v,
      selected: v.value === ampm,
      onSelect: onAmpmChange,
      className: "h-8",
      disabled: v.disabled
    });
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row-reverse items-center justify-between"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "ms-2 h-7 px-2",
    onClick: function () {
      onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(buildTime({
        use12HourFormat: use12HourFormat,
        value: value,
        formatStr: formatStr,
        hour: hour,
        minute: minute,
        second: second,
        ampm: ampm
      }));
    }
  }, "Done")))));
}
var TimeItem = function (_a) {
  var option = _a.option,
    selected = _a.selected,
    onSelect = _a.onSelect,
    className = _a.className,
    disabled = _a.disabled;
  return /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    className: cn("flex justify-center px-1 pe-2 ps-1", className),
    onClick: function () {
      return onSelect(option);
    },
    disabled: disabled
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-4"
  }, selected && /*#__PURE__*/React.createElement(CheckIcon, {
    className: "my-auto size-4"
  })), /*#__PURE__*/React.createElement("span", {
    className: "ms-2"
  }, option.label));
};
function buildTime(options) {
  var use12HourFormat = options.use12HourFormat,
    value = options.value,
    formatStr = options.formatStr,
    hour = options.hour,
    minute = options.minute,
    second = options.second,
    ampm = options.ampm;
  var date;
  if (use12HourFormat) {
    var dateStrRaw = format(value, formatStr);
    // yyyy-MM-dd hh:mm:ss.SSS a zzzz
    // 2024-10-14 01:20:07.524 AM GMT+00:00
    var dateStr = dateStrRaw.slice(0, 11) + hour.toString().padStart(2, "0") + dateStrRaw.slice(13);
    dateStr = dateStr.slice(0, 14) + minute.toString().padStart(2, "0") + dateStr.slice(16);
    dateStr = dateStr.slice(0, 17) + second.toString().padStart(2, "0") + dateStr.slice(19);
    dateStr = dateStr.slice(0, 24) + (ampm == AM_VALUE ? "AM" : "PM") + dateStr.slice(26);
    date = parse(dateStr, formatStr, value);
  } else {
    date = setHours(setMinutes(setSeconds(setMilliseconds(value, 0), second), minute), hour);
  }
  return date;
}

const HookFormContext = React__default.createContext(null);
/**
 * This custom hook allows you to access the form context. useFormContext is intended to be used in deeply nested structures, where it would become inconvenient to pass the context as a prop. To be used with {@link FormProvider}.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useformcontext) • [Demo](https://codesandbox.io/s/react-hook-form-v7-form-context-ytudi)
 *
 * @returns return all useForm methods
 *
 * @example
 * ```tsx
 * function App() {
 *   const methods = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   return (
 *     <FormProvider {...methods} >
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         <NestedInput />
 *         <input type="submit" />
 *       </form>
 *     </FormProvider>
 *   );
 * }
 *
 *  function NestedInput() {
 *   const { register } = useFormContext(); // retrieve all hook methods
 *   return <input {...register("test")} />;
 * }
 * ```
 */
const useFormContext = () => React__default.useContext(HookFormContext);

function TooltipProvider(_a) {
  var _b = _a.delayDuration,
    delayDuration = _b === void 0 ? 0 : _b,
    props = __rest(_a, ["delayDuration"]);
  return /*#__PURE__*/React.createElement(TooltipPrimitive.Provider, __assign({
    delayDuration: delayDuration
  }, props));
}
function Tooltip(_a) {
  var children = _a.children,
    props = __rest(_a, ["children"]);
  return /*#__PURE__*/React.createElement(TooltipProvider, null, /*#__PURE__*/React.createElement(TooltipPrimitive.Root, __assign({}, props), children));
}
function TooltipTrigger(props) {
  return /*#__PURE__*/React.createElement(TooltipPrimitive.Trigger, __assign({}, props));
}
function TooltipContent(_a) {
  var className = _a.className,
    _b = _a.sideOffset,
    sideOffset = _b === void 0 ? 8 : _b,
    _c = _a.side,
    side = _c === void 0 ? "bottom" : _c,
    children = _a.children,
    props = __rest(_a, ["className", "sideOffset", "side", "children"]);
  return /*#__PURE__*/React.createElement(TooltipPrimitive.Portal, null, /*#__PURE__*/React.createElement(TooltipPrimitive.Content, __assign({
    side: side,
    sideOffset: sideOffset,
    className: cn("bg-white text-black border border-gray-200 shadow-lg rounded-md " + "px-3 py-1 text-xs font-normal z-50 w-fit " + "animate-in fade-in-0 zoom-in-95 " + "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 " + "data-[state=closed]:zoom-out-95 " + "data-[side=bottom]:slide-in-from-top-2 " + "data-[side=top]:slide-in-from-bottom-2 " + "data-[side=left]:slide-in-from-right-2 " + "data-[side=right]:slide-in-from-left-2", className)
  }, props), children, /*#__PURE__*/React.createElement(TooltipPrimitive.Arrow, {
    className: "fill-white stroke-gray-200 drop-shadow-md"
  })));
}

var segmentConfigs = [{
  type: "year",
  symbols: ["y"]
}, {
  type: "month",
  symbols: ["M"]
}, {
  type: "date",
  symbols: ["d"]
}, {
  type: "hour",
  symbols: ["h", "H"]
}, {
  type: "minute",
  symbols: ["m"]
}, {
  type: "second",
  symbols: ["s"]
}, {
  type: "period",
  symbols: ["a"]
}, {
  type: "space",
  symbols: [" ", "/", "-", ":", ",", "."]
}];
var mergeRefs = function () {
  var refs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    refs[_i] = arguments[_i];
  }
  return function (node) {
    for (var _i = 0, refs_1 = refs; _i < refs_1.length; _i++) {
      var ref = refs_1[_i];
      if (ref) ref.current = node;
    }
  };
};
var DateTimeInput = /*#__PURE__*/React.forwardRef(function (options, ref) {
  var formatProp = options.format,
    _value = options.value,
    timezone = options.timezone,
    onKeyDownCustom = options.onKeyDown;
    __rest(options, ["format", "value", "timezone", "onKeyDown"]);
  var value = useMemo(function () {
    return _value ? new TZDate(_value, timezone) : undefined;
  }, [_value, timezone]);
  var form = useFormContext();
  var formatStr = React.useMemo(function () {
    return formatProp || "dd/MM/yyyy-hh:mm aa";
  }, [formatProp]);
  var inputRef = useRef(undefined);
  var _a = useState([]),
    segments = _a[0],
    setSegments = _a[1];
  var _b = useState(undefined),
    selectedSegmentAt = _b[0],
    setSelectedSegmentAt = _b[1];
  useEffect(function () {
    if (form === null || form === void 0 ? void 0 : form.formState.isSubmitted) {
      setSegments(parseFormat(formatStr, value));
    }
  }, [form === null || form === void 0 ? void 0 : form.formState.isSubmitted]);
  useEffect(function () {
    // console.error('valueChanged', {formatStr, inputStr, value});
    setSegments(parseFormat(formatStr, value));
  }, [formatStr, value]);
  var curSegment = useMemo(function () {
    if (selectedSegmentAt === undefined || selectedSegmentAt < 0 || selectedSegmentAt >= segments.length) return undefined;
    return segments[selectedSegmentAt];
  }, [segments, selectedSegmentAt]);
  var setCurrentSegment = useCallback(function (segment) {
    var at = segments === null || segments === void 0 ? void 0 : segments.findIndex(function (s) {
      return s.index === (segment === null || segment === void 0 ? void 0 : segment.index);
    });
    at !== -1 && setSelectedSegmentAt(at);
  }, [segments, setSelectedSegmentAt]);
  var validSegments = useMemo(function () {
    return segments.filter(function (s) {
      return s.type !== "space";
    });
  }, [segments]);
  var inputStr = useMemo(function () {
    return segments.map(function (s) {
      return s.value ? s.value.padStart(s.symbols.length, "0") : s.symbols;
    }).join("");
  }, [segments]);
  var areAllSegmentsEmpty = useMemo(function () {
    return validSegments.every(function (s) {
      return !s.value;
    });
  }, [validSegments]);
  var inputValue = useMemo(function () {
    var allHasValue = !validSegments.some(function (s) {
      return !s.value;
    });
    if (!allHasValue) return;
    var date = parse(inputStr, formatStr, value || new TZDate(new Date(), timezone));
    var year = getYear(date);
    // console.log('inputValue', {allHasValue, validSegments, inputStr, formatStr, date, year});
    if (isValid(date) && year > 1900 && year < 2100) {
      return date;
    }
  }, [validSegments, inputStr, formatStr]);
  useEffect(function () {
    var _a;
    if (!inputValue) return;
    if ((value === null || value === void 0 ? void 0 : value.getTime()) !== inputValue.getTime()) {
      // console.log('inputValueChanged', {formatStr, inputStr, value, inputValue, });
      (_a = options.onChange) === null || _a === void 0 ? void 0 : _a.call(options, inputValue);
    }
  }, [inputValue]);
  var onClick = useEventCallback(function (event) {
    var _a;
    event.preventDefault();
    event.stopPropagation();
    var selectionStart = (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.selectionStart;
    if (inputRef.current && selectionStart !== undefined && selectionStart !== null) {
      var validSegments_1 = segments.filter(function (s) {
        return s.type !== "space";
      });
      var segment = validSegments_1.find(function (s) {
        return s.index <= selectionStart && s.index + s.symbols.length >= selectionStart;
      });
      !segment && (segment = __spreadArray([], validSegments_1, true).reverse().find(function (s) {
        return s.index <= selectionStart;
      }));
      !segment && (segment = validSegments_1.find(function (s) {
        return s.index >= selectionStart;
      }));
      setCurrentSegment(segment);
      setSelection(inputRef, segment);
    }
  }, [segments]);
  var onSegmentChange = useEventCallback(function (direction) {
    if (!curSegment) return;
    var validSegments = segments.filter(function (s) {
      return s.type !== "space";
    });
    var segment = direction === "left" ? __spreadArray([], validSegments, true).reverse().find(function (s) {
      return s.index < curSegment.index;
    }) : validSegments.find(function (s) {
      return s.index > curSegment.index;
    });
    if (segment) {
      setCurrentSegment(segment);
      setSelection(inputRef, segment);
    }
  }, [segments, curSegment]);
  var onSegmentNumberValueChange = useEventCallback(function (num) {
    if (!curSegment) return;
    var segment = curSegment;
    var shouldNext = false;
    if (segment.type !== "period") {
      var length_1 = segment.symbols.length;
      var rawValue = parseInt(segment.value).toString();
      var newValue_1 = rawValue.length < length_1 ? rawValue + num : num;
      var parsedDate = parse(newValue_1.padStart(length_1, "0"), segment.symbols, safeDate(timezone));
      if (!isValid(parsedDate) && newValue_1.length > 1) {
        newValue_1 = num;
        parsedDate = parse(newValue_1, segment.symbols, safeDate(timezone));
      }
      var updatedSegments = segments.map(function (s) {
        return s.index === segment.index ? __assign(__assign({}, segment), {
          value: newValue_1
        }) : s;
      });
      setSegments(updatedSegments);
      segment = updatedSegments.find(function (s) {
        return s.index === segment.index;
      });
      shouldNext = newValue_1.length === length_1;
      if (!shouldNext) {
        switch (segment.type) {
          case "month":
            shouldNext = +newValue_1 > 1;
            break;
          case "date":
            shouldNext = +newValue_1 > 3;
            break;
          case "hour":
            shouldNext = +newValue_1 > (segment.symbols.includes("H") ? 2 : 1);
            break;
          case "minute":
          case "second":
            shouldNext = +newValue_1 > 5;
            break;
        }
      }
    }
    shouldNext ? onSegmentChange("right") : setSelection(inputRef, segment);
  }, [segments, curSegment]);
  var onSegmentPeriodValueChange = useEventCallback(function (key) {
    if ((curSegment === null || curSegment === void 0 ? void 0 : curSegment.type) !== "period") return;
    var segment = curSegment;
    var ok = false;
    var newValue = "";
    if ((key === null || key === void 0 ? void 0 : key.toLowerCase()) === "a") {
      newValue = "AM";
      ok = true;
    } else if ((key === null || key === void 0 ? void 0 : key.toLowerCase()) === "p") {
      newValue = "PM";
      ok = true;
    }
    if (ok) {
      var updatedSegments = segments.map(function (s) {
        return s.index === segment.index ? __assign(__assign({}, segment), {
          value: newValue
        }) : s;
      });
      setSegments(updatedSegments);
      segment = updatedSegments.find(function (s) {
        return s.index === segment.index;
      });
    }
    setSelection(inputRef, segment);
  }, [segments, curSegment]);
  var onSegmentValueRemove = useEventCallback(function () {
    if (!curSegment) return;
    if (curSegment.value) {
      var updatedSegments = segments.map(function (s) {
        return s.index === curSegment.index ? __assign(__assign({}, curSegment), {
          value: ""
        }) : s;
      });
      setSegments(updatedSegments);
      var segment = updatedSegments.find(function (s) {
        return s.index === curSegment.index;
      });
      setSelection(inputRef, segment);
    } else {
      onSegmentChange("left");
    }
  }, [segments, curSegment]);
  var onKeyDown = useEventCallback(function (event) {
    var _a, _b;
    var key = event.key;
    setSelection(inputRef, curSegment);
    if (inputValue) {
      onKeyDownCustom === null || onKeyDownCustom === void 0 ? void 0 : onKeyDownCustom(event);
    }
    switch (key) {
      case "ArrowRight":
      case "ArrowLeft":
        onSegmentChange(key === "ArrowRight" ? "right" : "left");
        event.preventDefault();
        break;
      // case 'ArrowUp':
      // case 'ArrowDown':
      //   // onSegmentValueChange?.(event);
      //   event.preventDefault();
      //   break;
      case "Backspace":
        onSegmentValueRemove();
        event.preventDefault();
        break;
      case (_a = key.match(/\d/)) === null || _a === void 0 ? void 0 : _a.input:
        onSegmentNumberValueChange(key);
        event.preventDefault();
        break;
      case (_b = key.match(/[a-z]/)) === null || _b === void 0 ? void 0 : _b[0]:
        onSegmentPeriodValueChange(key);
        event.preventDefault();
        break;
    }
  }, [inputValue]);
  var _c = useState(false),
    isFocused = _c[0],
    setIsFocused = _c[1];
  var onBlur = useEventCallback(function (event) {
    var _a;
    setIsFocused(false);
    if (inputValue) (_a = options.onBlur) === null || _a === void 0 ? void 0 : _a.call(options, event);
  }, [inputValue]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: cn("flex h-10 items-center justify-start rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50", isFocused ? "outline-none ring-2 ring-ring ring-offset-2" : "", options.hideCalendarIcon && "ps-2", options.className)
  }, !options.hideCalendarIcon && (/*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon",
    onClick: options.onCalendarClick
  }, /*#__PURE__*/React.createElement(CalendarIcon, {
    className: "size-4 text-muted-foreground"
  }))), /*#__PURE__*/React.createElement("input", {
    ref: mergeRefs(inputRef),
    className: "font-mono flex-grow min-w-0 bg-transparent py-1 pe-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    onFocus: function () {
      return setIsFocused(true);
    },
    onBlur: onBlur,
    onClick: onClick,
    onKeyDown: onKeyDown,
    value: inputStr,
    placeholder: formatStr,
    onChange: function () {},
    disabled: options.disabled,
    spellCheck: false
  }), /*#__PURE__*/React.createElement("div", {
    className: "me-3"
  }, inputValue ? (/*#__PURE__*/React.createElement(CircleCheck, {
    className: "size-4 text-green-500"
  })) : (/*#__PURE__*/React.createElement(TooltipProvider, null, /*#__PURE__*/React.createElement(Tooltip, null, /*#__PURE__*/React.createElement(TooltipTrigger, {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(CircleAlert, {
    className: cn("size-4", !areAllSegmentsEmpty && "text-red-500")
  })), /*#__PURE__*/React.createElement(TooltipContent, {
    className: "w-[160px]"
  }, /*#__PURE__*/React.createElement("p", null, "Please enter a valid value. The input cannot be empty and must be within the range of years 1900 to 2100.")))))));
});
DateTimeInput.displayName = "DateTimeInput";
function parseFormat(formatStr, value) {
  var views = [];
  var lastPattern = "";
  var symbols = "";
  var patternIndex = 0;
  var index = 0;
  var _loop_1 = function (c) {
    var pattern = segmentConfigs.find(function (p) {
      return p.symbols.includes(c);
    });
    if (!pattern) return "continue";
    if (pattern.type !== lastPattern) {
      symbols && views.push({
        type: lastPattern,
        symbols: symbols,
        index: patternIndex,
        value: value ? format(value, symbols) : ""
      });
      lastPattern = (pattern === null || pattern === void 0 ? void 0 : pattern.type) || "";
      symbols = c;
      patternIndex = index;
    } else {
      symbols += c;
    }
    index++;
  };
  for (var _i = 0, formatStr_1 = formatStr; _i < formatStr_1.length; _i++) {
    var c = formatStr_1[_i];
    _loop_1(c);
  }
  symbols && views.push({
    type: lastPattern,
    symbols: symbols,
    index: patternIndex,
    value: value ? format(value, symbols) : ""
  });
  return views;
}
var safeDate = function (timezone) {
  return new TZDate("2000-01-01T00:00:00", timezone);
};
var isAndroid = function () {
  return /Android/i.test(navigator.userAgent);
};
function setSelection(ref, segment) {
  if (!ref.current || !segment) return;
  safeSetSelection(ref.current, segment.index, segment.index + segment.symbols.length);
}
function safeSetSelection(element, selectionStart, selectionEnd) {
  requestAnimationFrame(function () {
    if (document.activeElement === element) {
      if (isAndroid()) {
        requestAnimationFrame(function () {
          element.setSelectionRange(selectionStart, selectionEnd, "none");
        });
      } else {
        element.setSelectionRange(selectionStart, selectionEnd, "none");
      }
    }
  });
}
function useEventCallback(fn, deps) {
  var ref = useRef(fn);
  useIsomorphicLayoutEffect(function () {
    ref.current = fn;
  });
  return useCallback(function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([ref], args, false));
  }, deps);
}
var useIsomorphicLayoutEffect = typeof document !== "undefined" ? useLayoutEffect : useEffect;

// Editor Components
var TextEditor = function (_a) {
  var value = _a.value,
    onChange = _a.onChange,
    onKeyDown = _a.onKeyDown,
    placeholder = _a.placeholder,
    onBlur = _a.onBlur;
  return /*#__PURE__*/React__default.createElement(Input, {
    value: value,
    autoFocus: true,
    onChange: function (e) {
      return onChange(e.target.value);
    },
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    placeholder: placeholder,
    className: "h-8 py-1 px-2 text-sm"
  });
};
var NumberEditor = function (_a) {
  var value = _a.value,
    onChange = _a.onChange,
    onBlur = _a.onBlur,
    onKeyDown = _a.onKeyDown,
    min = _a.min,
    max = _a.max,
    step = _a.step,
    placeholder = _a.placeholder;
  var inputRef = useRef(null);
  useEffect(function () {
    var _a;
    (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
  }, []);
  var handleKeyDown = function (e) {
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 || e.keyCode >= 65 && e.keyCode <= 90 && e.ctrlKey === true || e.keyCode >= 35 && e.keyCode <= 39 || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105) {
      return;
    }
    e.preventDefault();
  };
  return /*#__PURE__*/React__default.createElement(Input, {
    ref: inputRef,
    type: "number",
    inputMode: "decimal",
    value: value !== null ? String(value) : "",
    onChange: function (e) {
      var val = e.target.value;
      if (val === "" || /^\d*\.?\d*$/.test(val)) {
        var numVal = val === "" ? null : Number(val);
        onChange(numVal);
      }
    },
    onBlur: onBlur,
    onKeyDown: function (e) {
      handleKeyDown(e);
      if (onKeyDown) onKeyDown(e);
    },
    min: min,
    max: max,
    step: step,
    placeholder: placeholder,
    className: "h-8 py-1 px-2 text-sm"
  });
};
var SelectEditor = function (_a) {
  var value = _a.value,
    onChange = _a.onChange,
    _b = _a.options,
    options = _b === void 0 ? [] : _b;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/React__default.createElement(Select, {
    value: value,
    onValueChange: onChange,
    defaultOpen: true
  }, /*#__PURE__*/React__default.createElement(SelectTrigger, {
    className: "w-[160px]"
  }, /*#__PURE__*/React__default.createElement(SelectValue, {
    placeholder: "Select option"
  })), /*#__PURE__*/React__default.createElement(SelectContent, {
    className: "w-[160px]"
  }, /*#__PURE__*/React__default.createElement(SelectGroup, {
    className: "p-1"
  }, options.length > 0 ? options.map(function (opt) {
    return /*#__PURE__*/React__default.createElement(SelectItem, {
      key: opt.value,
      value: opt.value,
      className: cn("h-8 py-1 px-2 text-sm cursor-pointer", "focus:bg-accent focus:text-accent-foreground")
    }, opt.label);
  }) : (/*#__PURE__*/React__default.createElement("div", {
    className: "p-2 text-sm text-muted-foreground text-center"
  }, "No options found"))))));
};
var DateEditor = function (_a) {
  var value = _a.value,
    onChange = _a.onChange,
    _b = _a.hideTime,
    hideTime = _b === void 0 ? true : _b;
  var _c = React__default.useState(value ? new Date(value) : new Date()),
    date = _c[0],
    setDate = _c[1];
  var handleDateSelect = function (selectedDate) {
    if (selectedDate) {
      setDate(selectedDate);
      onChange(selectedDate);
    }
  };
  var handleDayKeyDown = function (value, event) {
    if (event.key === "Enter" || event.key === "Escape") {
      setDate(value);
      onChange(value);
    }
  };
  return /*#__PURE__*/React__default.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/React__default.createElement(DateTimePicker, {
    value: date,
    onChange: handleDateSelect,
    hideTime: hideTime,
    onDayKeyDown: function (value, _params, event) {
      handleDayKeyDown(value, event);
    },
    timePicker: {
      hour: true,
      minute: true,
      second: false
    },
    renderTrigger: function (_a) {
      var open = _a.open,
        value = _a.value,
        setOpen = _a.setOpen;
      return /*#__PURE__*/React__default.createElement(DateTimeInput, {
        value: value,
        clearable: true,
        hideCalendarIcon: false,
        onChange: function (val) {
          if (val) setDate(val);
        },
        onKeyDown: function (e) {
          if (e.key === "Enter" || e.key === "Escape") {
            onChange(date);
          }
        },
        onBlur: function () {
          onChange(date);
        },
        format: hideTime ? "MM-dd-yyyy" : "MM-dd-yyyy HH:mm",
        disabled: open,
        onCalendarClick: function () {
          return setOpen(!open);
        }
      });
    }
  }));
};
var TimeEditor = function (_a) {
  var value = _a.value,
    onChange = _a.onChange;
  var timeNow = new Date(value);
  console.log(timeNow);
  // Helper to convert "HH:mm" string to Date object (today's date)
  // const parseTimeStringToDate = (timeStr: string | null): Date => {
  //   if (!timeStr) return new Date();
  //   const [hours, minutes] = timeStr.split(":").map(Number);
  //   const date = new Date();
  //   if (!isNaN(hours) && !isNaN(minutes)) {
  //     date.setHours(hours, minutes, 0, 0);
  //     return date;
  //   }
  //   return new Date();
  // };
  // // Helper to convert Date object to "HH:mm" string
  // const formatDateToTimeString = (date: Date): string => {
  //   const hours = date.getHours().toString().padStart(2, "0");
  //   const minutes = date.getMinutes().toString().padStart(2, "0");
  //   return `${hours}:${minutes}`;
  // };
  // // Always keep a Date object for the picker
  // const [timeValue, setTimeValue] = React.useState<Date>(
  //   typeof value === "string" ? parseTimeStringToDate(value) : new Date()
  // );
  var handleTimeChange = function (date) {
    console.log(date);
  };
  return /*#__PURE__*/React__default.createElement(SimpleTimePicker, {
    use12HourFormat: true,
    value: timeNow,
    onChange: handleTimeChange,
    onSubmit: function (value) {
      onChange(moment(value).format());
    }
  });
};
var CellEditor = function (_a) {
  var columnDef = _a.columnDef,
    value = _a.value,
    onChange = _a.onChange,
    onBlur = _a.onBlur,
    onKeyDown = _a.onKeyDown,
    valueFormatter = _a.valueFormatter;
  var editorType = columnDef.editorType,
    _b = columnDef.editorParams,
    editorParams = _b === void 0 ? {} : _b;
  var typedParams = editorParams;
  var editors = {
    text: TextEditor,
    number: NumberEditor,
    select: SelectEditor,
    date: DateEditor,
    time: TimeEditor,
    dateTime: DateEditor
  };
  var Editor = editors[editorType];
  var editorProps = {
    value: value,
    onChange: onChange,
    onKeyDown: onKeyDown,
    placeholder: typedParams.placeholder,
    label: typedParams.label,
    options: typedParams.options,
    min: typedParams.min,
    max: typedParams.max,
    step: typedParams.step,
    valueFormatter: valueFormatter,
    onBlur: onBlur
  };
  var additionalProps = editorType === "dateTime" ? {
    hideTime: false
  } : {};
  return Editor ? (/*#__PURE__*/React__default.createElement("div", {
    className: "w-full h-full flex items-center justify-center"
  }, /*#__PURE__*/React__default.createElement(Editor, __assign({}, editorProps, additionalProps)))) : (/*#__PURE__*/React__default.createElement(React__default.Fragment, null, String(value || "")));
};

var Switch = function (_a) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/React.createElement(SwitchPrimitive.Root, __assign({
    "data-slot": "switch",
    className: cn("peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className)
  }, props), /*#__PURE__*/React.createElement(SwitchPrimitive.Thumb, {
    "data-slot": "switch-thumb",
    className: cn("bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0")
  }));
};

// --- MAIN HOOK ---
function useCookedData(columnDefs) {
  var getCookedSingleRow = useCallback(function (row, columns, parentData) {
    var updatedRow = {
      row: row
    };
    columns.map(function (col) {
      var _a, _b;
      if (col.valueGetter) {
        var computedValue = col.valueGetter({
          data: row,
          parentData: parentData
        });
        updatedRow = __assign(__assign({}, updatedRow), (_a = {}, _a[col.field] = computedValue, _a));
      } else {
        updatedRow = __assign(__assign({}, updatedRow), (_b = {}, _b[col.field] = row[col.field], _b));
      }
      return col.field;
    });
    return updatedRow;
  }, []);
  var processChildRow = useCallback(function (childRow, parentRow) {
    var _a, _b;
    var cookedChild = __assign({}, childRow);
    (_b = (_a = columnDefs.detailGridOptions) === null || _a === void 0 ? void 0 : _a.columns) === null || _b === void 0 ? void 0 : _b.forEach(function (col) {
      var _a;
      if (typeof col.valueGetter === "function") {
        var cookedRow = getCookedSingleRow(childRow, ((_a = columnDefs.detailGridOptions) === null || _a === void 0 ? void 0 : _a.columns) || [], parentRow);
        cookedChild[col.field] = col.valueGetter({
          data: childRow,
          cookedRow: cookedRow,
          parentData: parentRow
        });
      } else {
        cookedChild[col.field] = childRow[col.field];
      }
    });
    return cookedChild;
  }, [columnDefs.detailGridOptions]);
  var getCookedRow = useCallback(function (row) {
    var _a, _b;
    var cookedRow = __assign({}, row);
    // 1. Process children first (bottom-up)
    if (Array.isArray(row.children) && ((_a = columnDefs.detailGridOptions) === null || _a === void 0 ? void 0 : _a.columns)) {
      cookedRow.children = row.children.map(function (childRow) {
        return processChildRow(childRow, row);
      });
    }
    // 2. Then process parent row using current cookedRow
    (_b = columnDefs.columns) === null || _b === void 0 ? void 0 : _b.forEach(function (col) {
      if (typeof col.valueGetter === "function") {
        cookedRow[col.field] = col.valueGetter({
          data: row,
          cookedRow: __assign(__assign({}, row), cookedRow)
        });
      } else {
        cookedRow[col.field] = row[col.field];
      }
    });
    return cookedRow;
  }, [columnDefs.columns, columnDefs.detailGridOptions, processChildRow]);
  var getCookedData = useCallback(function (data) {
    return data.map(function (row) {
      return getCookedRow(row);
    });
  }, [getCookedRow]);
  return {
    getCookedData: getCookedData
  };
}

// Export utility functions
var IsDateType = function (type) {
  return type === "date";
};
var IsTimeType = function (type) {
  return type === "time";
};
var IsDateTimeType = function (type) {
  return type === "datetime" || type === "dateTime";
};
var GetDefaultFilterType = function (col) {
  if (col.type === "number") return "equals";
  if (col.type === "date") return "equals";
  if (col.type === "time") return "equals";
  if (col.type === "dateTime") return "equals";
  return "contains";
};
var GetAvailableFilterTypes = function (col) {
  if (col.type === "number") {
    return [{
      value: "equals",
      label: "Equals"
    }, {
      value: "greaterThan",
      label: "Greater Than"
    }, {
      value: "lessThan",
      label: "Less Than"
    }];
  }
  if (IsDateType(col.type)) {
    return [{
      value: "equals",
      label: "Equals"
    }, {
      value: "before",
      label: "Before"
    }, {
      value: "after",
      label: "After"
    }];
  }
  if (IsTimeType(col.type)) {
    return [{
      value: "equals",
      label: "Equals"
    }, {
      value: "before",
      label: "Before"
    }, {
      value: "after",
      label: "After"
    }];
  }
  if (IsDateTimeType(col.type)) {
    return [{
      value: "equals",
      label: "Equals"
    }, {
      value: "before",
      label: "Before"
    }, {
      value: "after",
      label: "After"
    }];
  }
  return [{
    value: "contains",
    label: "Contains"
  }, {
    value: "equals",
    label: "Equals"
  }, {
    value: "startsWith",
    label: "Starts with"
  }, {
    value: "endsWith",
    label: "Ends with"
  }];
};
var CellFilter = function (_a) {
  var _b;
  var column = _a.column,
    value = _a.value,
    filterType = _a.filterType,
    onFilterChange = _a.onFilterChange,
    onFilterTypeChange = _a.onFilterTypeChange,
    onClear = _a.onClear;
  var availableFilterTypes = GetAvailableFilterTypes(column);
  var defaultFilterType = GetDefaultFilterType(column);
  // Initialize filter type if not set
  useEffect(function () {
    if (!filterType) {
      onFilterTypeChange(defaultFilterType);
    }
  }, [filterType, defaultFilterType, onFilterTypeChange]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "text-sm font-medium text-gray-700"
  }, "Filter: ", column.headerName), value && (/*#__PURE__*/React__default.createElement("button", {
    onClick: onClear,
    className: "hover:text-gray-900 p-1 hover:bg-gray-100 rounded"
  }, /*#__PURE__*/React__default.createElement(X, {
    className: "h-3 w-3"
  })))), /*#__PURE__*/React__default.createElement(Select, {
    value: filterType || defaultFilterType,
    onValueChange: onFilterTypeChange
  }, /*#__PURE__*/React__default.createElement(SelectTrigger, {
    className: "w-full text-sm"
  }, (_b = availableFilterTypes.find(function (type) {
    return type.value === (filterType || defaultFilterType);
  })) === null || _b === void 0 ? void 0 : _b.label), /*#__PURE__*/React__default.createElement(SelectContent, {
    className: "w-full max-h-[200px]"
  }, availableFilterTypes.map(function (type) {
    return /*#__PURE__*/React__default.createElement(SelectItem, {
      key: type.value,
      value: type.value,
      className: "h-8 py-1 px-2 text-sm cursor-pointer"
    }, type.label);
  }))), /*#__PURE__*/React__default.createElement("label", {
    className: "text-xs font-medium text-gray-500"
  }, IsDateType(column.type) ? "Date" : IsTimeType(column.type) ? "Time" : IsDateTimeType(column.type) ? "DateTime" : "Search"), IsDateType(column.type) ? (/*#__PURE__*/React__default.createElement(DateTimePicker, {
    value: value ? new Date(value) : undefined,
    onChange: function (val) {
      onFilterChange(val ? val.toISOString() : "");
    },
    hideTime: true,
    renderTrigger: function (_a) {
      var open = _a.open,
        value = _a.value,
        setOpen = _a.setOpen;
      return /*#__PURE__*/React__default.createElement(DateTimeInput, {
        value: value,
        onChange: function (val) {
          onFilterChange(val ? val.toISOString() : "");
        },
        format: "MM-dd-yyyy",
        disabled: open,
        onCalendarClick: function () {
          return setOpen(!open);
        }
      });
    }
  })) : IsTimeType(column.type) ? (/*#__PURE__*/React__default.createElement(SimpleTimePicker, {
    value: value ? new Date(value) : new Date(),
    onChange: function (val) {
      onFilterChange(val ? val.toISOString() : "");
    },
    use12HourFormat: true
  })) : IsDateTimeType(column.type) ? (/*#__PURE__*/React__default.createElement(DateTimePicker, {
    value: value ? new Date(value) : undefined,
    onChange: function (val) {
      onFilterChange(val ? val.toISOString() : "");
    },
    timePicker: {
      hour: true,
      minute: true,
      second: false
    },
    renderTrigger: function (_a) {
      var open = _a.open,
        value = _a.value,
        setOpen = _a.setOpen;
      return /*#__PURE__*/React__default.createElement(DateTimeInput, {
        value: value,
        onChange: function (val) {
          onFilterChange(val ? val.toISOString() : "");
        },
        format: "MM-dd-yyyy hh:mm",
        disabled: open,
        onCalendarClick: function () {
          return setOpen(!open);
        }
      });
    }
  })) : (/*#__PURE__*/React__default.createElement("div", {
    className: "relative w-full"
  }, /*#__PURE__*/React__default.createElement(Input, {
    placeholder: "Filter ".concat(column.headerName),
    value: value || "",
    onChange: function (e) {
      return onFilterChange(e.target.value);
    },
    type: "text",
    className: "h-9 text-sm w-full pl-9 pr-3",
    style: {
      height: "2.25rem",
      fontSize: "0.875rem",
      width: "100%",
      paddingLeft: "1.5rem",
      paddingRight: "0.75rem"
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    style: {
      left: 5,
      position: "absolute",
      top: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React__default.createElement(Search, {
    className: "h-4 w-4 text-gray-400"
  })))));
};

var GroupPanel = function (_a) {
  var showGroupByPanel = _a.showGroupByPanel,
    groupedColumns = _a.groupedColumns,
    columns = _a.columns,
    setColumnGrouped = _a.setColumnGrouped,
    handleGroupDrop = _a.handleGroupDrop;
  if (!showGroupByPanel) return null;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "min-h-[40px] border border-dashed border-[#353945] rounded flex flex-wrap gap-2 items-center p-2 bg-[#232733]",
    onDragOver: function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    },
    onDrop: handleGroupDrop
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "text-gray-400 text-sm"
  }, "Drag columns here to group")), /*#__PURE__*/React__default.createElement("div", {
    className: "p-2 flex flex-col gap-2"
  }, groupedColumns.map(function (field) {
    var col = columns.find(function (c) {
      return c.field === field;
    });
    return /*#__PURE__*/React__default.createElement("div", {
      className: "flex items-center justify-between bg-gray-700 px-2 py-1 rounded-full"
    }, /*#__PURE__*/React__default.createElement("span", {
      key: field,
      className: "flex items-center"
    }, /*#__PURE__*/React__default.createElement(GripVertical, {
      className: "w-3 h-3 mr-1"
    }), col === null || col === void 0 ? void 0 : col.headerName), /*#__PURE__*/React__default.createElement("button", {
      onClick: function () {
        return setColumnGrouped(field, false);
      },
      className: "ml-1 hover:bg-gray-600 rounded-full p-1 cursor-pointer"
    }, /*#__PURE__*/React__default.createElement(X, {
      className: "h-3 w-3"
    })));
  })));
};

var DataGrid = /*#__PURE__*/forwardRef(function (_a, ref) {
  var _b = _a.data,
    data = _b === void 0 ? [] : _b,
    onDataChange = _a.onDataChange,
    columnDefs = _a.columnDefs,
    _c = _a.loading,
    loading = _c === void 0 ? false : _c,
    _d = _a.loadingMessage,
    loadingMessage = _d === void 0 ? "Loading..." : _d,
    onRowClick = _a.onRowClick,
    _e = _a.showGroupByPanel,
    showGroupByPanel = _e === void 0 ? false : _e,
    _f = _a.isChild,
    isChild = _f === void 0 ? false : _f,
    rowSelection = _a.rowSelection;
  var getCookedData = useCookedData(columnDefs).getCookedData;
  var _g = columnDefs.columns,
    propColumns = _g === void 0 ? [] : _g,
    _h = columnDefs.masterDetail,
    masterDetail = _h === void 0 ? false : _h,
    _j = columnDefs.detailGridOptions,
    detailGridOptions = _j === void 0 ? {} : _j,
    _k = columnDefs.getDetailRowData,
    getDetailRowData = _k === void 0 ? undefined : _k,
    _l = columnDefs.aggFuncs,
    aggFuncs = _l === void 0 ? {} : _l,
    _m = columnDefs.grandTotalRow,
    grandTotalRow = _m === void 0 ? "none" : _m,
    _o = columnDefs.tableLayout,
    tableLayout = _o === void 0 ? "fixed" : _o;
  // State
  var _p = useState([]),
    gridData = _p[0],
    setGridData = _p[1];
  var _q = useState([]),
    columns = _q[0],
    setColumns = _q[1];
  var _r = useState({
      key: null,
      direction: "asc"
    }),
    sortConfig = _r[0],
    setSortConfig = _r[1];
  var _s = useState({}),
    filters = _s[0],
    setFilters = _s[1];
  var _t = useState({}),
    filterTypes = _t[0],
    setFilterTypes = _t[1];
  var _u = useState({}),
    debouncedFilters = _u[0],
    setDebouncedFilters = _u[1];
  var _v = useState([]),
    groupedColumns = _v[0],
    setGroupedColumns = _v[1];
  var _w = useState({}),
    expandedGroups = _w[0],
    setExpandedGroups = _w[1];
  var _x = useState({}),
    selectedRows = _x[0],
    setSelectedRows = _x[1];
  // Column drag & drop
  var _y = useState(null),
    draggedColumn = _y[0],
    setDraggedColumn = _y[1];
  var _z = useState(null),
    dragOverColumn = _z[0],
    setDragOverColumn = _z[1];
  var columnDragCounter = useRef(0);
  var tableRef = useRef(null);
  // Cell editing
  var _0 = useState(null),
    editingCell = _0[0],
    setEditingCell = _0[1];
  var _1 = useState(""),
    editValue = _1[0],
    setEditValue = _1[1];
  // Master/Detail
  var _2 = useState({}),
    expandedRows = _2[0],
    setExpandedRows = _2[1];
  var _3 = useState({}),
    detailData = _3[0],
    setDetailData = _3[1];
  // Create debounced filter handler using useCallback to maintain reference
  var debouncedFnRef = useRef(undefined);
  var debouncedSetFilters = useCallback(function (newFilters) {
    if (debouncedFnRef.current) {
      debouncedFnRef.current.cancel();
    }
    debouncedFnRef.current = debounce(function (filters) {
      setDebouncedFilters(filters);
    }, 300);
    debouncedFnRef.current(newFilters);
  }, []);
  // Add undo/redo state
  var _4 = useState({
      past: [],
      present: data,
      future: []
    }),
    history = _4[0],
    setHistory = _4[1];
  // Add undo/redo handlers
  var canUndo = history.past.length > 0;
  var canRedo = history.future.length > 0;
  var undo = useCallback(function () {
    if (!canUndo) return;
    var newPast = history.past.slice(0, -1);
    var newPresent = history.past[history.past.length - 1];
    var newFuture = __spreadArray([history.present], history.future, true);
    setHistory({
      past: newPast,
      present: newPresent,
      future: newFuture
    });
    setGridData(newPresent);
  }, [history, canUndo]);
  var redo = useCallback(function () {
    if (!canRedo) return;
    var newPast = __spreadArray(__spreadArray([], history.past, true), [history.present], false);
    var newPresent = history.future[0];
    var newFuture = history.future.slice(1);
    setHistory({
      past: newPast,
      present: newPresent,
      future: newFuture
    });
    setGridData(newPresent);
  }, [history, canRedo]);
  // Add keyboard event listener for undo/redo
  useEffect(function () {
    var handleKeyDown = function (e) {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "z" && !e.shiftKey) {
          e.preventDefault();
          undo();
        } else if (e.key === "z" && e.shiftKey) {
          e.preventDefault();
          redo();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return function () {
      return window.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);
  useImperativeHandle(ref, function () {
    var div = document.createElement("div");
    Object.assign(div, {
      resetSelection: function () {
        setSelectedRows({});
      }
    });
    return div;
  }, []);
  // Initial Setup
  useEffect(function () {
    if (data && data.length > 0) {
      var cookedData = isChild ? data : getCookedData(data);
      setGridData(cookedData);
      // Initialize history with current data
      setHistory({
        past: [],
        present: cookedData,
        future: []
      });
      if (propColumns && propColumns.length > 0) {
        // Separate grouped and non-grouped columns
        var groupedCols = propColumns.filter(function (col) {
          return col.rowGroup && col.visible !== false;
        });
        var nonGroupedCols = propColumns.filter(function (col) {
          return !col.rowGroup && col.visible !== false;
        });
        // Combine with grouped columns first
        setColumns(__spreadArray(__spreadArray([], groupedCols, true), nonGroupedCols, true));
        // Initialize groupedColumns from columns with rowGroup=true
        var initialGroupedColumns = groupedCols.map(function (col) {
          return col.field;
        });
        if (initialGroupedColumns.length > 0) {
          setGroupedColumns(initialGroupedColumns);
        }
        return;
      }
      var firstItem_1 = cookedData[0];
      var extracted = Object.keys(firstItem_1).filter(function (key) {
        return key !== "children";
      }).map(function (key) {
        return {
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
          type: typeof firstItem_1[key] === "number" ? "number" : "text",
          editable: true,
          width: 150,
          visible: true,
          rowGroup: false,
          aggFunc: typeof firstItem_1[key] === "number" ? "sum" : undefined
        };
      });
      setColumns(extracted);
    }
  }, [data, propColumns]);
  // Update filters and trigger debounced update
  var handleFilterChange = useCallback(function (field, value) {
    var _a;
    var newFilters = __assign(__assign({}, filters), (_a = {}, _a[field] = value, _a));
    setFilters(newFilters);
    debouncedSetFilters(newFilters);
  }, [filters, debouncedSetFilters]);
  // Cleanup debounce on unmount
  useEffect(function () {
    return function () {
      if (debouncedFnRef.current) {
        debouncedFnRef.current.cancel();
      }
    };
  }, []);
  var handleFilterTypeChange = useCallback(function (field, type) {
    setFilterTypes(function (prev) {
      var _a;
      return __assign(__assign({}, prev), (_a = {}, _a[field] = type, _a));
    });
  }, []);
  // Update filteredData to use filter types
  var filteredData = useMemo(function () {
    if (!gridData || gridData.length === 0) {
      return [];
    }
    var filtered = gridData.filter(function (row) {
      return Object.keys(debouncedFilters).every(function (field) {
        if (!debouncedFilters[field]) return true;
        var col = columns.find(function (c) {
          return c.field === field;
        });
        if (!col) return true;
        var cellValue = row[field];
        var filterValue = debouncedFilters[field];
        var filterType = filterTypes[field] || GetDefaultFilterType(col);
        // Handle null/undefined values
        if (cellValue == null) return false;
        if (col.type === "number") {
          var numValue = Number(cellValue);
          var filterNum = Number(filterValue);
          switch (filterType) {
            case "equals":
              return numValue === filterNum;
            case "greaterThan":
              return numValue > filterNum;
            case "lessThan":
              return numValue < filterNum;
            case "between":
              {
                var _a = filterValue.split(",").map(Number),
                  min = _a[0],
                  max = _a[1];
                return numValue >= min && numValue <= max;
              }
            default:
              return true;
          }
        }
        if (col.type === "date") {
          var dateValue = new Date(cellValue);
          var filterDate = new Date(filterValue);
          switch (filterType) {
            case "equals":
              return dateValue.toDateString() === filterDate.toDateString();
            case "before":
              return dateValue < filterDate;
            case "after":
              return dateValue > filterDate;
            case "between":
              {
                var _b = filterValue.split(",").map(function (d) {
                    return new Date(d);
                  }),
                  start = _b[0],
                  end = _b[1];
                return dateValue >= start && dateValue <= end;
              }
            default:
              return true;
          }
        }
        // Text comparison
        var cellString = String(cellValue).toLowerCase();
        var filterString = filterValue.toLowerCase();
        switch (filterType) {
          case "equals":
            return cellString === filterString;
          case "startsWith":
            return cellString.startsWith(filterString);
          case "endsWith":
            return cellString.endsWith(filterString);
          case "contains":
          default:
            return cellString.includes(filterString);
        }
      });
    });
    return filtered;
  }, [gridData, debouncedFilters, filterTypes, columns]);
  // ----------------------------
  // 2) Sorting
  // ----------------------------
  var handleSort = useCallback(function (field) {
    var direction = "asc";
    if (sortConfig.key === field && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({
      key: field,
      direction: direction
    });
    // Sort the data
    var sorted = __spreadArray([], gridData, true).sort(function (a, b) {
      var aValue = a[field];
      var bValue = b[field];
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setGridData(sorted);
  }, [sortConfig, gridData]);
  // If you also want multi-sort with shiftKey, you can adapt accordingly.
  var handleMultiSort = useCallback(function (field, e) {
    if (e === null || e === void 0 ? void 0 : e.shiftKey) ;
    handleSort(field);
  }, [handleSort]);
  // ----------------------------
  // 5) Column Drag & Drop
  // ----------------------------
  var handleColumnDragStart = useCallback(function (e, field) {
    setDraggedColumn(field);
    columnDragCounter.current = 0;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("columnField", field);
  }, []);
  var handleColumnDragOver = useCallback(function (e, field) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverColumn !== field) {
      setDragOverColumn(field);
    }
  }, [dragOverColumn]);
  var handleColumnDragEnter = useCallback(function (e) {
    e.preventDefault();
    columnDragCounter.current++;
  }, []);
  var handleColumnDragLeave = useCallback(function (e) {
    e.preventDefault();
    columnDragCounter.current--;
    if (columnDragCounter.current === 0) {
      setDragOverColumn(null);
    }
  }, []);
  var handleColumnDrop = useCallback(function (e, targetField) {
    e.preventDefault();
    columnDragCounter.current = 0;
    setDragOverColumn(null);
    if (!draggedColumn || draggedColumn === targetField) return;
    var sourceIndex = columns.findIndex(function (col) {
      return col.field === draggedColumn;
    });
    var targetIndex = columns.findIndex(function (col) {
      return col.field === targetField;
    });
    if (sourceIndex === targetIndex) return;
    // Create new columns array with reordered columns
    var newCols = __spreadArray([], columns, true);
    var moved = newCols.splice(sourceIndex, 1)[0];
    newCols.splice(targetIndex, 0, moved);
    // Important: Preserve column properties and only update order
    setColumns(newCols);
    // Reset drag state
    setDraggedColumn(null);
  }, [draggedColumn, columns]);
  var handleColumnDragEnd = useCallback(function () {
    columnDragCounter.current = 0;
    setDraggedColumn(null);
    setDragOverColumn(null);
  }, []);
  // ----------------------------
  // 6) Editing
  // ----------------------------
  var startEditing = useCallback(function (rowIndex, field, value) {
    setEditingCell({
      rowIndex: rowIndex,
      field: field
    });
    setEditValue(value);
  }, []);
  var handleEditChange = useCallback(function (value, editorType) {
    var _a;
    if (editorType === "select" || editorType === "date" || editorType === "time" || editorType === "dateTime" || editorType === "checkbox") {
      if (!editingCell) return;
      var field = editingCell.field;
      var newRow = __assign(__assign({}, gridData[editingCell.rowIndex]), (_a = {}, _a[field] = value, _a));
      var idxInAll = gridData.findIndex(function (r) {
        return r === gridData[editingCell.rowIndex];
      });
      if (idxInAll !== -1) {
        var previousRecord = gridData[editingCell.rowIndex];
        var newData = __spreadArray([], gridData, true);
        var cookedData_1 = getCookedData(newData);
        newData[idxInAll] = newRow;
        //For notify parent with new record, previous record and field
        if (onDataChange) {
          onDataChange(newRow, previousRecord, field);
        }
        setGridData(cookedData_1);
        // Update history with current state before making changes
        setHistory(function (prev) {
          return {
            past: __spreadArray(__spreadArray([], prev.past, true), [prev.present], false),
            present: cookedData_1,
            future: []
          };
        });
      }
      setEditingCell(null);
      setEditValue("");
    } else {
      setEditValue(String(value));
    }
  }, [editingCell, gridData, onDataChange]);
  var handleEditChangeCheckbox = useCallback(function (value, rowIndex, field) {
    var _a;
    var newRow = __assign(__assign({}, gridData[rowIndex]), (_a = {}, _a[field] = value, _a));
    var idxInAll = gridData.findIndex(function (r) {
      return r === gridData[rowIndex];
    });
    if (idxInAll !== -1) {
      var newData = __spreadArray([], gridData, true);
      newData[idxInAll] = newRow;
      var cookedData_2 = getCookedData(newData);
      setGridData(cookedData_2);
      // Update history with current state before making changes
      setHistory(function (prev) {
        return {
          past: __spreadArray(__spreadArray([], prev.past, true), [prev.present], false),
          present: cookedData_2,
          future: []
        };
      });
      //For notify parent with new record, previous record and field
      if (onDataChange) {
        onDataChange(newRow, gridData[rowIndex], field);
      }
    }
    setEditingCell(null);
    setEditValue("");
  }, [gridData, onDataChange]);
  // ----------------------------
  // 7) Master/Detail
  // ----------------------------
  var toggleRowExpand = useCallback(function (rowIndex) {
    setExpandedRows(function (prev) {
      var newState = __assign({}, prev);
      if (newState[rowIndex]) {
        delete newState[rowIndex];
      } else {
        newState[rowIndex] = true;
        // Get detail data from children if available
        var row_1 = gridData[rowIndex];
        if (row_1 && row_1.children) {
          setDetailData(function (old) {
            var _a;
            return __assign(__assign({}, old), (_a = {}, _a[rowIndex] = row_1.children, _a));
          });
        } else if (getDetailRowData) {
          // Fallback to getDetailRowData if no children
          getDetailRowData({
            data: row_1,
            successCallback: function (detail) {
              setDetailData(function (old) {
                var _a;
                return __assign(__assign({}, old), (_a = {}, _a[rowIndex] = detail, _a));
              });
            }
          });
        }
      }
      return newState;
    });
  }, [gridData, getDetailRowData]);
  // ----------------------------
  // 8) Row Grouping
  // ----------------------------
  var toggleGroupExpand = useCallback(function (groupKey) {
    setExpandedGroups(function (prev) {
      var newState = __assign({}, prev);
      if (newState[groupKey]) {
        delete newState[groupKey];
      } else {
        newState[groupKey] = true;
      }
      return newState;
    });
  }, []);
  var setColumnGrouped = useCallback(function (field, grouped) {
    // Update columns
    var newColumns = columns.map(function (col) {
      if (col.field === field) {
        return __assign(__assign({}, col), {
          rowGroup: grouped
        });
      }
      return col;
    });
    // If grouping is enabled, move the grouped column to the start
    if (grouped) {
      var groupedColumn = newColumns.find(function (col) {
        return col.field === field;
      });
      if (groupedColumn) {
        var filteredColumns = newColumns.filter(function (col) {
          return col.field !== field;
        });
        setColumns(__spreadArray([groupedColumn], filteredColumns, true));
      }
    } else {
      setColumns(newColumns);
    }
    // Update groupedColumns
    setGroupedColumns(function (prev) {
      if (grouped) {
        if (!prev.includes(field)) {
          return __spreadArray(__spreadArray([], prev, true), [field], false);
        }
        return prev;
      } else {
        return prev.filter(function (f) {
          return f !== field;
        });
      }
    });
  }, [columns]);
  // ----------------------------
  // Group & Flatten Data for Virtualization
  // ----------------------------
  var calculateAggregation = useCallback(function (values, aggFunc) {
    if (!values || values.length === 0) return 0;
    // Check if it's a custom aggregation function
    if (typeof aggFunc === "string" && aggFuncs[aggFunc]) {
      return aggFuncs[aggFunc]({
        values: values
      });
    }
    // Handle built-in aggregation functions
    switch (aggFunc) {
      case "sum":
        return values.reduce(function (acc, val) {
          return acc + (Number(val) || 0);
        }, 0);
      case "avg":
        {
          var sum = values.reduce(function (acc, val) {
            return acc + (Number(val) || 0);
          }, 0);
          return sum / values.length;
        }
      case "min":
        return Math.min.apply(Math, values.map(function (v) {
          return Number(v);
        }));
      case "max":
        return Math.max.apply(Math, values.map(function (v) {
          return Number(v);
        }));
      case "count":
        return values.length;
      default:
        return values[0];
    }
  }, [aggFuncs]);
  var groupedData = useMemo(function () {
    if (!filteredData || filteredData.length === 0) {
      return null;
    }
    if (groupedColumns.length === 0) return null;
    var groupFields = groupedColumns;
    // Recursively group the data
    function groupData(rows, level, parentKey) {
      if (level === void 0) {
        level = 0;
      }
      if (parentKey === void 0) {
        parentKey = "";
      }
      if (level >= groupFields.length) return rows;
      var field = groupFields[level];
      var groupsMap = {};
      rows.forEach(function (item) {
        var gVal = item[field];
        var gKey = parentKey ? "".concat(parentKey, "__").concat(String(gVal)) : "".concat(field, "__").concat(String(gVal));
        if (!groupsMap[gKey]) {
          groupsMap[gKey] = {
            field: field,
            value: gVal,
            key: gKey,
            level: level,
            children: [],
            isGroup: true,
            originalChildren: item.children,
            aggregations: {}
          };
        }
        groupsMap[gKey].children.push(item);
      });
      // Calculate aggregations for all numeric columns
      Object.values(groupsMap).forEach(function (groupObj) {
        columns.forEach(function (col) {
          if (col.type === "number" && col.aggFunc) {
            var values = groupObj.children.map(function (child) {
              return child[col.field];
            }).filter(function (val) {
              return val != null;
            });
            if (values.length > 0) {
              groupObj.aggregations[col.field] = calculateAggregation(values, col.aggFunc);
            }
          }
        });
        if (level < groupFields.length - 1) {
          groupObj.children = groupData(groupObj.children, level + 1, groupObj.key);
        }
      });
      return Object.values(groupsMap);
    }
    var result = groupData(filteredData, 0, "");
    return result;
  }, [filteredData, groupedColumns, columns]);
  var flattenedRows = useMemo(function () {
    var flatList = [];
    if (!filteredData || filteredData.length === 0) {
      return flatList;
    }
    if (groupedData) {
      // Handle grouped data
      var walkGroups_1 = function (groups, indentLevel, parentIndex) {
        if (indentLevel === void 0) {
          indentLevel = 0;
        }
        if (parentIndex === void 0) {
          parentIndex = 0;
        }
        groups.forEach(function (group, groupIndex) {
          var _a;
          // Add group header with aggregations
          flatList.push({
            type: "group",
            groupKey: group.key,
            groupField: group.field,
            groupValue: group.value,
            level: group.level,
            indent: indentLevel,
            itemCount: group.children.length,
            aggregations: group.aggregations
          });
          // If group is expanded, add children
          if (expandedGroups[group.key]) {
            if ((_a = group.children[0]) === null || _a === void 0 ? void 0 : _a.isGroup) {
              // Nested groups - cast to GroupObject[]
              walkGroups_1(group.children, indentLevel + 1, parentIndex + groupIndex);
            } else {
              // Data rows
              group.children.forEach(function (row, index) {
                var absoluteIndex = parentIndex + groupIndex + index;
                flatList.push({
                  type: "data",
                  row: row,
                  rowIndex: absoluteIndex,
                  indent: indentLevel + 1
                });
                // Add detail row if expanded
                if (masterDetail && expandedRows[absoluteIndex]) {
                  flatList.push({
                    type: "detail",
                    parentRow: row,
                    parentIndex: absoluteIndex,
                    indent: indentLevel + 2
                  });
                }
              });
            }
          }
        });
      };
      walkGroups_1(groupedData, 0, 0);
    } else {
      // Handle flat data
      filteredData.forEach(function (row, index) {
        flatList.push({
          type: "data",
          row: row,
          rowIndex: index,
          indent: 0
        });
        if (masterDetail && expandedRows[index]) {
          flatList.push({
            type: "detail",
            parentRow: row,
            parentIndex: index,
            indent: 1
          });
        }
      });
    }
    return flatList;
  }, [filteredData, groupedData, expandedGroups, expandedRows, masterDetail]);
  // Or modify it to only expand on initial load if you want that behavior
  useEffect(function () {
    if (groupedData && groupedColumns.length === 1) {
      // Only for first grouping
      setExpandedGroups({}); // Reset expanded groups when grouping changes
    }
  }, [groupedData, groupedColumns]);
  // ----------------------------
  // 9) Virtualization Setup
  // ----------------------------
  var scrollParentRef = useRef(null);
  var rowVirtualizer = useVirtualizer({
    count: flattenedRows.length,
    getScrollElement: function () {
      return scrollParentRef.current;
    },
    estimateSize: function (index) {
      var _a;
      var item = flattenedRows[index];
      // Dynamically calculate detail row height based on content
      if ((item === null || item === void 0 ? void 0 : item.type) === "detail") {
        var detailRows = ((_a = detailData[item.parentIndex || 0]) === null || _a === void 0 ? void 0 : _a.length) || 0;
        // Calculate height: header (40px) + rows (40px each) + padding (16px) + extra padding to prevent overlap (16px)
        var calculatedHeight = Math.min(detailRows * 40 + 72, 600); // Cap at 600px
        return calculatedHeight;
      }
      return 40; // Standard row height
    },
    useAnimationFrameWithResizeObserver: true,
    overscan: 5
  });
  // ----------------------------
  // 10) Rendering: Flattened Virtual Rows
  // ----------------------------
  // Which columns do we show? (Ignore rowGroup columns except the first if needed)
  var displayColumns = useMemo(function () {
    return columns.filter(function (col) {
      return col.visible !== false;
    });
  }, [columns]);
  // Add a helper function to get cell value
  var getCellValue = function (row, field, col) {
    // If the row has aggregations and this is an aggregated column, use the aggregation value
    if (row.aggregations && col.aggFunc && row.aggregations[field] !== undefined) {
      return row.aggregations[field];
    }
    // Otherwise, use the field value
    return row[field];
  };
  // Add a helper function to format cell value using valueFormatter if available
  var formatCellValue = function (value, row, col) {
    if (col.valueFormatter) {
      return col.valueFormatter({
        value: value,
        data: row
      });
    }
    return value ? String(value) : "";
  };
  /**
   * Inline helper: Render a single "virtual item" row.
   * We'll handle group vs. data vs. detail row by checking flattenedRows[idx].type.
   */
  var renderRow = function (virtualRow) {
    var item = flattenedRows[virtualRow.index];
    if (!item) {
      return null;
    }
    // 1) Group Header Row
    if (item.type === "group") {
      var isExpanded_1 = item.groupKey ? expandedGroups[item.groupKey] : false;
      var groupColumn_1 = columns.find(function (col) {
        return col.field === item.groupField;
      });
      return /*#__PURE__*/React__default.createElement(TableRow, {
        key: virtualRow.key,
        "data-index": virtualRow.index,
        ref: rowVirtualizer.measureElement,
        style: {
          position: "absolute",
          transform: "translateY(".concat(virtualRow.start, "px)"),
          width: "100%",
          display: "table",
          tableLayout: "fixed",
          top: 0
        },
        className: cn("hover:bg-gray-100")
      }, displayColumns.map(function (col, colIndex) {
        var isGroupColumn = col.field === item.groupField;
        return /*#__PURE__*/React__default.createElement(TableCell, {
          key: "".concat(colIndex, "-").concat(col.field),
          style: __assign(__assign({}, getCellWidth(col)), {
            textWrap: "initial",
            overflow: "hidden",
            cursor: "text"
          }),
          className: "p-0"
        }, isGroupColumn ? (/*#__PURE__*/React__default.createElement("div", {
          className: "flex items-center cursor-pointer w-full",
          onClick: function () {
            return item.groupKey && toggleGroupExpand(item.groupKey);
          }
        }, isExpanded_1 ? (/*#__PURE__*/React__default.createElement(ChevronDown, {
          className: "h-5 w-5 mr-1"
        })) : (/*#__PURE__*/React__default.createElement(ChevronRight, {
          className: "h-5 w-5 mr-1"
        })), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("p", {
          className: "font-medium"
        }, groupColumn_1 ? "".concat(String(item.groupValue)) : String(item.groupValue)), /*#__PURE__*/React__default.createElement("p", {
          className: "text-gray-500 font-[10px]"
        }, "(", item.itemCount, " items)")))) : col.aggFunc && item.aggregations && item.aggregations[col.field] !== undefined ? (/*#__PURE__*/React__default.createElement("div", {
          className: "w-full"
        }, /*#__PURE__*/React__default.createElement("div", {
          className: "flex items-center bg-gray-100 px-2 w-[min-content] rounded-md text-sm"
        }, /*#__PURE__*/React__default.createElement("span", {
          className: "text-gray-600 capitalize"
        }, col.aggFunc), /*#__PURE__*/React__default.createElement("span", {
          className: "mx-1 text-gray-500"
        }, ":"), /*#__PURE__*/React__default.createElement("span", {
          className: "font-semibold text-gray-900"
        }, function () {
          var value = item.aggregations[col.field];
          switch (col.aggFunc) {
            case "avg":
              return value.toFixed(2);
            case "count":
              return Math.round(value).toString();
            default:
              return value.toLocaleString();
          }
        }())))) : null);
      }));
    }
    // 2) Data Row
    if (item.type === "data") {
      var row_2 = item.row,
        indent_1 = item.indent,
        rowIndex_1 = item.rowIndex;
      var isExpanded = rowIndex_1 !== undefined ? expandedRows[rowIndex_1] : false;
      var expandButton_1 = null;
      if ((row_2 === null || row_2 === void 0 ? void 0 : row_2.children) && Array.isArray(row_2.children) && row_2.children.length > 0) {
        expandButton_1 = /*#__PURE__*/React__default.createElement("button", {
          className: "mr-2 focus:outline-none",
          onClick: function () {
            return rowIndex_1 !== undefined && toggleRowExpand(rowIndex_1);
          }
        }, isExpanded ? (/*#__PURE__*/React__default.createElement(ChevronDown, {
          className: "h-4 w-4"
        })) : (/*#__PURE__*/React__default.createElement(ChevronRight, {
          className: "h-4 w-4"
        })));
      }
      return /*#__PURE__*/React__default.createElement(TableRow, {
        key: virtualRow.key,
        "data-index": virtualRow.index,
        ref: rowVirtualizer.measureElement,
        style: {
          position: "absolute",
          transform: "translateY(".concat(virtualRow.start, "px)"),
          width: "100%",
          display: "table",
          tableLayout: "fixed",
          top: 0
        },
        className: cn({
          "bg-blue-100": rowIndex_1 !== undefined && selectedRows[rowIndex_1],
          "hover:bg-gray-100": true
        }),
        onClick: function () {
          return onRowClick === null || onRowClick === void 0 ? void 0 : onRowClick({
            data: row_2,
            rowIndex: rowIndex_1
          });
        }
      }, rowSelection && (/*#__PURE__*/React__default.createElement(TableCell, {
        key: "checkbox-cell-".concat(rowIndex_1),
        className: "w-[50px]"
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "w-[30px] flex justify-center items-center"
      }, /*#__PURE__*/React__default.createElement(Checkbox, {
        checked: rowIndex_1 !== undefined ? !!selectedRows[rowIndex_1] : false,
        onCheckedChange: function (checked) {
          handleRowCheckboxChange(rowIndex_1, checked);
        },
        onClick: function (e) {
          e.stopPropagation();
        },
        className: "border-1 border-gray-400 cursor-pointer"
      })))), displayColumns.map(function (col, colIndex) {
        var cellRenderer = col.cellRenderer;
        var cellValue = row_2 ? getCellValue(row_2, col.field, col) : undefined;
        var isEditing = editingCell && editingCell.rowIndex === rowIndex_1 && editingCell.field === col.field;
        // If it's the first column and there's master detail, show expand button
        if (colIndex === 0 && masterDetail) {
          return /*#__PURE__*/React__default.createElement(TableCell, {
            key: "".concat(colIndex, "-").concat(col.field),
            style: __assign(__assign({}, getCellWidth(col)), {
              overflow: "hidden",
              cursor: col.editable ? "pointer" : "text",
              textWrap: "initial"
            })
          }, /*#__PURE__*/React__default.createElement("div", {
            className: "flex items-center w-full",
            style: {
              paddingLeft: "".concat((indent_1 || 0) * 20, "px")
            }
          }, expandButton_1, formatCellValue(cellValue, row_2 || {}, col)));
        }
        return /*#__PURE__*/React__default.createElement(TableCell, {
          key: col.field,
          style: __assign(__assign({}, getCellWidth(col)), {
            overflow: "hidden",
            cursor: col.editable ? "pointer" : "text",
            textWrap: "wrap",
            whiteSpace: "normal",
            wordBreak: "break-word"
          }),
          className: cn(isEditing ? "p-[0px]" : ""),
          onDoubleClick: function () {
            if (!cellRenderer && col.editable && rowIndex_1 !== undefined && col.editorType !== "checkbox" && !col.rowGroup) {
              startEditing(rowIndex_1, col.field, String(cellValue));
            }
          }
        }, cellRenderer ? (/*#__PURE__*/React__default.createElement(cellRenderer, {
          value: cellValue,
          data: row_2,
          rowIndex: rowIndex_1
        })) : isEditing && col.editorType !== "checkbox" ? (/*#__PURE__*/React__default.createElement(CellEditor, {
          value: editValue,
          columnDef: {
            editorType: col.editorType || "text",
            editorParams: col.editorParams
          },
          onChange: function (value) {
            return handleEditChange(value, col.editorType);
          },
          onBlur: function () {
            var _a;
            // Commit changes
            if (!editingCell && col.editorType !== "select" && col.editorType !== "date" && col.editorType !== "checkbox") return;
            var field = editingCell.field;
            var updatedData = col.valueSetter ? col.valueSetter({
              value: editValue
            }) : (_a = {}, _a[field] = editValue, _a);
            var newRow = __assign(__assign({}, row_2), updatedData);
            var idxInAll = gridData.findIndex(function (r) {
              return r === row_2;
            });
            if (idxInAll !== -1) {
              var newData = __spreadArray([], gridData, true);
              newData[idxInAll] = newRow;
              var cookedData_3 = getCookedData(newData);
              setGridData(__spreadArray([], cookedData_3, true));
              setHistory(function (prev) {
                return {
                  past: __spreadArray(__spreadArray([], prev.past, true), [prev.present], false),
                  present: cookedData_3,
                  future: []
                };
              });
            }
            //For notify parent with new record, previous record and field
            if (onDataChange) {
              onDataChange(newRow, gridData[rowIndex_1], field);
            }
            setEditingCell(null);
            setEditValue("");
          },
          onKeyDown: function (e) {
            if (e.key === "Enter" || e.key === "Escape") {
              e.currentTarget.blur();
            }
          }
        })) : col.editorType === "checkbox" && col.editable ? (/*#__PURE__*/React__default.createElement("div", {
          className: "flex items-center space-x-2"
        }, /*#__PURE__*/React__default.createElement(Switch, {
          id: "".concat(rowIndex_1, "-").concat(col.field),
          className: "cursor-pointer",
          onCheckedChange: function (value) {
            return handleEditChangeCheckbox(value, rowIndex_1, col.field);
          },
          checked: cellValue
        }))) : (/*#__PURE__*/React__default.createElement("div", {
          className: "w-full"
        }, col.tooltipField ? (/*#__PURE__*/React__default.createElement(Tooltip, null, /*#__PURE__*/React__default.createElement(TooltipTrigger, {
          asChild: true
        }, /*#__PURE__*/React__default.createElement("span", null, col.rowGroup ? "" : formatCellValue(cellValue, row_2 || {}, col))), /*#__PURE__*/React__default.createElement(TooltipContent, {
          className: ""
        }, col.tooltipField && (row_2 === null || row_2 === void 0 ? void 0 : row_2[col.tooltipField]) ? String(row_2[col.tooltipField]) : col.rowGroup ? "" : formatCellValue(cellValue, row_2 || {}, col)))) : formatCellValue(cellValue, row_2 || {}, col))));
      }));
    }
    // 3) Detail Row
    if (item.type === "detail") {
      var parentIndex = item.parentIndex;
      return /*#__PURE__*/React__default.createElement(TableRow, {
        key: virtualRow.key,
        "data-index": virtualRow.index,
        ref: rowVirtualizer.measureElement,
        style: {
          position: "absolute",
          transform: "translateY(".concat(virtualRow.start, "px)"),
          width: "100%",
          display: "table",
          tableLayout: "fixed",
          top: 0
        }
      }, /*#__PURE__*/React__default.createElement(TableCell, {
        colSpan: displayColumns.length,
        style: {
          padding: 0,
          backgroundColor: "white",
          position: "relative",
          overflow: "hidden",
          width: "100%",
          zIndex: 30
        }
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "detail-grid-container",
        style: {
          padding: "20px",
          overflow: "auto",
          position: "relative",
          backgroundColor: "white",
          width: "100%",
          zIndex: 30
        }
      }, parentIndex !== undefined && detailData[parentIndex] ? (/*#__PURE__*/React__default.createElement("div", {
        className: "h-full w-full datagrid-container",
        style: {
          position: "relative",
          zIndex: 30,
          overflow: "visible" // Allow dropdowns to overflow
        }
      }, /*#__PURE__*/React__default.createElement(DataGrid, {
        columnDefs: detailGridOptions,
        data: detailData[parentIndex],
        isChild: true
      }))) : (/*#__PURE__*/React__default.createElement("div", {
        className: "h-full w-full flex items-center justify-center"
      }, "Loading detail data...")))));
    }
    return null;
  };
  // Modify the group drop handler
  var handleGroupDrop = useCallback(function (e) {
    e.preventDefault();
    var field = e.dataTransfer.getData("columnField");
    if (field && !groupedColumns.includes(field)) {
      setColumnGrouped(field, true);
    }
  }, [groupedColumns, setColumnGrouped]);
  // // Add this effect to ensure data consistency
  // useEffect(() => {
  //   if (data && data.length > 0 && columns.length > 0) {
  //     setGridData(data);
  //   }
  // }, [data, columns]);
  // Add total row calculation
  var calculateTotals = useMemo(function () {
    var totals = {};
    // Only calculate for numeric columns
    columns.forEach(function (col) {
      if (col.type === "number") {
        var sum = gridData.reduce(function (acc, row) {
          var value = Number(row[col.field]) || 0;
          return acc + value;
        }, 0);
        totals[col.field] = sum;
      }
    });
    return totals;
  }, [gridData, columns]);
  var getCellWidth = function (col) {
    if (tableLayout === "auto") {
      return {
        width: col.width ? Math.min(col.width, 250) : 220,
        minWidth: col.width ? Math.min(col.width, 250) : 220,
        maxWidth: 250
      };
    }
    return {
      width: "intital"
    };
  };
  var renderTotalRow = function () {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "bg-gray-100  ".concat(grandTotalRow === "bottom" ? "sticky bottom-0" : "sticky top-0")
    }, /*#__PURE__*/React__default.createElement(Table, {
      className: "".concat(tableLayout === "fixed" ? "table-fixed" : "table-auto", " border-b border-gray-200")
    }, /*#__PURE__*/React__default.createElement(TableBody, null, /*#__PURE__*/React__default.createElement(TableRow, null, displayColumns.map(function (col, index) {
      var _a;
      return /*#__PURE__*/React__default.createElement(TableCell, {
        key: col.field,
        style: __assign({}, getCellWidth(col))
      }, col.type === "number" ? (/*#__PURE__*/React__default.createElement("div", {
        className: "font-semibold"
      }, (_a = calculateTotals[col.field]) === null || _a === void 0 ? void 0 : _a.toLocaleString())) : (/*#__PURE__*/React__default.createElement("div", {
        className: "font-semibold"
      }, index === 0 ? "Total" : "")));
    })))));
  };
  /**
   * Handles the selection and deselection of a single row in the DataGrid.
   * Updates the selectedRows state based on the checkbox state.
   */
  var handleRowCheckboxChange = function (rowIndex, checked) {
    if (rowIndex === undefined) return;
    setSelectedRows(function (prev) {
      var _a;
      if (rowSelection && rowSelection.mode === "single") {
        // Only allow one row to be selected at a time
        return checked ? (_a = {}, _a[rowIndex] = true, _a) : {};
      }
      var updated = __assign({}, prev);
      if (checked) {
        updated[rowIndex] = true;
      } else {
        delete updated[rowIndex];
      }
      return updated;
    });
  };
  /**
   * Handles the selection and deselection of all rows in the DataGrid when the header checkbox is toggled.
   */
  var handleHeaderCheckboxChange = function (checked) {
    if (rowSelection && rowSelection.mode === "single") {
      // In single mode, header checkbox should select only the first row or deselect all
      if (checked && gridData.length > 0) {
        setSelectedRows({
          0: true
        });
      } else {
        setSelectedRows({});
      }
      return;
    }
    if (checked) {
      var allSelected_1 = {};
      gridData.forEach(function (row, idx) {
        allSelected_1[idx] = true;
      });
      setSelectedRows(allSelected_1);
    } else {
      setSelectedRows({});
    }
  };
  // Add useEffect to call onRowSelectionChange when selectedRows changes
  useEffect(function () {
    if (rowSelection && typeof (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.getSelectedRows) === "function") {
      var selectedData = Object.entries(selectedRows).filter(function (_a) {
        var isSelected = _a[1];
        return isSelected;
      }).map(function (_a) {
        var index = _a[0];
        return data[+index];
      });
      rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.getSelectedRows(selectedData);
    }
  }, [selectedRows]);
  var _5 = useState(""),
    search = _5[0],
    setSearch = _5[1];
  var _6 = useState(false),
    sidebarOpen = _6[0],
    setSidebarOpen = _6[1];
  // Update the main grid container JSX
  return /*#__PURE__*/React__default.createElement("div", {
    className: "relative w-[100%] h-full"
  }, loading && (/*#__PURE__*/React__default.createElement("div", {
    className: "absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React__default.createElement(PulseLoader, {
    color: "#4f46e5",
    size: 15
  }), /*#__PURE__*/React__default.createElement("p", {
    className: "mt-4 text-gray-600"
  }, loadingMessage)))), gridData.length > 0 && grandTotalRow === "top" && renderTotalRow(), /*#__PURE__*/React__default.createElement("div", {
    className: "flex h-full max-h-[100vh]"
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      overflow: "auto",
      height: "100%"
    },
    ref: scrollParentRef
  }, /*#__PURE__*/React__default.createElement(Table, {
    ref: tableRef,
    className: cn("w-full border-b border-l border-r border-gray-200"),
    style: {
      tableLayout: tableLayout
    }
  }, /*#__PURE__*/React__default.createElement(TableHeader, {
    className: "sticky top-0 z-30 bg-gray-200 shadow-sm"
  }, /*#__PURE__*/React__default.createElement(TableRow, {
    className: "divide-x divide-gray-300"
  }, rowSelection && (/*#__PURE__*/React__default.createElement(TableHead, {
    className: "w-[50px]"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "w-[30px] flex justify-center items-center"
  }, /*#__PURE__*/React__default.createElement(Checkbox, {
    checked: Object.keys(selectedRows).length > 0 && Object.keys(selectedRows).length === gridData.length,
    onCheckedChange: handleHeaderCheckboxChange,
    className: "border-1 border-gray-400 cursor-pointer"
  })))), displayColumns.map(function (col) {
    var isDragged = draggedColumn === col.field;
    var isDragOver = dragOverColumn === col.field;
    return /*#__PURE__*/React__default.createElement(TableHead, {
      key: col.field,
      draggable: showGroupByPanel,
      className: cn("top-0 z-10 transition-colors", {
        "opacity-50": isDragged,
        "border-1 border-gray-400": isDragOver,
        "cursor-move": showGroupByPanel
      }),
      style: __assign({}, getCellWidth(col)),
      onDragStart: function (e) {
        handleColumnDragStart(e, col.field);
        e.dataTransfer.setData("columnField", col.field);
      },
      onDragOver: function (e) {
        return handleColumnDragOver(e, col.field);
      },
      onDragEnter: handleColumnDragEnter,
      onDragLeave: handleColumnDragLeave,
      onDrop: function (e) {
        return handleColumnDrop(e, col.field);
      },
      onDragEnd: handleColumnDragEnd
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "w-inherit flex items-center"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "flex-1 flex items-center justify-between w-[85%]"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "group flex items-center cursor-pointer font-semibold w-full text-gray-700",
      onClick: function (e) {
        return handleMultiSort(col.field, e);
      }
    }, /*#__PURE__*/React__default.createElement(Tooltip, null, /*#__PURE__*/React__default.createElement(TooltipTrigger, {
      asChild: true
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "w-[85%] break-words whitespace-normal",
      style: {
        textWrap: "initial"
      }
    }, /*#__PURE__*/React__default.createElement("p", null, col.headerName))), col.headerTooltip && (/*#__PURE__*/React__default.createElement(TooltipContent, {
      className: ""
    }, col.headerTooltip))), /*#__PURE__*/React__default.createElement("span", {
      className: "ml-1 w-[10%] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
    }, sortConfig.key === col.field ? sortConfig.direction === "asc" ? (/*#__PURE__*/React__default.createElement(ChevronUp, {
      className: "h-4 w-4 text-gray-400"
    })) : (/*#__PURE__*/React__default.createElement(ChevronDown, {
      className: "h-4 w-4 text-gray-400"
    })) : (/*#__PURE__*/React__default.createElement(ChevronsUpDown, {
      className: "h-4 w-4 text-gray-400"
    })))), col.showFilter !== false && (/*#__PURE__*/React__default.createElement("div", {
      className: "relative group"
    }, /*#__PURE__*/React__default.createElement(Popover, null, /*#__PURE__*/React__default.createElement(PopoverTrigger, {
      asChild: true
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "p-1 hover:bg-gray-200 rounded cursor-pointer filter-icon",
      "data-column": col.field
    }, /*#__PURE__*/React__default.createElement(ListFilter, {
      className: "h-4 w-4 ".concat(filters[col.field] ? "text-blue-500" : "text-gray-500")
    }))), /*#__PURE__*/React__default.createElement(PopoverContent, {
      className: "w-auto min-w-[220px] max-w-[250px] p-3 rounded-md shadow-lg bg-white border border-gray-200"
    }, /*#__PURE__*/React__default.createElement(CellFilter, {
      column: col,
      value: filters[col.field] || "",
      filterType: filterTypes[col.field],
      onFilterChange: function (value) {
        return handleFilterChange(col.field, value);
      },
      onFilterTypeChange: function (type) {
        return handleFilterTypeChange(col.field, type);
      },
      onClear: function () {
        return handleFilterChange(col.field, "");
      }
    }))))))));
  }))), /*#__PURE__*/React__default.createElement(TableBody, {
    style: {
      height: "".concat(rowVirtualizer.getTotalSize(), "px"),
      position: "relative"
    }
  }, rowVirtualizer.getVirtualItems().map(function (virtualRow) {
    return renderRow(virtualRow);
  }), flattenedRows.length === 0 && (/*#__PURE__*/React__default.createElement(TableRow, {
    className: "h-24 text-center"
  }, /*#__PURE__*/React__default.createElement(TableCell, {
    colSpan: displayColumns.length,
    className: "h-24 text-center"
  }, "No results found")))))), showGroupByPanel && flattenedRows.length !== 0 && (/*#__PURE__*/React__default.createElement("div", {
    style: {
      width: "auto",
      display: "flex"
    }
  }, sidebarOpen && (/*#__PURE__*/React__default.createElement("aside", {
    style: {
      backgroundColor: "#1f2937",
      // bg-gray-900
      color: "#ffffff",
      // text-white
      padding: "1rem",
      // p-4
      borderLeft: "1px solid #374151",
      // border-l border-gray-700
      width: "280px",
      // w-[280px]
      display: "flex",
      // flex
      flexDirection: "column",
      // flex-col
      height: "480px",
      overflowY: "auto",
      // overflow-y-auto
      overflowX: "hidden" // overflow-x-hidden
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      padding: "0.75rem 1rem",
      // px-4 py-3
      borderBottom: "1px solid #353945"
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React__default.createElement(Checkbox, {
    style: {
      borderWidth: 1,
      borderColor: "#9ca3af",
      // border-gray-400
      cursor: "pointer"
    },
    checked: columns.every(function (col) {
      return col.visible !== false;
    }),
    onCheckedChange: function (checked) {
      return setColumns(function (cols) {
        return cols.map(function (c) {
          return __assign(__assign({}, c), {
            visible: checked
          });
        });
      });
    },
    className: undefined
  }), /*#__PURE__*/React__default.createElement("input", {
    type: "text",
    placeholder: "Search...",
    value: search,
    onChange: function (e) {
      return setSearch(e.target.value);
    },
    style: {
      backgroundColor: "#232733",
      border: "1px solid #353945",
      borderRadius: "0.25rem",
      padding: "0.25rem 0.5rem",
      color: "#ffffff",
      width: "100%",
      outline: "none"
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      maxHeight: "10rem",
      // max-h-40 = 160px
      overflowY: "auto"
    }
  }, columns.filter(function (col) {
    return col.headerName.toLowerCase().includes(search.toLowerCase());
  }).map(function (col, idx) {
    return /*#__PURE__*/React__default.createElement("div", {
      key: col.field,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      }
    }, /*#__PURE__*/React__default.createElement(Checkbox, {
      checked: col.visible !== false,
      onCheckedChange: function (checked) {
        return setColumns(function (cols) {
          return cols.map(function (c, i) {
            return i === idx ? __assign(__assign({}, c), {
              visible: checked
            }) : c;
          });
        });
      },
      style: {
        borderWidth: 1,
        borderColor: "#9ca3af",
        cursor: "pointer"
      },
      className: undefined
    }), /*#__PURE__*/React__default.createElement(GripVertical, {
      style: {
        width: "1rem",
        height: "1rem",
        color: "#9ca3af",
        cursor: "move"
      }
    }), /*#__PURE__*/React__default.createElement("span", null, col.headerName));
  }))), /*#__PURE__*/React__default.createElement("div", {
    style: {
      padding: "0.75rem 1rem",
      // px-4 py-3
      borderBottom: "1px solid #353945",
      flexShrink: 0
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    }
  }, /*#__PURE__*/React__default.createElement(List, {
    style: {
      width: "1rem",
      height: "1rem"
    }
  }), /*#__PURE__*/React__default.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "Row Groups")), /*#__PURE__*/React__default.createElement(GroupPanel, {
    showGroupByPanel: showGroupByPanel,
    groupedColumns: groupedColumns,
    columns: columns,
    setColumnGrouped: setColumnGrouped,
    handleGroupDrop: handleGroupDrop
  })))), /*#__PURE__*/React__default.createElement("div", {
    style: {
      height: "100%",
      background: "#404c58"
    }
  }, /*#__PURE__*/React__default.createElement("button", {
    onClick: function () {
      return setSidebarOpen(!sidebarOpen);
    },
    className: "px-2 py-1 p-2",
    style: {
      cursor: "pointer",
      writingMode: "vertical-rl",
      background: sidebarOpen ? "#2d353d" : "#404c58",
      color: "#ffffff",
      display: "flex",
      flexDirection: "row",
      gap: "5px",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: sidebarOpen ? "1px solid #848484" : "transparent"
    }
  }, /*#__PURE__*/React__default.createElement(Calendar, {
    className: "w-4 h-4"
  }), "Columns"))))), /*#__PURE__*/React__default.createElement("div", {
    className: "sticky bottom-0 bg-white"
  }, gridData.length > 0 && grandTotalRow === "bottom" && renderTotalRow()));
});
DataGrid.displayName = "DataGrid";

export { DataGrid, DataGrid as default };
//# sourceMappingURL=index.esm.js.map
