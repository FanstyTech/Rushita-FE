'use client';

import { motion } from 'framer-motion';
import {
  Bell,
  Globe,
  Shield,
  Clock,
  Mail,
  CreditCard,
  Users,
  Building2,
  LucideIcon,
} from 'lucide-react';
import PageLayout from '@/components/layouts/PageLayout';

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon; // Lucide icon component
  href: string;
}

const settingsSections: SettingsSection[] = [
  {
    id: 'general',
    title: 'General Settings',
    description: 'Basic clinic information, location, and contact details',
    icon: Building2,
    href: '/clinic/settings/general',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Configure email and push notification preferences',
    icon: Bell,
    href: '/clinic/settings/notifications',
  },
  {
    id: 'schedule',
    title: 'Working Hours',
    description: 'Set clinic working hours and availability',
    icon: Clock,
    href: '/clinic/settings/schedule',
  },
  {
    id: 'staff',
    title: 'Staff Access',
    description: 'Manage staff roles and permissions',
    icon: Users,
    href: '/clinic/settings/staff',
  },
  {
    id: 'billing',
    title: 'Billing & Payments',
    description: 'Payment methods, invoicing, and billing settings',
    icon: CreditCard,
    href: '/clinic/settings/billing',
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Password, two-factor authentication, and security logs',
    icon: Shield,
    href: '/clinic/settings/security',
  },
  {
    id: 'language',
    title: 'Language & Region',
    description: 'Language preferences and regional settings',
    icon: Globe,
    href: '/clinic/settings/language',
  },
  {
    id: 'email',
    title: 'Email Templates',
    description: 'Customize notification and reminder email templates',
    icon: Mail,
    href: '/clinic/settings/email',
  },
];

export default function ClinicSettings() {
  return (
    <PageLayout>
      {/* Settings Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {settingsSections.map((section) => (
          <motion.a
            key={section.id}
            href={section.href}
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <section.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">
                  {section.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {section.description}
                </p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </PageLayout>
  );
}
