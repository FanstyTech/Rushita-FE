/**
 * Converts a filter object to URL parameters by removing undefined, null, and empty string values
 * @param filter The filter object to convert
 * @returns A record of string key-value pairs suitable for URL parameters
 */
export const convertFilterToParams = <T extends Record<string, any>>(
  filter: T
): Record<string, string> => {
  const params: Record<string, string> = {};
  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params[key] = String(value);
    }
  });
  return params;
};
