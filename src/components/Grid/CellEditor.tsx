import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { DateTimePicker } from "@/components/datetime-picker";
import { SimpleTimePicker } from "@/components/simple-time-picker";
import { DateTimeInput } from "../datetime-input";
import moment from "moment";

// Define proper types for editor components
interface EditorProps<T = string | boolean | Date | number> {
  value: T | null;
  onChange: (value: T | null) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<Element>) => void;
  placeholder?: string;
  hideTime?: boolean;
  [key: string]: unknown;
}

interface SelectOption {
  value: string;
  label: string;
}
interface SelectEditorProps extends EditorProps<string> {
  options: SelectOption[];
}

interface DateEditorProps extends EditorProps<Date> {
  valueFormatter?: (value: string | boolean | Date | number | null) => string;
}

interface TimeEditorProps extends EditorProps<string> {
  valueFormatter?: (value: string | null) => string;
}

interface NumberEditorProps extends EditorProps<number> {
  min?: number;
  max?: number;
  step?: number;
}

type TextEditorProps = EditorProps<string>;

// Editor Components
const TextEditor = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  onBlur,
}: TextEditorProps) => {
  return (
    <Input
      type="text"
      value={value as string}
      autoFocus={true}
      onChange={(e: { target: { value: string | null } }) =>
        onChange(e.target.value as string | null)
      }
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      placeholder={placeholder as string}
      className="h-8 text-sm"
    />
  );
};

const NumberEditor = ({
  value,
  onChange,
  onBlur,
  onKeyDown,
  min,
  max,
  step,
  placeholder,
}: NumberEditorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      [46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
      (e.keyCode >= 65 && e.keyCode <= 90 && e.ctrlKey === true) ||
      (e.keyCode >= 35 && e.keyCode <= 39) ||
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      (e.keyCode >= 96 && e.keyCode <= 105)
    ) {
      return;
    }
    e.preventDefault();
  };

  return (
    <Input
      ref={inputRef}
      type="number"
      inputMode="decimal"
      value={value !== null ? String(value) : ""}
      onChange={(e: { target: { value: string } }) => {
        const val = e.target.value;
        if (val === "" || /^\d*\.?\d*$/.test(val)) {
          const numVal = val === "" ? null : Number(val);
          onChange(numVal as number | null);
        }
      }}
      onBlur={onBlur}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        handleKeyDown(e);
        if (onKeyDown) onKeyDown(e);
      }}
      min={min as number}
      max={max as number}
      step={step as number}
      placeholder={placeholder as string}
      className="h-8 text-sm"
    />
  );
};

