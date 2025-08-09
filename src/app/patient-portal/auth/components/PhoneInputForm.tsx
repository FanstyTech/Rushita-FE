'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { PhoneInput } from '@/components/common';

interface PhoneInputFormProps {
  onSubmit: (phoneCode: string, phoneNumber: string) => Promise<void>;
  phoneCodes: Array<{ value: string; label: string; flag: string }>;
  isLoading: boolean;
}

export function PhoneInputForm({
  onSubmit,
  phoneCodes,
  isLoading,
}: PhoneInputFormProps) {
  const [phoneForm, setPhoneForm] = useState({
    phoneCode: '',
    phoneNumber: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!phoneForm.phoneNumber || phoneForm.phoneNumber.length < 9) {
      setError('يرجى إدخال رقم هاتف صحيح');
      return;
    }

    setError(null);

    try {
      await onSubmit(phoneForm.phoneCode, phoneForm.phoneNumber);
    } catch (error) {
      setError('حدث خطأ أثناء التحقق من رقم الهاتف');
    }
  };

  return (
    <form onSubmit={handlePhoneSubmit}>
      <CardContent className="space-y-6">
        <motion.div
          className="space-y-6 w-full max-w-md text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mx-auto w-40 h-40">
            {/* Gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-3xl shadow-lg"
              initial={{
                opacity: 0,
                scale: 0.8,
                borderRadius: '30%',
              }}
              animate={{ opacity: 1, scale: 1, borderRadius: '24px' }}
              transition={{ duration: 0.6 }}
            />

            {/* Decorative elements */}
            <motion.div
              className="absolute top-3 left-3 w-3 h-3 rounded-full bg-white/40"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
            <motion.div
              className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-white/30"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />

            {/* Modern phone icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Phone body - more modern smartphone design */}
                <motion.rect
                  x="5"
                  y="2"
                  width="14"
                  height="20"
                  rx="3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

                {/* Screen */}
                <motion.rect
                  x="6.5"
                  y="3.5"
                  width="11"
                  height="17"
                  rx="2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  fill="currentColor"
                />

                {/* Camera notch */}
                <motion.rect
                  x="10"
                  y="3"
                  width="4"
                  height="1"
                  rx="0.5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  fill="currentColor"
                />

                {/* App icons - simplified representation */}
                <motion.circle
                  cx="9"
                  cy="8"
                  r="1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                  fill="currentColor"
                  fillOpacity="0.8"
                />
                <motion.circle
                  cx="15"
                  cy="8"
                  r="1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                  fill="currentColor"
                  fillOpacity="0.8"
                />
                <motion.circle
                  cx="9"
                  cy="12"
                  r="1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.3 }}
                  fill="currentColor"
                  fillOpacity="0.8"
                />
                <motion.circle
                  cx="15"
                  cy="12"
                  r="1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.0, duration: 0.3 }}
                  fill="currentColor"
                  fillOpacity="0.8"
                />
              </svg>
            </motion.div>

            {/* Animated pulse effect - enhanced for light mode */}
            <motion.div
              className="absolute -inset-3 rounded-3xl border-2 border-white/50 shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0.9, 1.1, 1.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />

            {/* Additional inner glow for better visibility in light mode */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-white/20 blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          </div>

          <motion.h2
            className="text-xl font-medium text-gray-800 dark:text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            أدخل رقم هاتفك
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <PhoneInput
            label="Phone Number"
            phoneCodeOptions={phoneCodes}
            selectedPhoneCode="+966"
            onPhoneCodeChange={(e) => {
              console.log(e);
              setPhoneForm({ ...phoneForm, phoneCode: e });
            }}
            onPhoneNumberChange={(e) => {
              console.log(e);
              setPhoneForm({ ...phoneForm, phoneNumber: e });
            }}
            phoneCodeName="phoneCode"
            required={true}
            darkMode={false}
            placeholder="XXX-XXX-XXXX"
          />
        </motion.div>

        {error && (
          <motion.p
            className="text-destructive text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
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
            disabled={isLoading}
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
                <span>متابعة</span>
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
