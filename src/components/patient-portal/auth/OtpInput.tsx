'use client';

import { useRef, useState, useEffect } from 'react';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

export function OtpInput({ value, onChange, error }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(value.split('').slice(0, 6));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Initialize refs array
    inputRefs.current = inputRefs.current.slice(0, 6);

    // Focus first input on mount if empty
    if (!value && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [value]);

  useEffect(() => {
    // Update parent component when OTP changes
    onChange(otp.join(''));
  }, [otp, onChange]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');

    if (newValue.length > 1) {
      // Handle paste event
      const pastedValue = newValue.split('').slice(0, 6);
      const newOtp = [...otp];

      pastedValue.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });

      setOtp(newOtp);

      // Focus on the next empty input or the last input
      const nextIndex = Math.min(index + pastedValue.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else if (newValue.length === 1) {
      // Handle single digit input
      const newOtp = [...otp];
      newOtp[index] = newValue;
      setOtp(newOtp);

      // Focus next input
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      // Handle deletion
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Move to previous input on left arrow
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      // Move to next input on right arrow
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-center gap-2 md:gap-4 dir-ltr">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[index] || ''}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`w-10 h-12 md:w-12 md:h-14 text-center text-lg font-semibold rounded-md border focus:outline-none focus:ring-2 ${
              error
                ? 'border-destructive focus:ring-destructive/20'
                : 'border-input focus:border-primary focus:ring-primary/20'
            }`}
          />
        ))}
      </div>

      {error && <p className="text-destructive text-xs text-center">{error}</p>}
    </div>
  );
}
