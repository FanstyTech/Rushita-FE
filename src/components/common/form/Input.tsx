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
  hasShadow?: boolean;
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
      hasShadow = true,
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              {startIcon}
            </div>
          )}
          <input
            {...props}
            ref={ref}
            onChange={handleChange}
            className={twMerge(
              'block w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-400',
              hasBorder && 'border-2 border-gray-100 focus:border-blue-500',
              startIcon && 'pl-10',
              endIcon && 'pr-10',
              error && 'border-red-500',
              'focus:outline-none focus-visible:outline-none focus-visible:ring-0',
              className
            )}
          />
          {endIcon && (
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              {endIcon}
            </div>
          )}
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

Input.displayName = 'Input';

export default Input;
