'use client';

import { useEffect, useRef, useState } from 'react';

import HeroSection from '@/components/LandingPage/HeroSection';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Circle,
  MoveLeft,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Shield,
  Zap,
} from 'lucide-react';
import NumberDiv from '@/components/LandingPage/NumberDiv';
import SubscriptionSection from '@/components/LandingPage/SubscriptionSection';
import CicyleBg from '@/components/LandingPage/CicyleBg';
import { ChartPie } from '@/components/LandingPage/ChartPie';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const whyroshita = [
  {
    image: 'Why94551.png',
    Title: 'مريض اتصل يسأل عن حالته… والسكرتيرة قلبت الدفاتر.',
    icon: Users,
  },
  {
    image: 'Why21492610591.png',
    Title: 'موعد تأخر لأنه الجدول ما انتبه للتداخل.',
    icon: Shield,
  },
  {
    image: 'Why21512376191.png',
    Title: 'ملف مريض ناقص… والطبيب ارتجل من الذاكرة.',
    icon: Zap,
  },
];

const whatswepost = [
  'جدولة مواعيد بدون تعقيد. بتعرف من بدري وين في فراغات، وين في ضغط.',
  'ملف رقمي لكل مريض. مش بس التاريخ الطبي، بل ملاحظاتك كمان.',
  'تنبيهات تلقائية. للمريض، للطبيب، وللعيادة.',
  'متابعة عن بعد. مريضك في البيت؟ تقدر تتابعه من عندك.',
  'تقارير ذكية. مو بس أرقام… بل رؤى تساعدك تطور العيادة.',
];

const roshtasystem = [
  'الطبيب يشوف تنبيهات السكرتارية',
  'المختبر يستلم المطلوب لحاله',
  'المحاسب يعرف تلقائيًا حالة الفاتورة',
];

