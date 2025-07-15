'use client';

import { forwardRef, useState, useEffect } from 'react';
import { useIsClient } from '@/hooks/useIsClient';
import { Check, ChevronsUpDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: Option[];
  hasBorder?: boolean;
  placeholder?: string;
  isLoading?: boolean;
  onSearch?: (query: string) => void;
  noOptionsMessage?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      fullWidth = true,
      options,
      hasBorder = true,
      value,
      onChange,
      placeholder,
      disabled,
      name,
      isLoading = false,
      onSearch,
      noOptionsMessage = 'No options found',
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    // Check if we're on the client side
    const isClient = useIsClient();
    // Initialize with undefined to avoid hydration mismatch
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | undefined>(
      undefined
    );
    const [searchQuery, setSearchQuery] = useState('');

    // Set the initial value only on the client side to avoid hydration mismatch
    useEffect(() => {
      setSelectedValue(value as string | undefined);
    }, []);

    // Update internal state when value prop changes
    useEffect(() => {
      setSelectedValue(value as string | undefined);
    }, [value]);

    // We'll handle search directly in the CommandInput's onValueChange prop

    const handleSelect = (currentValue: string) => {
      setOpen(false);
      setSelectedValue(currentValue);
      setSearchQuery('');

      if (onChange) {
        // Create a synthetic event to mimic a native select onChange event
        const syntheticEvent = {
          target: {
            name,
            value: currentValue,
          },
          type: 'change',
        } as React.ChangeEvent<HTMLSelectElement>;

        onChange(syntheticEvent);
      }
    };

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button" // Important to prevent form submission
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={disabled}
              className={twMerge(
                'w-full justify-between px-4 py-3.5 h-[50px] rounded-xl border-2 border-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500',
                hasBorder && 'border border-gray-300',
                error && 'border-red-500',
                'focus:outline-none focus-visible:outline-none focus-visible:ring-0',
                'hover:bg-transparent hover:text-current',
                startIcon && 'pl-10',
                className
              )}
            >
              {startIcon && (
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  {startIcon}
                </div>
              )}
              <span className="flex-grow text-left truncate">
                {selectedValue
                  ? options.find((item) => item.value === selectedValue)?.label
                  : placeholder || `Select ${label || ''}...`}
              </span>
              {endIcon ? (
                endIcon
              ) : (
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              )}
            </Button>
          </PopoverTrigger>
          {isClient && (
            <PopoverContent
              className="p-0"
              style={{
                width: 'var(--radix-popover-trigger-width)',
                minWidth: '100%',
              }}
            >
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder={`Search ${label || ''}...`}
                  className="h-9"
                  value={searchQuery}
                  onValueChange={(value) => {
                    setSearchQuery(value);
                    if (onSearch) onSearch(value);
                  }}
                />
                <CommandList>
                  {isLoading ? (
                    <div className="py-6 text-center">
                      <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                      <p className="mt-2 text-sm text-gray-500">Loading...</p>
                    </div>
                  ) : options.length === 0 ? (
                    <CommandEmpty>{noOptionsMessage}</CommandEmpty>
                  ) : (
                    <CommandGroup>
                      {options.map((option) => {
                        return (
                          <CommandItem
                            key={option.value}
                            value={option.value}
                            onSelect={handleSelect}
                          >
                            {option.label}
                            <Check
                              className={twMerge(
                                'ml-auto h-4 w-4',
                                selectedValue === option.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          )}
        </Popover>
        {(error || helperText) && (
          <p
            className={twMerge(
              'mt-1 text-sm',
              error ? 'text-red-500' : 'text-gray-500'
            )}
          >
            {error || helperText}
          </p>
        )}

        {/* Hidden select element for form compatibility */}
        <select
          ref={ref}
          className="sr-only"
          value={selectedValue}
          disabled={disabled}
          name={name}
          onChange={onChange}
          {...props}
        >
          <option value="" disabled>
            {placeholder || `Select ${label || ''}...`}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