const SelectEditor = ({ value, onChange, options = [] }: SelectEditorProps) => {
  return (
    <div className="w-full">
      <Select
        value={value as string}
        onValueChange={onChange}
        defaultOpen={true}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent className="w-[160px]">
          <SelectGroup className="p-1">
            {options.length > 0 ? (
              options.map((opt: SelectOption) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className={cn(
                    "h-8 py-1 px-2 text-sm cursor-pointer",
                    "focus:bg-accent focus:text-accent-foreground"
                  )}
                >
                  {opt.label}
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-sm text-muted-foreground text-center">
                No options found
              </div>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const DateEditor = ({ value, onChange, hideTime = true }: DateEditorProps) => {
  const [date, setDate] = React.useState<Date>(
    value ? new Date(value as unknown as string) : new Date()
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onChange(selectedDate);
    }
  };

  const handleDayKeyDown = (
    value: Date,
    event: React.KeyboardEvent<Element>
  ) => {
    if (event.key === "Enter" || event.key === "Escape") {
      setDate(value);
      onChange(value);
    }
  };

  return (
    <div className="w-full">
      <DateTimePicker
        value={date}
        onChange={handleDateSelect}
        hideTime={hideTime}
        onDayKeyDown={(value, _params, event) => {
          handleDayKeyDown(value, event);
        }}
        timePicker={{ hour: true, minute: true, second: false }}
        renderTrigger={({ open, value, setOpen }) => (
          <DateTimeInput
            value={value}
            clearable
            hideCalendarIcon={false}
            onChange={(val: Date | undefined) => {
              if (val) setDate(val);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") {
                onChange(date);
              }
            }}
            onBlur={() => {
              onChange(date);
            }}
            format={hideTime ? "MM-dd-yyyy" : "MM-dd-yyyy HH:mm"}
            disabled={open}
            onCalendarClick={() => setOpen(!open)}
          />
        )}
      />
    </div>
  );
};

const TimeEditor = ({ value, onChange }: TimeEditorProps) => {
  const timeNow = new Date(value as string);
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

  const handleTimeChange = () => {};

  return (
    <SimpleTimePicker
      use12HourFormat={true}
      value={timeNow}
      onChange={handleTimeChange}
      onSubmit={(value) => {
        onChange(moment(value).format());
      }}
    />
  );
};

// CellEditor Wrapper
interface CellEditorProps {
  columnDef: {
    editorType: EditorType;
    editorParams?: EditorParamsType;
  };
  value: string | boolean | Date | number | null;
  onChange: (value: string | boolean | Date | number | null) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<Element>) => void;
  valueFormatter?: (params: {
    value: unknown;
    data: Record<string, unknown>;
    node?: unknown;
  }) => string;
}

interface EditorParamsType {
  placeholder?: string;
  label?: string;
  options?: SelectOption[];
  min?: number;
  max?: number;
  step?: number;
}

export type EditorType =
  | "text"
  | "number"
  | "select"
  | "date"
  | "time"
  | "dateTime";

type EditorValueType = {
  text: string;
  number: number;
  select: string;
  date: Date;
  time: string;
  dateTime: Date;
};

type EditorPropsMap = {
  [K in EditorType]: {
    value: EditorValueType[K] | null;
    onChange: (value: EditorValueType[K] | null) => void;
    onBlur?: () => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string;
    label?: string;
    options?: SelectOption[];
    min?: number;
    max?: number;
    step?: number;
    hideTime?: boolean;
    valueFormatter?: (value: string | boolean | Date | number | null) => string;
  };
};

type TypedEditorProps = EditorPropsMap[EditorType];

const CellEditor = ({
  columnDef,
  value,
  onChange,
  onBlur,
  onKeyDown,
  valueFormatter,
}: CellEditorProps) => {
  const { editorType, editorParams = {} } = columnDef;
  const typedParams = editorParams as EditorParamsType;

  const editors: Record<EditorType, React.ComponentType<TypedEditorProps>> = {
    text: TextEditor as React.ComponentType<TypedEditorProps>,
    number: NumberEditor as React.ComponentType<TypedEditorProps>,
    select: SelectEditor as React.ComponentType<TypedEditorProps>,
    date: DateEditor as React.ComponentType<TypedEditorProps>,
    time: TimeEditor as React.ComponentType<TypedEditorProps>,
    dateTime: DateEditor as React.ComponentType<TypedEditorProps>,
  };

  const Editor = editors[editorType as EditorType];

  const editorProps = {
    value,
    onChange,
    onKeyDown,
    placeholder: typedParams.placeholder,
    label: typedParams.label,
    options: typedParams.options,
    min: typedParams.min,
    max: typedParams.max,
    step: typedParams.step,
    valueFormatter: valueFormatter,
    onBlur: onBlur,
  } as TypedEditorProps;
  const additionalProps = editorType === "dateTime" ? { hideTime: false } : {};

  return Editor ? (
    <div
      className={`w-full ${
        editorType === "text" || editorType === "number" ? "px-2" : ""
      } h-full flex items-center justify-center`}
    >
      <Editor {...editorProps} {...additionalProps} />
    </div>
  ) : (
    <>{String(value || "")}</>
  );
};

export default CellEditor;
