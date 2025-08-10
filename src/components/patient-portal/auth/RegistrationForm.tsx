'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Calendar, Eye, EyeOff, Lock, Shield, UserPlus } from 'lucide-react';
import { Input } from '@/components/common/form';
import { Button } from '@/components/ui/button';
import { GenderSelector } from './GenderSelector';
import { CardContent, CardFooter } from '@/components/ui/card';
import { useOtp } from '@/lib/api/hooks/useOtp';
import { Gender } from '@/lib/api/types/otp';
import { useLanguage } from '@/i18n/LanguageProvider';

// Zod schema for registration form validation
export const registrationSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: 'الاسم الأول يجب أن يكون حرفين على الأقل' })
      .min(2, { message: 'الاسم الأول مطلوب' }),
    lastName: z
      .string()
      .min(2, { message: 'الاسم الأخير يجب أن يكون حرفين على الأقل' })
      .min(2, { message: 'الاسم الأخير مطلوب' }),
    gender: z.string().min(1, { message: 'الجنس مطلوب' }),
    dateOfBirth: z.string().min(1, { message: 'تاريخ الميلاد مطلوب' }),
    email: z
      .string()
      .email({ message: 'يرجى إدخال بريد إلكتروني صحيح' })
      .min(1, { message: 'البريد الإلكتروني مطلوب' }),
    password: z
      .string()
      .min(8, { message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' }),
    confirmPassword: z.string().min(1, { message: 'تأكيد كلمة المرور مطلوب' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمات المرور غير متطابقة',
    path: ['confirmPassword'],
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  phoneNumber: string;
  phoneCode: string;
  countryCodeId: string;
}

export function RegistrationForm({
  phoneNumber,
  phoneCode,
  countryCodeId,
}: RegistrationFormProps) {
  const router = useRouter();
  const { completeRegistration } = useOtp();
  const { language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: registerForm,
    handleSubmit,
    watch,
    setValue,
    formState: { errors: formErrors },
    reset: resetRegistrationForm,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Handle registration form submission with React Hook Form
  const onRegistrationSubmit = handleSubmit(
    async (data: RegistrationFormData) => {
      // Get the stored OTP code from localStorage
      const storedOtpCode = localStorage.getItem('currentOtpCode');
      if (!storedOtpCode) {
        throw new Error(
          'OTP code not found. Please verify your phone number again.'
        );
      }

      // Map gender string to Gender enum
      const getGenderEnum = (gender: string): Gender => {
        switch (gender.toLowerCase()) {
          case 'male':
          case 'ذكر':
            return Gender.Male;
          case 'female':
          case 'أنثى':
            return Gender.Female;
          default:
            return Gender.Other;
        }
      };

      // Call the completeRegistration API
      await completeRegistration.mutateAsync({
        countryCodeId: countryCodeId,
        phoneNumber: phoneNumber,
        otpCode: storedOtpCode,
        fNameL: data.firstName,
        lNameL: data.lastName,
        dateOfBirth: data.dateOfBirth,
        gender: getGenderEnum(data.gender),
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        preferredLanguage: language, // Use the form's selected language
      });
    }
  );

  return (
    <form onSubmit={onRegistrationSubmit}>
      <CardContent className="space-y-6">
        {/* <RegistrationFormSVG /> */}

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="الاسم الأول"
              id="firstName"
              placeholder="الاسم الأول"
              {...registerForm('firstName')}
              error={formErrors.firstName?.message}
            />
            <Input
              label="الاسم الأخير"
              id="lastName"
              placeholder="الاسم الأخير"
              {...registerForm('lastName')}
              error={formErrors.lastName?.message}
            />
          </div>

          <div className="space-y-2">
            <GenderSelector
              value={watch('gender') || ''}
              onChange={(value: string) => {
                setValue('gender', value, { shouldValidate: true });
              }}
            />
            {formErrors.gender && (
              <motion.p
                className="text-destructive text-xs text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {formErrors.gender.message}
              </motion.p>
            )}
          </div>

          <Input
            id="dateOfBirth"
            type="date"
            {...registerForm('dateOfBirth')}
            startIcon={<Calendar className="h-4 w-4" />}
            label="تاريخ الميلاد"
            max={new Date().toISOString().split('T')[0]}
            error={formErrors.dateOfBirth?.message}
          />

          <Input
            label="البريد الإلكتروني"
            id="email"
            type="email"
            placeholder="your@email.com"
            {...registerForm('email')}
            error={formErrors.email?.message}
          />

          <div className="relative">
            <Input
              label=" كلمة المرور "
              type={showPassword ? 'text' : 'password'}
              id="register-password"
              {...registerForm('password')}
              startIcon={<Lock className="h-4 w-4" />}
              placeholder="••••••••"
              error={formErrors.password?.message}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute ltr:right-3 rtl:left-3 top-9 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>

          <Input
            label=" تأكيد كلمة المرور "
            id="confirm-password"
            type={showPassword ? 'text' : 'password'}
            {...registerForm('confirmPassword')}
            placeholder="••••••••"
            startIcon={<Shield className="h-4 w-4" />}
            error={formErrors.confirmPassword?.message}
          />
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
            disabled={completeRegistration.isPending}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
              animate={
                completeRegistration.isPending
                  ? { opacity: 0.2 }
                  : { opacity: 0 }
              }
            />
            {completeRegistration.isPending ? (
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
                <span>جاري إنشاء الحساب...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>إنشاء حساب</span>
              </div>
            )}
          </Button>
        </motion.div>
      </CardFooter>
    </form>
  );
}
