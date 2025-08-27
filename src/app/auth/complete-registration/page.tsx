'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/common/form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

import {
  Eye,
  EyeOff,
  Loader2,
  Stethoscope,
  Shield,
  Heart,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '@/lib/api/hooks/useAuth';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const passwordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Please confirm your password'),
    registrationToken: z.string(),
    userId: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function CompleteRegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const { completeRegistration: registerUser } = useAuth();

  // Get registration token from URL
  const registrationToken = searchParams.get('token') || '';
  const userId = searchParams.get('id') || '';
  console.log(userId);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
    defaultValues: {
      registrationToken: registrationToken,
      userId: userId,
    },
  });

  // Set the registration token when it's available
  useEffect(() => {
    if (registrationToken) {
      setValue('registrationToken', registrationToken);
    }
  }, [registrationToken, setValue]);
  useEffect(() => {
    console.log(userId);

    if (userId) {
      setValue('userId', userId);
    }
  }, [userId, setValue]);

  const onSubmit = async (data: PasswordFormData) => {
    if (registerUser.isPending) return;

    console.log(data);
    registerUser.mutate(data, {
      onSuccess: () => {
        router.push('/auth/registration-success');
      },
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-300/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-16">
          <div className="max-w-lg">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3 mb-8">
              <Image
                src="/images/logo-small.png"
                alt="Rushita"
                width={40}
                height={40}
                className="h-8 w-auto"
                priority
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                  Rushita
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Medical Practice Management
                </p>
              </div>
            </div>

            {/* Welcome Message */}
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Your
              <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                {' '}
                Registration
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Create a secure password to complete your account setup and join
              the Rushita medical platform.
            </p>

            {/* Security Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Secure & Encrypted
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your password is encrypted with industry-standard security
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    HIPAA Compliant
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Meeting healthcare data protection standards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Password Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Glassmorphism Card */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Form Header with Toggle Buttons */}
              <div className="text-center mb-8">
                {/* Toggle Buttons */}
                {isClient && (
                  <div className="flex items-center justify-end gap-2 mb-6">
                    <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-xl">
                      <ThemeToggle />
                    </div>
                    <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-xl">
                      <LanguageToggle />
                    </div>
                  </div>
                )}

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Create Password
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Set up a secure password for your account
                </p>
              </div>

              {/* Password Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-5">
                  <div className="relative">
                    <Input
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      error={errors.password?.message}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute ltr:right-3 rtl:left-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword')}
                      error={errors.confirmPassword?.message}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute ltr:right-3 rtl:left-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                    Password Requirements:
                  </h3>
                  <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
                    <li>• At least 8 characters long</li>
                    <li>• Mix of uppercase and lowercase letters</li>
                    <li>• Include numbers and special characters</li>
                    <li>• Avoid common words or personal information</li>
                  </ul>
                </div>

                {/* Navigation Buttons */}
                <Button
                  type="submit"
                  disabled={registerUser.isPending}
                  className="flex justify-center w-100 items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {registerUser.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Complete Registration
                    </>
                  )}
                </Button>
              </form>

              {/* Already have account */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link
                    href="/auth/login"
                    className="font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>Trusted by 60+ Clinics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
