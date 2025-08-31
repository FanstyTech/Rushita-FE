'use client';

import { forwardRef, useRef } from 'react';
import { Smartphone } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { PhoneCodeOption } from '@/lib/api/types/country';
import { Select } from '@/components/common/form';
import Image from 'next/image';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  phoneCodeOptions: PhoneCodeOption[];
  selectedPhoneCode: string;
  onPhoneCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  phoneCodeName: string;
  fullWidth?: boolean;
  phoneCodeError?: string;
  className?: string;
  showFlags?: boolean;
  required?: boolean;
  helperText?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      error,
      phoneCodeError,
      phoneCodeOptions,
      selectedPhoneCode,
      onPhoneCodeChange,
      onPhoneNumberChange,
      phoneCodeName,
      fullWidth = true,
      className,
      showFlags = true,
      required = false,
      helperText,
      ...props
    },
    ref
  ) => {
    const selectRef = useRef<HTMLDivElement>(null);

    const errorMessage = phoneCodeError || error;

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

        <div
          className={twMerge(
            // Base container styles
            'flex items-center rounded-xl overflow-hidden',
            // Border styles - matching Input component
            'border-2 border-gray-100 dark:border-gray-700',
            'hover:border-gray-200 dark:hover:border-gray-600',
            'focus-within:border-blue-500 dark:focus-within:border-blue-400',
            'focus-within:ring-2 focus-within:ring-blue-500/20 dark:focus-within:ring-blue-400/20',
            'transition-all duration-200',
            // Background colors
            'bg-white dark:bg-gray-800',
            // Error states
            errorMessage && [
              'border-red-500 dark:border-red-400',
              'focus-within:border-red-500 dark:focus-within:border-red-400',
              'focus-within:ring-red-500/20 dark:focus-within:ring-red-400/20',
            ],
            // Disabled state
            props.disabled &&
              'opacity-70 cursor-not-allowed bg-gray-100 dark:bg-gray-700',
            className
          )}
        >
          {/* Phone Code Dropdown */}
          <div className="relative min-w-[100px]" ref={selectRef}>
            <Select
              options={phoneCodeOptions.map((option) => ({
                value: option.value,
                label: (
                  <div className="flex items-center gap-2">
                    {showFlags && option.flag && (
                      <div className="w-6 h-4 overflow-hidden rounded-sm flex items-center justify-center shadow-sm">
                        <Image
                          src={`https://flagcdn.com/w20/${option.flag.toLocaleLowerCase()}.png`}
                          alt={option.label || ''}
                          className="max-w-full max-h-full object-cover"
                        />
                      </div>
                    )}
                    <span className="font-medium">{option.label}</span>
                  </div>
                ),
              }))}
              value={selectedPhoneCode}
              onChange={(e) => onPhoneCodeChange(e.target.value)}
              name={phoneCodeName}
              className="border-0 shadow-none focus:ring-0 bg-transparent font-medium py-3"
            />
          </div>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>

          {/* Phone Number Input */}
          <input
            type="tel"
            inputMode="numeric"
            ref={ref}
            {...props}
            className={twMerge(
              // Base styles
              'flex-1 px-3 py-3',
              // Text and placeholder colors - matching Input component
              'text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500',
              // Remove default styling
              'bg-transparent border-0 focus:ring-0 outline-none',
              // Disabled state
              props.disabled && 'cursor-not-allowed'
            )}
            placeholder={props.placeholder || 'XXX-XXX-XXXX'}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
          />

          <div className="px-4">
            <Smartphone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
        </div>

        {/* Error Message */}
        {(errorMessage || helperText) && (
          <p
            className={twMerge(
              'mt-1 text-xs',
              errorMessage
                ? 'text-red-500 dark:text-red-400'
                : 'text-gray-500 dark:text-gray-400'
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
