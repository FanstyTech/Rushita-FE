'use client';

import { forwardRef, useState, useEffect, useRef } from 'react';
import { AlertCircle, Smartphone } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { SelectOption } from '@/lib/api/types/select-option';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Select } from '@/components/common/form';

// Extend SelectOption to include flag property
interface PhoneCodeOption extends SelectOption<string> {
  flag?: string;
}

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
  darkMode?: boolean;
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
      onPhoneNumberChange,
      phoneCodeName,
      fullWidth = true,
      className,
      showFlags = true,
      required = false,
      darkMode = false,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedOption = phoneCodeOptions.find(
      (opt) => opt.value === selectedPhoneCode
    ) as PhoneCodeOption | undefined;

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

    const errorMessage = phoneCodeError || error;

    return (
      <motion.div
        className={twMerge('space-y-3', fullWidth && 'w-full', className)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label && (
          <div className="flex items-center justify-between">
            <Label
              htmlFor={props.id || 'phoneNumber'}
              className="text-gray-700 dark:text-gray-300 font-medium"
            >
              {label} {required && <span className="text-destructive">*</span>}
            </Label>
          </div>
        )}

        <div
          className={`flex items-center bg-white ${
            darkMode ? 'dark:bg-gray-800' : ''
          } rounded-xl overflow-hidden border-2 shadow-sm ${
            errorMessage
              ? 'border-destructive shadow-destructive/10'
              : 'border-gray-200 dark:border-gray-700'
          } focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600`}
        >
          {/* Phone Code Dropdown */}
          <div className="relative min-w-[100px] border-left" ref={selectRef}>
            <Select
              options={phoneCodeOptions.map((option) => ({
                value: option.value,
                label: (
                  <div className="flex items-center gap-2">
                    {showFlags && option.flag && (
                      <div className="w-6 h-4 overflow-hidden rounded-sm flex items-center justify-center shadow-sm">
                        <img
                          src={`https://flagcdn.com/w20/${option.flag}.png`}
                          alt={option.label || ''}
                          className="max-w-full max-h-full object-cover"
                        />
                      </div>
                    )}
                    <span className="font-medium">{option.value}</span>
                  </div>
                ),
              }))}
              value={selectedPhoneCode}
              onChange={(e) => onPhoneCodeChange(e.target.value)}
              name={phoneCodeName}
              className="border-0 shadow-none focus:ring-0 bg-transparent font-medium"
            />
          </div>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>

          {/* Phone Number Input */}
          <input
            type="tel"
            inputMode="numeric"
            ref={ref}
            {...props}
            className="flex-1 bg-transparent border-0 focus:ring-0 outline-none py-4 px-3 text-lg font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500"
            placeholder={props.placeholder || 'XXX-XXX-XXXX'}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
          />

          <div className="px-4">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className={`${
                errorMessage
                  ? 'text-destructive'
                  : 'text-gray-400 dark:text-gray-500'
              } transition-colors`}
            >
              <Smartphone className="h-5 w-5" />
            </motion.div>
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <motion.div
            className="flex items-center gap-2 text-destructive text-sm mt-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AlertCircle className="h-4 w-4" />
            <p>{errorMessage}</p>
          </motion.div>
        )}
      </motion.div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
