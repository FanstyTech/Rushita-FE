'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useOtp } from '@/lib/api/hooks/useOtp';
import { useCountry } from '@/lib/api/hooks/useCountry';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { ArrowLeft } from 'lucide-react';
import { RegistrationForm } from '../../../components/patient-portal/auth/RegistrationForm';
import { VerificationForm } from '../../../components/patient-portal/auth/VerificationForm';
import { PhoneInputForm } from '../../../components/patient-portal/auth/PhoneInputForm';
import { LoginForm } from '../../../components/patient-portal/auth/LoginForm';
import { OtpType } from '@/lib/api/types/otp';

// Authentication steps
enum AuthStep {
  PHONE_INPUT = 'phone_input',
  PASSWORD_INPUT = 'password_input',
  VERIFICATION_CODE = 'verification_code',
  REGISTRATION_FORM = 'registration_form',
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const slideVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  exit: {
    x: -50,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export default function AuthPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { login } = useAuth();
  const { useCountryPhoneCodes } = useCountry();
  const { checkUser, sendOtp, verifyOtp } = useOtp();

  // Fetch country phone codes
  const { data: countryPhoneCodes, isLoading: isLoadingCountries } =
    useCountryPhoneCodes();

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<AuthStep>(
    AuthStep.PHONE_INPUT
  );
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isInvalidCode, setIsInvalidCode] = useState(false);

