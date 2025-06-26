import { DateTimePicker } from "@/components/datetime-picker";
import { SimpleTimePicker } from "@/components/simple-time-picker";
import { DateTimeInput } from "@/components/datetime-input";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ColumnDef } from "@/types/grid";
import { useEffect } from "react";
import React from "react";

// Export utility functions
export const IsDateType = (type?: string) => type === "date";
export const IsTimeType = (type?: string) => type === "time";
export const IsDateTimeType = (type?: string) =>
  type === "datetime" || type === "dateTime";

export const GetDefaultFilterType = (col: ColumnDef) => {
  if (col.type === "number") return "equals";
  if (col.type === "date") return "equals";
  if (col.type === "time") return "equals";
  if (col.type === "dateTime") return "equals";
  return "contains";
};

export const GetAvailableFilterTypes = (col: ColumnDef) => {
  if (col.type === "number") {
    return [
      { value: "equals", label: "Equals" },
      { value: "greaterThan", label: "Greater Than" },
      { value: "lessThan", label: "Less Than" },
    ];
  }
  if (IsDateType(col.type)) {
    return [
      { value: "equals", label: "Equals" },
      { value: "before", label: "Before" },
      { value: "after", label: "After" },
    ];
  }
  if (IsTimeType(col.type)) {
    return [
      { value: "equals", label: "Equals" },
      { value: "before", label: "Before" },
      { value: "after", label: "After" },
    ];
  }
  if (IsDateTimeType(col.type)) {
    return [
      { value: "equals", label: "Equals" },
      { value: "before", label: "Before" },
      { value: "after", label: "After" },
    ];
  }
  return [
    { value: "contains", label: "Contains" },
    { value: "equals", label: "Equals" },
    { value: "startsWith", label: "Starts with" },
    { value: "endsWith", label: "Ends with" },
  ];
};

interface CellFilterProps {
  column: ColumnDef;
  value: string;
  filterType: string;
  onFilterChange: (value: string) => void;
  onFilterTypeChange: (type: string) => void;
  onClear: () => void;
}

export const CellFilter = ({
  column,
  value,
  filterType,
  onFilterChange,
  onFilterTypeChange,
  onClear,
}: CellFilterProps) => {
  const availableFilterTypes = GetAvailableFilterTypes(column);
  const defaultFilterType = GetDefaultFilterType(column);

  // Initialize filter type if not set
  useEffect(() => {
    if (!filterType) {
      onFilterTypeChange(defaultFilterType);
    }
  }, [filterType, defaultFilterType, onFilterTypeChange]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          Filter: {column.headerName}
        </span>
        {value && (
          <button
            onClick={onClear}
            className="hover:text-gray-900 p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      <Select
        value={filterType || defaultFilterType}
        onValueChange={onFilterTypeChange}
      >
        <SelectTrigger className="w-full text-sm">
          {
            availableFilterTypes.find(
              (type) => type.value === (filterType || defaultFilterType)
            )?.label
          }
        </SelectTrigger>
        <SelectContent className="w-full max-h-[200px]">
          {availableFilterTypes.map((type) => (
            <SelectItem
              key={type.value}
              value={type.value}
              className="h-8 py-1 px-2 text-sm cursor-pointer"
            >
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <label className="text-xs font-medium text-gray-500">
        {IsDateType(column.type)
          ? "Date"
          : IsTimeType(column.type)
            ? "Time"
            : IsDateTimeType(column.type)
              ? "DateTime"
              : "Search"}
      </label>

      {IsDateType(column.type) ? (
        <DateTimePicker
          value={value ? new Date(value) : undefined}
          onChange={(val) => {
            onFilterChange(val ? val.toISOString() : "");
          }}
          hideTime={true}
          renderTrigger={({ open, value, setOpen }) => (
            <DateTimeInput
              value={value}
              onChange={(val) => {
                onFilterChange(val ? val.toISOString() : "");
              }}
              format="MM-dd-yyyy"
              disabled={open}
              onCalendarClick={() => setOpen(!open)}
            />
          )}
        />
      ) : IsTimeType(column.type) ? (
        <SimpleTimePicker
          value={value ? new Date(value) : new Date()}
          onChange={(val) => {
            onFilterChange(val ? val.toISOString() : "");
          }}
          use12HourFormat={true}
        />
      ) : IsDateTimeType(column.type) ? (
        <DateTimePicker
          value={value ? new Date(value) : undefined}
          onChange={(val) => {
            onFilterChange(val ? val.toISOString() : "");
          }}
          timePicker={{ hour: true, minute: true, second: false }}
          renderTrigger={({ open, value, setOpen }) => (
            <DateTimeInput
              value={value}
              onChange={(val) => {
                onFilterChange(val ? val.toISOString() : "");
              }}
              format="MM-dd-yyyy hh:mm"
              disabled={open}
              onCalendarClick={() => setOpen(!open)}
            />
          )}
        />
      ) : (
        <div className="relative w-full">
          <Input
            placeholder={`Filter ${column.headerName}`}
            value={value || ""}
            onChange={(e: { target: { value: string } }) =>
              onFilterChange(e.target.value)
            }
            type="text"
            className="h-9 text-sm w-full pl-9 pr-3"
            style={{
              height: "2.25rem",
              fontSize: "0.875rem",
              width: "100%",
              paddingLeft: "1.5rem",
              paddingRight: "0.75rem",
            }}
          />
          <div
            style={{
              left: 5,
              position: "absolute",
              top: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      )}
    </div>
  );
};
