'use client';

import { forwardRef, useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { SelectOption } from '@/lib/api/types/select-option';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  phoneCodeOptions: SelectOption<string>[];
  selectedPhoneCode: string;
  onPhoneCodeChange: (value: string) => void;
  phoneCodeName: string;
  fullWidth?: boolean;
  phoneCodeError?: string;
  className?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label = 'Phone Number',
      error,
      phoneCodeError,
      phoneCodeOptions,
      selectedPhoneCode,
      onPhoneCodeChange,
      phoneCodeName,
      fullWidth = true,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedOption = phoneCodeOptions.find(
      (opt) => opt.value === selectedPhoneCode
    );

    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div className={twMerge('relative', fullWidth && 'w-full', className)}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative flex h-[52px]">
          {/* Phone Code Dropdown */}
          <div className="relative h-full" ref={selectRef}>
            <button
              type="button"
              className={twMerge(
                'flex items-center justify-between h-full px-4 rounded-l-xl border-2 border-gray-100 text-gray-900',
                'border border-gray-300 focus:outline-none focus-visible:ring-0'
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">
                  {selectedOption?.label || 'Select'}
                </span>
                <span className="text-xs text-gray-500 leading-3">
                  {selectedOption?.value}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="absolute z-10 w-64 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {phoneCodeOptions.map((option) => (
                  <div
                    key={option.value}
                    className={twMerge(
                      'px-3 py-2 text-sm cursor-pointer hover:bg-gray-100',
                      option.value === selectedPhoneCode &&
                        'bg-blue-50 text-blue-600 font-medium'
                    )}
                    onClick={() => {
                      onPhoneCodeChange(option.value);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex justify-between">
                      <span>{option.label}</span>
                      <span className="text-xs text-gray-400">
                        {option.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Hidden input for react-hook-form */}
            <input
              type="hidden"
              name={phoneCodeName}
              value={selectedPhoneCode}
            />
          </div>

          {/* Phone Number Input */}
          <div className="flex-1 h-full">
            <input
              type="tel"
              ref={ref}
              {...props}
              className={twMerge(
                'block w-full h-full px-4 rounded-r-xl border-2 border-gray-100 text-gray-900 placeholder-gray-400',
                'border border-gray-300 focus:outline-none focus-visible:ring-0',
                error && 'border-red-500'
              )}
              placeholder="576 908 413"
            />
          </div>
        </div>

        {/* Error Message */}
        {(phoneCodeError || error) && (
          <p className="mt-1 text-sm text-red-500">{phoneCodeError || error}</p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
