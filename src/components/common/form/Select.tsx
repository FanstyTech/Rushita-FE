'use client';

import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

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
      ...props
    },
    ref
  ) => {
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            {...props}
            className={twMerge(
              'w-full px-4 py-2.5 rounded-lg text-gray-900 appearance-none',
              hasBorder && 'border border-gray-300',
              error && 'border-red-500',
              'focus:outline-none focus-visible:outline-none focus-visible:ring-0',
              className
            )}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          </div>
        </div>
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
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
