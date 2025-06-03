/**
 * Converts a filter object to URL parameters by removing undefined, null, and empty string values
 * @param filter The filter object to convert
 * @returns A record of string key-value pairs suitable for URL parameters
 */
export type FilterValue = string | number | boolean | undefined;

export interface FilterParams {
  [key: string]: FilterValue;
  pageNumber?: number;
  pageSize?: number;
  sortColumn?: string;
  sortDirection?: string;
  searchValue?: string;
}

export function convertFilterToParams(
  filter: FilterParams | Record<string, FilterValue>
): Record<string, string> {
  const result: Record<string, string> = {};

  // Only copy defined values to the result object and convert them to strings
  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined) {
      result[key] = String(value);
    }
  });

  return result;
}
