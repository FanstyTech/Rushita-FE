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
    email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
    password: z
      .string()
      .min(8, { message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمات المرور غير متطابقة',
    path: ['confirmPassword'],
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  phoneNumber: string;
  phoneCode: string;
}

export function RegistrationForm({
  phoneNumber,
  phoneCode,
}: RegistrationFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
      try {
        setIsLoading(true);
        // In a real app, this would call the actual registration API
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Simulate successful registration
        console.log('Register with:', {
          phoneNumber: `${phoneCode}${phoneNumber}`,
          ...data,
        });

        // Navigate to dashboard after successful registration
        router.push('/patient-portal/dashboard');
      } catch (error) {
        console.error('Registration error:', error);
      } finally {
        setIsLoading(false);
      }
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