export default function Home() {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-screen fixed top-0 left-0 z-50 h-screen flex justify-center items-center bg-white dark:bg-gray-900">
        <div className="relative">
          <Circle className="w-20 h-20 absolute top-0 left-0 text-blue-500 animate-spin" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      <div id="home" className="relative">
        <HeroSection />
      </div>

      {/* Why Rushita Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
          <CicyleBg className="top-[50%] -right-10 opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                ليش كل العيادات بتتحوّل لروشيتة؟
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              لأن الوقت ما بيتحمّل الفوضى
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyroshita.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-200 dark:border-gray-700"
                >
                  {/* Icon */}
                  <div className="absolute -top-6 right-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                    <Image
                      src={`/images/${item.image}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={item.Title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
                      {item.Title}
                    </h3>

                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                      <span className="text-sm">تعرف على الحل</span>
                      <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              روشيتة خلصتك من كل هالفوضى
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            بنظام يشوف عنك، يتذكّر عنك، ويرتب لك كل شيء من أول لحظة
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full border border-green-200 dark:border-green-800 mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full animate-pulse"></div>
              <span className="text-transparent bg-gradient-to-r from-green-700 to-emerald-700 dark:from-green-300 dark:to-emerald-300 bg-clip-text font-medium">
                عرض حصري ومحدود
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                احصل الآن على نسختك
              </span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              وتمتع بخصم مدى الحياة! كن من ضمن الفئة الأولى واحصل على خصم 50%
              مدى الحياة
            </p>
          </div>

          {/* Enhanced CTA Card */}
          <div className="relative max-w-4xl mx-auto">
            {/* Floating elements */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl rotate-12 opacity-20 animate-float"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float-delayed"></div>

            {/* Main CTA Card */}
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 group hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 text-center">
                {/* Offer Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-full border border-red-200 dark:border-red-800 mb-6">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-600 dark:text-red-400 text-sm font-semibold">
                    🔥 عرض محدود - خصم 50% مدى الحياة
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  ابدأ رحلتك الطبية الذكية اليوم
                </h3>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="text-right">
                      <div className="text-green-700 dark:text-green-300 font-semibold text-sm">
                        تجربة مجانية
                      </div>
                      <div className="text-green-600 dark:text-green-400 text-xs">
                        30 يوم كاملة
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-700 dark:text-blue-300 font-semibold text-sm">
                        إعداد سريع
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 text-xs">
                        في دقائق معدودة
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21.07 21.07M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 2.83l2.829 2.829m2.829-2.829a4.978 4.978 0 001.414-2.83m-1.414 2.83l-2.829-2.829M15.536 8.464l-2.829 2.829m0 0a5 5 0 01-7.072 0"
                        />
                      </svg>
                    </div>
                    <div className="text-right">
                      <div className="text-purple-700 dark:text-purple-300 font-semibold text-sm">
                        دعم مستمر
                      </div>
                      <div className="text-purple-600 dark:text-purple-400 text-xs">
                        24/7 متاح
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="space-y-4">
                  <Link href="/auth/login">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-2xl border-0"
                    >
                      إبدأ تجربة مجانية الآن
                      <MoveLeft className="mr-3 scale-125" />
                    </Button>
                  </Link>

                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    ✨ بدون التزامات • إلغاء في أي وقت • دعم فني مجاني
                  </p>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      +500
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      عيادة تثق بنا
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      99.9%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      وقت تشغيل
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      4.9★
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      تقييم المستخدمين
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="whyroshita" className="relative py-16 overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent"></div>
          {/* Floating elements */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800 mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-blue-700 dark:text-blue-300 font-medium">
                قصتنا
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                لماذا روشيتة؟
              </span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              نظام وُلد من قلب العيادات، صُمم بفهم عميق لاحتياجات الأطباء
              والمرضى
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8" dir="rtl">
              {/* Main Message */}
              <div className="space-y-6">
                <div className="relative">
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    مش مجرد نظام طبي…
                  </h3>
                  <div className="absolute -bottom-2 right-0 w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  إحنا فاهمين ألم العيادة
                </h3>
              </div>

              {/* Story Cards */}
              <div className="space-y-6">
                <div className="relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>

                  <p className="text-gray-700 mt-3 dark:text-gray-300 text-lg leading-relaxed pt-8">
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      "روشيتة"
                    </span>{' '}
                    انولد من قلب عيادة.. اشتغلنا مع أطباء، سكرتارية، مرضى سمعنا
                    كل التفاصيل، كل المآسي، وكل آه صغيرة من ضغط يوم العيادة.
                  </p>
                </div>

                <div className="relative p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>

                  <p className="text-purple-700 mt-3 dark:text-purple-300 text-lg font-medium leading-relaxed pt-8">
                    ورجعنا صممنا النظام مش عشان يكون{' '}
                    <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      "جميل"
                    </span>{' '}
                    وبس! ، لكن عشان يكون مفيد – سريع – واقعي – ذكي.
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    سهل الاستخدام
                  </span>
                </div>

                <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-blue-700 dark:text-blue-300 font-medium">
                    سريع وذكي
                  </span>
                </div>

                <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <span className="text-purple-700 dark:text-purple-300 font-medium">
                    آمن ومحمي
                  </span>
                </div>

                <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75 9.75 9.75 0 019.75-9.75z"
                      />
                    </svg>
                  </div>
                  <span className="text-orange-700 dark:text-orange-300 font-medium">
                    دعم مستمر
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-center lg:justify-start gap-8 pt-8">
                <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    1947
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    مستخدم نشط
                  </div>
                </div>
                <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    +60
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    عيادة تثق بنا
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Enhanced Image */}
            <div className="relative">
              {/* Floating elements around image */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl rotate-12 opacity-20 animate-float"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float-delayed"></div>

              {/* Main image container */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div
                  className="relative rounded-3xl h-[400px] lg:h-[500px] bg-center bg-cover shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group-hover:scale-105"
                  style={{
                    backgroundImage: "url('/images/bg1.jpg')",
                    backgroundPosition: '40% 20%',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl"></div>

                  {/* Overlay content */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                      <h4 className="text-white font-bold text-xl mb-2">
                        من قلب العيادة
                      </h4>
                      <p className="text-white/80 text-sm">
                        تجربة حقيقية مع الأطباء والمرضى
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="projects"
        className="py-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <CicyleBg className="bottom-10 right-0 opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full border border-blue-200 dark:border-blue-800 mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
              <span className="text-transparent bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-300 dark:to-purple-300 bg-clip-text font-medium">
                خدماتنا المتكاملة
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                ماذا نقدم؟
              </span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
              كل شي تحتاجه… من أول{' '}
              <span className="text-blue-600 font-semibold">"أهلا دكتور"</span>{' '}
              لآخر{' '}
              <span className="text-purple-600 font-semibold">
                "الله يعطيك العافية"
              </span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Enhanced Image Section */}
            <div className="relative order-2 lg:order-1">
              {/* Floating elements around image */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl rotate-12 opacity-20 animate-float"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float-delayed"></div>

              {/* Main image container */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 group-hover:scale-105">
                  <div
                    className="relative rounded-2xl h-[350px] lg:h-[450px] bg-center bg-contain bg-no-repeat"
                    style={{ backgroundImage: "url('/images/image349.png')" }}
                  >
                    <div
                      className="absolute bottom-8 left-4 w-[180px] h-[80px] bg-center bg-cover bg-no-repeat rounded-xl shadow-lg hidden sm:block hover:scale-110 transition-transform duration-300"
                      style={{ backgroundImage: "url('/images/image350.png')" }}
                    ></div>
                  </div>

                  {/* Overlay content */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                      <h4 className="text-gray-900 dark:text-white font-bold text-lg mb-1">
                        نظام متكامل وذكي
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        تجربة سلسة لإدارة العيادة بكفاءة عالية
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Enhanced Features List */}
            <div className="space-y-6 order-1 lg:order-2">
              {whatswepost.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50"
                >
                  {/* Icon */}
                  <div className="absolute -top-4 right-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-4">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                        {item}
                      </p>
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Number indicator */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
                      {index + 1}
                    </span>
                  </div>
                </div>
              ))}

              {/* Enhanced Bottom Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6">
                <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      سريع
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                      إعداد في دقائق
                    </p>
                  </div>
                </div>

                <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                      موثوق
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                      آمن ومضمون
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Integration */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-400/5 to-cyan-400/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-blue-200/50 dark:border-blue-700/50 shadow-lg mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold">
                التكامل الذكي
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                مش بس نظام…
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                روشيتة بيشتغل كأنه فريق كامل
              </span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              من لحظة دخول المريض، لجدولة الموعد، للتشخيص، للوصفة، للمتابعة.. كل
              قسم في العيادة يتواصل تلقائيًا مع الثاني
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Integration Features */}
            <div className="space-y-6">
              {roshtasystem.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Number Badge */}
                  <div className="absolute -top-3 right-6 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 pt-2">
                    <div className="flex items-start gap-4">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-1 flex-shrink-0 group-hover:scale-125 transition-transform duration-300 shadow-lg"></div>
                      <p className="text-gray-700 dark:text-gray-300 text-lg font-medium leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                        {item}
                      </p>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              ))}
            </div>

            {/* Right Content - Enhanced Visual Hub */}
            <div className="relative">
              <div className="flex justify-center items-center">
                <div className="relative w-[400px] h-[400px]">
                  {/* Central Hub - Enhanced */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-800 dark:via-blue-900/30 dark:to-purple-900/30 rounded-full border-4 border-blue-400/60 dark:border-blue-500/60 flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative text-center z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                          />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
                        روشيتة
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        المركز الذكي
                      </p>
                    </div>
                  </div>

                  {/* Enhanced Satellite Elements */}
                  {/* Doctor - Top */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 group">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-4 border-white/20">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        الطبيب
                      </span>
                    </div>
                  </div>

                  {/* Lab - Bottom */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 group">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-4 border-white/20">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                        />
                      </svg>
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                      <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                        المختبر
                      </span>
                    </div>
                  </div>

                  {/* Accountant - Left */}
                  <div className="absolute top-1/2 left-6 transform -translate-y-1/2 group">
                    <div className="w-20 h-20 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-4 border-white/20">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                    </div>
                    <div className="absolute top-1/2 -left-16 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                      <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                        المحاسب
                      </span>
                    </div>
                  </div>

                  {/* Secretary - Right */}
                  <div className="absolute top-1/2 right-6 transform -translate-y-1/2 group">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-4 border-white/20">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                      <span className="text-sm font-semibold text-pink-600 dark:text-pink-400">
                        السكرتارية
                      </span>
                    </div>
                  </div>

                  {/* Enhanced Connection Lines with Animation */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    style={{ zIndex: -1 }}
                  >
                    <defs>
                      <linearGradient
                        id="enhancedGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3B82F6"
                          stopOpacity="0.6"
                        />
                        <stop
                          offset="50%"
                          stopColor="#8B5CF6"
                          stopOpacity="0.6"
                        />
                        <stop
                          offset="100%"
                          stopColor="#EC4899"
                          stopOpacity="0.6"
                        />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Animated Connection Lines */}
                    <line
                      x1="50%"
                      y1="18%"
                      x2="50%"
                      y2="42%"
                      stroke="url(#enhancedGradient)"
                      strokeWidth="4"
                      strokeDasharray="12,6"
                      filter="url(#glow)"
                      className="animate-pulse"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;18;0"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </line>
                    <line
                      x1="50%"
                      y1="82%"
                      x2="50%"
                      y2="58%"
                      stroke="url(#enhancedGradient)"
                      strokeWidth="4"
                      strokeDasharray="12,6"
                      filter="url(#glow)"
                      className="animate-pulse"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;18;0"
                        dur="3s"
                        repeatCount="indefinite"
                        begin="0.5s"
                      />
                    </line>
                    <line
                      x1="18%"
                      y1="50%"
                      x2="42%"
                      y2="50%"
                      stroke="url(#enhancedGradient)"
                      strokeWidth="4"
                      strokeDasharray="12,6"
                      filter="url(#glow)"
                      className="animate-pulse"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;18;0"
                        dur="3s"
                        repeatCount="indefinite"
                        begin="1s"
                      />
                    </line>
                    <line
                      x1="82%"
                      y1="50%"
                      x2="58%"
                      y2="50%"
                      stroke="url(#enhancedGradient)"
                      strokeWidth="4"
                      strokeDasharray="12,6"
                      filter="url(#glow)"
                      className="animate-pulse"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;18;0"
                        dur="3s"
                        repeatCount="indefinite"
                        begin="1.5s"
                      />
                    </line>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Bottom Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  100%
                </h4>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  تكامل تلقائي
                </p>
              </div>
            </div>

            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                  24/7
                </h4>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  عمل مستمر
                </p>
              </div>
            </div>

            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-3">
                  صفر
                </h4>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  أخطاء بشرية
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="relative py-32 overflow-hidden">
        {/* Background with gradient and patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-400/20 to-blue-400/20 rounded-full blur-3xl animate-spin-slow"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-right" dir="rtl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-400/30 mb-8">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-sm font-medium">
                  جاهز للانطلاق معك
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                <span className="block text-white mb-4">نظامك الطبي</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                  بين يديك الآن
                </span>
              </h2>

              {/* Description */}
              <p className="text-xl text-white/80 leading-relaxed mb-12 max-w-2xl">
                من أول مريض لآخر تقرير، من جدولة المواعيد لإدارة المالية -
                <span className="text-blue-300 font-semibold"> روشيتة </span>
                تحول عيادتك لنظام ذكي متكامل
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-12">
                <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white font-medium">إعداد سريع</span>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-white font-medium">سريع وذكي</span>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <span className="text-white font-medium">آمن ومحمي</span>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75 9.75 9.75 0 019.75-9.75z"
                      />
                    </svg>
                  </div>
                  <span className="text-white font-medium">دعم 24/7</span>
                </div>
              </div>
            </div>

            {/* Right Content - Subscription Section */}
            <div className="relative">
              {/* Floating elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl rotate-12 opacity-20 animate-float"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float-delayed"></div>

              {/* Main card */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-400/30 mb-4">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-300 text-sm font-medium">
                        عرض محدود
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      ابدأ رحلتك الطبية الذكية
                    </h3>
                    <p className="text-white/70">
                      تجربة مجانية لمدة 30 يوم - بدون التزامات
                    </p>
                  </div>

                  <SubscriptionSection />

                  {/* Trust indicators */}
                  <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">+500</div>
                      <div className="text-sm text-white/60">عيادة تثق بنا</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">99.9%</div>
                      <div className="text-sm text-white/60">وقت تشغيل</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">24/7</div>
                      <div className="text-sm text-white/60">دعم فني</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </section>
    </div>
  );
}
