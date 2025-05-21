/**
 * Collection of text utility functions for common text operations
 */

/**
 * Generates initials from a name string.
 * Takes the first letter of each word and joins them.
 * @param name - The full name to generate initials from
 * @param maxLength - Maximum number of initials to return (default: 2)
 * @returns Uppercase initials string
 * @example
 * getInitials("Medical Center") // returns "MC"
 * getInitials("City Hospital Care", 3) // returns "CHC"
 */
export const getInitials = (name: string, maxLength: number = 2): string => {
  if (!name) return '';

  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, maxLength);
};

/**
 * Truncates text to a specified length and adds ellipsis if needed.
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @param suffix - String to append to truncated text (default: "...")
 * @returns Truncated text with suffix if needed
 * @example
 * truncateText("Long description text", 10) // returns "Long descr..."
 */
export const truncateText = (
  text: string,
  maxLength: number,
  suffix: string = '...'
): string => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}${suffix}`;
};

/**
 * Capitalizes the first letter of each word in a string.
 * @param text - The text to capitalize
 * @returns Text with first letter of each word capitalized
 * @example
 * toTitleCase("hello world") // returns "Hello World"
 */
export const toTitleCase = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Formats a number as currency.
 * @param amount - The amount to format
 * @param currency - Currency code (default: "USD")
 * @param locale - Locale for formatting (default: "en-US")
 * @returns Formatted currency string
 * @example
 * formatCurrency(1234.56) // returns "$1,234.56"
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Removes special characters and spaces from a string, useful for slugs/URLs.
 * @param text - The text to slugify
 * @returns URL-friendly slug
 * @example
 * slugify("Hello World!") // returns "hello-world"
 */
export const slugify = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Extracts the first paragraph from a longer text.
 * @param text - The text to extract from
 * @param maxLength - Optional maximum length for the excerpt
 * @returns First paragraph or truncated text
 * @example
 * getExcerpt("First paragraph.\n\nSecond paragraph.") // returns "First paragraph."
 */
export const getExcerpt = (text: string, maxLength?: number): string => {
  if (!text) return '';
  const firstParagraph = text.split(/\n\s*\n/)[0].trim();
  return maxLength ? truncateText(firstParagraph, maxLength) : firstParagraph;
};

/**
 * Formats a phone number into a readable format.
 * @param phone - The phone number to format
 * @param format - Format pattern (default: "(XXX) XXX-XXXX")
 * @returns Formatted phone number
 * @example
 * formatPhoneNumber("1234567890") // returns "(123) 456-7890"
 */
export const formatPhoneNumber = (
  phone: string,
  format: string = '(XXX) XXX-XXXX'
): string => {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  let result = format;
  for (let i = 0; i < digits.length && i < format.length; i++) {
    result = result.replace('X', digits[i]);
  }
  return result.includes('X') ? digits : result;
};
