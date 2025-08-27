'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  CheckCircle,
  Stethoscope,
  Shield,
  Heart,
  Mail,
  Clock,
  ArrowRight,
  Home,
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { useTranslation } from 'react-i18next';

export default function RegistrationSuccessPage() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-300/10 to-blue-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding & Next Steps */}
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
                  Rushita
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Medical Practice Management
                </p>
              </div>
            </div>

            {/* Welcome Message */}
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {' '}
                Rushita Family
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Your registration has been submitted successfully. Our team will
              review your application and get back to you soon.
            </p>

            {/* Next Steps */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Check Your Email
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We've sent a confirmation email with next steps
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Account Review
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Our team will review your application within 24-48 hours
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Get Started
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Once approved, you'll receive login credentials
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Need Help?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Our support team is here to assist you with any questions.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="mailto:support@rushita.com"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  <Mail className="w-4 h-4" />
                  Email Support
                </a>
                <a
                  href="https://wa.me/966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Success Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Glassmorphism Card */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 text-center">
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

              {/* Success Icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>

              {/* Success Message */}
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Registration Successful!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Thank you for joining Rushita. Your application has been
                submitted and is now under review.
              </p>

              {/* Status Card */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-green-800 dark:text-green-300">
                      Application Submitted
                    </h3>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      We'll notify you once your account is approved
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Link
                  href="/auth/login"
                  className="w-full flex justify-center items-center gap-2 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                >
                  <ArrowRight className="w-5 h-5" />
                  Go to Login
                </Link>

                <Link
                  href="/"
                  className="w-full flex justify-center items-center gap-2 py-3.5 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-200"
                >
                  <Home className="w-5 h-5" />
                  Back to Home
                </Link>
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
