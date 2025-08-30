import React, { useState } from 'react';
import { Check, Star, Zap, Shield, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

const SubscriptionSection = () => {
  const [paymentInterval, setPaymentInterval] = useState('monthly');
  const { t } = useTranslation();

  const subscription = {
    name: t('landing.finalCta.subscription.professional.planName'),
    subtitle: t('landing.finalCta.subscription.professional.subtitle'),
    price: { monthly: 100, yearly: 1000 },
    originalPrice: { monthly: 120, yearly: 1200 },
    features: [
      'patientManagement',
      'financialSystem',
      'medicalRecords',
      'automatedReminders',
      'support',
      'lifetimeUpdates',
    ],
    highlights: [
      {
        icon: Zap,
        text: 'quickSetup',
        color: 'from-yellow-500 to-orange-500',
      },
      {
        icon: Shield,
        text: 'secure',
        color: 'from-green-500 to-emerald-500',
      },
      {
        icon: Clock,
        text: 'support',
        color: 'from-blue-500 to-purple-500',
      },
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
              {t('landing.finalCta.subscription.monthly')}
            </button>
            <button
              onClick={() => setPaymentInterval('yearly')}
              className={`relative px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                paymentInterval === 'yearly'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {t('landing.finalCta.subscription.yearly')}
              {/* {paymentInterval === 'yearly' && ( */}
              <div className="absolute -top-4 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                {t('landing.finalCta.subscription.save')} {savingsPercent}%
              </div>
              {/* )} */}
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
              {t('landing.finalCta.subscription.professional.popular')}
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
                    /
                    {t(
                      `landing.finalCta.subscription.${
                        paymentInterval === 'monthly' ? 'perMonth' : 'perYear'
                      }`
                    )}
                  </span>
                </div>
                {savings > 0 && (
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-white/50 line-through text-sm">
                      ${originalPrice}
                    </span>
                    <span className="text-green-400 text-xs font-medium">
                      {t('landing.finalCta.subscription.saveAmount', {
                        amount: savings,
                      })}
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
                      {t(
                        'landing.finalCta.subscription.professional.highlights.' +
                          highlight.text
                      )}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <Button className="w-full py-3 text-base font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 mb-4">
              {t('landing.finalCta.subscription.startTrial')}
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
                <span className="text-white/90 text-xs">
                  {t(
                    'landing.finalCta.subscription.professional.features.' +
                      feature
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom note - Compact */}
          <div className="text-center pt-3 border-t border-white/10">
            <p className="text-white/60 text-xs">
              {t('landing.finalCta.subscription.trialNote')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSection;