  // Form state
  const [phoneForm, setPhoneForm] = useState({
    phoneCode: '+966', // Default to Saudi Arabia
    phoneNumber: '',
    countryCodeId: '', // Will be set when country codes are loaded
  });

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Set default country code when country codes are loaded
  useEffect(() => {
    if (countryPhoneCodes && countryPhoneCodes.length > 0) {
      const defaultCountry =
        countryPhoneCodes.find((c) => c.label === '+966') ||
        countryPhoneCodes[0];
      setPhoneForm((prev) => ({
        ...prev,
        countryCodeId: defaultCountry.value,
      }));
    }
  }, [countryPhoneCodes]);
  // Handle countdown for resend code
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendCountdown]);

  // Handle phone submission
  const handlePhoneSubmit = async (phoneCode: string, phoneNumber: string) => {
    setErrors({});

    // Find the country code ID for the selected phone code
    const selectedCountry = countryPhoneCodes?.find(
      (c) => c.value === phoneCode
    );
    if (!selectedCountry) {
      setErrors({ form: 'Invalid country code selected' });
      return;
    }

    setPhoneForm({
      phoneCode,
      phoneNumber,
      countryCodeId: selectedCountry.value || '',
    });

    try {
      setIsLoading(true);

      const userExists = await checkUser.mutateAsync({
        countryCodeId: selectedCountry.value,
        phoneNumber: phoneNumber,
      });

      if (userExists) {
        setCurrentStep(AuthStep.PASSWORD_INPUT);
      } else {
        await sendVerificationCode(selectedCountry.value, phoneNumber);
        setCurrentStep(AuthStep.VERIFICATION_CODE);
      }
    } catch (error: unknown) {
      // تحقق من النوع قبل الوصول لـ message
      const message =
        error instanceof Error
          ? error.message
          : 'حدث خطأ أثناء التحقق من رقم الهاتف. يرجى المحاولة مرة أخرى.';

      setErrors((prev) => ({
        ...prev,
        form: message,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Send verification code
  const sendVerificationCode = async (
    countryCodeId: string,
    phoneNumber: string
  ) => {
    await sendOtp.mutateAsync({
      countryCodeId: countryCodeId,
      phoneNumber: phoneNumber,
      type: OtpType.Registration,
    });

    setResendCountdown(60); // 60 seconds countdown
  };

  // Handle verification code submission
  const handleVerificationSubmit = async (otp: string) => {
    setIsLoading(true);
    setIsInvalidCode(false);

    try {
      const result = await verifyOtp.mutateAsync({
        countryCodeId: phoneForm.countryCodeId,
        phoneNumber: phoneForm.phoneNumber,
        code: otp,
        type: OtpType.Registration,
      });

      if (result?.isNewUser) {
        // Store the OTP code for registration
        localStorage.setItem('currentOtpCode', otp);
        // New user - go to registration step
        setCurrentStep(AuthStep.REGISTRATION_FORM);
      } else {
        // Existing user - login successful, redirect to dashboard
        if (result?.token) {
          // Store tokens and redirect
          localStorage.setItem('accessToken', result.token);
          if (result.refreshToken) {
            localStorage.setItem('refreshToken', result.refreshToken);
          }
          router.push('/patient-portal/dashboard');
        }
      }
    } catch {
      setIsInvalidCode(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLoginSubmit = async (password: string) => {
    const data = {
      countryCodeId: phoneForm.countryCodeId,
      phoneNumber: phoneForm.phoneNumber,
      password: password,
    };

    // Call the login mutation from the useAuth hook
    await login.mutateAsync(data, {
      onSuccess: () => {
        // Get the user's role and redirect to appropriate dashboard
        const dashboardPath = '/patient-portal/dashboard';

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

  // Go back to previous step
  const goBack = () => {
    if (
      currentStep === AuthStep.PASSWORD_INPUT ||
      currentStep === AuthStep.VERIFICATION_CODE
    ) {
      setCurrentStep(AuthStep.PHONE_INPUT);
    } else if (currentStep === AuthStep.REGISTRATION_FORM) {
      setCurrentStep(AuthStep.VERIFICATION_CODE);
    }
  };

  // Render step title and description
  // Translations for page content
  const translations = {
    ar: {
      login: 'تسجيل الدخول',
      enterPhone: 'أدخل رقم هاتفك للمتابعة',
      enterPassword: 'أدخل كلمة المرور',
      enterPasswordDesc: 'يرجى إدخال كلمة المرور الخاصة بك',
      verificationCode: 'رمز التحقق',
      verificationCodeSent: (phoneCode: string, phoneNumber: string) =>
        `تم إرسال رمز التحقق إلى ${phoneCode}${phoneNumber}`,
      createAccount: 'إنشاء حساب',
      completePersonalInfo: 'أكمل معلوماتك الشخصية',
      appDescription: 'إدارة صحتك بسهولة ومتابعة حالتك الطبية',
      copyright: (year: number) =>
        `${year} Rousheta Health. جميع الحقوق محفوظة.`,
    },
    en: {
      login: 'Login',
      enterPhone: 'Enter your phone number to continue',
      enterPassword: 'Enter Password',
      enterPasswordDesc: 'Please enter your password',
      verificationCode: 'Verification Code',
      verificationCodeSent: (phoneCode: string, phoneNumber: string) =>
        `Verification code sent to ${phoneCode}${phoneNumber}`,
      createAccount: 'Create Account',
      completePersonalInfo: 'Complete your personal information',
      appDescription:
        'Manage your health easily and track your medical condition',
      copyright: (year: number) =>
        `${year} Rousheta Health. All rights reserved.`,
    },
    es: {
      login: 'Iniciar sesión',
      enterPhone: 'Ingrese su número de teléfono para continuar',
      enterPassword: 'Ingrese su contraseña',
      enterPasswordDesc: 'Por favor ingrese su contraseña',
      verificationCode: 'Código de verificación',
      verificationCodeSent: (phoneCode: string, phoneNumber: string) =>
        `Código de verificación enviado a ${phoneCode}${phoneNumber}`,
      createAccount: 'Crear cuenta',
      completePersonalInfo: 'Complete su información personal',
      appDescription:
        'Gestione su salud fácilmente y haga seguimiento de su condición médica',
      copyright: (year: number) =>
        `${year} Rousheta Health. Todos los derechos reservados.`,
    },
  };

  const t =
    translations[language as keyof typeof translations] || translations.ar;
  // Transform country codes for the phone input component
  const phoneCodes =
    countryPhoneCodes?.map((country) => ({
      value: country.value,
      label: country.label,
      flag: country.flag?.toLowerCase(),
    })) || [];

  const renderStepHeader = () => {
    switch (currentStep) {
      case AuthStep.PHONE_INPUT:
        return {
          title: t.login,
          description: t.enterPhone,
        };
      case AuthStep.PASSWORD_INPUT:
        return {
          title: t.enterPassword,
          description: t.enterPasswordDesc,
        };
      case AuthStep.VERIFICATION_CODE:
        return {
          title: t.verificationCode,
          description: t.verificationCodeSent(
            phoneCodes?.find((c) => c.value === phoneForm.countryCodeId)
              ?.label || phoneForm.phoneCode,
            phoneForm.phoneNumber
          ),
        };
      case AuthStep.REGISTRATION_FORM:
        return {
          title: t.createAccount,
          description: t.completePersonalInfo,
        };
      default:
        return {
          title: t.login,
          description: t.enterPhone,
        };
    }
  };

  const { title, description } = renderStepHeader();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-background p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <motion.div
        className="w-full max-w-md space-y-6 "
        variants={itemVariants}
      >
        {/* Logo and title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">Rousheta</span>
            <span className="text-3xl font-medium ml-1">Health</span>
          </div>

          <p className="text-sm text-muted-foreground">{t.appDescription}</p>
        </div>

        {/* Auth Card */}
        <motion.div className="w-full" variants={slideVariants}>
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center">
                {currentStep !== AuthStep.PHONE_INPUT && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goBack}
                    className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-8 w-8`}
                  >
                    <ArrowLeft
                      className={`h-4 w-4 ${
                        language === 'ar' ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>
                )}
                <div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </div>
              </div>
            </CardHeader>

            {errors.form && (
              <div className="px-6 -mt-2">
                <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                  {errors.form}
                </div>
              </div>
            )}

            {/* Phone Input Step */}
            {currentStep === AuthStep.PHONE_INPUT && (
              <PhoneInputForm
                phoneCodes={phoneCodes}
                countryCodeId={phoneForm.countryCodeId}
                onSubmit={handlePhoneSubmit}
                isLoading={isLoading || isLoadingCountries}
              />
            )}

            {/* Password Input Step */}
            {currentStep === AuthStep.PASSWORD_INPUT && (
              <LoginForm
                phoneNumber={phoneForm.phoneNumber}
                phoneCode={phoneForm.phoneCode}
                handleLoginSubmit={handleLoginSubmit}
                isLoading={login.isPending}
              />
            )}

            {/* Verification Code Step */}
            {currentStep === AuthStep.VERIFICATION_CODE && (
              <VerificationForm
                phoneNumber={phoneForm.phoneNumber}
                phoneCodeLabel={
                  phoneCodes.find((c) => c.value === phoneForm.countryCodeId)
                    ?.label || phoneForm.phoneCode
                }
                onSubmit={handleVerificationSubmit}
                onResendCode={() =>
                  sendVerificationCode(
                    phoneForm.countryCodeId,
                    phoneForm.phoneNumber
                  )
                }
                isInvalidCode={isInvalidCode}
                isLoading={isLoading}
              />
            )}

            {/* Registration Form Step - تم تحديثه لاستخدام React Hook Form مع Zod للتحقق من الصحة */}
            {currentStep === AuthStep.REGISTRATION_FORM && (
              <RegistrationForm
                phoneNumber={phoneForm.phoneNumber}
                countryCodeId={phoneForm.countryCodeId}
              />
            )}
          </Card>
        </motion.div>

        <div className="text-center text-sm text-muted-foreground">
          &copy; {t.copyright(new Date().getFullYear())}
        </div>
      </motion.div>
    </motion.div>
  );
}
