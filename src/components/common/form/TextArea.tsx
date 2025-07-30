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
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          {...props}
          className={twMerge(
            'block w-full px-4 py-3 rounded-xl',
            'border-2 border-gray-100 dark:border-gray-700',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-gray-100',
            'placeholder-gray-400 dark:placeholder-gray-500',
            'hover:border-gray-200 dark:hover:border-gray-600',
            'focus:outline-none focus:border-blue-500 dark:focus:border-blue-400',
            'focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20',
            error &&
              'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20 dark:focus:ring-red-400/20',
            props.disabled &&
              'opacity-70 cursor-not-allowed bg-gray-100 dark:bg-gray-700',
            className
          )}
        />
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

TextArea.displayName = 'TextArea';

export default TextArea;
