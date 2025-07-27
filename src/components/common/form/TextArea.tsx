'use client';

import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  hasBorder?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
          <label className="block text-xs font-medium text-foreground mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          {...props}
          className={twMerge(
            'block w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-foreground placeholder-gray-400 focus:outline-none focus:border-blue-500',
            hasBorder && 'border border-gray-300',
            error && 'border-red-500',
            'focus:outline-none focus-visible:outline-none focus-visible:ring-0',
            className
          )}
        />
        {(error || helperText) && (
          <p
            className={twMerge(
              'mt-1 text-xs',
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

TextArea.displayName = 'TextArea';

export default TextArea;
