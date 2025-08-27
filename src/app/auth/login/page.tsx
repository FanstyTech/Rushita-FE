'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/common/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import {
  Eye,
  EyeOff,
  Loader2,
  Stethoscope,
  Shield,
  Heart,
  Users,
  MessageCircle,
  Instagram,
} from 'lucide-react';
import { useAuth } from '@/lib/api/hooks/useAuth';
import Cookies from 'js-cookie';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { useTranslation } from 'react-i18next';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const { login } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Clean up auth state if coming from logout
    const token = Cookies.get('auth-token');
    if (token) {
      Cookies.remove('auth-token');
      Cookies.remove('refresh-token');
      localStorage.removeItem('user');
      router.refresh(); // Force middleware to re-run
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // Prevent double submission
    if (login.isPending) return;

    // Call the login mutation from the useAuth hook
    login.mutate(data, {
      onSuccess: (response) => {
        // Get the user's role and redirect to appropriate dashboard
        const roles = response?.user?.roles || [];
        let dashboardPath = '/';

        if (roles.includes('SuperAdmin')) {
          dashboardPath = '/admin/dashboard';
        } else if (roles.includes('Doctor')) {
          dashboardPath = '/doctor/dashboard';
        } else if (roles.includes('ClinicStaff')) {
          dashboardPath = '/clinic/dashboard';
        }

        // Get the current language from cookie or use default
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2)
            return parts.pop()?.split(';').shift() || 'en';
          return 'en';
        };

        const currentLang = getCookie('language');

        // Add language prefix to dashboard path
        const languagePrefixedPath = `/${currentLang}${dashboardPath}`;
        router.push(languagePrefixedPath);
      },
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding & Features */}
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {isClient ? t('auth.login.branding.title') : 'Rushita'}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isClient
                    ? t('auth.login.branding.subtitle')
                    : 'Medical Practice Management'}
                </p>
              </div>
            </div>

            {/* Welcome Message */}
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isClient
                ? t('auth.login.branding.welcome')
                : 'Welcome to the Future of'}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}
                {isClient
                  ? t('auth.login.branding.healthcare')
                  : 'Healthcare Management'}
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {isClient
                ? t('auth.login.branding.description')
                : 'Streamline your clinic operations with our comprehensive medical practice management system.'}
            </p>

            {/* Feature Highlights */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {isClient
                      ? t('auth.login.features.secure.title')
                      : 'Secure & Compliant'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isClient
                      ? t('auth.login.features.secure.description')
                      : 'HIPAA compliant with enterprise-grade security'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {isClient
                      ? t('auth.login.features.patientCare.title')
                      : 'Patient-Centered Care'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isClient
                      ? t('auth.login.features.patientCare.description')
                      : 'Enhance patient experience and outcomes'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {isClient
                      ? t('auth.login.features.teamCollaboration.title')
                      : 'Team Collaboration'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isClient
                      ? t('auth.login.features.teamCollaboration.description')
                      : 'Seamless workflow for your entire team'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Glassmorphism Card */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
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
                  {isClient ? t('auth.login.title') : 'Welcome Back'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {isClient
                    ? t('auth.login.subtitle')
                    : 'Sign in to access your dashboard'}
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* {login.error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-xl text-sm animate-shake">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0"></div>
                      {login.error.message}
                    </div>
                  </div>
                )} */}

                <div className="space-y-5">
                  <Input
                    label={isClient ? t('auth.login.email') : 'Email Address'}
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    placeholder={
                      isClient
                        ? t('auth.login.emailPlaceholder')
                        : 'Enter your email address'
                    }
                    autoComplete="email"
                  />

                  <div className="relative">
                    <Input
                      label={isClient ? t('auth.login.password') : 'Password'}
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                      error={errors.password?.message}
                      placeholder={
                        isClient
                          ? t('auth.login.passwordPlaceholder')
                          : 'Enter your password'
                      }
                      autoComplete="current-password"
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
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {isClient ? t('auth.login.rememberMe') : 'Remember me'}
                    </span>
                  </label>

                  <Link
                    href="/auth/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    {isClient
                      ? t('auth.login.forgotPassword')
                      : 'Forgot password?'}
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={login.isPending}
                  className="w-full flex justify-center items-center gap-2 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {login.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {isClient ? t('auth.login.signingIn') : 'Signing in...'}
                    </>
                  ) : (
                    <>
                      <Stethoscope className="w-5 h-5" />
                      {isClient
                        ? t('auth.login.signIn')
                        : 'Sign In to Dashboard'}
                    </>
                  )}
                </button>
              </form>

              {/* Contact Links */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {isClient
                    ? t('auth.login.contactHelp')
                    : 'Need help or want to get started?'}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <a
                    href="https://wa.me/966500000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 text-xs font-medium"
                  >
                    <MessageCircle className="w-3 h-3" />
                    {isClient ? t('auth.login.whatsapp') : 'WhatsApp'}
                  </a>
                  <a
                    href="https://instagram.com/rushita_medical"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-colors duration-200 text-xs font-medium"
                  >
                    <Instagram className="w-3 h-3" />
                    {isClient ? t('auth.login.instagram') : 'Instagram'}
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>
                  {isClient
                    ? t('auth.login.trustIndicators.hipaaCompliant')
                    : 'HIPAA Compliant'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>
                  {isClient
                    ? t('auth.login.trustIndicators.trustedClinics')
                    : 'Trusted by 60+ Clinics'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
