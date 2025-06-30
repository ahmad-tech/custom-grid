'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var reactVirtual = require('@tanstack/react-virtual');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var lodash = require('lodash');
var CheckboxPrimitive = require('@radix-ui/react-checkbox');
var lucideReact = require('lucide-react');
var reactSpinners = require('react-spinners');
var SelectPrimitive = require('@radix-ui/react-select');
var dateFns = require('date-fns');
var reactDayPicker = require('react-day-picker');
var reactSlot = require('@radix-ui/react-slot');
var classVarianceAuthority = require('class-variance-authority');
var PopoverPrimitive = require('@radix-ui/react-popover');
var ScrollAreaPrimitive = require('@radix-ui/react-scroll-area');
var TooltipPrimitive = require('@radix-ui/react-tooltip');
var moment = require('moment');
var SwitchPrimitive = require('@radix-ui/react-switch');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);
var CheckboxPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(CheckboxPrimitive);
var SelectPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(SelectPrimitive);
var PopoverPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(PopoverPrimitive);
var ScrollAreaPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(ScrollAreaPrimitive);
var TooltipPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(TooltipPrimitive);
var SwitchPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(SwitchPrimitive);

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
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}

var Table = /*#__PURE__*/React__namespace.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = tslib.__rest(_a, ["className"]);
  return /*#__PURE__*/React__namespace.createElement("div", {
    "data-slot": "table-container",
    className: "relative w-full h-[100%]"
  }, /*#__PURE__*/React__namespace.createElement("table", tslib.__assign({
    ref: ref,
    "data-slot": "table",
    className: cn("w-full caption-bottom text-sm h-[100%]", className)
  }, props)));
});
Table.displayName = "Table";
var TableHeader = /*#__PURE__*/React__namespace.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = tslib.__rest(_a, ["className"]);
  return /*#__PURE__*/React__namespace.createElement("thead", tslib.__assign({
    ref: ref,
    "data-slot": "table-header",
    className: cn("[&_tr]:border-b", className)
  }, props));
});
TableHeader.displayName = "TableHeader";
var TableBody = /*#__PURE__*/React__namespace.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = tslib.__rest(_a, ["className"]);
  return /*#__PURE__*/React__namespace.createElement("tbody", tslib.__assign({
    ref: ref,
    "data-slot": "table-body",
    className: cn("[&_tr:last-child]:border-0", className)
  }, props));
});
TableBody.displayName = "TableBody";
var TableFooter = /*#__PURE__*/React__namespace.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = tslib.__rest(_a, ["className"]);
  return /*#__PURE__*/React__namespace.createElement("tfoot", tslib.__assign({
    ref: ref,
    "data-slot": "table-footer",
    className: cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)
  }, props));
});
TableFooter.displayName = "TableFooter";
var TableRow = /*#__PURE__*/React__namespace.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = tslib.__rest(_a, ["className"]);
  return /*#__PURE__*/React__namespace.createElement("tr", tslib.__assign({
    ref: ref,
    "data-slot": "table-row",
    className: cn("data-[state=selected]:bg-muted border-b border-gray-200 transition-colors", className)
  }, props));
});
TableRow.displayName = "TableRow";
var TableHead = /*#__PURE__*/React__namespace.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = tslib.__rest(_a, ["className"]);
  return /*#__PURE__*/React__namespace.createElement("th", tslib.__assign({
    ref: ref,
    "data-slot": "table-head",
    className: cn("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)
  }, props));
});
TableHead.displayName = "TableHead";
var TableCell = /*#__PURE__*/React__namespace.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = tslib.__rest(_a, ["className"]);
  return /*#__PURE__*/React__namespace.createElement("td", tslib.__assign({
    ref: ref,
    "data-slot": "table-cell",
    className: cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)
  }, props));
});
TableCell.displayName = "TableCell";
var TableCaption = /*#__PURE__*/React__namespace.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = tslib.__rest(_a, ["className"]);
  return /*#__PURE__*/React__namespace.createElement("caption", tslib.__assign({
    ref: ref,
    "data-slot": "table-caption",
    className: cn("text-muted-foreground mt-4 text-sm", className)
  }, props));
});
TableCaption.displayName = "TableCaption";

function Checkbox(_a) {
  var className = _a.className,
    props = tslib.__rest(_a, ["className"]);
  return /*#__PURE__*/React__namespace.createElement(CheckboxPrimitive__namespace.Root, tslib.__assign({
    "data-slot": "checkbox",
    className: cn("peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className)
  }, props), /*#__PURE__*/React__namespace.createElement(CheckboxPrimitive__namespace.Indicator, {
    "data-slot": "checkbox-indicator",
    className: "flex items-center justify-center text-current transition-none"
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.CheckIcon, {
    className: "size-3.5"
  })));
}

var Input = /*#__PURE__*/React__namespace.forwardRef(function (_a, ref) {
  var className = _a.className,
    _b = _a.type,
    type = _b === void 0 ? "text" : _b,
    props = tslib.__rest(_a, ["className", "type"]);
  return /*#__PURE__*/React__namespace.createElement("input", tslib.__assign({
    type: type,
    ref: ref,
    "data-slot": "input",
    className: cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:ring-[1px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className)
  }, props));
});
Input.displayName = "Input";

// Root
function Select(props) {
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Root, tslib.__assign({
    "data-slot": "select"
  }, props));
}
// Group
function SelectGroup(props) {
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Group, tslib.__assign({
    "data-slot": "select-group"
  }, props));
}
// Value
function SelectValue(props) {
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Value, tslib.__assign({
    "data-slot": "select-value"
  }, props));
}
function SelectTrigger(_a) {
  var className = _a.className,
    _b = _a.size,
    size = _b === void 0 ? "default" : _b,
    children = _a.children,
    props = tslib.__rest(_a, ["className", "size", "children"]);
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Trigger, tslib.__assign({
    "data-slot": "select-trigger",
    "data-size": size,
    className: cn("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)
  }, props), children, /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Icon, {
    asChild: true
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronDownIcon, {
    className: "size-4 opacity-50"
  })));
}
function SelectContent(_a) {
  var className = _a.className,
    children = _a.children,
    _b = _a.position,
    position = _b === void 0 ? "popper" : _b,
    props = tslib.__rest(_a, ["className", "children", "position"]);
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Portal, null, /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Content, tslib.__assign({
    "data-slot": "select-content",
    className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
    position: position
  }, props), /*#__PURE__*/React__namespace.createElement(SelectScrollUpButton, null), /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Viewport, {
    className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1")
  }, children), /*#__PURE__*/React__namespace.createElement(SelectScrollDownButton, null)));
}
function SelectItem(_a) {
  var className = _a.className,
    children = _a.children,
    props = tslib.__rest(_a, ["className", "children"]);
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.Item, tslib.__assign({
    "data-slot": "select-item",
    className: cn("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className)
  }, props), /*#__PURE__*/React__namespace.createElement("span", {
    className: "absolute right-2 flex size-3.5 items-center justify-center"
  }, /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.ItemIndicator, null, /*#__PURE__*/React__namespace.createElement(lucideReact.CheckIcon, {
    className: "size-4"
  }))), /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.ItemText, null, children));
}
// Scroll Up
function SelectScrollUpButton(_a) {
  var className = _a.className,
    props = tslib.__rest(_a, ["className"]);
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.ScrollUpButton, tslib.__assign({
    "data-slot": "select-scroll-up-button",
    className: cn("flex cursor-default items-center justify-center py-1", className)
  }, props), /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronUpIcon, {
    className: "size-4"
  }));
}
// Scroll Down
function SelectScrollDownButton(_a) {
  var className = _a.className,
    props = tslib.__rest(_a, ["className"]);
  return /*#__PURE__*/React__namespace.createElement(SelectPrimitive__namespace.ScrollDownButton, tslib.__assign({
    "data-slot": "select-scroll-down-button",
    className: cn("flex cursor-default items-center justify-center py-1", className)
  }, props), /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronDownIcon, {
    className: "size-4"
  }));
}

var buttonVariants = classVarianceAuthority.cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
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
var Button = /*#__PURE__*/React__namespace.forwardRef(function (_a, ref) {
  var className = _a.className,
    variant = _a.variant,
    size = _a.size,
    _b = _a.asChild,
    asChild = _b === void 0 ? false : _b,
    props = tslib.__rest(_a, ["className", "variant", "size", "asChild"]);
  var Comp = asChild ? reactSlot.Slot : "button";
  return /*#__PURE__*/React__namespace.createElement(Comp, tslib.__assign({
    className: cn(buttonVariants({
      variant: variant,
      size: size,
      className: className
    })),
    ref: ref
  }, props));
});
Button.displayName = "Button";

// Popover Root
function Popover(props) {
  return /*#__PURE__*/React__namespace.createElement(PopoverPrimitive__namespace.Root, tslib.__assign({
    "data-slot": "popover"
  }, props));
}
// Popover Trigger
function PopoverTrigger(props) {
  return /*#__PURE__*/React__namespace.createElement(PopoverPrimitive__namespace.Trigger, tslib.__assign({
    "data-slot": "popover-trigger"
  }, props));
}
function PopoverContent(_a) {
  var className = _a.className,
    _b = _a.align,
    align = _b === void 0 ? "center" : _b,
    _c = _a.sideOffset,
    sideOffset = _c === void 0 ? 4 : _c,
    props = tslib.__rest(_a, ["className", "align", "sideOffset"]);
  return /*#__PURE__*/React__namespace.createElement(PopoverPrimitive__namespace.Portal, null, /*#__PURE__*/React__namespace.createElement(PopoverPrimitive__namespace.Content, tslib.__assign({
    "data-slot": "popover-content",
    align: align,
    sideOffset: sideOffset,
    className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden", className)
  }, props)));
}

