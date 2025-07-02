import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { debounce } from "lodash";

/**
 * Combines multiple class names and merges Tailwind CSS classes
 * @param inputs - Class names to combine
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced version of the function
 */
export const createDebouncedFunction = <T extends (...args: any[]) => any>(
  func: T,
  wait = 300
) => {
  return debounce(func, wait);
};

/**
 * Formats a date to a string
 * @param date The date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};

/**
 * Checks if a value is empty (null, undefined, empty string, or empty array)
 * @param value The value to check
 * @returns True if the value is empty
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
};
