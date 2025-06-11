import { UseFormRegister } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react';

interface PhoneInputProps {
  phoneCodeLabel?: string;
  phoneNumberLabel?: string;
  phoneCodeError?: string;
  phoneNumberError?: string;
  phoneCodeOptions: { value: string; label: string; flag?: string }[];
  selectedPhoneCode: string;
  onPhoneCodeChange: (value: string) => void;
  register: UseFormRegister<any>;
  phoneCodeName: string;
  phoneNumberName: string;
  className?: string;
}

const PhoneInput = ({
  phoneNumberLabel = 'Phone Number',
  phoneCodeError,
  phoneNumberError,
  phoneCodeOptions,
  selectedPhoneCode,
  onPhoneCodeChange,
  register,
  phoneCodeName,
  phoneNumberName,
  className,
}: PhoneInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className || ''}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {phoneNumberLabel}
      </label>
      <div className="relative flex h-[52px]">
        <div className="relative h-full" ref={selectRef}>
          <button
            type="button"
            className={twMerge(
              'flex items-center justify-between h-full px-4 rounded-l-xl border-2 border-gray-100 text-gray-900',
              'border border-gray-300',
              'focus:outline-none focus-visible:outline-none focus-visible:ring-0',
              className
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center">
              {selectedOption?.flag && (
                <img
                  src={selectedOption.flag}
                  alt={selectedOption.label}
                  className="w-5 h-4 object-cover rounded-sm mr-2"
                />
              )}
              <span className="text-sm font-medium">
                {selectedOption?.label || '+'}
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
                  className={`
                    flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100
                    ${
                      option.value === selectedPhoneCode
                        ? 'bg-blue-50 text-blue-600'
                        : ''
                    }
                  `}
                  onClick={() => {
                    onPhoneCodeChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.flag && (
                    <img
                      src={option.flag}
                      alt={option.label}
                      className="w-5 h-4 object-cover rounded-sm mr-3"
                    />
                  )}
                  <span className="text-gray-500">{option.label}</span>
                </div>
              ))}
            </div>
          )}

          <input
            type="hidden"
            {...register(phoneCodeName)}
            defaultValue={selectedPhoneCode}
          />
        </div>

        <div className="flex-1 h-full">
          <input
            type="tel"
            {...register(phoneNumberName)}
            className={twMerge(
              'block w-full h-full px-4 rounded-r-xl border-2 border-gray-100 text-gray-900 placeholder-gray-400',
              'border border-gray-300',
              'focus:outline-none focus-visible:outline-none focus-visible:ring-0',
              className
            )}
            placeholder="576 908 413"
          />
        </div>
      </div>

      {(phoneCodeError || phoneNumberError) && (
        <span className="absolute text-xs text-red-500 mt-1">
          {phoneCodeError || phoneNumberError}
        </span>
      )}
    </div>
  );
};

export default PhoneInput;
