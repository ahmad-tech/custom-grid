import { type ClassValue } from "clsx";
/**
 * Combines multiple class names and merges Tailwind CSS classes
 * @param inputs - Class names to combine
 * @returns Merged class string
 */
export declare function cn(...inputs: ClassValue[]): string;
/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced version of the function
 */
export declare const createDebouncedFunction: <T extends (...args: any[]) => any>(func: T, wait?: number) => import("lodash").DebouncedFunc<T>;
/**
 * Formats a date to a string
 * @param date The date to format
 * @returns Formatted date string
 */
export declare const formatDate: (date: Date) => string;
/**
 * Checks if a value is empty (null, undefined, empty string, or empty array)
 * @param value The value to check
 * @returns True if the value is empty
 */
export declare const isEmpty: (value: any) => boolean;
//# sourceMappingURL=utils.d.ts.map