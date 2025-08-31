'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { OtpInput } from './OtpInput';
import VerificationCodeSVG from './VerificationCodeSVG';
import { CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface VerificationFormProps {
  phoneNumber: string;
  phoneCodeLabel: string;
  onSubmit: (otp: string) => void;
  onResendCode: () => Promise<void>;
  isInvalidCode: boolean;
  isLoading: boolean;
}

export function VerificationForm({
  phoneNumber,
  phoneCodeLabel,
  onSubmit,
  onResendCode,
  isInvalidCode,
  isLoading,
}: VerificationFormProps) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!otp || otp.length !== 6) {
      setError('يرجى إدخال رمز التحقق المكون من 6 أرقام');
      return;
    }

    setError(null);

    await onSubmit(otp);
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    try {
      await onResendCode();
      setCountdown(60);
      setError(null);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <form onSubmit={handleVerificationSubmit}>
      <CardContent className="space-y-6 flex flex-col items-center">
        <VerificationCodeSVG isInvalid={isInvalidCode} />
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-4" dir="rtl">
            <p className="text-sm text-muted-foreground">
              تم إرسال رمز التحقق إلى{' '}
              <span className="font-medium text-foreground" dir="ltr">
                {phoneCodeLabel} {phoneNumber}
              </span>
            </p>
          </div>

          <OtpInput
            value={otp}
            onChange={(value) => {
              setOtp(value);
              setError(null);
            }}
            error={error}
          />

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={countdown > 0 || isResending}
              className={`text-sm ${
                countdown > 0 || isResending
                  ? 'text-muted-foreground cursor-not-allowed'
                  : 'text-primary hover:underline'
              }`}
            >
              {countdown > 0
                ? `إعادة إرسال الرمز (${countdown})`
                : isResending
                ? 'جاري إعادة الإرسال...'
                : 'إعادة إرسال الرمز'}
            </button>
          </div>
        </motion.div>
      </CardContent>

      <CardFooter>
        <motion.div
          className="w-full mt-3"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            className="w-full relative overflow-hidden group h-12"
            disabled={isLoading || otp.length !== 6}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
              animate={isLoading ? { opacity: 0.2 } : { opacity: 0 }}
            />
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <motion.span
                  className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <span>جاري التحقق...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>تحقق</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </motion.div>
              </div>
            )}
          </Button>
        </motion.div>
      </CardFooter>
    </form>
  );
}
