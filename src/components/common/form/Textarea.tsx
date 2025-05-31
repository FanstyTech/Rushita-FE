'use client';

import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  hasBorder?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      fullWidth = true,
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
        <textarea
          ref={ref}
          {...props}
          className={twMerge(
            'w-full px-4 py-2.5 rounded-lg text-gray-900',
            hasBorder && 'border border-gray-300',
            error && 'border-red-500',
            'focus:outline-none focus-visible:outline-none focus-visible:ring-0',
            className
          )}
        />
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

Textarea.displayName = 'Textarea';

export default Textarea;
