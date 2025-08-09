'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { useLanguage } from '@/i18n/LanguageProvider';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { ArrowLeft } from 'lucide-react';
import { RegistrationForm } from './components/RegistrationForm';
import { VerificationForm } from './components/VerificationForm';
import { PhoneInputForm } from './components/PhoneInputForm';
import { LoginForm } from './components/LoginForm';

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

const phoneCodes = [
  { value: '+966', label: 'Saudi Arabia', flag: 'sa' },
  { value: '+971', label: 'United Arab Emirates', flag: 'ae' },
  { value: '+974', label: 'Qatar', flag: 'qa' },
  { value: '+973', label: 'Bahrain', flag: 'bh' },
  { value: '+965', label: 'Kuwait', flag: 'kw' },
  { value: '+968', label: 'Oman', flag: 'om' },
  { value: '+962', label: 'Jordan', flag: 'jo' },
  { value: '+20', label: 'Egypt', flag: 'eg' },
  { value: '+961', label: 'Lebanon', flag: 'lb' },
  { value: '+1', label: 'United States', flag: 'us' },
  { value: '+44', label: 'United Kingdom', flag: 'gb' },
];

export default function AuthPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { language } = useLanguage();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState<AuthStep>(
    AuthStep.PHONE_INPUT
  );
  const [isExistingUser, setIsExistingUser] = useState<boolean | null>(null);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isInvalidCode, setIsInvalidCode] = useState(false);

  // Form state
  const [phoneForm, setPhoneForm] = useState({
    phoneCode: '+966', // Default to Saudi Arabia
    phoneNumber: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    password: '',
  });

  const [verificationForm, setVerificationForm] = useState({
    code: '',
  });

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle countdown for resend code
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendCountdown]);

  // Handle phone submission
  const handlePhoneSubmit = async (phoneCode: string, phoneNumber: string) => {
    setErrors({});
    setPhoneForm({ phoneCode, phoneNumber });
    try {
      setIsLoading(true);
      // In a real app, this would call the API to check if the user exists
      // For now, we'll simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate checking if user exists (random for demo)
      const userExists = false;
      if (userExists) {
        // If user exists, go to password step
        setCurrentStep(AuthStep.PASSWORD_INPUT);
      } else {
        // If user doesn't exist, send verification code and go to verification step
        await sendVerificationCode();
        setCurrentStep(AuthStep.VERIFICATION_CODE);
      }
    } catch (error) {
      console.error('Phone verification error:', error);
      setErrors((prev) => ({
        ...prev,
        form: 'حدث خطأ أثناء التحقق من رقم الهاتف. يرجى المحاولة مرة أخرى.',
      }));
    } finally {
      setIsLoading(false);
    }
  };
  // Send verification code
  const sendVerificationCode = async () => {
    try {
      // In a real app, this would call the API to send a verification code
      await new Promise((resolve) => setTimeout(resolve, 500));
      setVerificationCodeSent(true);
      setResendDisabled(true);
      setResendCountdown(60); // 60 seconds countdown
    } catch (error) {
      console.error('Error sending verification code:', error);
      setErrors((prev) => ({
        ...prev,
        form: 'فشل إرسال رمز التحقق. يرجى المحاولة مرة أخرى.',
      }));
    }
  };

  // Handle verification code submission
  const handleVerificationSubmit = (otp: string) => {
    setIsLoading(true);
    // Simulate API call to verify code
    setTimeout(() => {
      // For demo: if code is 123456, consider it valid
      if (otp === '123456') {
        // Reset invalid state
        setIsInvalidCode(false);

        if (isExistingUser) {
          router.push('/patient-portal/dashboard');
        } else {
          // New user - go to registration step
          setCurrentStep(AuthStep.REGISTRATION_FORM);
        }
      } else {
        // Invalid code - set invalid state instead of error
        setIsInvalidCode(true);
      }
      setIsLoading(false);
    }, 1500);
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
        `${year} Rushita Health. جميع الحقوق محفوظة.`,
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
        `${year} Rushita Health. All rights reserved.`,
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
        `${year} Rushita Health. Todos los derechos reservados.`,
    },
  };

  const t =
    translations[language as keyof typeof translations] || translations.ar;

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
            phoneForm.phoneCode,
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
      <motion.div className="w-full max-w-md space-y-6" variants={itemVariants}>
        {/* Logo and title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">Rushita</span>
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
                isLoading={isLoading}
                onSubmit={handlePhoneSubmit}
              />
            )}

            {/* Password Input Step */}
            {currentStep === AuthStep.PASSWORD_INPUT && (
              <LoginForm
                phoneNumber={phoneForm.phoneNumber}
                phoneCode={phoneForm.phoneCode}
              />
            )}

            {/* Verification Code Step */}
            {currentStep === AuthStep.VERIFICATION_CODE && (
              <VerificationForm
                phoneNumber={phoneForm.phoneNumber}
                phoneCode={phoneForm.phoneCode}
                onSubmit={handleVerificationSubmit}
                onResendCode={sendVerificationCode}
                isInvalidCode={isInvalidCode}
                isLoading={isLoading}
              />
            )}

            {/* Registration Form Step - تم تحديثه لاستخدام React Hook Form مع Zod للتحقق من الصحة */}
            {currentStep === AuthStep.REGISTRATION_FORM && (
              <RegistrationForm
                phoneNumber={phoneForm.phoneNumber}
                phoneCode={phoneForm.phoneCode}
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
