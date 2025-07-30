'use client';

import { forwardRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  validation?: z.ZodString;
  hasBorder?: boolean;
  required?: boolean;
  onValidation?: (isValid: boolean, error?: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      fullWidth = true,
      startIcon,
      endIcon,
      validation,
      hasBorder = true,
      required = false,
      onValidation,
      onChange,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (validation && props.value) {
        const result = validation.safeParse(props.value);
        onValidation?.(
          result.success,
          result.success ? undefined : result.error.errors[0].message
        );
      }
    }, [validation, props.value, onValidation]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      if (validation) {
        const result = validation.safeParse(e.target.value);
        onValidation?.(
          result.success,
          result.success ? undefined : result.error.errors[0].message
        );
      }
    };

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            {label}
            {required && (
              <span className="text-red-500 dark:text-red-400 ml-1">*</span>
            )}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              {startIcon}
            </div>
          )}
          <input
            {...props}
            ref={ref}
            onChange={handleChange}
            className={twMerge(
              // Base styles
              'block w-full px-4 py-3 rounded-xl transition-all duration-200',
              // Text and placeholder colors
              'text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500',
              // Background colors
              'bg-white dark:bg-gray-800',
              // Border styles
              hasBorder && [
                'border-2 border-gray-100 dark:border-gray-700',
                'hover:border-gray-200 dark:hover:border-gray-600',
                'focus:border-blue-500 dark:focus:border-blue-400',
                'focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20',
              ],
              // Icon spacing
              startIcon && 'pl-10',
              endIcon && 'pr-10',
              // Error states
              error && [
                'border-red-500 dark:border-red-400',
                'focus:border-red-500 dark:focus:border-red-400',
                'focus:ring-red-500/20 dark:focus:ring-red-400/20',
              ],
              // Disabled state
              props.disabled &&
                'opacity-70 cursor-not-allowed bg-gray-100 dark:bg-gray-700',
              // Custom classes
              className
            )}
          />
          {endIcon && (
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              {endIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p
            className={twMerge(
              'mt-1 text-xs',
              error
                ? 'text-red-500 dark:text-red-400'
                : 'text-gray-500 dark:text-gray-400'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
