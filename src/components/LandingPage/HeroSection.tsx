import React from 'react';
import { Button } from '../ui/button';
import {
  MoveLeft,
  Stethoscope,
  Heart,
  Calendar,
  FileText,
  Users,
  TrendingUp,
} from 'lucide-react';
import CicyleBg from './CicyleBg';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="animate-float">
          <CicyleBg className="opacity-30" />
        </div>
        <div className="animate-float-delayed">
          <CicyleBg className="bottom-20 -left-10 opacity-20" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div
            className="space-y-8 animate-fade-in-up animation-delay-300"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Medical Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800 animate-slide-in-right animation-delay-400">
              <Stethoscope className="w-5 h-5 text-blue-600 animate-pulse" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {t('landing.hero.medicalBadge')}
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up animation-delay-600">
                <span className="block text-gray-900 dark:text-white">
                  {t('landing.hero.heroTitle')}
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x animation-delay-200">
                  {t('landing.hero.heroSubtitle')}
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in-up animation-delay-800">
                {t('landing.hero.heroDescription')}
              </p>

              <p className="text-lg text-gray-500 dark:text-gray-400 animate-fade-in-up animation-delay-1000">
                {t('landing.hero.heroDescription2')}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in-up animation-delay-1200">
              <div className="flex items-center gap-3 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300">
                <Calendar className="w-6 h-6 text-green-500 animate-bounce-gentle" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('landing.hero.feature1')}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300">
                <FileText className="w-6 h-6 text-blue-500 animate-pulse" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('landing.hero.feature2')}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300">
                <Heart className="w-6 h-6 text-red-500 animate-heartbeat" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('landing.hero.feature3')}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300">
                <TrendingUp className="w-6 h-6 text-purple-500 animate-bounce" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('landing.hero.feature4')}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-1400">
              <Link href="/auth/login" className="flex-1 sm:flex-none">
                <Button
                  size="lg"
                  className="group relative w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-purple-600 hover:to-pink-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 animate-pulse-glow overflow-hidden"
                >
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Button content */}
                  <div className="relative flex items-center justify-center gap-2">
                    <Stethoscope className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent font-bold">
                      {t('landing.hero.ctaButton1')}
                    </span>
                    <MoveLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  </div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500"></div>
                </Button>
              </Link>

              <Link href="/auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="group relative w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2 border-gradient-to-r from-blue-400 to-purple-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 overflow-hidden"
                >
                  {/* Border gradient effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="h-full w-full rounded-lg bg-white dark:bg-gray-800"></div>
                  </div>

                  {/* Button content */}
                  <div className="relative flex items-center justify-center gap-2">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent font-semibold transition-all duration-300">
                      {t('landing.hero.ctaButton2')}
                    </span>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4 animate-fade-in-up animation-delay-1600">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white animate-number-roll">
                  +60
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('landing.hero.trustIndicator1')}
                </div>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white animate-number-roll">
                  1947
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('landing.hero.trustIndicator2')}
                </div>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white animate-number-roll">
                  99%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('landing.hero.trustIndicator3')}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Medical Illustration */}
          <div className="relative animate-fade-in-up animation-delay-800">
            <div className="relative">
              {/* Main Medical Image */}
              <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 animate-float-slow">
                <Image
                  fill
                  src="/images/HeroSection.jpeg"
                  alt="روشيتة - نظام إدارة العيادات"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
              </div>
              {/* Floating Medical Elements */}
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700 animate-float animation-delay-1000">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white animate-heartbeat" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {t('landing.hero.medicalElement1')}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">
                      {t('landing.hero.medicalElement1Status')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700 animate-float-delayed animation-delay-1200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white animate-bounce-gentle" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {t('landing.hero.medicalElement2')}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">
                      {t('landing.hero.medicalElement2Status')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-8 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700 animate-float animation-delay-1400">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {t('landing.hero.medicalElement3')}
                    </div>
                    <div className="text-xs text-purple-600 dark:text-purple-400">
                      {t('landing.hero.medicalElement3Status')}
                    </div>
                  </div>
                </div>
              </div>
              {/* Medical Icons Background */}
              <div className="absolute bottom-20 right-20 opacity-20 animate-bounce">
                <Heart className="w-12 h-12 text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes gradientX {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes textShimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes bounceGentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes bounceHorizontal {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-3px);
          }
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.8);
          }
        }

        @keyframes numberRoll {
          0% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(12deg);
          }
          100% {
            transform: translateX(200%) skewX(12deg);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite 1.5s;
        }
        .animate-float-slow {
          animation: floatSlow 4s ease-in-out infinite;
        }
        .animate-gradient-x {
          animation: gradientX 3s ease infinite;
          background-size: 200% 200%;
        }
        .animate-text-shimmer {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6);
          background-size: 200% 100%;
          animation: textShimmer 2s linear infinite;
          -webkit-background-clip: text;
          background-clip: text;
        }
        .animate-bounce-gentle {
          animation: bounceGentle 2s ease-in-out infinite;
        }
        .animate-bounce-horizontal {
          animation: bounceHorizontal 1s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spinSlow 3s linear infinite;
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        .animate-number-roll {
          animation: numberRoll 0.8s ease-out forwards;
        }
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite !important;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1200 {
          animation-delay: 1.2s;
        }
        .animation-delay-1400 {
          animation-delay: 1.4s;
        }
        .animation-delay-1600 {
          animation-delay: 1.6s;
        }

        /* Initial states for animations */
        .animate-fade-in-up,
        .animate-slide-in-right {
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
