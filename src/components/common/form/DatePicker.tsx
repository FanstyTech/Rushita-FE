import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  helperTextClassName?: string;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      label,
      error,
      helperText,
      containerClassName,
      labelClassName,
      inputClassName,
      errorClassName,
      helperTextClassName,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={twMerge('space-y-1', containerClassName)}>
        {label && (
          <label
            htmlFor={props.id}
            className={twMerge(
              'block text-sm font-medium text-gray-700',
              error && 'text-red-600',
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            {...props}
            ref={ref}
            type="date"
            className={twMerge(
              'block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none',
              error &&
                'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500',
              inputClassName,
              className
            )}
          />
        </div>
        {error && (
          <p className={twMerge('text-sm text-red-600', errorClassName)}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className={twMerge('text-sm text-gray-500', helperTextClassName)}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
