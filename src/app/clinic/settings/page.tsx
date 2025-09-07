'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Bell,
  Globe,
  Clock,
  Calendar,
  Save,
  Settings,
  Phone,
  Mail,
  Shield,
  CreditCard,
  Repeat,
  Plus,
  Trash2,
} from 'lucide-react';
import PageLayout from '@/components/layouts/PageLayout';
import Button from '@/components/common/Button';
import Input from '@/components/common/form/Input';
import Select from '@/components/common/form/Select';
import { useCurrency } from '@/lib/api/hooks/useCurrency';
import { useClinicSettings } from '@/lib/api/hooks/useClinicSettings';
import type { SaveClinicSettingsDto } from '@/lib/api/types/clinic-settings';

interface MultilingualCondition {
  nameL: string;
  nameF: string;
}

interface SettingsFormData {
  appointmentDuration: number;
  allowOnlineBooking: boolean;
  requireApproval: boolean;
  maxAdvanceBookingDays: number;
  cancellationHours: number;
  allowRecurring: boolean;
  recurringTypes: string[];
  bookingConditions: MultilingualCondition[];
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  reminderHours: number;
  defaultCurrency?: string;
  defaultLanguage: string;
  timezone?: string;
}

export default function ClinicSettings() {
  const { t } = useTranslation();
  const { useCurrenciesDropdown } = useCurrency();
  const { useGetClinicSettings: getClinicSettings, saveClinicSettings } =
    useClinicSettings();

  const { data: currencies } = useCurrenciesDropdown();

  // Get clinic settings from API
  const {
    data: apiSettings,
    isLoading: isSettingsLoading,
    error: settingsError,
  } = getClinicSettings();

  const [formData, setFormData] = useState<SettingsFormData>({
    appointmentDuration: 30,
    allowOnlineBooking: true,
    requireApproval: false,
    maxAdvanceBookingDays: 30,
    cancellationHours: 24,
    allowRecurring: false,
    recurringTypes: ['weekly', 'monthly'],
    bookingConditions: [],
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    reminderHours: 24,
    defaultCurrency: undefined,
    defaultLanguage: 'ar',
    timezone: undefined,
  });

  const [selectedLanguage, setSelectedLanguage] = useState<string>('ar');

  // Update form data when API settings are loaded
  useEffect(() => {
    if (apiSettings) {
      setFormData({
        appointmentDuration: apiSettings.appointmentDuration,
        allowOnlineBooking: apiSettings.allowOnlineBooking,
        requireApproval: apiSettings.requireApproval,
        maxAdvanceBookingDays: apiSettings.maxAdvanceBookingDays,
        cancellationHours: apiSettings.cancellationHours,
        allowRecurring: apiSettings.allowRecurring,
        recurringTypes: apiSettings.recurringTypes,
        bookingConditions: apiSettings.bookingConditions.map((condition) => ({
          nameL: condition.titleL,
          nameF: condition.titleF,
        })),
        emailNotifications: apiSettings.emailNotifications,
        smsNotifications: apiSettings.smsNotifications,
        pushNotifications: apiSettings.pushNotifications,
        reminderHours: apiSettings.reminderHours,
        defaultCurrency: apiSettings.defaultCurrencyId,
        defaultLanguage: apiSettings.defaultLanguage || 'en',
        timezone: apiSettings.timezone || 'Asia/Riyadh',
      });
    }
  }, [apiSettings]);

  const handleInputChange = (
    field: keyof SettingsFormData,
    value: SettingsFormData[keyof SettingsFormData]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Convert form data to API format
    const apiData: SaveClinicSettingsDto = {
      appointmentDuration: formData.appointmentDuration,
      allowOnlineBooking: formData.allowOnlineBooking,
      requireApproval: formData.requireApproval,
      maxAdvanceBookingDays: formData.maxAdvanceBookingDays,
      cancellationHours: formData.cancellationHours,
      allowRecurring: formData.allowRecurring,
      recurringTypes: formData.recurringTypes,
      bookingConditions: formData.bookingConditions.map((condition, index) => ({
        id: undefined, // New condition, no ID
        titleL: condition.nameL,
        titleF: condition.nameF,
        descriptionL: '',
        descriptionF: '',
        displayOrder: index + 1,
        isActive: true,
        isRequired: true,
        conditionType: 1, // General type
      })),
      emailNotifications: formData.emailNotifications,
      smsNotifications: formData.smsNotifications,
      pushNotifications: formData.pushNotifications,
      reminderHours: formData.reminderHours,
      defaultCurrencyId: formData.defaultCurrency || undefined,
      defaultLanguage: formData.defaultLanguage,
      timezone: formData.timezone || '',
    };

    await saveClinicSettings.mutateAsync(apiData);
  };

  // Booking conditions management functions
  const addBookingCondition = () => {
    setFormData((prev) => ({
      ...prev,
      bookingConditions: [...prev.bookingConditions, { nameL: '', nameF: '' }],
    }));
  };

  const updateBookingCondition = (
    index: number,
    field: 'nameL' | 'nameF',
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      bookingConditions: prev.bookingConditions.map((condition, i) =>
        i === index ? { ...condition, [field]: value } : condition
      ),
    }));
  };

  const deleteBookingCondition = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      bookingConditions: prev.bookingConditions.filter((_, i) => i !== index),
    }));
  };

  const ToggleSwitch = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );

  // Options for form selects using translations
  const appointmentDurationOptions = [
    {
      value: '15',
      label: t('clinic.settings.appointments.durationOptions.15'),
    },
    {
      value: '30',
      label: t('clinic.settings.appointments.durationOptions.30'),
    },
    {
      value: '45',
      label: t('clinic.settings.appointments.durationOptions.45'),
    },
    {
      value: '60',
      label: t('clinic.settings.appointments.durationOptions.60'),
    },
  ];

  const reminderHoursOptions = [
    { value: '1', label: t('clinic.settings.notifications.reminderOptions.1') },
    { value: '2', label: t('clinic.settings.notifications.reminderOptions.2') },
    { value: '6', label: t('clinic.settings.notifications.reminderOptions.6') },
    {
      value: '12',
      label: t('clinic.settings.notifications.reminderOptions.12'),
    },
    {
      value: '24',
      label: t('clinic.settings.notifications.reminderOptions.24'),
    },
    {
      value: '48',
      label: t('clinic.settings.notifications.reminderOptions.48'),
    },
  ];

  const languageOptions = [
    { value: 'ar', label: t('clinic.settings.system.languageOptions.ar') },
    { value: 'en', label: t('clinic.settings.system.languageOptions.en') },
    // { value: 'fr', label: t('clinic.settings.system.languageOptions.fr') },
  ];

  const timezoneOptions = [
    {
      value: 'Asia/Riyadh',
      label: t('clinic.settings.system.timezoneOptions.Asia/Riyadh'),
    },
    {
      value: 'Asia/Dubai',
      label: t('clinic.settings.system.timezoneOptions.Asia/Dubai'),
    },
    {
      value: 'Asia/Kuwait',
      label: t('clinic.settings.system.timezoneOptions.Asia/Kuwait'),
    },
    {
      value: 'Asia/Qatar',
      label: t('clinic.settings.system.timezoneOptions.Asia/Qatar'),
    },
    {
      value: 'Asia/Bahrain',
      label: t('clinic.settings.system.timezoneOptions.Asia/Bahrain'),
    },
    {
      value: 'Asia/Oman',
      label: t('clinic.settings.system.timezoneOptions.Asia/Oman'),
    },
    {
      value: 'Asia/Amman',
      label: t('clinic.settings.system.timezoneOptions.Asia/Amman'),
    },
    {
      value: 'Asia/Beirut',
      label: t('clinic.settings.system.timezoneOptions.Asia/Beirut'),
    },
    {
      value: 'Asia/Damascus',
      label: t('clinic.settings.system.timezoneOptions.Asia/Damascus'),
    },
    {
      value: 'Asia/Baghdad',
      label: t('clinic.settings.system.timezoneOptions.Asia/Baghdad'),
    },
    {
      value: 'Asia/Tehran',
      label: t('clinic.settings.system.timezoneOptions.Asia/Tehran'),
    },
    {
      value: 'Asia/Jerusalem',
      label: t('clinic.settings.system.timezoneOptions.Asia/Jerusalem'),
    },
    {
      value: 'Africa/Cairo',
      label: t('clinic.settings.system.timezoneOptions.Africa/Cairo'),
    },
    {
      value: 'Africa/Casablanca',
      label: t('clinic.settings.system.timezoneOptions.Africa/Casablanca'),
    },
    {
      value: 'Africa/Algiers',
      label: t('clinic.settings.system.timezoneOptions.Africa/Algiers'),
    },
    {
      value: 'Africa/Tunis',
      label: t('clinic.settings.system.timezoneOptions.Africa/Tunis'),
    },
    {
      value: 'Africa/Tripoli',
      label: t('clinic.settings.system.timezoneOptions.Africa/Tripoli'),
    },
    {
      value: 'Europe/London',
      label: t('clinic.settings.system.timezoneOptions.Europe/London'),
    },
    {
      value: 'Europe/Paris',
      label: t('clinic.settings.system.timezoneOptions.Europe/Paris'),
    },
    {
      value: 'Europe/Berlin',
      label: t('clinic.settings.system.timezoneOptions.Europe/Berlin'),
    },
    {
      value: 'Europe/Rome',
      label: t('clinic.settings.system.timezoneOptions.Europe/Rome'),
    },
    {
      value: 'Europe/Madrid',
      label: t('clinic.settings.system.timezoneOptions.Europe/Madrid'),
    },
    {
      value: 'Europe/Amsterdam',
      label: t('clinic.settings.system.timezoneOptions.Europe/Amsterdam'),
    },
    {
      value: 'Europe/Brussels',
      label: t('clinic.settings.system.timezoneOptions.Europe/Brussels'),
    },
    {
      value: 'Europe/Vienna',
      label: t('clinic.settings.system.timezoneOptions.Europe/Vienna'),
    },
    {
      value: 'Europe/Zurich',
      label: t('clinic.settings.system.timezoneOptions.Europe/Zurich'),
    },
    {
      value: 'Europe/Stockholm',
      label: t('clinic.settings.system.timezoneOptions.Europe/Stockholm'),
    },
    {
      value: 'Europe/Oslo',
      label: t('clinic.settings.system.timezoneOptions.Europe/Oslo'),
    },
    {
      value: 'Europe/Copenhagen',
      label: t('clinic.settings.system.timezoneOptions.Europe/Copenhagen'),
    },
    {
      value: 'Europe/Helsinki',
      label: t('clinic.settings.system.timezoneOptions.Europe/Helsinki'),
    },
    {
      value: 'Europe/Warsaw',
      label: t('clinic.settings.system.timezoneOptions.Europe/Warsaw'),
    },
    {
      value: 'Europe/Prague',
      label: t('clinic.settings.system.timezoneOptions.Europe/Prague'),
    },
    {
      value: 'Europe/Budapest',
      label: t('clinic.settings.system.timezoneOptions.Europe/Budapest'),
    },
    {
      value: 'Europe/Athens',
      label: t('clinic.settings.system.timezoneOptions.Europe/Athens'),
    },
    {
      value: 'Europe/Istanbul',
      label: t('clinic.settings.system.timezoneOptions.Europe/Istanbul'),
    },
    {
      value: 'Europe/Moscow',
      label: t('clinic.settings.system.timezoneOptions.Europe/Moscow'),
    },
    {
      value: 'America/New_York',
      label: t('clinic.settings.system.timezoneOptions.America/New_York'),
    },
    {
      value: 'America/Chicago',
      label: t('clinic.settings.system.timezoneOptions.America/Chicago'),
    },
    {
      value: 'America/Denver',
      label: t('clinic.settings.system.timezoneOptions.America/Denver'),
    },
    {
      value: 'America/Los_Angeles',
      label: t('clinic.settings.system.timezoneOptions.America/Los_Angeles'),
    },
    {
      value: 'America/Toronto',
      label: t('clinic.settings.system.timezoneOptions.America/Toronto'),
    },
    {
      value: 'America/Vancouver',
      label: t('clinic.settings.system.timezoneOptions.America/Vancouver'),
    },
    {
      value: 'America/Mexico_City',
      label: t('clinic.settings.system.timezoneOptions.America/Mexico_City'),
    },
    {
      value: 'Asia/Tokyo',
      label: t('clinic.settings.system.timezoneOptions.Asia/Tokyo'),
    },
    {
      value: 'Asia/Shanghai',
      label: t('clinic.settings.system.timezoneOptions.Asia/Shanghai'),
    },
    {
      value: 'Asia/Seoul',
      label: t('clinic.settings.system.timezoneOptions.Asia/Seoul'),
    },
    {
      value: 'Asia/Singapore',
      label: t('clinic.settings.system.timezoneOptions.Asia/Singapore'),
    },
    {
      value: 'Asia/Bangkok',
      label: t('clinic.settings.system.timezoneOptions.Asia/Bangkok'),
    },
    {
      value: 'Asia/Manila',
      label: t('clinic.settings.system.timezoneOptions.Asia/Manila'),
    },
    {
      value: 'Asia/Jakarta',
      label: t('clinic.settings.system.timezoneOptions.Asia/Jakarta'),
    },
    {
      value: 'Asia/Kuala_Lumpur',
      label: t('clinic.settings.system.timezoneOptions.Asia/Kuala_Lumpur'),
    },
    {
      value: 'Asia/Ho_Chi_Minh',
      label: t('clinic.settings.system.timezoneOptions.Asia/Ho_Chi_Minh'),
    },
    {
      value: 'Asia/Hong_Kong',
      label: t('clinic.settings.system.timezoneOptions.Asia/Hong_Kong'),
    },
    {
      value: 'Asia/Taipei',
      label: t('clinic.settings.system.timezoneOptions.Asia/Taipei'),
    },
    {
      value: 'Asia/Kolkata',
      label: t('clinic.settings.system.timezoneOptions.Asia/Kolkata'),
    },
    {
      value: 'Asia/Dhaka',
      label: t('clinic.settings.system.timezoneOptions.Asia/Dhaka'),
    },
    {
      value: 'Asia/Karachi',
      label: t('clinic.settings.system.timezoneOptions.Asia/Karachi'),
    },
    {
      value: 'Asia/Tashkent',
      label: t('clinic.settings.system.timezoneOptions.Asia/Tashkent'),
    },
    {
      value: 'Asia/Almaty',
      label: t('clinic.settings.system.timezoneOptions.Asia/Almaty'),
    },
    {
      value: 'Australia/Sydney',
      label: t('clinic.settings.system.timezoneOptions.Australia/Sydney'),
    },
    {
      value: 'Australia/Melbourne',
      label: t('clinic.settings.system.timezoneOptions.Australia/Melbourne'),
    },
    {
      value: 'Australia/Perth',
      label: t('clinic.settings.system.timezoneOptions.Australia/Perth'),
    },
    {
      value: 'Australia/Brisbane',
      label: t('clinic.settings.system.timezoneOptions.Australia/Brisbane'),
    },
    {
      value: 'Australia/Adelaide',
      label: t('clinic.settings.system.timezoneOptions.Australia/Adelaide'),
    },
    {
      value: 'Pacific/Auckland',
      label: t('clinic.settings.system.timezoneOptions.Pacific/Auckland'),
    },
    {
      value: 'America/Sao_Paulo',
      label: t('clinic.settings.system.timezoneOptions.America/Sao_Paulo'),
    },
    {
      value: 'America/Argentina/Buenos_Aires',
      label: t(
        'clinic.settings.system.timezoneOptions.America/Argentina/Buenos_Aires'
      ),
    },
    {
      value: 'America/Santiago',
      label: t('clinic.settings.system.timezoneOptions.America/Santiago'),
    },
    {
      value: 'America/Lima',
      label: t('clinic.settings.system.timezoneOptions.America/Lima'),
    },
    {
      value: 'America/Bogota',
      label: t('clinic.settings.system.timezoneOptions.America/Bogota'),
    },
    {
      value: 'America/Caracas',
      label: t('clinic.settings.system.timezoneOptions.America/Caracas'),
    },
  ];

  // Show loading state while fetching settings
  if (isSettingsLoading) {
    return (
      <PageLayout>
        <div className="w-auto space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('clinic.settings.title')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('clinic.settings.description')}
                </p>
              </div>
            </div>
          </div>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading clinic.settings...
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Show error state if settings failed to load
  if (settingsError) {
    return (
      <PageLayout>
        <div className="w-auto space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-lg">
                <Settings className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('clinic.settings.title')}
                </h1>
                <p className="text-red-600 dark:text-red-400">
                  Error loading settings: {settingsError.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="w-auto space-y-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('clinic.settings.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('clinic.settings.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Appointment Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('clinic.settings.appointments.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('clinic.settings.appointments.description')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label={t('clinic.settings.appointments.duration')}
              options={appointmentDurationOptions}
              value={String(formData.appointmentDuration || 30)}
              onChange={(e) =>
                handleInputChange('appointmentDuration', Number(e.target.value))
              }
            />

            <Input
              label={t('clinic.settings.appointments.maxAdvanceBooking')}
              type="number"
              value={formData.maxAdvanceBookingDays}
              onChange={(e) =>
                handleInputChange(
                  'maxAdvanceBookingDays',
                  Number(e.target.value)
                )
              }
              min={1}
              max={365}
            />

            <Input
              label={t('clinic.settings.appointments.cancellationHours')}
              type="number"
              value={formData.cancellationHours}
              onChange={(e) =>
                handleInputChange('cancellationHours', Number(e.target.value))
              }
              min={1}
              max={168}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {/* {t('clinic.settings.appointments.allowOnlineBooking')} */}
                  {t('clinic.settings.appointments.allowOnlineBooking')}
                </span>
                <ToggleSwitch
                  checked={formData.allowOnlineBooking}
                  onChange={(checked) =>
                    handleInputChange('allowOnlineBooking', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('clinic.settings.appointments.requireApproval')}
                </span>
                <ToggleSwitch
                  checked={formData.requireApproval}
                  onChange={(checked) =>
                    handleInputChange('requireApproval', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Repeat className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('clinic.settings.appointments.allowRecurring')}
                  </span>
                </div>
                <ToggleSwitch
                  checked={formData.allowRecurring}
                  onChange={(checked) =>
                    handleInputChange('allowRecurring', checked)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Booking Conditions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('clinic.settings.bookingConditions.title')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('clinic.settings.bookingConditions.description')}
                </p>
              </div>
            </div>
            <Button
              onClick={addBookingCondition}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm"
            >
              <Plus className="w-4 h-4" />
              إضافة شرط
            </Button>
          </div>

          {/* Language Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <button
              onClick={() => setSelectedLanguage('ar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedLanguage === 'ar'
                  ? 'bg-white dark:bg-gray-600 text-orange-600 dark:text-orange-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="text-base">🇸🇦</span>
              العربية
            </button>
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedLanguage === 'en'
                  ? 'bg-white dark:bg-gray-600 text-orange-600 dark:text-orange-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="text-base">🇺🇸</span>
              English
            </button>
          </div>

          <div className="space-y-4">
            {formData.bookingConditions.map((condition, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <Input
                    value={
                      selectedLanguage === 'ar'
                        ? condition.nameL
                        : condition.nameF
                    }
                    onChange={(e) =>
                      updateBookingCondition(
                        index,
                        selectedLanguage === 'ar' ? 'nameL' : 'nameF',
                        e.target.value
                      )
                    }
                    placeholder={
                      selectedLanguage === 'ar'
                        ? 'أدخل شرط الحجز...'
                        : 'Enter booking condition...'
                    }
                    className="border-0 bg-transparent focus:ring-0 p-3 text-gray-900 dark:text-white"
                    dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
                <Button
                  onClick={() => deleteBookingCondition(index)}
                  className="flex-shrink-0 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  disabled={formData.bookingConditions.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            {formData.bookingConditions.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">
                  {t('clinic.settings.bookingConditions.noConditions')}
                </p>
                <p className="text-xs mt-1">
                  {t(
                    'clinic.settings.bookingConditions.noConditionsDescription'
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <Bell className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('clinic.settings.notifications.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('clinic.settings.notifications.description')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('clinic.settings.notifications.emailNotifications')}
                  </span>
                </div>
                <ToggleSwitch
                  checked={formData.emailNotifications}
                  onChange={(checked) =>
                    handleInputChange('emailNotifications', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('clinic.settings.notifications.smsNotifications')}
                  </span>
                </div>
                <ToggleSwitch
                  checked={formData.smsNotifications}
                  onChange={(checked) =>
                    handleInputChange('smsNotifications', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('clinic.settings.notifications.pushNotifications')}
                  </span>
                </div>
                <ToggleSwitch
                  checked={formData.pushNotifications}
                  onChange={(checked) =>
                    handleInputChange('pushNotifications', checked)
                  }
                />
              </div>
            </div>

            <Select
              label={t('clinic.settings.notifications.reminderTiming')}
              options={reminderHoursOptions}
              value={String(formData.reminderHours || 24)}
              onChange={(e) =>
                handleInputChange('reminderHours', Number(e.target.value))
              }
            />
          </div>
        </div>

        {/* System Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('clinic.settings.system.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('clinic.settings.system.description')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label={t('clinic.settings.system.defaultCurrency')}
              options={currencies || []}
              value={formData.defaultCurrency || ''}
              onChange={(e) =>
                handleInputChange('defaultCurrency', e.target.value)
              }
              startIcon={<CreditCard className="w-4 h-4" />}
            />

            <Select
              label={t('clinic.settings.system.defaultLanguage')}
              options={languageOptions}
              value={formData.defaultLanguage || 'ar'}
              onChange={(e) =>
                handleInputChange('defaultLanguage', e.target.value)
              }
            />

            <Select
              label={t('clinic.settings.system.timezone')}
              options={timezoneOptions}
              value={formData.timezone || 'Asia/Riyadh'}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              startIcon={<Clock className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            isLoading={saveClinicSettings.isPending}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {t('clinic.settings.saveSettings')}
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
