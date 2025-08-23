import React, { useState } from 'react';
import { Check, Star, Zap, Shield, Clock } from 'lucide-react';
import { Button } from '../ui/button';

const SubscriptionSection = () => {
  const [paymentInterval, setPaymentInterval] = useState('monthly');

  const subscription = {
    name: 'الباقة الشاملة',
    subtitle: 'كل ما تحتاجه لعيادة ذكية ومتطورة',
    price: { monthly: 50, yearly: 500 },
    originalPrice: { monthly: 80, yearly: 800 },
    features: [
      'إدارة شاملة للمرضى والمواعيد',
      'نظام مالي متكامل مع التقارير',
      'ملفات طبية رقمية آمنة',
      'تذكيرات تلقائية للمرضى',
      'دعم فني متاح 24/7',
      'تحديثات مجانية مدى الحياة',
    ],
    highlights: [
      { icon: Zap, text: 'إعداد سريع', color: 'from-yellow-500 to-orange-500' },
      {
        icon: Shield,
        text: 'حماية معتمدة',
        color: 'from-green-500 to-emerald-500',
      },
      { icon: Clock, text: 'دعم فوري', color: 'from-blue-500 to-purple-500' },
    ],
  };

  const currentPrice =
    paymentInterval === 'yearly'
      ? subscription.price.yearly
      : subscription.price.monthly;
  const originalPrice =
    paymentInterval === 'yearly'
      ? subscription.originalPrice.yearly
      : subscription.originalPrice.monthly;
  const savings = originalPrice - currentPrice;
  const savingsPercent = Math.round((savings / originalPrice) * 100);

  return (
    <div className="w-full">
      {/* Payment Toggle */}
      <div className="flex justify-center mb-6">
        <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-1 border border-white/10">
          <div className="flex">
            <button
              onClick={() => setPaymentInterval('monthly')}
              className={`relative px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                paymentInterval === 'monthly'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              شهري
            </button>
            <button
              onClick={() => setPaymentInterval('yearly')}
              className={`relative px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                paymentInterval === 'yearly'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              سنوي
              {paymentInterval === 'yearly' && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                  وفر {savingsPercent}%
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Subscription Card */}
      <div className="relative group">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Main card */}
        <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500">
          {/* Popular badge */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white text-xs font-medium shadow-lg">
              <Star className="w-3 h-3" />
              الأكثر شعبية
            </div>
          </div>

          <div className="text-center mb-6 pt-3">
            <h3 className="text-xl font-bold text-white mb-1">
              {subscription.name}
            </h3>
            <p className="text-white/70 text-sm mb-4">
              {subscription.subtitle}
            </p>

            {/* Price */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-3xl font-bold text-white">
                    ${currentPrice}
                  </span>
                  <span className="text-white/60 text-sm">
                    /{paymentInterval === 'monthly' ? 'شهر' : 'سنة'}
                  </span>
                </div>
                {savings > 0 && (
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-white/50 line-through text-sm">
                      ${originalPrice}
                    </span>
                    <span className="text-green-400 text-xs font-medium">
                      وفر ${savings}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Highlights */}
            <div className="flex justify-center gap-3 mb-4">
              {subscription.highlights.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-gradient-to-r ${highlight.color} flex items-center justify-center`}
                    >
                      <IconComponent className="w-2 h-2 text-white" />
                    </div>
                    <span className="text-white/80 text-xs">
                      {highlight.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <Button className="w-full py-3 text-base font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 mb-4">
              ابدأ تجربتك المجانية الآن
            </Button>
          </div>

          {/* Features List - Compact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {subscription.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-white/90 text-xs">{feature}</span>
              </div>
            ))}
          </div>

          {/* Bottom note - Compact */}
          <div className="text-center pt-3 border-t border-white/10">
            <p className="text-white/60 text-xs">
              ✨ تجربة مجانية 30 يوم • إلغاء في أي وقت
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSection;