// ⬅️ Move ScrollBar component first
var ScrollBar = /*#__PURE__*/React__namespace.forwardRef(function (_a, ref) {
  var className = _a.className,
    _b = _a.orientation,
    orientation = _b === void 0 ? "vertical" : _b,
    props = tslib.__rest(_a, ["className", "orientation"]);
  return /*#__PURE__*/React__namespace.createElement(ScrollAreaPrimitive__namespace.ScrollAreaScrollbar, tslib.__assign({
    ref: ref,
    orientation: orientation,
    className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className)
  }, props), /*#__PURE__*/React__namespace.createElement(ScrollAreaPrimitive__namespace.ScrollAreaThumb, {
    className: "relative flex-1 rounded-full bg-border"
  }));
});
ScrollBar.displayName = ScrollAreaPrimitive__namespace.ScrollAreaScrollbar.displayName;
// ⬇️ ScrollArea defined after ScrollBar
var ScrollArea = /*#__PURE__*/React__namespace.forwardRef(function (_a, ref) {
  var className = _a.className,
    children = _a.children,
    props = tslib.__rest(_a, ["className", "children"]);
  return /*#__PURE__*/React__namespace.createElement(ScrollAreaPrimitive__namespace.Root, tslib.__assign({
    ref: ref,
    className: cn("relative overflow-hidden", className)
  }, props), /*#__PURE__*/React__namespace.createElement(ScrollAreaPrimitive__namespace.Viewport, {
    className: "h-full w-full rounded-[inherit]"
  }, children), /*#__PURE__*/React__namespace.createElement(ScrollBar, null), /*#__PURE__*/React__namespace.createElement(ScrollAreaPrimitive__namespace.Corner, null));
});
ScrollArea.displayName = ScrollAreaPrimitive__namespace.Root.displayName;

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
    props = tslib.__rest(_a, ["value", "onChange", "renderTrigger", "min", "max", "timezone", "hideTime", "use12HourFormat", "disabled", "clearable", "classNames", "timePicker", "modal"]);
  var _c = React.useState(false),
    open = _c[0],
    setOpen = _c[1];
  var _d = React.useState(false),
    monthYearPicker = _d[0],
    setMonthYearPicker = _d[1];
  var initDate = React.useMemo(function () {
    return new reactDayPicker.TZDate(value || new Date(), timezone);
  }, [value, timezone]);
  var _e = React.useState(initDate),
    month = _e[0],
    setMonth = _e[1];
  var _f = React.useState(initDate),
    date = _f[0],
    setDate = _f[1];
  var endMonth = React.useMemo(function () {
    return dateFns.setYear(month, dateFns.getYear(month) + 1);
  }, [month]);
  var minDate = React.useMemo(function () {
    return min ? new reactDayPicker.TZDate(min, timezone) : undefined;
  }, [min, timezone]);
  var maxDate = React.useMemo(function () {
    return max ? new reactDayPicker.TZDate(max, timezone) : undefined;
  }, [max, timezone]);
  var onDayChanged = React.useCallback(function (d) {
    d.setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    if (min && d < min) {
      d.setHours(min.getHours(), min.getMinutes(), min.getSeconds());
    }
    if (max && d > max) {
      d.setHours(max.getHours(), max.getMinutes(), max.getSeconds());
    }
    setDate(d);
  }, [setDate, setMonth]);
  var onSubmit = React.useCallback(function () {
    onChange(new Date(date));
    setOpen(false);
  }, [date, onChange]);
  var onMonthYearChanged = React.useCallback(function (d, mode) {
    setMonth(d);
    if (mode === "year") {
      setMonthYearPicker("month");
    } else {
      setMonthYearPicker(false);
    }
  }, [setMonth, setMonthYearPicker]);
  var onNextMonth = React.useCallback(function () {
    setMonth(dateFns.addMonths(month, 1));
  }, [month]);
  var onPrevMonth = React.useCallback(function () {
    setMonth(dateFns.subMonths(month, 1));
  }, [month]);
  React.useEffect(function () {
    if (open) {
      setDate(initDate);
      setMonth(initDate);
      setMonthYearPicker(false);
    }
  }, [open, initDate]);
  var displayValue = React.useMemo(function () {
    if (!open && !value) return value;
    return open ? date : initDate;
  }, [date, value, open]);
  var dislayFormat = React.useMemo(function () {
    if (!displayValue) return "Pick a date";
    return dateFns.format(displayValue, "".concat(!hideTime ? "MMM" : "MMMM", " d, yyyy").concat(!hideTime ? use12HourFormat ? " hh:mm:ss a" : " HH:mm:ss" : ""));
  }, [displayValue, hideTime, use12HourFormat]);
  return /*#__PURE__*/React__namespace.createElement(Popover, {
    open: open,
    onOpenChange: setOpen,
    modal: modal
  }, /*#__PURE__*/React__namespace.createElement(PopoverTrigger, {
    asChild: true
  }, renderTrigger ? renderTrigger({
    value: displayValue,
    open: open,
    timezone: timezone,
    disabled: disabled,
    use12HourFormat: use12HourFormat,
    setOpen: setOpen
  }) : (/*#__PURE__*/React__namespace.createElement("div", {
    className: cn("flex w-full cursor-pointer items-center h-9 ps-3 pe-1 font-normal border border-input rounded-md text-sm shadow-sm", !displayValue && "text-muted-foreground", (!clearable || !value) && "pe-3", disabled && "opacity-50 cursor-not-allowed", classNames === null || classNames === void 0 ? void 0 : classNames.trigger),
    tabIndex: 0
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "flex-grow flex items-center"
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.Calendar, {
    className: "mr-2 size-4"
  }), dislayFormat), clearable && value && (/*#__PURE__*/React__namespace.createElement(Button, {
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
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.XCircle, {
    className: "size-4"
  })))))), /*#__PURE__*/React__namespace.createElement(PopoverContent, {
    className: "w-auto p-2"
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "text-md font-bold ms-2 flex items-center cursor-pointer"
  }, /*#__PURE__*/React__namespace.createElement("div", null, /*#__PURE__*/React__namespace.createElement("span", {
    onClick: function () {
      return setMonthYearPicker(monthYearPicker === "month" ? false : "month");
    }
  }, dateFns.format(month, "MMMM")), /*#__PURE__*/React__namespace.createElement("span", {
    className: "ms-1",
    onClick: function () {
      return setMonthYearPicker(monthYearPicker === "year" ? false : "year");
    }
  }, dateFns.format(month, "yyyy"))), /*#__PURE__*/React__namespace.createElement(Button, {
    variant: "ghost",
    size: "icon",
    onClick: function () {
      return setMonthYearPicker(monthYearPicker ? false : "year");
    }
  }, monthYearPicker ? /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronUpIcon, null) : /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronDownIcon, null))), /*#__PURE__*/React__namespace.createElement("div", {
    className: cn("flex space-x-2", monthYearPicker ? "hidden" : "")
  }, /*#__PURE__*/React__namespace.createElement(Button, {
    variant: "ghost",
    size: "icon",
    onClick: onPrevMonth
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronLeftIcon, null)), /*#__PURE__*/React__namespace.createElement(Button, {
    variant: "ghost",
    size: "icon",
    onClick: onNextMonth
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronRightIcon, null)))), /*#__PURE__*/React__namespace.createElement("div", {
    className: "relative overflow-hidden"
  }, /*#__PURE__*/React__namespace.createElement(reactDayPicker.DayPicker, tslib.__assign({
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
  }, props)), /*#__PURE__*/React__namespace.createElement("div", {
    className: cn("absolute top-0 left-0 bottom-0 right-0", monthYearPicker ? "bg-popover" : "hidden")
  }), /*#__PURE__*/React__namespace.createElement(MonthYearPicker, {
    value: month,
    mode: monthYearPicker,
    onChange: onMonthYearChanged,
    minDate: minDate,
    maxDate: maxDate,
    className: cn("absolute top-0 left-0 bottom-0 right-0", monthYearPicker ? "" : "hidden")
  })), /*#__PURE__*/React__namespace.createElement("div", {
    className: "flex flex-col gap-2"
  }, !hideTime && (/*#__PURE__*/React__namespace.createElement(TimePicker, {
    timePicker: timePicker,
    value: date,
    onChange: setDate,
    use12HourFormat: use12HourFormat,
    min: minDate,
    max: maxDate
  })), /*#__PURE__*/React__namespace.createElement("div", {
    className: "flex flex-row-reverse items-center justify-between"
  }, /*#__PURE__*/React__namespace.createElement(Button, {
    className: "ms-2 h-7 px-2",
    onClick: onSubmit
  }, "Done"), timezone && (/*#__PURE__*/React__namespace.createElement("div", {
    className: "text-sm"
  }, /*#__PURE__*/React__namespace.createElement("span", null, "Timezone:"), /*#__PURE__*/React__namespace.createElement("span", {
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
  var yearRef = React.useRef(null);
  var years = React.useMemo(function () {
    var years = [];
    for (var i = 1912; i < 2100; i++) {
      var disabled = false;
      var startY = dateFns.startOfYear(dateFns.setYear(value, i));
      var endY = dateFns.endOfYear(dateFns.setYear(value, i));
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
  var months = React.useMemo(function () {
    var months = [];
    for (var i = 0; i < 12; i++) {
      var disabled = false;
      var startM = dateFns.startOfMonth(dateFns.setMonth(value, i));
      var endM = dateFns.endOfMonth(dateFns.setMonth(value, i));
      if (minDate && endM < minDate) disabled = true;
      if (maxDate && startM > maxDate) disabled = true;
      months.push({
        value: i,
        label: dateFns.format(new Date(0, i), "MMM"),
        disabled: disabled
      });
    }
    return months;
  }, [value]);
  var onYearChange = React.useCallback(function (v) {
    var newDate = dateFns.setYear(value, v.value);
    if (minDate && newDate < minDate) {
      newDate = dateFns.setMonth(newDate, dateFns.getMonth(minDate));
    }
    if (maxDate && newDate > maxDate) {
      newDate = dateFns.setMonth(newDate, dateFns.getMonth(maxDate));
    }
    onChange(newDate, "year");
  }, [onChange, value, minDate, maxDate]);
  React.useEffect(function () {
    var _a;
    if (mode === "year") {
      (_a = yearRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
        behavior: "auto",
        block: "center"
      });
    }
  }, [mode, value]);
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: cn(className)
  }, /*#__PURE__*/React__namespace.createElement(ScrollArea, {
    className: "h-full"
  }, mode === "year" && (/*#__PURE__*/React__namespace.createElement("div", {
    className: "grid grid-cols-4"
  }, years.map(function (year) {
    return /*#__PURE__*/React__namespace.createElement("div", {
      key: year.value,
      ref: year.value === dateFns.getYear(value) ? yearRef : undefined
    }, /*#__PURE__*/React__namespace.createElement(Button, {
      disabled: year.disabled,
      variant: dateFns.getYear(value) === year.value ? "default" : "ghost",
      className: "rounded-full",
      onClick: function () {
        return onYearChange(year);
      }
    }, year.label));
  }))), mode === "month" && (/*#__PURE__*/React__namespace.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, months.map(function (month) {
    return /*#__PURE__*/React__namespace.createElement(Button, {
      key: month.value,
      size: "lg",
      disabled: month.disabled,
      variant: dateFns.getMonth(value) === month.value ? "default" : "ghost",
      className: "rounded-full",
      onClick: function () {
        return onChange(dateFns.setMonth(value, month.value), "month");
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
  var formatStr = React.useMemo(function () {
    return use12HourFormat ? "yyyy-MM-dd hh:mm:ss.SSS a xxxx" : "yyyy-MM-dd HH:mm:ss.SSS xxxx";
  }, [use12HourFormat]);
  var _b = React.useState(dateFns.format(value, "a") === "AM" ? AM_VALUE$1 : PM_VALUE$1),
    ampm = _b[0],
    setAmpm = _b[1];
  var _c = React.useState(use12HourFormat ? +dateFns.format(value, "hh") : value.getHours()),
    hour = _c[0],
    setHour = _c[1];
  var _d = React.useState(value.getMinutes()),
    minute = _d[0],
    setMinute = _d[1];
  var _e = React.useState(value.getSeconds()),
    second = _e[0],
    setSecond = _e[1];
  React.useEffect(function () {
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
  var _hourIn24h = React.useMemo(function () {
    // if (use12HourFormat) {
    //   return (hour % 12) + ampm * 12;
    // }
    return use12HourFormat ? hour % 12 + ampm * 12 : hour;
  }, [value, use12HourFormat, ampm]);
  var hours = React.useMemo(function () {
    return Array.from({
      length: use12HourFormat ? 12 : 24
    }, function (_, i) {
      var disabled = false;
      var hourValue = use12HourFormat ? i === 0 ? 12 : i : i;
      var hDate = dateFns.setHours(value, use12HourFormat ? i + ampm * 12 : i);
      var hStart = dateFns.startOfHour(hDate);
      var hEnd = dateFns.endOfHour(hDate);
      if (min && hEnd < min) disabled = true;
      if (max && hStart > max) disabled = true;
      return {
        value: hourValue,
        label: hourValue.toString().padStart(2, "0"),
        disabled: disabled
      };
    });
  }, [value, min, max, use12HourFormat, ampm]);
  var minutes = React.useMemo(function () {
    var anchorDate = dateFns.setHours(value, _hourIn24h);
    return Array.from({
      length: 60
    }, function (_, i) {
      var disabled = false;
      var mDate = dateFns.setMinutes(anchorDate, i);
      var mStart = dateFns.startOfMinute(mDate);
      var mEnd = dateFns.endOfMinute(mDate);
      if (min && mEnd < min) disabled = true;
      if (max && mStart > max) disabled = true;
      return {
        value: i,
        label: i.toString().padStart(2, "0"),
        disabled: disabled
      };
    });
  }, [value, min, max, _hourIn24h]);
  var seconds = React.useMemo(function () {
    var anchorDate = dateFns.setMilliseconds(dateFns.setMinutes(dateFns.setHours(value, _hourIn24h), minute), 0);
    var _min = min ? dateFns.setMilliseconds(min, 0) : undefined;
    var _max = max ? dateFns.setMilliseconds(max, 0) : undefined;
    return Array.from({
      length: 60
    }, function (_, i) {
      var disabled = false;
      var sDate = dateFns.setSeconds(anchorDate, i);
      if (_min && sDate < _min) disabled = true;
      if (_max && sDate > _max) disabled = true;
      return {
        value: i,
        label: i.toString().padStart(2, "0"),
        disabled: disabled
      };
    });
  }, [value, minute, min, max, _hourIn24h]);
  var ampmOptions = React.useMemo(function () {
    var startD = dateFns.startOfDay(value);
    var endD = dateFns.endOfDay(value);
    return [{
      value: AM_VALUE$1,
      label: "AM"
    }, {
      value: PM_VALUE$1,
      label: "PM"
    }].map(function (v) {
      var disabled = false;
      var start = dateFns.addHours(startD, v.value * 12);
      var end = dateFns.subHours(endD, (1 - v.value) * 12);
      if (min && end < min) disabled = true;
      if (max && start > max) disabled = true;
      return tslib.__assign(tslib.__assign({}, v), {
        disabled: disabled
      });
    });
  }, [value, min, max]);
  var _f = React.useState(false),
    open = _f[0],
    setOpen = _f[1];
  var hourRef = React.useRef(null);
  var minuteRef = React.useRef(null);
  var secondRef = React.useRef(null);
  React.useEffect(function () {
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
  var onHourChange = React.useCallback(function (v) {
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
  var onMinuteChange = React.useCallback(function (v) {
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
  var onAmpmChange = React.useCallback(function (v) {
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
  var display = React.useMemo(function () {
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
    return dateFns.format(value, arr.join(":") + (use12HourFormat ? " a" : ""));
  }, [value, use12HourFormat, timePicker]);
  return /*#__PURE__*/React__namespace.createElement(Popover, {
    open: open,
    onOpenChange: setOpen
  }, /*#__PURE__*/React__namespace.createElement(PopoverTrigger, {
    asChild: true
  }, /*#__PURE__*/React__namespace.createElement(Button, {
    variant: "outline",
    role: "combobox",
    "aria-expanded": open,
    className: "justify-between"
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.Clock, {
    className: "mr-2 size-4"
  }), display, /*#__PURE__*/React__namespace.createElement(lucideReact.ChevronDownIcon, {
    className: "ml-2 size-4 shrink-0 opacity-50"
  }))), /*#__PURE__*/React__namespace.createElement(PopoverContent, {
    className: "p-0",
    side: "top"
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "flex-col gap-2 p-2"
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "flex h-56 grow"
  }, (!timePicker || timePicker.hour) && (/*#__PURE__*/React__namespace.createElement(ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2 pb-48"
  }, hours.map(function (v) {
    return /*#__PURE__*/React__namespace.createElement("div", {
      key: v.value,
      ref: v.value === hour ? hourRef : undefined
    }, /*#__PURE__*/React__namespace.createElement(TimeItem$1, {
      option: v,
      selected: v.value === hour,
      onSelect: onHourChange,
      className: "h-8",
      disabled: v.disabled
    }));
  })))), (!timePicker || timePicker.minute) && (/*#__PURE__*/React__namespace.createElement(ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2 pb-48"
  }, minutes.map(function (v) {
    return /*#__PURE__*/React__namespace.createElement("div", {
      key: v.value,
      ref: v.value === minute ? minuteRef : undefined
    }, /*#__PURE__*/React__namespace.createElement(TimeItem$1, {
      option: v,
      selected: v.value === minute,
      onSelect: onMinuteChange,
      className: "h-8",
      disabled: v.disabled
    }));
  })))), (!timePicker || timePicker.second) && (/*#__PURE__*/React__namespace.createElement(ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2 pb-48"
  }, seconds.map(function (v) {
    return /*#__PURE__*/React__namespace.createElement("div", {
      key: v.value,
      ref: v.value === second ? secondRef : undefined
    }, /*#__PURE__*/React__namespace.createElement(TimeItem$1, {
      option: v,
      selected: v.value === second,
      onSelect: function (v) {
        return setSecond(v.value);
      },
      className: "h-8",
      disabled: v.disabled
    }));
  })))), use12HourFormat && (/*#__PURE__*/React__namespace.createElement(ScrollArea, {
    className: "h-full flex-grow"
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "flex grow flex-col items-stretch overflow-y-auto pe-2"
  }, ampmOptions.map(function (v) {
    return /*#__PURE__*/React__namespace.createElement(TimeItem$1, {
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
  return /*#__PURE__*/React__namespace.createElement(Button, {
    variant: "ghost",
    className: cn("flex justify-center px-1 pe-2 ps-1", className),
    onClick: function () {
      return onSelect(option);
    },
    disabled: disabled
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "w-4"
  }, selected && /*#__PURE__*/React__namespace.createElement(lucideReact.CheckIcon, {
    className: "my-auto size-4"
  })), /*#__PURE__*/React__namespace.createElement("span", {
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
    var dateStrRaw = dateFns.format(value, formatStr);
    // yyyy-MM-dd hh:mm:ss.SSS a zzzz
    // 2024-10-14 01:20:07.524 AM GMT+00:00
    var dateStr = dateStrRaw.slice(0, 11) + hour.toString().padStart(2, "0") + dateStrRaw.slice(13);
    dateStr = dateStr.slice(0, 14) + minute.toString().padStart(2, "0") + dateStr.slice(16);
    dateStr = dateStr.slice(0, 17) + second.toString().padStart(2, "0") + dateStr.slice(19);
    dateStr = dateStr.slice(0, 24) + (ampm == AM_VALUE$1 ? "AM" : "PM") + dateStr.slice(26);
    date = dateFns.parse(dateStr, formatStr, value);
  } else {
    date = dateFns.setHours(dateFns.setMinutes(dateFns.setSeconds(value, second), minute), hour);
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
  var formatStr = React.useMemo(function () {
    return use12HourFormat ? "yyyy-MM-dd hh:mm:ss.SSS a xxxx" : "yyyy-MM-dd HH:mm:ss.SSS xxxx";
  }, [use12HourFormat]);
  var _b = React.useState(dateFns.format(value, "a") === "AM" ? AM_VALUE : PM_VALUE),
    ampm = _b[0],
    setAmpm = _b[1];
  var _c = React.useState(use12HourFormat ? +dateFns.format(value, "hh") : value.getHours()),
    hour = _c[0],
    setHour = _c[1];
  var _d = React.useState(value.getMinutes()),
    minute = _d[0],
    setMinute = _d[1];
  var _e = React.useState(value.getSeconds()),
    second = _e[0],
    setSecond = _e[1];
  React.useEffect(function () {
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
  var _hourIn24h = React.useMemo(function () {
    return use12HourFormat ? hour % 12 + ampm * 12 : hour;
  }, [hour, use12HourFormat, ampm]);
  var hours = React.useMemo(function () {
    return Array.from({
      length: use12HourFormat ? 12 : 24
    }, function (_, i) {
      var disabled = false;
      var hourValue = use12HourFormat ? i === 0 ? 12 : i : i;
      var hDate = dateFns.setHours(value, use12HourFormat ? i + ampm * 12 : i);
      var hStart = dateFns.startOfHour(hDate);
      var hEnd = dateFns.endOfHour(hDate);
      if (min && hEnd < min) disabled = true;
      if (max && hStart > max) disabled = true;
      return {
        value: hourValue,
        label: hourValue.toString().padStart(2, "0"),
        disabled: disabled
      };
    });
  }, [value, min, max, use12HourFormat, ampm]);
  var minutes = React.useMemo(function () {
    var anchorDate = dateFns.setHours(value, _hourIn24h);
    return Array.from({
      length: 60
    }, function (_, i) {
      var disabled = false;
      var mDate = dateFns.setMinutes(anchorDate, i);
      var mStart = dateFns.startOfMinute(mDate);
      var mEnd = dateFns.endOfMinute(mDate);
      if (min && mEnd < min) disabled = true;
      if (max && mStart > max) disabled = true;
      return {
        value: i,
        label: i.toString().padStart(2, "0"),
        disabled: disabled
      };
    });
  }, [value, min, max, _hourIn24h]);
  var seconds = React.useMemo(function () {
    var anchorDate = dateFns.setMilliseconds(dateFns.setMinutes(dateFns.setHours(value, _hourIn24h), minute), 0);
    var _min = min ? dateFns.setMilliseconds(min, 0) : undefined;
    var _max = max ? dateFns.setMilliseconds(max, 0) : undefined;
    return Array.from({
      length: 60
    }, function (_, i) {
      var disabled = false;
      var sDate = dateFns.setSeconds(anchorDate, i);
      if (_min && sDate < _min) disabled = true;
      if (_max && sDate > _max) disabled = true;
      return {
        value: i,
        label: i.toString().padStart(2, "0"),
        disabled: disabled
      };
    });
  }, [value, minute, min, max, _hourIn24h]);
  var ampmOptions = React.useMemo(function () {
    var startD = dateFns.startOfDay(value);
    var endD = dateFns.endOfDay(value);
    return [{
      value: AM_VALUE,
      label: "AM"
    }, {
      value: PM_VALUE,
      label: "PM"
    }].map(function (v) {
      var disabled = false;
      var start = dateFns.addHours(startD, v.value * 12);
      var end = dateFns.subHours(endD, (1 - v.value) * 12);
      if (min && end < min) disabled = true;
      if (max && start > max) disabled = true;
      return tslib.__assign(tslib.__assign({}, v), {
        disabled: disabled
      });
    });
  }, [value, min, max]);
  var _f = React.useState(false),
    open = _f[0],
    setOpen = _f[1];
  var hourRef = React.useRef(null);
  var minuteRef = React.useRef(null);
  var secondRef = React.useRef(null);
  React.useEffect(function () {
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
  var onHourChange = React.useCallback(function (v) {
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
  var onMinuteChange = React.useCallback(function (v) {
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
  var onAmpmChange = React.useCallback(function (v) {
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
  var display = React.useMemo(function () {
    return dateFns.format(value, use12HourFormat ? "hh:mm:ss a" : "HH:mm:ss");
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
  }, /*#__PURE__*/React.createElement(lucideReact.Clock, {
    className: "mr-2 size-4"
  }), display, /*#__PURE__*/React.createElement(lucideReact.ChevronDownIcon, {
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
  }, selected && /*#__PURE__*/React.createElement(lucideReact.CheckIcon, {
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
    var dateStrRaw = dateFns.format(value, formatStr);
    // yyyy-MM-dd hh:mm:ss.SSS a zzzz
    // 2024-10-14 01:20:07.524 AM GMT+00:00
    var dateStr = dateStrRaw.slice(0, 11) + hour.toString().padStart(2, "0") + dateStrRaw.slice(13);
    dateStr = dateStr.slice(0, 14) + minute.toString().padStart(2, "0") + dateStr.slice(16);
    dateStr = dateStr.slice(0, 17) + second.toString().padStart(2, "0") + dateStr.slice(19);
    dateStr = dateStr.slice(0, 24) + (ampm == AM_VALUE ? "AM" : "PM") + dateStr.slice(26);
    date = dateFns.parse(dateStr, formatStr, value);
  } else {
    date = dateFns.setHours(dateFns.setMinutes(dateFns.setSeconds(dateFns.setMilliseconds(value, 0), second), minute), hour);
  }
  return date;
}

const HookFormContext = React.createContext(null);
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
const useFormContext = () => React.useContext(HookFormContext);

function TooltipProvider(_a) {
  var _b = _a.delayDuration,
    delayDuration = _b === void 0 ? 0 : _b,
    props = tslib.__rest(_a, ["delayDuration"]);
  return /*#__PURE__*/React__namespace.createElement(TooltipPrimitive__namespace.Provider, tslib.__assign({
    "data-slot": "tooltip-provider",
    delayDuration: delayDuration
  }, props));
}
function Tooltip(props) {
  return /*#__PURE__*/React__namespace.createElement(TooltipProvider, null, /*#__PURE__*/React__namespace.createElement(TooltipPrimitive__namespace.Root, tslib.__assign({
    "data-slot": "tooltip"
  }, props)));
}
function TooltipTrigger(props) {
  return /*#__PURE__*/React__namespace.createElement(TooltipPrimitive__namespace.Trigger, tslib.__assign({
    "data-slot": "tooltip-trigger"
  }, props));
}
function TooltipContent(_a) {
  var className = _a.className,
    _b = _a.sideOffset,
    sideOffset = _b === void 0 ? 0 : _b,
    children = _a.children,
    props = tslib.__rest(_a, ["className", "sideOffset", "children"]);
  return /*#__PURE__*/React__namespace.createElement(TooltipPrimitive__namespace.Portal, null, /*#__PURE__*/React__namespace.createElement(TooltipPrimitive__namespace.Content, tslib.__assign({
    "data-slot": "tooltip-content",
    sideOffset: sideOffset,
    className: cn("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance", className)
  }, props), children, /*#__PURE__*/React__namespace.createElement(TooltipPrimitive__namespace.Arrow, {
    className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]"
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
var DateTimeInput = /*#__PURE__*/React__namespace.forwardRef(function (options, ref) {
  var formatProp = options.format,
    _value = options.value,
    timezone = options.timezone,
    onKeyDownCustom = options.onKeyDown;
    tslib.__rest(options, ["format", "value", "timezone", "onKeyDown"]);
  var value = React.useMemo(function () {
    return _value ? new reactDayPicker.TZDate(_value, timezone) : undefined;
  }, [_value, timezone]);
  var form = useFormContext();
  var formatStr = React__namespace.useMemo(function () {
    return formatProp || "dd/MM/yyyy-hh:mm aa";
  }, [formatProp]);
  var inputRef = React.useRef(null);
  var _a = React.useState([]),
    segments = _a[0],
    setSegments = _a[1];
  var _b = React.useState(undefined),
    selectedSegmentAt = _b[0],
    setSelectedSegmentAt = _b[1];
  React.useEffect(function () {
    if (form === null || form === void 0 ? void 0 : form.formState.isSubmitted) {
      setSegments(parseFormat(formatStr, value));
    }
  }, [form === null || form === void 0 ? void 0 : form.formState.isSubmitted]);
  React.useEffect(function () {
    // console.error('valueChanged', {formatStr, inputStr, value});
    setSegments(parseFormat(formatStr, value));
  }, [formatStr, value]);
  var curSegment = React.useMemo(function () {
    if (selectedSegmentAt === undefined || selectedSegmentAt < 0 || selectedSegmentAt >= segments.length) return undefined;
    return segments[selectedSegmentAt];
  }, [segments, selectedSegmentAt]);
  var setCurrentSegment = React.useCallback(function (segment) {
    var at = segments === null || segments === void 0 ? void 0 : segments.findIndex(function (s) {
      return s.index === (segment === null || segment === void 0 ? void 0 : segment.index);
    });
    at !== -1 && setSelectedSegmentAt(at);
  }, [segments, setSelectedSegmentAt]);
  var validSegments = React.useMemo(function () {
    return segments.filter(function (s) {
      return s.type !== "space";
    });
  }, [segments]);
  var inputStr = React.useMemo(function () {
    return segments.map(function (s) {
      return s.value ? s.value.padStart(s.symbols.length, "0") : s.symbols;
    }).join("");
  }, [segments]);
  var areAllSegmentsEmpty = React.useMemo(function () {
    return validSegments.every(function (s) {
      return !s.value;
    });
  }, [validSegments]);
  var inputValue = React.useMemo(function () {
    var allHasValue = !validSegments.some(function (s) {
      return !s.value;
    });
    if (!allHasValue) return;
    var date = dateFns.parse(inputStr, formatStr, value || new reactDayPicker.TZDate(new Date(), timezone));
    var year = dateFns.getYear(date);
    if (dateFns.isValid(date) && year > 1900 && year < 2100) {
      return date;
    }
  }, [validSegments, inputStr, formatStr]);
  React.useEffect(function () {
    var _a;
    if (!inputValue) return;
    if ((value === null || value === void 0 ? void 0 : value.getTime()) !== inputValue.getTime()) {
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
      !segment && (segment = tslib.__spreadArray([], validSegments_1, true).reverse().find(function (s) {
        return s.index <= selectionStart;
      }));
      !segment && (segment = validSegments_1.find(function (s) {
        return s.index >= selectionStart;
      }));
      setCurrentSegment(segment);
      setSelection({
        current: inputRef.current
      }, segment);
    }
  }, [segments]);
  var onSegmentChange = useEventCallback(function (direction) {
    if (!curSegment) return;
    var validSegments = segments.filter(function (s) {
      return s.type !== "space";
    });
    var segment = direction === "left" ? tslib.__spreadArray([], validSegments, true).reverse().find(function (s) {
      return s.index < curSegment.index;
    }) : validSegments.find(function (s) {
      return s.index > curSegment.index;
    });
    if (segment && inputRef.current) {
      setCurrentSegment(segment);
      setSelection({
        current: inputRef.current
      }, segment);
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
      var parsedDate = dateFns.parse(newValue_1.padStart(length_1, "0"), segment.symbols, safeDate(timezone));
      if (!dateFns.isValid(parsedDate) && newValue_1.length > 1) {
        newValue_1 = num;
        parsedDate = dateFns.parse(newValue_1, segment.symbols, safeDate(timezone));
      }
      var updatedSegments = segments.map(function (s) {
        return s.index === segment.index ? tslib.__assign(tslib.__assign({}, segment), {
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
    shouldNext ? onSegmentChange("right") : inputRef.current && setSelection({
      current: inputRef.current
    }, segment);
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
        return s.index === segment.index ? tslib.__assign(tslib.__assign({}, segment), {
          value: newValue
        }) : s;
      });
      setSegments(updatedSegments);
      segment = updatedSegments.find(function (s) {
        return s.index === segment.index;
      });
    }
    if (inputRef.current) setSelection({
      current: inputRef.current
    }, segment);
  }, [segments, curSegment]);
  var onSegmentValueRemove = useEventCallback(function () {
    if (!curSegment) return;
    if (curSegment.value) {
      var updatedSegments = segments.map(function (s) {
        return s.index === curSegment.index ? tslib.__assign(tslib.__assign({}, curSegment), {
          value: ""
        }) : s;
      });
      setSegments(updatedSegments);
      var segment = updatedSegments.find(function (s) {
        return s.index === curSegment.index;
      });
      if (inputRef.current) setSelection({
        current: inputRef.current
      }, segment);
    } else {
      onSegmentChange("left");
    }
  }, [segments, curSegment]);
  var onKeyDown = useEventCallback(function (event) {
    var _a, _b;
    var key = event.key;
    if (inputRef.current) setSelection({
      current: inputRef.current
    }, curSegment);
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
  var _c = React.useState(false),
    isFocused = _c[0],
    setIsFocused = _c[1];
  var onBlur = useEventCallback(function (event) {
    var _a;
    setIsFocused(false);
    if (inputValue) (_a = options.onBlur) === null || _a === void 0 ? void 0 : _a.call(options, event);
  }, [inputValue]);
  return /*#__PURE__*/React__namespace.createElement("div", {
    ref: ref,
    className: cn("flex h-10 items-center justify-start rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50", isFocused ? "outline-none ring-2 ring-ring ring-offset-2" : "", options.hideCalendarIcon && "ps-2", options.className)
  }, !options.hideCalendarIcon && (/*#__PURE__*/React__namespace.createElement(Button, {
    variant: "ghost",
    size: "icon",
    onClick: options.onCalendarClick
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.CalendarIcon, {
    className: "size-4 text-muted-foreground"
  }))), /*#__PURE__*/React__namespace.createElement("input", {
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
  }), /*#__PURE__*/React__namespace.createElement("div", {
    className: "me-3"
  }, inputValue ? (/*#__PURE__*/React__namespace.createElement(lucideReact.CircleCheck, {
    className: "size-4 text-green-500"
  })) : (/*#__PURE__*/React__namespace.createElement(TooltipProvider, null, /*#__PURE__*/React__namespace.createElement(Tooltip, null, /*#__PURE__*/React__namespace.createElement(TooltipTrigger, {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/React__namespace.createElement(lucideReact.CircleAlert, {
    className: cn("size-4", !areAllSegmentsEmpty && "text-red-500")
  })), /*#__PURE__*/React__namespace.createElement(TooltipContent, {
    className: "w-[160px]"
  }, /*#__PURE__*/React__namespace.createElement("p", null, "Please enter a valid value. The input cannot be empty and must be within the range of years 1900 to 2100.")))))));
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
        value: value ? dateFns.format(value, symbols) : ""
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
    value: value ? dateFns.format(value, symbols) : ""
  });
  return views;
}
var safeDate = function (timezone) {
  return new reactDayPicker.TZDate("2000-01-01T00:00:00", timezone);
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
  var ref = React.useRef(fn);
  useIsomorphicLayoutEffect(function () {
    ref.current = fn;
  });
  return React.useCallback(function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.call.apply(_a, tslib.__spreadArray([ref], args, false));
  }, deps);
}
var useIsomorphicLayoutEffect = typeof document !== "undefined" ? React.useLayoutEffect : React.useEffect;

// Editor Components
var TextEditor = function (_a) {
  var value = _a.value,
    onChange = _a.onChange,
    onKeyDown = _a.onKeyDown,
    placeholder = _a.placeholder,
    onBlur = _a.onBlur;
  return /*#__PURE__*/React.createElement(Input, {
    type: "text",
    value: value,
    autoFocus: true,
    onChange: function (e) {
      return onChange(e.target.value);
    },
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    placeholder: placeholder,
    className: "h-8 text-sm"
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
  var inputRef = React.useRef(null);
  React.useEffect(function () {
    var _a;
    (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
  }, []);
  var handleKeyDown = function (e) {
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 || e.keyCode >= 65 && e.keyCode <= 90 && e.ctrlKey === true || e.keyCode >= 35 && e.keyCode <= 39 || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105) {
      return;
    }
    e.preventDefault();
  };
  return /*#__PURE__*/React.createElement(Input, {
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
    className: "h-8 text-sm"
  });
};
var SelectEditor = function (_a) {
  var value = _a.value,
    onChange = _a.onChange,
    _b = _a.options,
    options = _b === void 0 ? [] : _b;
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/React.createElement(Select, {
    value: value,
    onValueChange: onChange,
    defaultOpen: true
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "w-[160px]"
  }, /*#__PURE__*/React.createElement(SelectValue, {
    placeholder: "Select option"
  })), /*#__PURE__*/React.createElement(SelectContent, {
    className: "w-[160px]"
  }, /*#__PURE__*/React.createElement(SelectGroup, {
    className: "p-1"
  }, options.length > 0 ? options.map(function (opt) {
    return /*#__PURE__*/React.createElement(SelectItem, {
      key: opt.value,
      value: opt.value,
      className: cn("h-8 py-1 px-2 text-sm cursor-pointer", "focus:bg-accent focus:text-accent-foreground")
    }, opt.label);
  }) : (/*#__PURE__*/React.createElement("div", {
    className: "p-2 text-sm text-muted-foreground text-center"
  }, "No options found"))))));
};
var DateEditor = function (_a) {
  var value = _a.value,
    onChange = _a.onChange,
    _b = _a.hideTime,
    hideTime = _b === void 0 ? true : _b;
  var _c = React.useState(value ? new Date(value) : new Date()),
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
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/React.createElement(DateTimePicker, {
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
      return /*#__PURE__*/React.createElement(DateTimeInput, {
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
  var handleTimeChange = function () {};
  return /*#__PURE__*/React.createElement(SimpleTimePicker, {
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
  return Editor ? (/*#__PURE__*/React.createElement("div", {
    className: "w-full ".concat(editorType === "text" || editorType === "number" ? "px-2" : "", " h-full flex items-center justify-center")
  }, /*#__PURE__*/React.createElement(Editor, tslib.__assign({}, editorProps, additionalProps)))) : (/*#__PURE__*/React.createElement(React.Fragment, null, String(value || "")));
};

function Switch(_a) {
  var className = _a.className,
    props = tslib.__rest(_a, ["className"]);
  return /*#__PURE__*/React__namespace.createElement(SwitchPrimitive__namespace.Root, tslib.__assign({
    "data-slot": "switch",
    className: cn("peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className)
  }, props), /*#__PURE__*/React__namespace.createElement(SwitchPrimitive__namespace.Thumb, {
    "data-slot": "switch-thumb",
    className: cn("bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0")
  }));
}

// --- MAIN HOOK ---
function useCookedData(columnDefs) {
  var getCookedSingleRow = React.useCallback(function (row, columns, parentData) {
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
        updatedRow = tslib.__assign(tslib.__assign({}, updatedRow), (_a = {}, _a[col.field] = computedValue, _a));
      } else {
        updatedRow = tslib.__assign(tslib.__assign({}, updatedRow), (_b = {}, _b[col.field] = row[col.field], _b));
      }
      return col.field;
    });
    return updatedRow;
  }, []);
  var processChildRow = React.useCallback(function (childRow, parentRow) {
    var _a, _b;
    var cookedChild = tslib.__assign({}, childRow);
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
  var getCookedRow = React.useCallback(function (row) {
    var _a, _b;
    var cookedRow = tslib.__assign({}, row);
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
          cookedRow: tslib.__assign(tslib.__assign({}, row), cookedRow)
        });
      } else {
        cookedRow[col.field] = row[col.field];
      }
    });
    return cookedRow;
  }, [columnDefs.columns, columnDefs.detailGridOptions, processChildRow]);
  var getCookedData = React.useCallback(function (data) {
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
  React.useEffect(function () {
    if (!filterType) {
      onFilterTypeChange(defaultFilterType);
    }
  }, [filterType, defaultFilterType, onFilterTypeChange]);
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-gray-700"
  }, "Filter: ", column.headerName), value && (/*#__PURE__*/React.createElement("button", {
    onClick: onClear,
    className: "hover:text-gray-900 p-1 hover:bg-gray-100 rounded"
  }, /*#__PURE__*/React.createElement(lucideReact.X, {
    className: "h-3 w-3"
  })))), /*#__PURE__*/React.createElement(Select, {
    value: filterType || defaultFilterType,
    onValueChange: onFilterTypeChange
  }, /*#__PURE__*/React.createElement(SelectTrigger, {
    className: "w-full text-sm"
  }, (_b = availableFilterTypes.find(function (type) {
    return type.value === (filterType || defaultFilterType);
  })) === null || _b === void 0 ? void 0 : _b.label), /*#__PURE__*/React.createElement(SelectContent, {
    className: "w-full max-h-[200px]"
  }, availableFilterTypes.map(function (type) {
    return /*#__PURE__*/React.createElement(SelectItem, {
      key: type.value,
      value: type.value,
      className: "h-8 py-1 px-2 text-sm cursor-pointer"
    }, type.label);
  }))), /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-medium text-gray-500"
  }, IsDateType(column.type) ? "Date" : IsTimeType(column.type) ? "Time" : IsDateTimeType(column.type) ? "DateTime" : "Search"), IsDateType(column.type) ? (/*#__PURE__*/React.createElement(DateTimePicker, {
    value: value ? new Date(value) : undefined,
    onChange: function (val) {
      onFilterChange(val ? val.toISOString() : "");
    },
    hideTime: true,
    renderTrigger: function (_a) {
      var open = _a.open,
        value = _a.value,
        setOpen = _a.setOpen;
      return /*#__PURE__*/React.createElement(DateTimeInput, {
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
  })) : IsTimeType(column.type) ? (/*#__PURE__*/React.createElement(SimpleTimePicker, {
    value: value ? new Date(value) : new Date(),
    onChange: function (val) {
      onFilterChange(val ? val.toISOString() : "");
    },
    use12HourFormat: true
  })) : IsDateTimeType(column.type) ? (/*#__PURE__*/React.createElement(DateTimePicker, {
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
      return /*#__PURE__*/React.createElement(DateTimeInput, {
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
  })) : (/*#__PURE__*/React.createElement("div", {
    className: "relative w-full"
  }, /*#__PURE__*/React.createElement(Input, {
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
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      left: 5,
      position: "absolute",
      top: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(lucideReact.Search, {
    className: "h-4 w-4 text-gray-400"
  })))));
};

var ServerPagination = function (_a) {
  var _b, _c, _d;
  var paginationProps = _a.paginationProps,
    _e = _a.data,
    data = _e === void 0 ? [] : _e;
  var _f = paginationProps || {},
    _g = _f.paginationPageSize,
    paginationPageSize = _g === void 0 ? 10 : _g,
    _h = _f.paginationPageSizeSelector,
    paginationPageSizeSelector = _h === void 0 ? [10] : _h,
    paginationInfo = _f.paginationInfo,
    onPageChange = _f.onPageChange,
    onPageSizeChange = _f.onPageSizeChange;
  // to handle navigation between pages
  var handlePageChange = function (page) {
    if (onPageChange) {
      onPageChange(page);
    }
  };
  // to handle navigation between page size
  var handlePageSizeChange = function (size) {
    if (onPageSizeChange) {
      onPageSizeChange(size);
    }
  };
  var pageSize = (paginationInfo === null || paginationInfo === void 0 ? void 0 : paginationInfo.pageSize) || paginationPageSize;
  var currentPage = (paginationInfo === null || paginationInfo === void 0 ? void 0 : paginationInfo.page) || 1;
  var totalPages = (paginationInfo === null || paginationInfo === void 0 ? void 0 : paginationInfo.totalPages) || 1;
  return /*#__PURE__*/React.createElement(React.Fragment, null, paginationProps && (data === null || data === void 0 ? void 0 : data.length) && (/*#__PURE__*/React.createElement("div", {
    className: "w-full py-1 pr-4 bg-white mt-2 bg flex items-center gap-6 justify-end"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("h2", null, "Page Size"), /*#__PURE__*/React.createElement("select", {
    className: "border rounded px-2",
    value: pageSize,
    onChange: function (e) {
      return handlePageSizeChange(Number(e.target.value));
    }
  }, paginationPageSizeSelector === null || paginationPageSizeSelector === void 0 ? void 0 : paginationPageSizeSelector.map(function (size) {
    return /*#__PURE__*/React.createElement("option", {
      key: size,
      value: size
    }, size);
  }))), /*#__PURE__*/React.createElement("h2", null, data.length === 0 ? "0" : "".concat(((currentPage - 1) * pageSize + 1).toLocaleString(), " to ").concat(((currentPage - 1) * pageSize + data.length).toLocaleString(), " of "), /*#__PURE__*/React.createElement("strong", null, (_c = (_b = paginationInfo === null || paginationInfo === void 0 ? void 0 : paginationInfo.totalCount) === null || _b === void 0 ? void 0 : _b.toLocaleString()) !== null && _c !== void 0 ? _c : (_d = data.length) === null || _d === void 0 ? void 0 : _d.toLocaleString())), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("button", {
    disabled: currentPage === 1,
    className: "cursor-pointer ".concat(currentPage === 1 ? "text-gray-500" : ""),
    onClick: function () {
      return handlePageChange(1);
    }
  }, /*#__PURE__*/React.createElement(lucideReact.ChevronFirst, {
    size: 15
  })), /*#__PURE__*/React.createElement("button", {
    disabled: currentPage === 1,
    className: "cursor-pointer ".concat(currentPage === 1 ? "text-gray-500" : ""),
    onClick: function () {
      return handlePageChange(currentPage - 1);
    }
  }, /*#__PURE__*/React.createElement(lucideReact.ChevronLeft, {
    size: 15
  })), /*#__PURE__*/React.createElement("h2", null, "Page ", currentPage === null || currentPage === void 0 ? void 0 : currentPage.toLocaleString(), " of", " ", totalPages === null || totalPages === void 0 ? void 0 : totalPages.toLocaleString()), /*#__PURE__*/React.createElement("button", {
    disabled: currentPage === totalPages,
    className: "cursor-pointer ".concat(currentPage === totalPages ? "text-gray-500" : ""),
    onClick: function () {
      return handlePageChange(currentPage + 1);
    }
  }, /*#__PURE__*/React.createElement(lucideReact.ChevronRight, {
    size: 15
  })), /*#__PURE__*/React.createElement("button", {
    disabled: currentPage === totalPages,
    className: "cursor-pointer ".concat(currentPage === totalPages ? "text-gray-500" : ""),
    onClick: function () {
      return handlePageChange(totalPages);
    }
  }, /*#__PURE__*/React.createElement(lucideReact.ChevronLast, {
    size: 15
  }))))));
};

var GroupPanel = function (_a) {
  var showGroupByPanel = _a.showGroupByPanel,
    groupedColumns = _a.groupedColumns,
    columns = _a.columns,
    setColumnGrouped = _a.setColumnGrouped,
    handleGroupDrop = _a.handleGroupDrop;
  if (!showGroupByPanel) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "min-h-[40px] border border-dashed border-[#353945] rounded flex flex-wrap gap-2 items-center p-2 bg-[#232733]",
    onDragOver: function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    },
    onDrop: handleGroupDrop
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400 text-sm"
  }, "Drag columns here to group")), /*#__PURE__*/React.createElement("div", {
    className: "p-2 flex flex-col gap-2"
  }, groupedColumns.map(function (field, ind) {
    var col = columns.find(function (c) {
      return c.field === field;
    });
    return /*#__PURE__*/React.createElement("div", {
      key: ind,
      className: "flex items-center justify-between bg-gray-700 px-2 py-1 rounded-full"
    }, /*#__PURE__*/React.createElement("span", {
      className: "flex items-center"
    }, /*#__PURE__*/React.createElement(lucideReact.GripVertical, {
      className: "w-3 h-3 mr-1"
    }), col === null || col === void 0 ? void 0 : col.headerName), /*#__PURE__*/React.createElement("button", {
      onClick: function () {
        return setColumnGrouped(field, false);
      },
      className: "ml-1 hover:bg-gray-600 rounded-full p-1 cursor-pointer"
    }, /*#__PURE__*/React.createElement(lucideReact.X, {
      className: "h-3 w-3"
    })));
  })));
};

var ColumnSidebar = function (_a) {
  var _b;
  var columns = _a.columns,
    setColumns = _a.setColumns,
    search = _a.search,
    setSearch = _a.setSearch,
    showGroupByPanel = _a.showGroupByPanel,
    _c = _a.groupedColumns,
    groupedColumns = _c === void 0 ? [] : _c,
    setColumnGrouped = _a.setColumnGrouped,
    handleGroupDrop = _a.handleGroupDrop,
    _d = _a.enablePivot,
    enablePivot = _d === void 0 ? false : _d,
    togglePivot = _a.togglePivot,
    pivotColumns = _a.pivotColumns,
    setPivotColumns = _a.setPivotColumns,
    selectedAggFn = _a.selectedAggFn,
    columnAggFnMap = _a.columnAggFnMap,
    setColumnAggFnMap = _a.setColumnAggFnMap,
    handleAggDrop = _a.handleAggDrop,
    setAggCols = _a.setAggCols,
    _e = _a.pivotMode,
    pivotMode = _e === void 0 ? false : _e;
  var aggregationOptions = ["sum", "min", "max", "count", "avg"];
  var aggColumns = React.useMemo(function () {
    return columns.filter(function (item) {
      return item.aggFunc && !item.pivot && item.type === "number" && (columnAggFnMap === null || columnAggFnMap === void 0 ? void 0 : columnAggFnMap[item.field]);
    });
  }, [columns, columnAggFnMap]);
  // Helper function to remove column from aggregation
  var removeFromAggregation = function (columnField) {
    setColumnAggFnMap === null || setColumnAggFnMap === void 0 ? void 0 : setColumnAggFnMap(function (prev) {
      var updated = tslib.__assign({}, prev);
      delete updated[columnField];
      // Convert to array for aggCols
      var newAggCols = Object.entries(updated).map(function (_a) {
        var field = _a[0],
          aggFunc = _a[1];
        return {
          field: field,
          aggFunc: aggFunc
        };
      });
      setAggCols === null || setAggCols === void 0 ? void 0 : setAggCols(newAggCols);
      return updated;
    });
  };
  React.useEffect(function () {
    if (!setColumnAggFnMap) return;
    setColumnAggFnMap(function (prev) {
      var updatedMap = tslib.__assign({}, prev);
      columns.forEach(function (col) {
        var _a;
        if (((_a = col.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "number" && col.field !== "year" && col.visible !== false && !(col.field in updatedMap)) {
          updatedMap[col.field] = selectedAggFn || "sum";
        }
      });
      return updatedMap;
    });
  }, [columns, selectedAggFn]);
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      backgroundColor: "#1f2937",
      color: "#ffffff",
      padding: "1rem",
      borderLeft: "1px solid #374151",
      width: "280px",
      display: "flex",
      flexDirection: "column",
      maxHeight: "780px",
      overflowY: "auto",
      overflowX: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0.75rem 1rem",
      borderBottom: "1px solid #353945"
    },
    className: "flex flex-col gap-2 items-center cursor-pointer"
  }, pivotMode && (/*#__PURE__*/React.createElement("div", {
    className: "w-full border-b-[1px] pb-1 border-[#353945]"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    className: undefined,
    style: {
      borderWidth: 1,
      borderColor: "#9ca3af",
      cursor: "pointer"
    },
    checked: enablePivot,
    onCheckedChange: togglePivot
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "0.5rem"
    }
  }, "Pivot Mode"))), /*#__PURE__*/React.createElement("div", {
    className: "w-full",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.1rem",
      maxHeight: "15rem",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-h-[450px] overflow-auto hide-scrollbar"
  }, (_b = columns.filter(function (col) {
    return col.headerName.toLowerCase().includes(search.toLowerCase());
  })) === null || _b === void 0 ? void 0 : _b.map(function (col) {
    var _a;
    var isDraggable = ((_a = col.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "number";
    return /*#__PURE__*/React.createElement("div", {
      key: col.field,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      },
      draggable: isDraggable,
      onDragStart: function (e) {
        // e.dataTransfer.setData("text/plain", col.field);
        e.dataTransfer.setData("text/plain", col.field); // optional for browser preview
        e.dataTransfer.setData("columnField", col.field); // used in your custom drop logic
      }
    }, /*#__PURE__*/React.createElement(Checkbox, {
      checked: col.visible !== false,
      onCheckedChange: function (checked) {
        setColumns(function (cols) {
          return cols.map(function (c) {
            return c.field === col.field ? tslib.__assign(tslib.__assign({}, c), {
              visible: checked
            }) : c;
          });
        });
        // Remove from pivotColumns if hiding
        if (!checked && setPivotColumns && pivotColumns) {
          setPivotColumns(pivotColumns.filter(function (f) {
            return f !== col.field;
          }));
        }
        // Remove from aggregation if it exists
        if (columnAggFnMap === null || columnAggFnMap === void 0 ? void 0 : columnAggFnMap[col.field]) {
          removeFromAggregation(col.field);
        }
        // Remove from groupedColumns if hiding
        if (!checked && setColumnGrouped && groupedColumns.includes(col.field)) {
          setColumnGrouped(col.field, false);
          setColumns(function (cols) {
            return cols.map(function (c) {
              return c.field === col.field ? tslib.__assign(tslib.__assign({}, c), {
                visible: checked
              }) : c;
            });
          });
        }
      },
      style: {
        borderWidth: 1,
        borderColor: "#9ca3af",
        cursor: "pointer"
      },
      className: undefined
    }), /*#__PURE__*/React.createElement(lucideReact.GripVertical, {
      style: {
        width: "1rem",
        height: "1rem",
        color: "#9ca3af",
        cursor: "move"
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: ""
    }, col.headerName));
  })), enablePivot && (/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "mt-4",
    style: {
      // marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement(lucideReact.Sigma, {
    style: {
      width: "1rem"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "Values")), /*#__PURE__*/React.createElement("div", {
    className: "min-h-[40px] hide-scrollbar scroll-smooth overflow-y-scroll border border-dashed border-[#3a3d45] rounded p-2 bg-[#232733]",
    onDragOver: function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    },
    onDrop: handleAggDrop
  }, aggColumns && aggColumns.length > 0 ? (/*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, aggColumns.map(function (col) {
    var aggFn = (columnAggFnMap === null || columnAggFnMap === void 0 ? void 0 : columnAggFnMap[col.field]) || "sum";
    return /*#__PURE__*/React.createElement("div", {
      key: col.field,
      className: "flex justify-between items-center px-2 py-1 bg-[#1f2937] border border-[#353945] rounded"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-[50%] flex justify-between items-center gap-2 text-sm text-white"
    }, col.headerName || col.field), /*#__PURE__*/React.createElement("div", {
      className: " w-[40%] flex items-center justify-end"
    }, /*#__PURE__*/React.createElement("select", {
      className: "py-1 pl-2",
      value: aggFn,
      onChange: function (e) {
        setColumnAggFnMap === null || setColumnAggFnMap === void 0 ? void 0 : setColumnAggFnMap(function (prev) {
          var _a;
          return tslib.__assign(tslib.__assign({}, prev), (_a = {}, _a[col.field] = e.target.value, _a));
        });
      },
      style: {
        backgroundColor: "#232733",
        border: "1px solid #353945",
        borderRadius: "0.25rem",
        outline: "none",
        fontSize: "0.75rem"
      }
    }, aggregationOptions.map(function (option) {
      return /*#__PURE__*/React.createElement("option", {
        key: option,
        value: option
      }, option);
    })), /*#__PURE__*/React.createElement("button", {
      className: "text-red-400 text-xs ml-2 cursor-pointer",
      onClick: function () {
        return removeFromAggregation(col.field);
      }
    }, "\u2715")));
  }))) : (/*#__PURE__*/React.createElement("span", {
    className: "text-gray-400 text-sm"
  }, "Drag columns here for aggregation"))))))), !columnAggFnMap && !setColumnAggFnMap && (/*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0.75rem 1rem",
      borderBottom: "1px solid #353945"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    className: undefined,
    style: {
      borderWidth: 1,
      borderColor: "#9ca3af",
      cursor: "pointer"
    },
    checked: columns.every(function (col) {
      return col.visible !== false;
    }),
    onCheckedChange: function (checked) {
      return setColumns(function (cols) {
        return cols.map(function (c) {
          return tslib.__assign(tslib.__assign({}, c), {
            visible: checked
          });
        });
      });
    }
  }), /*#__PURE__*/React.createElement("input", {
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
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      maxHeight: "10rem",
      overflowY: "auto"
    }
  }, columns.filter(function (col) {
    return col.headerName.toLowerCase().includes(search.toLowerCase());
  }).map(function (col, idx) {
    return /*#__PURE__*/React.createElement("div", {
      key: col.field,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      }
    }, /*#__PURE__*/React.createElement(Checkbox, {
      className: undefined,
      checked: col.visible !== false,
      onCheckedChange: function (checked) {
        return setColumns(function (cols) {
          return cols.map(function (c, i) {
            return i === idx ? tslib.__assign(tslib.__assign({}, c), {
              visible: checked
            }) : c;
          });
        });
      },
      style: {
        borderWidth: 1,
        borderColor: "#9ca3af",
        cursor: "pointer"
      }
    }), /*#__PURE__*/React.createElement(lucideReact.GripVertical, {
      style: {
        width: "1rem",
        height: "1rem",
        color: "#9ca3af",
        cursor: "move"
      }
    }), /*#__PURE__*/React.createElement("span", null, col.headerName));
  })))), showGroupByPanel && setColumnGrouped && handleGroupDrop && (/*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0.75rem 1rem",
      borderBottom: "1px solid #353945",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement(lucideReact.List, {
    style: {
      width: "1rem",
      height: "1rem"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "Row Groups")), /*#__PURE__*/React.createElement(GroupPanel, {
    showGroupByPanel: showGroupByPanel,
    groupedColumns: groupedColumns,
    columns: columns,
    setColumnGrouped: setColumnGrouped,
    handleGroupDrop: handleGroupDrop
  }))));
};

var PivotPanel = function (_a) {
  var pivotColumns = _a.pivotColumns,
    columns = _a.columns,
    setPivotColumns = _a.setPivotColumns,
    handlePivotDrop = _a.handlePivotDrop;
  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap- border p-1 bg-gray-50 py-2",
    onDragOver: function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    },
    onDrop: handlePivotDrop
  }, pivotColumns.length > 0 && (/*#__PURE__*/React.createElement("div", {
    className: "p-2 flex gap-2 max-w-full"
  }, pivotColumns.map(function (field) {
    var col = columns.find(function (c) {
      return c.field === field;
    });
    return /*#__PURE__*/React.createElement("div", {
      key: field,
      className: "table-row-pop flex items-center justify-between bg-gray-300 px-2 rounded-full"
    }, /*#__PURE__*/React.createElement("span", {
      key: field,
      className: "flex items-center"
    }, /*#__PURE__*/React.createElement(lucideReact.GripVertical, {
      className: "size-3 mr-1"
    }), col === null || col === void 0 ? void 0 : col.headerName), /*#__PURE__*/React.createElement("button", {
      onClick: function () {
        return setPivotColumns(pivotColumns.filter(function (f) {
          return f !== field;
        }));
      },
      className: "ml-1 hover:bg-gray-600 rounded-full p-1 cursor-pointer"
    }, /*#__PURE__*/React.createElement(lucideReact.X, {
      className: "h-3 w-3"
    })));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "rounded flex flex-wrap gap-2 items-center max-w-full justify-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400 text-sm "
  }, "Drag here to set column labels")));
};

// Handles how each aggregation function works
var applyPivotAgg = function (aggFunc, current, value) {
  switch (aggFunc) {
    case "sum":
      return (current || 0) + value;
    case "min":
      return current !== undefined ? Math.min(current, value) : value;
    case "max":
      return current !== undefined ? Math.max(current, value) : value;
    case "count":
      return (current || 0) + 1;
    default:
      return value;
  }
};
// Main pivot and aggregation function
function pivotAndAggregateByGroup(data, groupBy, pivotColumns, columnDefs) {
  var allowedNumericFields = new Set(tslib.__spreadArray(["year"], columnDefs.map(function (def) {
    return def.field;
  }), true));
  // Clean and filter numeric fields
  var cleanedData = data.map(function (row) {
    var newRow = {};
    for (var _i = 0, _a = Object.entries(row); _i < _a.length; _i++) {
      var _b = _a[_i],
        key = _b[0],
        value = _b[1];
      var isNumeric = typeof value === "number";
      if (!isNumeric || allowedNumericFields.has(key)) {
        newRow[key] = value;
      }
    }
    return newRow;
  });
  var result = [];
  var groupMap = new Map();
  var groupByValues = Array.from(new Set(cleanedData.map(function (row) {
    return row[groupBy];
  })));
  var pivotValuesMap = {};
  pivotColumns.forEach(function (col) {
    pivotValuesMap[col] = new Set(cleanedData.map(function (row) {
      return row[col];
    }));
  });
  var allCombinations = [];
  // Recursively create all combinations of pivot columns
  function generateCombinations(keys, prefix) {
    var _a;
    if (prefix === void 0) {
      prefix = {};
    }
    if (keys.length === 0) {
      allCombinations.push(prefix);
      return;
    }
    var first = keys[0],
      rest = keys.slice(1);
    for (var _i = 0, _b = pivotValuesMap[first]; _i < _b.length; _i++) {
      var val = _b[_i];
      generateCombinations(rest, tslib.__assign(tslib.__assign({}, prefix), (_a = {}, _a[first] = val, _a)));
    }
  }
  generateCombinations(pivotColumns);
  // Main aggregation loop
  cleanedData.forEach(function (row) {
    var _a;
    var groupValue = row[groupBy];
    var groupKey = String(groupValue);
    var pivotKey = pivotColumns.map(function (key) {
      return row[key];
    }).join("||");
    // Initialize group entry
    if (!groupMap.has(groupKey)) {
      groupMap.set(groupKey, {
        groupValue: groupValue,
        childrenMap: new Map(),
        totalAggregations: {},
        avgTracking: {},
        totalMedalsRaw: 0
      });
    }
    var groupEntry = groupMap.get(groupKey);
    var rawMedalSum = 0;
    columnDefs.forEach(function (col) {
      var field = col.field,
        aggFunc = col.aggFunc;
      var rawValue = Number(row[field]) || 0;
      if (aggFunc === "avg") {
        // Track both sum and count for averaging
        if (!groupEntry.avgTracking[field]) {
          groupEntry.avgTracking[field] = {
            sum: 0,
            count: 0
          };
        }
        groupEntry.avgTracking[field].sum += rawValue;
        groupEntry.avgTracking[field].count += 1;
        rawMedalSum += rawValue;
      } else {
        var isCount = aggFunc === "count";
        var value = isCount ? 1 : rawValue;
        groupEntry.totalAggregations[field] = applyPivotAgg(aggFunc, groupEntry.totalAggregations[field], value);
        // Always add value to rawMedalSum, even for count
        rawMedalSum += value;
      }
    });
    groupEntry.totalMedalsRaw += rawMedalSum;
    // Populate pivoted row (childrenMap)
    if (!groupEntry.childrenMap.has(pivotKey)) {
      var newRow_1 = tslib.__assign((_a = {}, _a[groupBy] = groupValue, _a), Object.fromEntries(pivotColumns.map(function (key) {
        return [key, row[key]];
      })));
      var childSum_1 = 0;
      columnDefs.forEach(function (col) {
        var field = col.field,
          aggFunc = col.aggFunc;
        var rawValue = Number(row[field]) || 0;
        if (aggFunc === "avg") {
          // Track sum and count per cell
          newRow_1["__".concat(field, "_sum")] = rawValue;
          newRow_1["__".concat(field, "_count")] = 1;
          newRow_1[field] = rawValue;
          childSum_1 += rawValue;
        } else {
          var isCount = aggFunc === "count";
          var value = isCount ? 1 : rawValue;
          newRow_1[field] = value;
          if (!isCount) childSum_1 += value;
        }
      });
      newRow_1.totalMedals = childSum_1;
      groupEntry.childrenMap.set(pivotKey, newRow_1);
    } else {
      var existingRow_1 = groupEntry.childrenMap.get(pivotKey);
      var childSum_2 = 0;
      columnDefs.forEach(function (col) {
        var field = col.field,
          aggFunc = col.aggFunc;
        var rawValue = Number(row[field]) || 0;
        if (aggFunc === "avg") {
          existingRow_1["__".concat(field, "_sum")] = (existingRow_1["__".concat(field, "_sum")] || 0) + rawValue;
          existingRow_1["__".concat(field, "_count")] = (existingRow_1["__".concat(field, "_count")] || 0) + 1;
          existingRow_1[field] = existingRow_1["__".concat(field, "_sum")] / existingRow_1["__".concat(field, "_count")];
          childSum_2 += rawValue;
        } else {
          var isCount = aggFunc === "count";
          var value = isCount ? 1 : rawValue;
          existingRow_1[field] = applyPivotAgg(aggFunc, existingRow_1[field], value);
          if (!isCount) childSum_2 += existingRow_1[field];
        }
      });
      existingRow_1.totalMedals = childSum_2;
    }
  });
  // Fill empty pivot combinations per group
  for (var _i = 0, groupByValues_1 = groupByValues; _i < groupByValues_1.length; _i++) {
    var groupValue = groupByValues_1[_i];
    var groupKey = String(groupValue);
    var groupEntry = groupMap.get(groupKey);
    var _loop_1 = function (combo) {
      var _g;
      var pivotKey = pivotColumns.map(function (k) {
        return combo[k];
      }).join("||");
      if (!groupEntry.childrenMap.has(pivotKey)) {
        var newRow_2 = tslib.__assign((_g = {}, _g[groupBy] = groupValue, _g), combo);
        columnDefs.forEach(function (col) {
          newRow_2[col.field] = 0;
        });
        newRow_2.totalMedals = 0;
        groupEntry.childrenMap.set(pivotKey, newRow_2);
      }
    };
    for (var _a = 0, allCombinations_1 = allCombinations; _a < allCombinations_1.length; _a++) {
      var combo = allCombinations_1[_a];
      _loop_1(combo);
    }
  }
  // Final pass to compute group-level averages
  for (var _b = 0, _c = groupMap.entries(); _b < _c.length; _b++) {
    var _d = _c[_b],
      groupKey = _d[0],
      _e = _d[1],
      childrenMap = _e.childrenMap,
      totalAggregations = _e.totalAggregations,
      totalMedalsRaw = _e.totalMedalsRaw,
      avgTracking = _e.avgTracking;
    for (var _f = 0, columnDefs_1 = columnDefs; _f < columnDefs_1.length; _f++) {
      var col = columnDefs_1[_f];
      if (col.aggFunc === "avg") {
        var stats = avgTracking[col.field];
        if (stats) {
          totalAggregations[col.field] = stats.count > 0 ? stats.sum / stats.count : 0;
        } else {
          totalAggregations[col.field] = 0;
        }
      }
    }
    totalAggregations.total = Object.values(totalAggregations).reduce(function (sum, val) {
      return sum + val;
    }, 0);
    result.push({
      groupKey: groupKey,
      children: Array.from(childrenMap.values()),
      totalAggregations: totalAggregations,
      totalMedals: totalMedalsRaw
    });
  }
  return result;
}

/**
 * Converts flat data with path arrays into a tree structure.
 */
function buildTreeData(flatData, treeDataChildrenField, getDataPath // optional for parentId/children formats
) {
  if (!flatData || flatData.length === 0) return [];
  // Case 1: Already has children (tree structure)
  if (treeDataChildrenField === "children") {
    return flatData;
  }
  // Case 2: path[] based (AG Grid-style treeData)
  if (treeDataChildrenField === "path" && getDataPath) {
    var root_1 = [];
    var pathMap_1 = new Map();
    flatData.forEach(function (row) {
      var path = getDataPath(row);
      var parent = null;
      path.forEach(function (segment, idx) {
        var currentPath = path.slice(0, idx + 1).join("/");
        if (!pathMap_1.has(currentPath)) {
          var node = idx === path.length - 1 ? tslib.__assign(tslib.__assign({}, row), {
            children: []
          }) : {
            name: segment,
            path: path.slice(0, idx + 1),
            children: []
          };
          pathMap_1.set(currentPath, node);
          if (parent) {
            parent.children.push(node);
          } else {
            root_1.push(node);
          }
        }
        parent = pathMap_1.get(currentPath);
      });
    });
    return root_1;
  }
  // Case 3: Flat parentId/id structure
  if (treeDataChildrenField === "parentId") {
    var idMap_1 = new Map();
    var root_2 = [];
    flatData.forEach(function (row) {
      var id = String(row.id); // safely cast to string
      idMap_1.set(id, tslib.__assign(tslib.__assign({}, row), {
        children: []
      }));
    });
    flatData.forEach(function (row) {
      var id = String(row.id);
      var parentId = row.parentId;
      var node = idMap_1.get(id);
      if (row.parentId) {
        var parent_1 = idMap_1.get(parentId);
        if (parent_1) {
          parent_1.children.push(node);
        }
      } else {
        root_2.push(node);
      }
    });
    return root_2;
  }
  // Fallback: return as-is
  return flatData;
}
/**
 * Flattens tree data for rendering, respecting expanded state.
 */
function flattenTree(nodes, expanded, level, rowIndexRef, parentPath) {
  if (level === void 0) {
    level = 0;
  }
  if (rowIndexRef === void 0) {
    rowIndexRef = {
      current: 0
    };
  }
  if (parentPath === void 0) {
    parentPath = [];
  }
  var flat = [];
  nodes.forEach(function (node) {
    var _a;
    var currentIndex = rowIndexRef.current++;
    // Ensure node.name is a string
    var nodeName = typeof node.name === "string" ? node.name : String((_a = node.name) !== null && _a !== void 0 ? _a : "");
    var nodePath = tslib.__spreadArray(tslib.__spreadArray([], parentPath, true), [nodeName], false);
    var nodeKey = nodePath.join("/");
    flat.push({
      type: "data",
      row: node,
      rowIndex: currentIndex,
      indent: level,
      nodeKey: nodeKey
    });
    if (node.children && Array.isArray(node.children) && node.children.length > 0 && expanded[nodeKey]) {
      flat.push.apply(flat, flattenTree(node.children, expanded, level + 1, rowIndexRef, nodePath));
    }
  });
  return flat;
}
/**
 * Recursively adds aggregation values to each node in the tree.
 * - aggregatedCount: total number of descendant leaf files
 * - provided: only 1 for leaf nodes (files), not folders
 */
function addAggregations(node) {
  if (!node.children || node.children.length === 0) {
    node.aggregatedCount = 1;
    node.provided = 1;
    return 1;
  }
  var total = 0;
  for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
    var child = _a[_i];
    total += addAggregations(child);
  }
  node.aggregatedCount = total;
  return total;
}
/**
 * Add aggregations to a full tree list (root-level array)
 */
function computeAggregationsForTree(tree) {
  tree.forEach(function (node) {
    return addAggregations(node);
  });
}
/**
 * Recursively collect all nodeKeys (including self) for a node and its descendants.
 */
function getAllDescendantNodeKeys(node, parentPath) {
  var _a;
  if (parentPath === void 0) {
    parentPath = [];
  }
  var nodeName = typeof node.name === "string" ? node.name : String((_a = node.name) !== null && _a !== void 0 ? _a : "");
  var nodePath = tslib.__spreadArray(tslib.__spreadArray([], parentPath, true), [nodeName], false);
  var nodeKey = nodePath.join("/");
  var keys = [nodeKey];
  if (node.children && Array.isArray(node.children)) {
    for (var _i = 0, _b = node.children; _i < _b.length; _i++) {
      var child = _b[_i];
      keys = keys.concat(getAllDescendantNodeKeys(child, nodePath));
    }
  }
  return keys;
}
/**
 * Get the parent nodeKey for a given nodeKey.
 */
function getParentNodeKey(nodeKey) {
  var parts = nodeKey.split("/");
  if (parts.length <= 1) return null;
  return parts.slice(0, -1).join("/");
}
/**
 * Given a nodeKey and the flattenedRows, find the node object.
 */
function findNodeByNodeKey(flattenedRows, nodeKey) {
  return flattenedRows.find(function (item) {
    return item.nodeKey === nodeKey;
  });
}
/**
 * Move a node from one location to another in a tree structure.
 * @param tree The tree data array (root level).
 * @param sourcePath The path array of the node to move.
 * @param targetPath The path array of the new parent node (or [] for root).
 * @returns A new tree with the node moved.
 */
function moveTreeNode(tree, sourcePath, targetPath) {
  if (!tree || !Array.isArray(tree) || sourcePath.length === 0) return tree;
  // Helper to deep clone the tree
  var deepClone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
  };
  var clonedTree = deepClone(tree);
  // Helper to find and remove node by path
  function removeNode(nodes, path) {
    if (path.length === 0) return null;
    var segment = path[0],
      rest = path.slice(1);
    var idx = nodes.findIndex(function (n) {
      return n.name === segment;
    });
    if (idx === -1) return null;
    if (rest.length === 0) {
      // Remove and return the node
      return nodes.splice(idx, 1)[0];
    }
    if (nodes[idx].children) {
      return removeNode(nodes[idx].children, rest);
    }
    return null;
  }
  // Helper to insert node at target path
  function insertNode(nodes, path, node) {
    if (path.length === 0) {
      nodes.push(node);
      return;
    }
    var segment = path[0],
      rest = path.slice(1);
    var target = nodes.find(function (n) {
      return n.name === segment;
    });
    if (!target) {
      // If target path doesn't exist, create it as a folder
      target = {
        name: segment,
        children: []
      };
      nodes.push(target);
    }
    if (!target.children) target.children = [];
    insertNode(target.children, rest, node);
  }
  // Remove node from source
  var nodeToMove = removeNode(clonedTree, sourcePath);
  if (!nodeToMove) return tree;
  // Update the node's path property
  nodeToMove.path = tslib.__spreadArray(tslib.__spreadArray([], targetPath, true), [nodeToMove.name], false);
  // Insert node at target
  insertNode(clonedTree, targetPath, nodeToMove);
  return clonedTree;
}

var DataGrid = /*#__PURE__*/React.forwardRef(function (_a, ref) {
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
    rowSelection = _a.rowSelection,
    // props for pagination
    pagination = _a.pagination,
    // prop for filtering
    onFilterChange = _a.onFilterChange,
    _g = _a.rowModelType,
    rowModelType = _g === void 0 ? "clientSide" : _g,
    // default to client-side row model
    onSortChange = _a.onSortChange,
    // for sorting
    sortModel = _a.sortModel,
    onRowGroup = _a.onRowGroup,
    _h = _a.pivotMode,
    pivotMode = _h === void 0 ? false : _h,
    serverPivoting = _a.serverPivoting,
    editType = _a.editType,
    onCellValueChanged = _a.onCellValueChanged,
    onRowValueChanged = _a.onRowValueChanged;
    _a.fullRowButtons;
    var treeData = _a.treeData,
    getDataPath = _a.getDataPath,
    treeDataChildrenField = _a.treeDataChildrenField,
    _j = _a.groupDefaultExpanded,
    groupDefaultExpanded = _j === void 0 ? -1 : _j,
    rowDragManaged = _a.rowDragManaged,
    onRowDragEnd = _a.onRowDragEnd,
    showChildCount = _a.showChildCount,
    parentRow = _a.parentRow;
  var addRowConfig = columnDefs.addRowConfig;
  var _k = React.useState({}),
    treeExpandedRows = _k[0],
    setTreeExpandedRows = _k[1];
  //Add state to track the drag-over row
  var _l = React.useState(null),
    dragOverRowKey = _l[0],
    setDragOverRowKey = _l[1];
  var _m = React.useState(false),
    treeInit = _m[0],
    setTreeInit = _m[1];
  // for full row editing
  var _o = React.useState(null),
    editingRowId = _o[0],
    setEditingRowId = _o[1];
  var _p = React.useState(null),
    editingRowData = _p[0],
    setEditingRowData = _p[1];
  // Tracks whether the user is currently editing/adding a new row
  var _q = React.useState(false),
    isAddingRow = _q[0],
    setIsAddingRow = _q[1];
  // Holds the data being entered for the new row
  var _r = React.useState({}),
    newRowData = _r[0],
    setNewRowData = _r[1];
  var generateInitialRowData = function () {
    var initial = {};
    columns === null || columns === void 0 ? void 0 : columns.forEach(function (col) {
      if (!(col.field in initial)) {
        initial[col.field] = ""; // or default for col.type
      }
    });
    return initial;
  };
  // get server-pivoting props
  var _s = serverPivoting || {},
    serverPivotedData = _s.serverPivotedData,
    serverPivotDataColumns = _s.serverPivotDataColumns,
    serverPivotCols = _s.serverPivotCols,
    setServerPivotColsFn = _s.setServerPivotColsFn,
    setServerGroupedColsFn = _s.setServerGroupedCols,
    setServerAggColsFn = _s.setServerAggColsFn,
    serverAggCols = _s.serverAggCols;
  var isServerSide = rowModelType === "serverSide";
  var _t = React.useState(pivotMode),
    enablePivot = _t[0],
    setEnablePivot = _t[1];
  var defaultPivotColumns = React.useMemo(function () {
    var _a;
    return ((_a = columnDefs.columns) === null || _a === void 0 ? void 0 : _a.filter(function (item) {
      return item.pivot;
    }).map(function (item) {
      return item.field;
    })) || [];
  }, [columnDefs]);
  // To apply pivot on like game, year etc
  var _u = React.useState(defaultPivotColumns),
    pivotColumns = _u[0],
    setPivotColumns = _u[1];
  var _v = React.useState(columnDefs);
    _v[0];
    _v[1];
  // sort data on pivoting mode
  var _w = React.useState(null),
    sortDirection = _w[0],
    setSortDirection = _w[1];
  var toggleSortByTotalMedals = function () {
    setSortDirection(function (prev) {
      return prev === "asc" ? "desc" : "asc";
    });
  };
  var _x = React.useState({}),
    columnAggFnMap = _x[0],
    setColumnAggFnMap = _x[1];
  var aggCols = React.useMemo(function () {
    var _a, _b;
    if (!enablePivot) return;
    return (_b = (_a = columnDefs === null || columnDefs === void 0 ? void 0 : columnDefs.columns) === null || _a === void 0 ? void 0 : _a.filter(function (col) {
      var _a;
      return typeof ((_a = data === null || data === void 0 ? void 0 : data[0]) === null || _a === void 0 ? void 0 : _a[col.field]) === "number" && col.pivot !== true && col.field !== "year";
    } // exclude year column as you wanted
    )) === null || _b === void 0 ? void 0 : _b.map(function (col) {
      return {
        field: col.field,
        aggFunc: columnAggFnMap[col.field] || "sum" // fallback to sum if not set
      };
    });
  }, [columnDefs, data, columnAggFnMap]);
  // eg field, aggFunc - silver, sum
  var _y = React.useState(serverAggCols ? serverAggCols : aggCols || []),
    _aggCols = _y[0],
    _setAggCols = _y[1];
  // 🧠 Automatically filter when columnDefs or _aggCols change
  var selectedAggFn = React.useState("sum")[0];
  // drag and drop of the column while applying agg
  var handleAggDrop = function (e) {
    if (!enablePivot) return;
    var field = e.dataTransfer.getData("text/plain");
    if (!field) return;
    setColumnAggFnMap(function (prev) {
      var _a;
      return tslib.__assign(tslib.__assign({}, prev), (_a = {}, _a[field] = selectedAggFn || "sum", _a));
    });
  };
  var groupByField = React.useMemo(function () {
    var _a, _b;
    return (_b = (_a = columnDefs === null || columnDefs === void 0 ? void 0 : columnDefs.columns) === null || _a === void 0 ? void 0 : _a.find(function (col) {
      return col.rowGroup;
    })) === null || _b === void 0 ? void 0 : _b.field;
  }, [columnDefs]);
  // set the grouped column via setter function
  React.useEffect(function () {
    if (setServerGroupedColsFn && groupByField) {
      setServerGroupedColsFn(groupByField);
    }
  }, [groupByField, setServerGroupedColsFn]);
  // on removing the the column from the ColumnSide bar
  React.useEffect(function () {
    if (!enablePivot) return;
    var fromMap = Object.entries(columnAggFnMap).map(function (_a) {
      var field = _a[0],
        aggFunc = _a[1];
      return {
        field: field,
        aggFunc: aggFunc
      };
    });
    if (fromMap.length > 0) {
      setServerAggColsFn ? setServerAggColsFn(fromMap) : _setAggCols(fromMap);
    } else if (aggCols && _aggCols.length === 0 && aggCols.length > 0) {
      setServerAggColsFn ? setServerAggColsFn(aggCols || []) : _setAggCols(aggCols || []);
    }
  }, [columnAggFnMap, enablePivot, aggCols, setServerAggColsFn]);
  var groupedPivotedData = React.useMemo(function () {
    var _a;
    if (!enablePivot || !pivotMode) return [];
    if (groupByField && _aggCols) {
      var grouped = serverPivoting && serverPivotedData ? serverPivotedData : (_a = pivotAndAggregateByGroup(data, groupByField, pivotColumns, serverAggCols ? serverAggCols : _aggCols)) !== null && _a !== void 0 ? _a : [];
      if (sortDirection && grouped.length > 0) {
        return tslib.__spreadArray([], grouped, true).sort(function (a, b) {
          var _a, _b, _c, _d;
          return sortDirection === "asc" ? ((_a = a.totalMedals) !== null && _a !== void 0 ? _a : 0) - ((_b = b.totalMedals) !== null && _b !== void 0 ? _b : 0) : ((_c = b.totalMedals) !== null && _c !== void 0 ? _c : 0) - ((_d = a.totalMedals) !== null && _d !== void 0 ? _d : 0);
        });
      }
      return grouped;
    }
    return [];
  }, [data, groupByField, pivotColumns, _aggCols, sortDirection, serverAggCols, enablePivot, serverPivoting, serverPivotedData]);
  function getPivotDataColumns(data, pivotColumns) {
    if (!enablePivot) return;
    if (serverPivotDataColumns) {
      return serverPivotDataColumns;
    }
    return pivotColumns.map(function (key) {
      var _a;
      var values = Array.from(new Set(data.map(function (row) {
        return row[key];
      })));
      return _a = {}, _a[key] = values, _a;
    });
  }
  // get all the unique values for the pivot columns
  var pivotDataColumns = React.useMemo(function () {
    return serverPivoting && serverPivotCols ? getPivotDataColumns(data, serverPivotCols) : getPivotDataColumns(data, pivotColumns);
  }, [data, serverPivotCols, pivotColumns, serverPivoting]);
  var togglePivot = React.useCallback(function () {
    setEnablePivot(function (prev) {
      return !prev;
    });
  }, []);
  var getCookedData = useCookedData(columnDefs).getCookedData;
  var _z = columnDefs.columns,
    propColumns = _z === void 0 ? [] : _z,
    _0 = columnDefs.masterDetail,
    masterDetail = _0 === void 0 ? false : _0,
    _1 = columnDefs.detailGridOptions,
    detailGridOptions = _1 === void 0 ? {} : _1,
    _2 = columnDefs.getDetailRowData,
    getDetailRowData = _2 === void 0 ? undefined : _2,
    _3 = columnDefs.aggFuncs,
    aggFuncs = _3 === void 0 ? {} : _3,
    _4 = columnDefs.grandTotalRow,
    grandTotalRow = _4 === void 0 ? "none" : _4,
    _5 = columnDefs.tableLayout,
    tableLayout = _5 === void 0 ? "fixed" : _5;
  // State
  var _6 = React.useState([]),
    gridData = _6[0],
    setGridData = _6[1];
  var _7 = React.useState([]),
    columns = _7[0],
    setColumns = _7[1];
  var _8 = React.useState({
      key: null,
      direction: "asc"
    }),
    sortConfig = _8[0],
    setSortConfig = _8[1];
  var _9 = React.useState({}),
    filters = _9[0],
    setFilters = _9[1];
  var _10 = React.useState({}),
    filterTypes = _10[0],
    setFilterTypes = _10[1];
  var _11 = React.useState({}),
    debouncedFilters = _11[0],
    setDebouncedFilters = _11[1];
  var _12 = React.useState([]),
    groupedColumns = _12[0],
    setGroupedColumns = _12[1];
  var _13 = React.useState({}),
    expandedGroups = _13[0],
    setExpandedGroups = _13[1];
  // State for selected rows (nodeKey: boolean)
  var _14 = React.useState({}),
    selectedRows = _14[0],
    setSelectedRows = _14[1];
  // Handler for tree row selection
  var handleTreeRowCheckboxChange = function (nodeKey, checked) {
    setSelectedRows(function (prev) {
      var updated = tslib.__assign({}, prev);
      // Find the node in the flattenedRows
      var node = findNodeByNodeKey(flattenedRows, nodeKey);
      if (!node) return updated;
      // Only select/deselect this node and its descendants (not the whole tree)
      var allKeys = getAllDescendantNodeKeys(node.row, nodeKey.split("/").slice(0, -1));
      if (checked) {
        allKeys.forEach(function (key) {
          return updated[key] = true;
        });
      } else {
        allKeys.forEach(function (key) {
          return delete updated[key];
        });
      }
      // Bubble up: If all siblings are selected, select parent
      var parentKey = getParentNodeKey(nodeKey);
      while (parentKey !== null) {
        var parent_1 = findNodeByNodeKey(flattenedRows, parentKey);
        if (parent_1 && parent_1.row && parent_1.row.children) {
          var allChildrenKeys = parent_1.row.children.map(function (child) {
            return tslib.__spreadArray(tslib.__spreadArray([], parentKey.split("/"), true), [child.name], false).join("/");
          });
          var allSelected = allChildrenKeys.every(function (key) {
            return updated[key];
          });
          if (allSelected && checked) {
            updated[parentKey] = true;
          } else if (!checked) {
            delete updated[parentKey];
          }
        }
        parentKey = getParentNodeKey(parentKey);
      }
      return updated;
    });
  };
  var handlePivotDrop = React.useCallback(function (e) {
    e.preventDefault();
    if (!enablePivot) return;
    var field = e.dataTransfer.getData("columnField");
    // Find the column from the full column list
    // const col = columns.find((c) => c.field === field);
    // If pivot is not allowed on this column, exit early
    // if (!col || !col.pivot) return;
    if (field && !pivotColumns.includes(field)) {
      setPivotColumns(function (prev) {
        return tslib.__spreadArray(tslib.__spreadArray([], prev, true), [field], false);
      });
    }
    if (serverPivotCols && field && !serverPivotCols.includes(field) && serverPivoting && setServerPivotColsFn) {
      setServerPivotColsFn(function (prev) {
        return tslib.__spreadArray(tslib.__spreadArray([], prev, true), [field], false);
      });
    }
  }, [pivotColumns, serverPivotCols]);
  // for server-side row grouping
  React.useEffect(function () {
    if (isServerSide && onRowGroup) {
      onRowGroup(groupedColumns);
    }
  }, [groupedColumns, isServerSide, onRowGroup]);
  // Column drag & drop
  var _15 = React.useState(null),
    draggedColumn = _15[0],
    setDraggedColumn = _15[1];
  var _16 = React.useState(null),
    dragOverColumn = _16[0],
    setDragOverColumn = _16[1];
  var columnDragCounter = React.useRef(0);
  var tableRef = React.useRef(null);
  // Cell editing
  var _17 = React.useState(null),
    editingCell = _17[0],
    setEditingCell = _17[1];
  var _18 = React.useState(""),
    editValue = _18[0],
    setEditValue = _18[1];
  // Master/Detail
  var _19 = React.useState({}),
    expandedRows = _19[0],
    setExpandedRows = _19[1];
  var _20 = React.useState({}),
    detailData = _20[0],
    setDetailData = _20[1];
  // Create debounced filter handler using useCallback to maintain reference
  var debouncedFnRef = React.useRef(undefined);
  var debouncedSetFilters = React.useCallback(function (newFilters) {
    if (debouncedFnRef.current) {
      debouncedFnRef.current.cancel();
    }
    debouncedFnRef.current = lodash.debounce(function (filters) {
      setDebouncedFilters(filters);
    }, 300);
    debouncedFnRef.current(newFilters);
  }, []);
  // Add undo/redo state
  var _21 = React.useState({
      past: [],
      present: data,
      future: []
    }),
    history = _21[0],
    setHistory = _21[1];
  // Add undo/redo handlers
  var canUndo = history.past.length > 0;
  var canRedo = history.future.length > 0;
  var undo = React.useCallback(function () {
    if (!canUndo) return;
    var newPast = history.past.slice(0, -1);
    var newPresent = history.past[history.past.length - 1];
    var newFuture = tslib.__spreadArray([history.present], history.future, true);
    setHistory({
      past: newPast,
      present: newPresent,
      future: newFuture
    });
    setGridData(newPresent);
  }, [history, canUndo]);
  var redo = React.useCallback(function () {
    if (!canRedo) return;
    var newPast = tslib.__spreadArray(tslib.__spreadArray([], history.past, true), [history.present], false);
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
  React.useEffect(function () {
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
  React.useImperativeHandle(ref, function () {
    var div = document.createElement("div");
    Object.assign(div, {
      resetSelection: function () {
        setSelectedRows({});
      }
    });
    return div;
  }, []);
  // Initial Setup
  React.useEffect(function () {
    if (data && data.length > 0) {
      var cookedData = void 0;
      if (treeData && treeDataChildrenField) {
        // Build the tree
        cookedData = buildTreeData(data, treeDataChildrenField, getDataPath);
        // Add aggregations ONLY if columns include them
        var requiresAggregation = propColumns === null || propColumns === void 0 ? void 0 : propColumns.some(function (col) {
          return col.field === "aggregatedCount" || col.field === "provided";
        });
        // Step 2: Add aggregations (Sum & Provided columns)
        if (requiresAggregation) {
          computeAggregationsForTree(cookedData);
        }
      } else if (isChild) {
        cookedData = data;
      } else {
        cookedData = getCookedData(data);
      }
      setGridData(cookedData);
      // Initialize history with current data
      setHistory({
        past: [],
        present: cookedData,
        future: []
      });
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
    if (propColumns && propColumns.length > 0) {
      // Separate grouped and non-grouped columns
      var groupedCols = propColumns.filter(function (col) {
        return col.rowGroup && col.visible !== false;
      });
      var nonGroupedCols = propColumns.filter(function (col) {
        return !col.rowGroup && col.visible !== false;
      });
      // Combine with grouped columns first
      setColumns(tslib.__spreadArray(tslib.__spreadArray([], groupedCols, true), nonGroupedCols, true));
      // Initialize groupedColumns from columns with rowGroup=true
      var initialGroupedColumns = groupedCols.map(function (col) {
        return col.field;
      });
      if (initialGroupedColumns.length > 0) {
        setGroupedColumns(initialGroupedColumns);
      }
      return;
    }
  }, [data, propColumns, treeData, getDataPath, isChild, getCookedData]);
  var toggleTreeRowExpand = React.useCallback(function (nodeKey) {
    setTreeExpandedRows(function (prev) {
      var _a;
      return tslib.__assign(tslib.__assign({}, prev), (_a = {}, _a[nodeKey] = !prev[nodeKey], _a));
    });
  }, []);
  // Update: Set initial expanded rows for tree data based on groupDefaultExpanded
  React.useEffect(function () {
    if (treeData && gridData && Array.isArray(gridData) && !treeInit) {
      var initialExpanded_1 = {};
      var getNodeKey_1 = function (node, parentPath) {
        var _a;
        if (parentPath === void 0) {
          parentPath = [];
        }
        var nodeName = typeof node.name === "string" ? node.name : String((_a = node.name) !== null && _a !== void 0 ? _a : "");
        return tslib.__spreadArray(tslib.__spreadArray([], parentPath, true), [nodeName], false).join("/");
      };
      var expandAll_1 = function (nodes, parentPath) {
        if (parentPath === void 0) {
          parentPath = [];
        }
        nodes.forEach(function (node) {
          var _a;
          var nodeName = typeof node.name === "string" ? node.name : String((_a = node.name) !== null && _a !== void 0 ? _a : "");
          var nodeKey = getNodeKey_1(node, parentPath);
          if (node.children && node.children.length > 0) {
            initialExpanded_1[nodeKey] = true;
            expandAll_1(node.children, tslib.__spreadArray(tslib.__spreadArray([], parentPath, true), [nodeName], false));
          }
        });
      };
      var expandLevels_1 = function (nodes, levels, parentPath) {
        if (parentPath === void 0) {
          parentPath = [];
        }
        if (levels <= 0) return;
        nodes.forEach(function (node) {
          var _a;
          var nodeName = typeof node.name === "string" ? node.name : String((_a = node.name) !== null && _a !== void 0 ? _a : "");
          var nodeKey = getNodeKey_1(node, parentPath);
          if (node.children && node.children.length > 0) {
            initialExpanded_1[nodeKey] = true;
            expandLevels_1(node.children, levels - 1, tslib.__spreadArray(tslib.__spreadArray([], parentPath, true), [nodeName], false));
          }
        });
      };
      if (groupDefaultExpanded === -1) {
        expandAll_1(gridData);
      } else if (groupDefaultExpanded > 0) {
        expandLevels_1(gridData, groupDefaultExpanded);
      }
      setTreeExpandedRows(initialExpanded_1);
      setTreeInit(true);
    }
  }, [treeData, gridData, groupDefaultExpanded, treeInit]);
  React.useEffect(function () {
    setTreeInit(false);
  }, [gridData]);
  // Update filters and trigger debounced update
  var handleFilterChange = React.useCallback(function (field, value) {
    var _a;
    var newFilters = tslib.__assign(tslib.__assign({}, filters), (_a = {}, _a[field] = value, _a));
    setFilters(newFilters);
    debouncedSetFilters(newFilters);
  }, [filters, debouncedSetFilters]);
  // for filtering on server side
  React.useEffect(function () {
    if (isServerSide && onFilterChange && filters) {
      // Build AG Grid-style filterModel
      var filterModel_1 = {};
      Object.entries(filters).forEach(function (_a) {
        var field = _a[0],
          value = _a[1];
        if (value !== undefined && value !== "") {
          var col = columns.find(function (c) {
            return c.field === field;
          });
          filterModel_1[field] = {
            filterType: (col === null || col === void 0 ? void 0 : col.type) || "text",
            type: filterTypes[field] || "contains",
            filter: value
          };
        }
      });
      onFilterChange(filterModel_1);
    }
  }, [filters]);
  // Cleanup debounce on unmount
  React.useEffect(function () {
    return function () {
      if (debouncedFnRef.current) {
        debouncedFnRef.current.cancel();
      }
    };
  }, []);
  var handleFilterTypeChange = React.useCallback(function (field, type) {
    setFilterTypes(function (prev) {
      var _a;
      return tslib.__assign(tslib.__assign({}, prev), (_a = {}, _a[field] = type, _a));
    });
  }, []);
  // Update filteredData to use filter types
  var filteredData = React.useMemo(function () {
    // If server-side filtering is enabled, just return all gridData (parent will handle filtering)
    if (isServerSide) {
      return gridData;
    }
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
  var handleSort = React.useCallback(function (field) {
    if (isServerSide && onSortChange) {
      // Get current sort direction for this field from sortModel prop
      var currentSort = (typeof sortModel !== "undefined" ? sortModel.find(function (s) {
        return s.colName === field;
      }) : undefined) || {
        sort: undefined
      };
      var direction_1;
      if (!currentSort.sort) {
        direction_1 = "asc";
      } else if (currentSort.sort === "asc") {
        direction_1 = "desc";
      } else if (currentSort.sort === "desc") {
        direction_1 = "asc"; // Remove sort
      }
      // Remove this column from previous sorts
      var filtered = typeof sortModel !== "undefined" ? sortModel.filter(function (s) {
        return s.colName !== field;
      }) : [];
      // If direction is undefined, just remove the sort for this column
      var newSortModel = direction_1 ? [{
        colName: field,
        sort: direction_1
      }] : filtered;
      onSortChange(newSortModel);
      return;
    }
    var direction = "asc";
    if (sortConfig.key === field && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({
      key: field,
      direction: direction
    });
    // Sort the data
    var sorted = tslib.__spreadArray([], gridData, true).sort(function (a, b) {
      var aValue = a[field];
      var bValue = b[field];
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setGridData(sorted);
  }, [sortConfig, gridData]);
  // If you also want multi-sort with shiftKey, you can adapt accordingly.
  var handleMultiSort = React.useCallback(function (field, e) {
    if (e === null || e === void 0 ? void 0 : e.shiftKey) ;
    handleSort(field);
  }, [handleSort]);
  // ----------------------------
  // 5) Column Drag & Drop
  // ----------------------------
  var handleColumnDragStart = React.useCallback(function (e, field) {
    setDraggedColumn(field);
    columnDragCounter.current = 0;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("columnField", field);
  }, []);
  var handleColumnDragOver = React.useCallback(function (e, field) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverColumn !== field) {
      setDragOverColumn(field);
    }
  }, [dragOverColumn]);
  var handleColumnDragEnter = React.useCallback(function (e) {
    e.preventDefault();
    columnDragCounter.current++;
  }, []);
  var handleColumnDragLeave = React.useCallback(function (e) {
    e.preventDefault();
    columnDragCounter.current--;
    if (columnDragCounter.current === 0) {
      setDragOverColumn(null);
    }
  }, []);
  var handleColumnDrop = React.useCallback(function (e, targetField) {
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
    var newCols = tslib.__spreadArray([], columns, true);
    var moved = newCols.splice(sourceIndex, 1)[0];
    newCols.splice(targetIndex, 0, moved);
    // Important: Preserve column properties and only update order
    setColumns(newCols);
    // Reset drag state
    setDraggedColumn(null);
  }, [draggedColumn, columns]);
  var handleColumnDragEnd = React.useCallback(function () {
    columnDragCounter.current = 0;
    setDraggedColumn(null);
    setDragOverColumn(null);
  }, []);
  // ----------------------------
  // 6) Editing
  // ----------------------------
  var startEditing = React.useCallback(function (rowIndex, field, value) {
    if (editType === "fullRow") {
      setEditingRowId(rowIndex);
      setEditingRowData(function (prev) {
        var _a;
        return tslib.__assign(tslib.__assign({}, prev), (_a = {}, _a[field] = value, _a));
      });
    } else {
      setEditingCell({
        rowIndex: rowIndex,
        field: field
      });
      setEditValue(value);
    }
  }, [editType]);
  var handleEditChange = React.useCallback(function (value, editorType) {
    var _a;
    if (editorType === "select" || editorType === "date" || editorType === "time" || editorType === "dateTime" || editorType === "checkbox") {
      if (!editingCell) return;
      var field = editingCell.field;
      var newRow = tslib.__assign(tslib.__assign({}, gridData[editingCell.rowIndex]), (_a = {}, _a[field] = value, _a));
      var idxInAll = gridData.findIndex(function (r) {
        return r === gridData[editingCell.rowIndex];
      });
      if (idxInAll !== -1) {
        var previousRecord = gridData[editingCell.rowIndex];
        var newData = tslib.__spreadArray([], gridData, true);
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
            past: tslib.__spreadArray(tslib.__spreadArray([], prev.past, true), [prev.present], false),
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
  var handleEditChangeCheckbox = React.useCallback(function (value, rowIndex, field) {
    var _a;
    var newRow = tslib.__assign(tslib.__assign({}, gridData[rowIndex]), (_a = {}, _a[field] = value, _a));
    var idxInAll = gridData.findIndex(function (r) {
      return r === gridData[rowIndex];
    });
    if (idxInAll !== -1) {
      var newData = tslib.__spreadArray([], gridData, true);
      newData[idxInAll] = newRow;
      var cookedData_2 = getCookedData(newData);
      setGridData(cookedData_2);
      // Update history with current state before making changes
      setHistory(function (prev) {
        return {
          past: tslib.__spreadArray(tslib.__spreadArray([], prev.past, true), [prev.present], false),
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
  var toggleRowExpand = React.useCallback(function (rowIndex) {
    setExpandedRows(function (prev) {
      var newState = tslib.__assign({}, prev);
      if (newState[rowIndex]) {
        delete newState[rowIndex];
      } else {
        newState[rowIndex] = true;
        // Get detail data from children if available
        var row_1 = gridData[rowIndex];
        if (row_1 && row_1.children) {
          setDetailData(function (old) {
            var _a;
            return tslib.__assign(tslib.__assign({}, old), (_a = {}, _a[rowIndex] = row_1.children, _a));
          });
        } else if (getDetailRowData) {
          // Fallback to getDetailRowData if no children
          getDetailRowData({
            data: row_1,
            successCallback: function (detail) {
              setDetailData(function (old) {
                var _a;
                return tslib.__assign(tslib.__assign({}, old), (_a = {}, _a[rowIndex] = detail, _a));
              });
            }
          });
        }
      }
      return newState;
    });
  }, [gridData, getDetailRowData]);
  React.useEffect(function () {
    // Update detailData for all expanded rows when gridData changes
    setDetailData(function (prev) {
      var updated = {};
      Object.keys(expandedRows).forEach(function (rowIndexStr) {
        var rowIndex = Number(rowIndexStr);
        var row = gridData[rowIndex];
        if (row && row.children) {
          updated[rowIndex] = row.children;
        }
      });
      return updated;
    });
  }, [gridData, expandedRows]);
  // ----------------------------
  // 8) Row Grouping
  // ----------------------------
  var toggleGroupExpand = React.useCallback(function (groupKey) {
    setExpandedGroups(function (prev) {
      var newState = tslib.__assign({}, prev);
      if (newState[groupKey]) {
        delete newState[groupKey];
      } else {
        newState[groupKey] = true;
      }
      return newState;
    });
  }, []);
  var setColumnGrouped = React.useCallback(function (field, grouped) {
    // If server-side grouping is enabled, notify parent and skip client grouping
    if (isServerSide && onRowGroup) {
      // Build the new groupedColumns array
      setGroupedColumns(function (prev) {
        var newGrouped;
        if (grouped) {
          newGrouped = prev.includes(field) ? prev : tslib.__spreadArray(tslib.__spreadArray([], prev, true), [field], false);
        } else {
          newGrouped = prev.filter(function (f) {
            return f !== field;
          });
        }
        // Notify parent to fetch grouped data from server
        onRowGroup(newGrouped);
        return newGrouped;
      });
      return; // Do not do client-side grouping
    }
    // Update columns
    var newColumns = columns.map(function (col) {
      if (col.field === field) {
        return tslib.__assign(tslib.__assign({}, col), {
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
        setColumns(tslib.__spreadArray([groupedColumn], filteredColumns, true));
      }
    } else {
      setColumns(newColumns);
    }
    // Update groupedColumns
    setGroupedColumns(function (prev) {
      if (grouped) {
        if (!prev.includes(field)) {
          return tslib.__spreadArray(tslib.__spreadArray([], prev, true), [field], false);
        }
        return prev;
      } else {
        return prev.filter(function (f) {
          return f !== field;
        });
      }
    });
  }, [columns, isServerSide, onRowGroup]);
  // ----------------------------
  // Group & Flatten Data for Virtualization
  // ----------------------------
  var calculateAggregation = React.useCallback(function (values, aggFunc) {
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
  var groupedData = React.useMemo(function () {
    var _a;
    // If server-side grouping is enabled, always use the data as provided by the parent
    if (isServerSide && onRowGroup) {
      // Only use data if it's grouped (has isGroup), otherwise return null (no grouping)
      if (Array.isArray(data) && data.length > 0 && ((_a = data[0]) === null || _a === void 0 ? void 0 : _a.isGroup)) {
        return data;
      }
      // If not grouped, return null to show flat data (no grouping)
      return null;
    }
    // Otherwise, do client-side grouping
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
  }, [filteredData, groupedColumns, columns, isServerSide, data]);
  var flattenedRows = React.useMemo(function () {
    var flatList = [];
    if (treeData && gridData && Array.isArray(gridData)) {
      // Use the flattenTree helper for tree data
      return flattenTree(gridData, treeExpandedRows, 0, {
        current: 0
      });
    }
    var dataToRender = filteredData;
    if (!dataToRender || dataToRender.length === 0) {
      return flatList;
    }
    if (!filteredData || filteredData.length === 0) {
      return flatList;
    }
    if (groupedData && groupedData.length > 0) {
      // Handle grouped data
      var walkGroups_1 = function (groups, indentLevel, parentIndex) {
        if (indentLevel === void 0) {
          indentLevel = 0;
        }
        if (parentIndex === void 0) {
          parentIndex = 0;
        }
        groups === null || groups === void 0 ? void 0 : groups.forEach(function (group, groupIndex) {
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
      dataToRender.forEach(function (row, index) {
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
  }, [filteredData, groupedData, expandedGroups, expandedRows, masterDetail, enablePivot, pivotColumns, treeData, gridData, expandedRows, treeExpandedRows]);
  // Or modify it to only expand on initial load if you want that behavior
  React.useEffect(function () {
    if (groupedData && groupedColumns.length === 1) {
      // Only for first grouping
      setExpandedGroups({}); // Reset expanded groups when grouping changes
    }
  }, [groupedData, groupedColumns]);
  // ----------------------------
  // 9) Virtualization Setup
  // ----------------------------
  var scrollParentRef = React.useRef(null);
  var rowVirtualizer = reactVirtual.useVirtualizer({
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
  // Add this function above your return statement in DataGrid
  var handleTreeRowDrop = React.useCallback(function (draggedNodeKey, targetNodeKey) {
    if (!rowDragManaged || !treeData) return;
    // Prevent dropping onto itself
    if (draggedNodeKey === targetNodeKey) return;
    // Prevent dropping into its own descendant
    var draggedItem = flattenedRows.find(function (item) {
      return item.type === "data" && "nodeKey" in item && item.nodeKey === draggedNodeKey;
    });
    var targetItem = flattenedRows.find(function (item) {
      return item.type === "data" && "nodeKey" in item && item.nodeKey === targetNodeKey;
    });
    if (!draggedItem || !targetItem) return;
    // Don't allow dropping into a descendant
    var descendantKeys = getAllDescendantNodeKeys(draggedItem.row, draggedNodeKey.split("/").slice(0, -1));
    if (descendantKeys.includes(targetNodeKey)) return;
    // Get source and target paths
    var sourcePath = draggedNodeKey.split("/");
    var targetPath = targetNodeKey.split("/");
    // Move the node in the tree
    var newTree = moveTreeNode(gridData, sourcePath, targetPath);
    setGridData(newTree);
    // Optionally update history for undo/redo
    setHistory(function (prev) {
      return {
        past: tslib.__spreadArray(tslib.__spreadArray([], prev.past, true), [prev.present], false),
        present: newTree,
        future: []
      };
    });
    // Call the callback if provided
    if (onRowDragEnd) {
      onRowDragEnd({
        draggedRow: draggedItem.row,
        targetRow: targetItem.row,
        newData: newTree
      });
    }
  }, [rowDragManaged, treeData, flattenedRows, gridData, setGridData, setHistory, onRowDragEnd]);
  // ----------------------------
  // 10) Rendering: Flattened Virtual Rows
  // ----------------------------
  // Which columns do we show? (Ignore rowGroup columns except the first if needed)
  // This guarantees that all grouped columns (in the order of groupedColumns) are
  // always at the start of your visible columns.
  var displayColumns = React.useMemo(function () {
    // Grouped columns first, then the rest, but hide columns with aggSourceField
    var grouped = columns.filter(function (col) {
      return groupedColumns.includes(col.field) && col.visible !== false && !col.aggSourceField;
    } // hide if aggSourceField is set
    );
    var nonGrouped = columns.filter(function (col) {
      return !groupedColumns.includes(col.field) && col.visible !== false && !col.aggSourceField;
    } // hide if aggSourceField is set
    );
    return tslib.__spreadArray(tslib.__spreadArray([], grouped, true), nonGrouped, true);
  }, [columns, groupedColumns, enablePivot, pivotColumns, enablePivot]);
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
    if (col.editorType === "date" && value) {
      // Format as YYYY-MM-DD or your preferred format
      var date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString(); // or use date-fns/format for custom format
      }
    }
    return value ? String(value) : "";
  };
  var handleTreeRowsDrop = React.useCallback(function (draggedNodeKeys, targetNodeKey) {
    var _a, _b, _c;
    if (!rowDragManaged || !treeData) return;
    if (draggedNodeKeys.includes(targetNodeKey)) return;
    var newTree = gridData;
    draggedNodeKeys.forEach(function (draggedNodeKey) {
      var draggedItem = flattenedRows.find(function (item) {
        return item.type === "data" && "nodeKey" in item && item.nodeKey === draggedNodeKey;
      });
      var targetItem = flattenedRows.find(function (item) {
        return item.type === "data" && "nodeKey" in item && item.nodeKey === targetNodeKey;
      });
      if (!draggedItem || !targetItem) return;
      var descendantKeys = getAllDescendantNodeKeys(draggedItem.row, draggedNodeKey.split("/").slice(0, -1));
      if (descendantKeys.includes(targetNodeKey)) return;
      var sourcePath = draggedNodeKey.split("/");
      var targetPath = targetNodeKey.split("/");
      newTree = moveTreeNode(newTree, sourcePath, targetPath);
    });
    setGridData(newTree);
    setHistory(function (prev) {
      return {
        past: tslib.__spreadArray(tslib.__spreadArray([], prev.past, true), [prev.present], false),
        present: newTree,
        future: []
      };
    });
    if (onRowDragEnd) {
      var draggedRowsArr = draggedNodeKeys.map(function (key) {
        var item = flattenedRows.find(function (item) {
          return item.type === "data" && "nodeKey" in item && item.nodeKey === key;
        });
        return item === null || item === void 0 ? void 0 : item.row;
      }).filter(function (row) {
        return !!row;
      });
      onRowDragEnd({
        draggedRow: (_a = draggedRowsArr[0]) !== null && _a !== void 0 ? _a : null,
        // required
        draggedRows: draggedRowsArr,
        // optional
        targetRow: (_c = (_b = flattenedRows.find(function (item) {
          return item.type === "data" && "nodeKey" in item && item.nodeKey === targetNodeKey;
        })) === null || _b === void 0 ? void 0 : _b.row) !== null && _c !== void 0 ? _c : null,
        newData: newTree
      });
    }
  }, [rowDragManaged, treeData, flattenedRows, gridData, setGridData, setHistory, onRowDragEnd]);
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
      return /*#__PURE__*/React.createElement(TableRow, {
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
        return /*#__PURE__*/React.createElement(TableCell, {
          key: "".concat(colIndex, "-").concat(col.field),
          style: tslib.__assign(tslib.__assign({}, getCellWidth(col)), {
            textWrap: "initial",
            overflow: "hidden",
            cursor: "text"
          }),
          className: "p-0"
        }, isGroupColumn ? (/*#__PURE__*/React.createElement("div", {
          className: "flex items-center cursor-pointer w-full",
          onClick: function () {
            return item.groupKey && toggleGroupExpand(item.groupKey);
          }
        }, isExpanded_1 ? (/*#__PURE__*/React.createElement(lucideReact.ChevronDown, {
          className: "h-5 w-5 mr-1"
        })) : (/*#__PURE__*/React.createElement(lucideReact.ChevronRight, {
          className: "h-5 w-5 mr-1"
        })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
          className: "font-medium"
        }, groupColumn_1 ? "".concat(String(item.groupValue)) : String(item.groupValue)), /*#__PURE__*/React.createElement("p", {
          className: "text-gray-500 font-[10px]"
        }, "(", item.itemCount, " items)")))) : "aggFunc" in col && col.aggFunc && item.aggregations && item.aggregations[col.field] !== undefined ? (/*#__PURE__*/React.createElement("div", {
          className: "w-full"
        }, /*#__PURE__*/React.createElement("div", {
          className: "flex items-center bg-gray-100 px-2 w-[min-content] rounded-md text-sm"
        }, /*#__PURE__*/React.createElement("span", {
          className: "text-gray-600 capitalize"
        }, col.aggFunc), /*#__PURE__*/React.createElement("span", {
          className: "mx-1 text-gray-500"
        }, ":"), /*#__PURE__*/React.createElement("span", {
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
      var hasChildren = (row_2 === null || row_2 === void 0 ? void 0 : row_2.children) && Array.isArray(row_2.children) && row_2.children.length > 0;
      var isExpanded = rowIndex_1 !== undefined ? expandedRows[rowIndex_1] : false;
      var expandButton_1 = null;
      if (treeData && hasChildren && item.type === "data") {
        var nodeKey_1 = item.nodeKey;
        expandButton_1 = /*#__PURE__*/React.createElement("button", {
          className: "mr-2 focus:outline-none cursor-pointer",
          onClick: function () {
            return toggleTreeRowExpand(nodeKey_1);
          }
        }, treeExpandedRows[nodeKey_1] ? (/*#__PURE__*/React.createElement(lucideReact.ChevronDown, {
          className: "size-4 "
        })) : (/*#__PURE__*/React.createElement(lucideReact.ChevronRight, {
          className: "size-4"
        })));
      } else if ((row_2 === null || row_2 === void 0 ? void 0 : row_2.children) && Array.isArray(row_2.children) && row_2.children.length > 0) {
        expandButton_1 = /*#__PURE__*/React.createElement("button", {
          className: "mr-2 focus:outline-none cursor-pointer",
          onClick: function () {
            return rowIndex_1 !== undefined && toggleRowExpand(rowIndex_1);
          }
        }, isExpanded ? (/*#__PURE__*/React.createElement(lucideReact.ChevronDown, {
          className: "h-4 w-4"
        })) : (/*#__PURE__*/React.createElement(lucideReact.ChevronRight, {
          className: "h-4 w-4"
        })));
      }
      // Full row editing logic
      var isFullRowEditing_1 = editType === "fullRow" && typeof onRowValueChanged === "function" && typeof onCellValueChanged === "function" && editingRowId === rowIndex_1;
      // Get the nodeKey if availble - for dragging the selected rows in TREE data
      var nodeKey = treeData && "nodeKey" in item && typeof item.nodeKey === "string" ? item.nodeKey : undefined;
      return /*#__PURE__*/React.createElement(TableRow, {
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
          "hover:bg-gray-100": true,
          "border-b-[3px] border-indigo-200": item.type === "data" && "nodeKey" in item && dragOverRowKey === item.nodeKey
        }),
        onClick: function () {
          return onRowClick === null || onRowClick === void 0 ? void 0 : onRowClick({
            data: row_2,
            rowIndex: rowIndex_1
          });
        },
        onDragLeave: function (e) {
          e.preventDefault();
          e.stopPropagation();
          setDragOverRowKey(null);
        },
        onDragStart: function (e) {
          e.stopPropagation();
          e.dataTransfer.effectAllowed = "move";
          // We'll use nodeKey as the identifier
          // Only set if item is a data row and has nodeKey
          if (item.type === "data" && "nodeKey" in item && typeof item.nodeKey === "string") {
            // e.dataTransfer.setData("dragNodeKey", item.nodeKey);
            var selectedNodeKeys = Object.keys(selectedRows).filter(function (key) {
              return selectedRows[key];
            });
            var dragKeys = selectedNodeKeys.length > 0 && selectedNodeKeys.includes(item.nodeKey) ? selectedNodeKeys : [item.nodeKey];
            e.dataTransfer.setData("dragNodeKeys", JSON.stringify(dragKeys));
          }
        },
        onDrop: function (e) {
          e.preventDefault();
          e.stopPropagation();
          setDragOverRowKey(null);
          var draggedNodeKey = e.dataTransfer.getData("dragNodeKey");
          if (!draggedNodeKey || !(item.type === "data" && "nodeKey" in item && typeof item.nodeKey === "string") || draggedNodeKey === item.nodeKey) return;
          handleTreeRowDrop === null || handleTreeRowDrop === void 0 ? void 0 : handleTreeRowDrop(draggedNodeKey, item.nodeKey);
          var draggedNodeKeysRaw = e.dataTransfer.getData("dragNodeKeys");
          if (!draggedNodeKeysRaw || !(item.type === "data" && "nodeKey" in item && typeof item.nodeKey === "string")) return;
          var draggedNodeKeys = JSON.parse(draggedNodeKeysRaw);
          if (draggedNodeKeys.includes(item.nodeKey)) return;
          handleTreeRowsDrop === null || handleTreeRowsDrop === void 0 ? void 0 : handleTreeRowsDrop(draggedNodeKeys, item.nodeKey);
        },
        // make the row draggable in TREE data where we've a selected
        draggable: treeData && rowSelection && !!nodeKey && selectedRows[nodeKey],
        onDragOver: function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (item.type === "data" && "nodeKey" in item && typeof item.nodeKey === "string") {
            setDragOverRowKey(item.nodeKey);
          }
        }
      }, rowSelection && (/*#__PURE__*/React.createElement(TableCell, {
        key: "checkbox-cell-".concat(rowIndex_1),
        className: "w-[50px]"
      }, /*#__PURE__*/React.createElement("div", {
        className: "w-[30px] flex justify-center items-center"
      }, /*#__PURE__*/React.createElement(Checkbox
      // checked={
      //   rowIndex !== undefined ? !!selectedRows[rowIndex] : false
      // }
      , {
        // checked={
        //   rowIndex !== undefined ? !!selectedRows[rowIndex] : false
        // }
        checked: treeData && rowSelection.treeSelectChildren ? item.type === "data" && "nodeKey" in item && !!selectedRows[item.nodeKey] : rowIndex_1 !== undefined && !!selectedRows[rowIndex_1],
        // onCheckedChange={(checked: boolean) => {
        //   handleRowCheckboxChange(rowIndex, checked);
        // }}
        onCheckedChange: function (checked) {
          if (treeData && rowSelection.treeSelectChildren) {
            if (item.type === "data" && "nodeKey" in item) {
              handleTreeRowCheckboxChange(item.nodeKey, checked);
            }
          } else {
            if (rowIndex_1 !== undefined) {
              handleFlatRowCheckboxChange(rowIndex_1, checked);
            }
          }
        },
        onClick: function (e) {
          return e.stopPropagation();
        },
        // onClick={(e: { stopPropagation: () => void }) => {
        //   e.stopPropagation();
        // }}
        className: "border-1 border-gray-400 cursor-pointer"
      })))), displayColumns.map(function (col, colIndex) {
        var _a;
        if (isFullRowEditing_1 && col.editable) {
          return /*#__PURE__*/React.createElement(TableCell, {
            key: col.field
          }, /*#__PURE__*/React.createElement(CellEditor, {
            value: (_a = editingRowData === null || editingRowData === void 0 ? void 0 : editingRowData[col.field]) !== null && _a !== void 0 ? _a : row_2 === null || row_2 === void 0 ? void 0 : row_2[col.field],
            columnDef: tslib.__assign(tslib.__assign({}, col), {
              editorType: col.editorType || "text"
            }),
            onKeyDown: function (e) {
              if (e.key === "Enter") {
                var updatedRow = tslib.__assign(tslib.__assign({}, row_2), editingRowData);
                onRowValueChanged === null || onRowValueChanged === void 0 ? void 0 : onRowValueChanged({
                  data: updatedRow
                });
                setEditingRowData({});
                setEditingRowId(null);
              }
              if (e.key === "Escape") {
                handleStopEditing();
              }
            },
            onChange: function (value) {
              var _a;
              if (!col || !col.field) return;
              setEditingRowData(function (prev) {
                var _a;
                return tslib.__assign(tslib.__assign({}, prev), (_a = {}, _a[col.field] = value, _a));
              });
              onCellValueChanged({
                value: value,
                field: col.field,
                data: tslib.__assign(tslib.__assign(tslib.__assign({}, row_2), editingRowData), (_a = {}, _a[col.field] = value, _a))
              });
            }
          }));
        }
        var cellRenderer = "cellRenderer" in col ? col.cellRenderer : undefined;
        var cellValue = row_2 ? getCellValue(row_2, col.field, col) : undefined;
        var isEditing = editingCell && editingCell.rowIndex === rowIndex_1 && editingCell.field === col.field;
        // Indent first column for treeData
        if (colIndex === 0 && treeData) {
          return /*#__PURE__*/React.createElement(TableCell, {
            key: "".concat(colIndex, "-").concat(col.field),
            style: tslib.__assign(tslib.__assign({}, getCellWidth(col)), {
              overflow: "hidden",
              cursor: col.editable ? "pointer" : "text",
              textWrap: "initial"
            })
          }, /*#__PURE__*/React.createElement("div", {
            className: "flex items-center w-full transition-all duration-300 ease-in-out",
            style: {
              paddingLeft: "".concat((indent_1 || 0) * 20, "px")
            }
          }, expandButton_1, rowDragManaged && treeData && (/*#__PURE__*/React.createElement("span", {
            draggable: true,
            onDragStart: function (e) {
              e.stopPropagation();
              e.dataTransfer.effectAllowed = "move";
              // We'll use nodeKey as the identifier
              // Only set if item is a data row and has nodeKey
              if (item.type === "data" && "nodeKey" in item && typeof item.nodeKey === "string") {
                e.dataTransfer.setData("dragNodeKey", item.nodeKey);
              }
            },
            className: "cursor-grab mr-2 px-1 py-0.5 rounded hover:bg-gray-200 active:cursor-grabbing",
            title: "Drag to move",
            tabIndex: -1,
            "aria-label": "Drag row"
          }, /*#__PURE__*/React.createElement(lucideReact.GripHorizontal, {
            className: "size-4"
          }))), /*#__PURE__*/React.createElement("span", null, formatCellValue(cellValue, row_2 || {}, col), showChildCount && Array.isArray(row_2 === null || row_2 === void 0 ? void 0 : row_2.children) && row_2.children.length > 0 && (/*#__PURE__*/React.createElement("span", {
            className: "ml-2 text-xs text-gray-500"
          }, "(", row_2.children.length, ")")))));
        }
        // If it's the first column and there's master detail, show expand button
        if (colIndex === 0 && masterDetail) {
          return /*#__PURE__*/React.createElement(TableCell, {
            key: "".concat(colIndex, "-").concat(col.field),
            style: tslib.__assign(tslib.__assign({}, getCellWidth(col)), {
              overflow: "hidden",
              cursor: col.editable ? "pointer" : "text",
              textWrap: "initial"
            })
          }, /*#__PURE__*/React.createElement("div", {
            className: "flex items-center w-full",
            style: {
              paddingLeft: "".concat((indent_1 || 0) * 20, "px")
            }
          }, expandButton_1, formatCellValue(cellValue, row_2 || {}, col)));
        }
        var editorType = "editorType" in col ? col.editorType : undefined;
        // Option 2: Custom render for country column
        if ("rowGroup" in col && col.rowGroup && enablePivot && pivotColumns.length > 0) {
          // Calculate total medals for this row (sum all number fields except the grouped field)
          var totalMedals = Object.keys(row_2 || {}).filter(function (k) {
            return k !== col.field && typeof (row_2 === null || row_2 === void 0 ? void 0 : row_2[k]) === "number" && !isNaN(row_2 === null || row_2 === void 0 ? void 0 : row_2[k]);
          }).reduce(function (acc, k) {
            return acc + (Number(row_2 === null || row_2 === void 0 ? void 0 : row_2[k]) || 0);
          }, 0);
          return /*#__PURE__*/React.createElement(TableCell, {
            key: col.field,
            style: tslib.__assign(tslib.__assign({}, getCellWidth(col)), {
              overflow: "hidden",
              cursor: col.editable ? "pointer" : "text",
              textWrap: "wrap",
              whiteSpace: "normal",
              wordBreak: "break-word"
            }),
            className: cn(isEditing ? "p-[0px]" : ""),
            onDoubleClick: function () {
              if (!cellRenderer && col.editable && rowIndex_1 !== undefined && editorType !== "checkbox" && (!("rowGroup" in col) || !col.rowGroup)) {
                startEditing(rowIndex_1, col.field, String(cellValue));
              }
            }
          }, /*#__PURE__*/React.createElement("div", null, String(row_2 === null || row_2 === void 0 ? void 0 : row_2[col.field]), " (", totalMedals, ")"));
        }
        return /*#__PURE__*/React.createElement(TableCell, {
          key: col.field,
          style: tslib.__assign(tslib.__assign({}, getCellWidth(col)), {
            overflow: "hidden",
            cursor: col.editable ? "pointer" : "text",
            textWrap: "wrap",
            whiteSpace: "normal",
            wordBreak: "break-word"
          }),
          className: cn(isEditing ? "p-[0px]" : ""),
          onDoubleClick: function () {
            if (!cellRenderer && col.editable && rowIndex_1 !== undefined && editorType !== "checkbox" && (!("rowGroup" in col) || !col.rowGroup)) {
              startEditing(rowIndex_1, col.field, String(cellValue));
            }
          }
        }, cellRenderer ? (/*#__PURE__*/React.createElement(cellRenderer, {
          value: cellValue,
          data: row_2,
          rowIndex: rowIndex_1
        })) : isEditing && editorType !== "checkbox" ? (/*#__PURE__*/React.createElement(CellEditor, {
          value: editValue,
          columnDef: {
            editorType: editorType || "text",
            // editorParams: col.editorParams,
            editorParams: "editorParams" in col ? col.editorParams : undefined
          },
          onChange: function (value) {
            return handleEditChange(value, editorType);
          },
          onBlur: function () {
            var _a;
            // Commit changes
            if (!editingCell && editorType !== "select" && editorType !== "date" && editorType !== "checkbox") return;
            var field = editingCell.field;
            // const updatedData = col.valueSetter
            //   ? col.valueSetter({ value: editValue })
            //   : { [field]: editValue };
            var updatedData = "valueSetter" in col && col.valueSetter ? col.valueSetter({
              value: editValue
            }) : (_a = {}, _a[field] = editValue, _a);
            var newRow = tslib.__assign(tslib.__assign({}, row_2), updatedData);
            var idxInAll = gridData.findIndex(function (r) {
              return r === row_2;
            });
            if (idxInAll !== -1) {
              var newData = tslib.__spreadArray([], gridData, true);
              newData[idxInAll] = newRow;
              var cookedData_3 = getCookedData(newData);
              setGridData(tslib.__spreadArray([], cookedData_3, true));
              setHistory(function (prev) {
                return {
                  past: tslib.__spreadArray(tslib.__spreadArray([], prev.past, true), [prev.present], false),
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
        })) : editorType === "checkbox" && col.editable ? (/*#__PURE__*/React.createElement("div", {
          className: "flex items-center space-x-2"
        }, /*#__PURE__*/React.createElement(Switch, {
          id: "".concat(rowIndex_1, "-").concat(col.field),
          className: "cursor-pointer",
          onCheckedChange: function (value) {
            return handleEditChangeCheckbox(value, rowIndex_1, col.field);
          },
          checked: cellValue
        }))) : (/*#__PURE__*/React.createElement("div", {
          className: "w-full"
        },
        // col.tooltipField
        "tooltipField" in col && col.tooltipField ? (/*#__PURE__*/React.createElement(Tooltip, null, /*#__PURE__*/React.createElement(TooltipTrigger, {
          asChild: true
        }, /*#__PURE__*/React.createElement("span", null, col.rowGroup ? "" : formatCellValue(cellValue, row_2 || {}, col))), /*#__PURE__*/React.createElement(TooltipContent, {
          className: ""
        }, function () {
          var tooltipValue = row_2 === null || row_2 === void 0 ? void 0 : row_2[col.tooltipField];
          var result = col.tooltipField && tooltipValue != null && tooltipValue !== "" ? tooltipValue : col.rowGroup ? "" : formatCellValue(cellValue, row_2 || {}, col);
          return result != null ? String(result) : ""; // Ensure it's a valid string or ReactNode
        }()))) : formatCellValue(cellValue, row_2 || {}, col))));
      }), addRowConfig && /*#__PURE__*/React.createElement(TableCell, {
        className: "w-[50px]"
      }));
    }
    // 3) Detail Row
    if (item.type === "detail") {
      var parentIndex = item.parentIndex;
      return /*#__PURE__*/React.createElement(TableRow, {
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
      }, /*#__PURE__*/React.createElement(TableCell, {
        colSpan: displayColumns.length,
        style: {
          padding: 0,
          backgroundColor: "white",
          position: "relative",
          overflow: "hidden",
          width: "100%",
          zIndex: 30
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "detail-grid-container",
        style: {
          padding: "20px",
          overflow: "auto",
          position: "relative",
          backgroundColor: "white",
          width: "100%",
          zIndex: 30
        }
      }, parentIndex !== undefined && detailData[parentIndex] ? (/*#__PURE__*/React.createElement("div", {
        className: "h-full w-full datagrid-container",
        style: {
          position: "relative",
          zIndex: 30,
          overflow: "visible" // Allow dropdowns to overflow
        }
      }, /*#__PURE__*/React.createElement(DataGrid, {
        columnDefs: detailGridOptions,
        data: detailData[parentIndex],
        isChild: true,
        parentRow: item.parentRow
      }))) : (/*#__PURE__*/React.createElement("div", {
        className: "h-full w-full flex items-center justify-center"
      }, "Loading detail data...")))));
    }
    return null;
  };
  // Modify the group drop handler
  var handleGroupDrop = React.useCallback(function (e) {
    e.preventDefault();
    var field = e.dataTransfer.getData("columnField");
    if (enablePivot && !pivotColumns.includes(field)) {
      setColumnGrouped(field, true);
    }
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
  var calculateTotals = React.useMemo(function () {
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
    return /*#__PURE__*/React.createElement("div", {
      className: "bg-gray-100  ".concat(grandTotalRow === "bottom" ? "sticky bottom-0" : "sticky top-0")
    }, /*#__PURE__*/React.createElement(Table, {
      className: "".concat(tableLayout === "fixed" ? "table-fixed" : "table-auto", " border-b border-gray-200")
    }, /*#__PURE__*/React.createElement(TableBody, null, /*#__PURE__*/React.createElement(TableRow, null, displayColumns.map(function (col, index) {
      var _a;
      return /*#__PURE__*/React.createElement(TableCell, {
        key: col.field,
        style: tslib.__assign({}, getCellWidth(col))
      }, col.type === "number" ? (/*#__PURE__*/React.createElement("div", {
        className: "font-semibold"
      }, (_a = calculateTotals[col.field]) === null || _a === void 0 ? void 0 : _a.toLocaleString())) : (/*#__PURE__*/React.createElement("div", {
        className: "font-semibold "
      }, index === 0 ? "Total" : "")));
    })))));
  };
  // Handler for flat (non-tree) row selection
  var handleFlatRowCheckboxChange = function (rowIndex, checked) {
    setSelectedRows(function (prev) {
      var updated = tslib.__assign({}, prev);
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
      if (treeData && (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.treeSelectChildren)) {
        // Select all nodeKeys for treeData
        flattenedRows.filter(function (item) {
          return item.type === "data";
        }).forEach(function (item) {
          allSelected_1[item.nodeKey] = true;
        });
      } else {
        // Flat data: select by index
        gridData.forEach(function (__, idx) {
          allSelected_1[idx] = true;
        });
      }
      setSelectedRows(allSelected_1);
    } else {
      setSelectedRows({});
    }
  };
  // Add useEffect to call onRowSelectionChange when selectedRows changes
  // Call getSelectedRows callback with selected data
  // Update the useEffect for getSelectedRows:
  React.useEffect(function () {
    if (rowSelection && typeof (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.getSelectedRows) === "function") {
      var selectedData = [];
      if (treeData && rowSelection.treeSelectChildren) {
        selectedData = flattenedRows.filter(function (item) {
          return item.type === "data" && "nodeKey" in item && !!selectedRows[item.nodeKey];
        }).map(function (item) {
          return item.row;
        });
      } else {
        selectedData = Object.entries(selectedRows).filter(function (_a) {
          var isSelected = _a[1];
          return isSelected;
        }).map(function (_a) {
          var index = _a[0];
          return data[+index] || data.find(function (row) {
            return row.id === index || row.documentNumber === index;
          });
        });
      }
      rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.getSelectedRows(selectedData.filter(Boolean));
    }
  }, [selectedRows, flattenedRows, treeData, rowSelection, data]);
  // useEffect(() => {
  //   if (rowSelection && typeof rowSelection?.getSelectedRows === "function") {
  //     const selectedData = Object.entries(selectedRows)
  //       .filter(([, isSelected]) => isSelected)
  //       .map(([index]) => data[+index]);
  //     rowSelection?.getSelectedRows(selectedData);
  //   }
  // }, [selectedRows]);
  var _22 = React.useState(""),
    search = _22[0],
    setSearch = _22[1];
  var _23 = React.useState(false),
    sidebarOpen = _23[0],
    setSidebarOpen = _23[1];
  // to exit from the editing mode - full row edit mode
  var handleStopEditing = React.useCallback(function () {
    setEditingRowId(null);
    setEditingRowData(null);
  }, [setEditingRowId, setEditingRowData]);
  // to  start editing the second row - full row edit mode
  React.useCallback(function () {
    var rowIndex = 1;
    // 2nd row means index 1 (0-based)
    var row = gridData[rowIndex];
    if (!row) return;
    setEditingRowId(rowIndex);
    setEditingRowData(row);
  }, [gridData, setEditingRowId, setEditingRowData]);
  // Add this above your return statement
  var aggregationStats = React.useMemo(function () {
    if (isServerSide) return [];
    if (!columns || !columns.length || !gridData.length) return {};
    var stats = {};
    columns.forEach(function (col) {
      if (!col.aggFunc) return;
      // Only use aggSourceField if it's a string, otherwise use col.field
      var sourceField = typeof col.aggSourceField === "string" && col.aggSourceField ? col.aggSourceField : col.field;
      var values = gridData.map(function (row) {
        return Number(row[sourceField]);
      }).filter(function (v) {
        return !isNaN(v);
      });
      var aggValue = 0;
      switch (col.aggFunc) {
        case "sum":
          aggValue = values.reduce(function (acc, val) {
            return acc + val;
          }, 0);
          break;
        case "avg":
          aggValue = values.length ? values.reduce(function (acc, val) {
            return acc + val;
          }, 0) / values.length : 0;
          break;
        case "min":
          aggValue = values.length ? Math.min.apply(Math, values) : 0;
          break;
        case "max":
          aggValue = values.length ? Math.max.apply(Math, values) : 0;
          break;
        default:
          aggValue = 0;
      }
      stats[col.field] = aggValue;
    });
    return stats;
  }, [columns, gridData, isServerSide]);
  // Add keyboard event listener for adding a new row when we have addRowConfig CTRL + A
  React.useEffect(function () {
    if (!addRowConfig) return;
    var handleKeyDown = function (e) {
      console.log("yes");
      var isCtrlOrMeta = e.ctrlKey || e.metaKey;
      var isPlusKey = e.key === "+" || e.key === "="; // some keyboards require Shift + = for +
      if (isCtrlOrMeta && isPlusKey) {
        e.preventDefault(); // prevent browser zoom
        var initial = generateInitialRowData();
        setNewRowData(initial);
        setIsAddingRow(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return function () {
      return window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addRowConfig]);
  // Update the main grid container JSX
  return /*#__PURE__*/React.createElement("div", {
    className: "relative w-[100%] h-full"
  }, loading && (/*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement(reactSpinners.PulseLoader, {
    color: "#4f46e5",
    size: 15
  }), /*#__PURE__*/React.createElement("p", {
    className: "mt-4 text-gray-600"
  }, loadingMessage)))), enablePivot && setPivotColumns && (/*#__PURE__*/React.createElement(PivotPanel, {
    pivotColumns: serverPivoting && serverPivotCols ? serverPivotCols : pivotColumns,
    columns: columns,
    setPivotColumns: serverPivoting && setServerPivotColsFn ? setServerPivotColsFn : setPivotColumns,
    handlePivotDrop: handlePivotDrop
  })), gridData.length > 0 && grandTotalRow === "top" && renderTotalRow(), /*#__PURE__*/React.createElement("div", {
    className: "flex h-[100%] max-h-[80vh] overflow-y-scroll hide-scrollbar"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "auto",
      height: "100%"
    },
    ref: scrollParentRef
  }, /*#__PURE__*/React.createElement(Table, {
    ref: tableRef,
    className: cn("w-full border-b border-l border-r border-gray-200"),
    style: {
      tableLayout: tableLayout
    }
  }, /*#__PURE__*/React.createElement(React.Fragment, null, enablePivot && pivotDataColumns && pivotDataColumns.length !== 0 && (/*#__PURE__*/React.createElement("thead", {
    className: "bg-indigo-100  w-full"
  }, function () {
    var pivotFields = pivotDataColumns.map(function (obj) {
      return Object.keys(obj)[0];
    });
    var pivotValues = pivotDataColumns.map(function (obj) {
      return Object.values(obj)[0];
    });
    var combinations = pivotValues.reduce(function (acc, values) {
      return acc.flatMap(function (comb) {
        return values.map(function (val) {
          return tslib.__spreadArray(tslib.__spreadArray([], comb, true), [val], false);
        });
      });
    }, [[]]);
    var activeAggFields = serverPivoting ? new Set(serverAggCols === null || serverAggCols === void 0 ? void 0 : serverAggCols.map(function (def) {
      return def.field;
    })) : new Set(_aggCols === null || _aggCols === void 0 ? void 0 : _aggCols.map(function (def) {
      return def.field;
    }));
    var metrics = columns.filter(function (col) {
      return col.aggFunc && activeAggFields.has(col.field);
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, pivotFields.map(function (pivotField, rowIndex) {
      var repeatFactor = pivotValues.slice(rowIndex + 1).reduce(function (acc, cur) {
        return acc * cur.length;
      }, 1) * metrics.length;
      var headerCells = [];
      var lastValue = null;
      for (var i = 0; i < combinations.length * metrics.length; i += repeatFactor) {
        var comboIndex = Math.floor(i / metrics.length);
        var value = combinations[comboIndex][rowIndex];
        if (value !== lastValue) {
          headerCells.push(/*#__PURE__*/React.createElement("th", {
            key: "".concat(pivotField, "-").concat(value, "-").concat(i),
            colSpan: repeatFactor,
            className: "text-center border border-gray-200 bg-gray-100 px-4 py-2"
          }, value));
          lastValue = value;
        }
      }
      return /*#__PURE__*/React.createElement("tr", {
        key: "".concat(pivotField, "-").concat(rowIndex)
      }, rowIndex === 0 && groupedColumns.length !== 0 && (/*#__PURE__*/React.createElement("th", {
        rowSpan: pivotFields.length + 1,
        onClick: toggleSortByTotalMedals,
        className: "cursor-pointer sticky left-0 z-20 border border-gray-200 px-4 py-2 bg-gray-100 "
      }, "Group", sortDirection === "asc" ? "↑" : sortDirection === "desc" ? "↓" : "")), headerCells);
    }), /*#__PURE__*/React.createElement("tr", null, combinations.map(function (_, index) {
      return metrics.map(function (metric) {
        return /*#__PURE__*/React.createElement("th", {
          key: "metric-".concat(index, "-").concat(metric.field),
          className: "text-center border border-gray-200 px-4 py-2 font-normal text-sm text-gray-700"
        }, (columnAggFnMap === null || columnAggFnMap === void 0 ? void 0 : columnAggFnMap[metric.field]) || "sum", "(", metric.headerName || metric.field, ")");
      });
    })));
  }())), groupedPivotedData && groupedPivotedData.length > 0 && enablePivot && pivotColumns.length > 0 && !(serverPivoting && serverPivotCols && serverPivotCols.length < 1) && (/*#__PURE__*/React.createElement(TableBody, null, groupedPivotedData.map(function (group) {
    var _a, _b;
    return /*#__PURE__*/React.createElement(TableRow, {
      key: "".concat(group.groupKey, "-").concat(sortDirection),
      className: "table-row-pop"
    }, groupedColumns.length !== 0 && (/*#__PURE__*/React.createElement("th", {
      className: "text-center border border-gray-200 px-4 py-2 font-normal text-sm text-gray-700"
    }, group.groupKey, " (", (_a = group.totalMedals) === null || _a === void 0 ? void 0 : _a.toLocaleString(), ")")), (_b = group === null || group === void 0 ? void 0 : group.children) === null || _b === void 0 ? void 0 : _b.flatMap(function (childRow, childIndex) {
      return displayColumns.filter(function (col) {
        var _a;
        var def = (_a = columnDefs === null || columnDefs === void 0 ? void 0 : columnDefs.columns) === null || _a === void 0 ? void 0 : _a.find(function (def) {
          return def.field === col.field;
        });
        return !(def === null || def === void 0 ? void 0 : def.rowGroup) && !(def === null || def === void 0 ? void 0 : def.pivot); // Exclude rowGroup & pivot columns
      }).filter(function (col) {
        var _a;
        return (_a = group === null || group === void 0 ? void 0 : group.children) === null || _a === void 0 ? void 0 : _a.some(function (row) {
          return row[col.field] !== undefined;
        });
      }).map(function (col) {
        var _a;
        return /*#__PURE__*/React.createElement("th", {
          key: "".concat(group.groupKey, "-").concat(childIndex, "-").concat(col.field),
          className: "text-center border border-gray-200 px-4 py-2 font-normal text-sm text-gray-700"
        }, (_a = childRow[col.field]) === null || _a === void 0 ? void 0 : _a.toLocaleString());
      });
    }));
  })))), /*#__PURE__*/React.createElement(TableHeader, {
    className: "sticky top-0 z-30 bg-gray-200 shadow-sm"
  }, /*#__PURE__*/React.createElement(TableRow, {
    className: "divide-x divide-gray-300"
  }, rowSelection && (/*#__PURE__*/React.createElement(TableHead, {
    className: "w-[50px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-[30px] flex justify-center items-center"
  }, rowSelection.mode === "multiple" && (/*#__PURE__*/React.createElement(Checkbox, {
    checked: treeData && (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.treeSelectChildren) ? flattenedRows.filter(function (item) {
      return item.type === "data" && "nodeKey" in item;
    }).every(function (item) {
      return selectedRows[item.nodeKey];
    }) : Object.keys(selectedRows).length > 0 && Object.keys(selectedRows).length === gridData.length,
    "data-indeterminate": treeData && (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.treeSelectChildren) ? function () {
      var dataRows = flattenedRows.filter(function (item) {
        return item.type === "data" && "nodeKey" in item;
      });
      return dataRows.some(function (item) {
        return selectedRows[item.nodeKey];
      }) && !dataRows.every(function (item) {
        return selectedRows[item.nodeKey];
      });
    }() : Object.keys(selectedRows).length > 0 && Object.keys(selectedRows).length < gridData.length,
    onCheckedChange: handleHeaderCheckboxChange,
    className: "border-1 border-gray-400 cursor-pointer"
  }))))), (!enablePivot || !serverPivoting && pivotColumns.length < 1 || serverPivoting && !(serverPivotCols === null || serverPivotCols === void 0 ? void 0 : serverPivotCols.length)) && displayColumns.map(function (col, ind) {
    var isDragged = draggedColumn === col.field;
    var isDragOver = dragOverColumn === col.field;
    return /*#__PURE__*/React.createElement(TableHead, {
      key: "".concat(col.field, "-").concat(ind),
      draggable: showGroupByPanel,
      className: cn("top-0 z-10 transition-colors", {
        "opacity-50": isDragged,
        "border-1 border-gray-400": isDragOver,
        "cursor-move": showGroupByPanel
      }),
      style: tslib.__assign({}, getCellWidth(col)),
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
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-inherit flex items-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1 flex items-center justify-between w-[85%]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "group flex items-center cursor-pointer font-semibold w-full text-gray-700",
      onClick: function (e) {
        return handleMultiSort(col.field, e);
      }
    }, /*#__PURE__*/React.createElement(Tooltip, null, /*#__PURE__*/React.createElement(TooltipTrigger, {
      asChild: true
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-[85%] break-words whitespace-normal",
      style: {
        textWrap: "initial"
      }
    }, /*#__PURE__*/React.createElement("p", null, col.headerName))),
    // col.headerTooltip &&
    "headerTooltip" in col && col.headerTooltip && (/*#__PURE__*/React.createElement(TooltipContent, {
      className: ""
    }, col.headerTooltip))), /*#__PURE__*/React.createElement("span", {
      className: "ml-1 w-[10%] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
    }, sortConfig.key === col.field ? sortConfig.direction === "asc" ? (/*#__PURE__*/React.createElement(lucideReact.ChevronUp, {
      className: "h-4 w-4 text-gray-400"
    })) : (/*#__PURE__*/React.createElement(lucideReact.ChevronDown, {
      className: "h-4 w-4 text-gray-400"
    })) : (/*#__PURE__*/React.createElement(lucideReact.ChevronsUpDown, {
      className: "h-4 w-4 text-gray-400"
    })))),
    // col.showFilter !== false &&
    "showFilter" in col && col.showFilter !== false && (/*#__PURE__*/React.createElement("div", {
      className: "relative group"
    }, /*#__PURE__*/React.createElement(Popover, null, /*#__PURE__*/React.createElement(PopoverTrigger, {
      asChild: true
    }, /*#__PURE__*/React.createElement("div", {
      className: "p-1 hover:bg-gray-200 rounded cursor-pointer filter-icon",
      "data-column": col.field
    }, /*#__PURE__*/React.createElement(lucideReact.ListFilter, {
      className: "h-4 w-4 ".concat(filters[col.field] ? "text-blue-500" : "text-gray-500")
    }))), /*#__PURE__*/React.createElement(PopoverContent, {
      className: "w-auto min-w-[220px] max-w-[250px] p-3 rounded-md shadow-lg bg-white border border-gray-200"
    }, /*#__PURE__*/React.createElement(CellFilter, {
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
  }), addRowConfig && (/*#__PURE__*/React.createElement(TableHead, {
    className: "w-[50px]",
    style: {
      paddingLeft: "12px",
      paddingTop: "6px"
    }
  }, /*#__PURE__*/React.createElement(Tooltip, null, /*#__PURE__*/React.createElement(TooltipTrigger, {
    asChild: true
  }, /*#__PURE__*/React.createElement("button", {
    className: "cursor-pointer text-white text-lg hover:bg-[#d3d3d3] transition rounded-md",
    style: {
      color: "#a0a2a4"
    },
    onClick: function () {
      var initial = generateInitialRowData();
      setNewRowData(initial);
      setIsAddingRow(true); // explicitly here instead
    }
  }, /*#__PURE__*/React.createElement(lucideReact.Plus, {
    strokeWidth: 1.5
  }))), /*#__PURE__*/React.createElement(TooltipContent, {
    className: ""
  }, "+ Add Row")))))), /*#__PURE__*/React.createElement(TableBody, null, newRowData && isAddingRow && (/*#__PURE__*/React.createElement(TableRow, {
    className: "bg-yellow-50"
  }, rowSelection && (/*#__PURE__*/React.createElement(TableCell, {
    className: "w-[50px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-[30px] flex justify-center items-center"
  }))), displayColumns.map(function (col) {
    return /*#__PURE__*/React.createElement(TableCell, {
      key: "new-".concat(col.field),
      className: "border-2 py-1"
    }, /*#__PURE__*/React.createElement(CellEditor, {
      columnDef: {
        editorType: col.editorType || "text",
        // Default to "text"
        editorParams: col.editorParams
      },
      value: newRowData[col.field],
      onChange: function (val) {
        return setNewRowData(function (prev) {
          var _a;
          return tslib.__assign(tslib.__assign({}, prev), (_a = {}, _a[col.field] = val, _a));
        });
      },
      onKeyDown: function (e) {
        var _a;
        if (e.key === "Enter") {
          var isValid = displayColumns.filter(function (c) {
            return !!c.editorType;
          }).every(function (col) {
            var value = newRowData[col.field];
            return value !== null && value !== undefined && value !== "";
          });
          if (isValid) {
            (_a = addRowConfig === null || addRowConfig === void 0 ? void 0 : addRowConfig.onAdd) === null || _a === void 0 ? void 0 : _a.call(addRowConfig, newRowData, parentRow);
            setNewRowData({});
            setIsAddingRow(false);
          } else {
            // Optional: show error UI
            alert("Please fill all required fields before saving.");
            console.warn("Please fill all required fields before saving.");
          }
        }
        if (e.key === "Escape") {
          setNewRowData({});
          setIsAddingRow(false);
        }
      }
    }));
  }), addRowConfig && (/*#__PURE__*/React.createElement(TableCell, {
    className: "flex justify-center items-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "cursor-pointer text-white text-lg transition rounded-md",
    style: {
      color: "red"
    },
    onClick: function () {
      setNewRowData({});
      setIsAddingRow(false);
    }
  }, /*#__PURE__*/React.createElement(lucideReact.SquareX, {
    strokeWidth: 1.5
  }))))))), (!enablePivot || !serverPivoting && pivotColumns.length < 1 || serverPivoting && !(serverPivotCols === null || serverPivotCols === void 0 ? void 0 : serverPivotCols.length)) && (/*#__PURE__*/React.createElement(TableBody, {
    style: {
      height: "".concat(rowVirtualizer.getTotalSize(), "px"),
      position: "relative"
    }
  }, rowVirtualizer.getVirtualItems().map(function (virtualRow) {
    return renderRow(virtualRow);
  }), flattenedRows.length === 0 && (/*#__PURE__*/React.createElement(TableRow, {
    className: "h-24 text-center"
  }, /*#__PURE__*/React.createElement(TableCell, {
    colSpan: displayColumns.length,
    className: "h-24 text-center"
  }, "No results found"))))))), showGroupByPanel && (/*#__PURE__*/React.createElement("div", {
    style: {
      width: "auto",
      display: "flex"
    }
  }, sidebarOpen && (/*#__PURE__*/React.createElement(ColumnSidebar, {
    columns: columns,
    setColumns: setColumns,
    search: search,
    setSearch: setSearch,
    showGroupByPanel: showGroupByPanel,
    groupedColumns: groupedColumns,
    setColumnGrouped: setColumnGrouped,
    handleGroupDrop: handleGroupDrop,
    togglePivot: togglePivot,
    enablePivot: enablePivot,
    setPivotColumns: serverPivoting && setServerPivotColsFn ? setServerPivotColsFn : setPivotColumns,
    pivotColumns: serverPivoting && serverPivotCols ? serverPivotCols : pivotColumns,
    selectedAggFn: selectedAggFn,
    columnAggFnMap: columnAggFnMap,
    setColumnAggFnMap: setColumnAggFnMap,
    handleAggDrop: handleAggDrop,
    setAggCols: _setAggCols,
    pivotMode: pivotMode
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      background: "#404c58"
    }
  }, /*#__PURE__*/React.createElement("button", {
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
  }, /*#__PURE__*/React.createElement(lucideReact.Calendar, {
    className: "w-4 h-4"
  }), "Columns"))))), /*#__PURE__*/React.createElement("div", {
    className: "sticky bottom-0 bg-white"
  }, gridData.length > 0 && grandTotalRow === "bottom" && renderTotalRow()), isServerSide && pagination && (data === null || data === void 0 ? void 0 : data.length) && (/*#__PURE__*/React.createElement(ServerPagination, {
    data: data,
    paginationProps: pagination
  })), isServerSide && aggregationStats && Object.keys(aggregationStats).length > 0 && (/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", {
    className: "my-2 italic"
  }, "Aggregation Stats:"), /*#__PURE__*/React.createElement("ul", {
    className: "flex gap-4 items-center flex-wrap mb-2"
  }, columns.filter(function (col) {
    return !!col.aggFunc;
  }).map(function (col) {
    var _a;
    return /*#__PURE__*/React.createElement("li", {
      key: col.field
    }, col.headerName, ":", " ", /*#__PURE__*/React.createElement("span", {
      className: "font-bold"
    }, (_a = aggregationStats[col.field]) === null || _a === void 0 ? void 0 : _a.toLocaleString(undefined, {
      maximumFractionDigits: 2
    })));
  })))));
});
DataGrid.displayName = "DataGrid";

exports.DataGrid = DataGrid;
exports.default = DataGrid;
//# sourceMappingURL=index.js.map
