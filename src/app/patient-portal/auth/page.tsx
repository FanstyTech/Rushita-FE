'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ThemeToggle from '@/components/ThemeToggle';
import { Eye, EyeOff, Mail, Lock, Phone } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    fileNumber: '', // Medical file number to link with existing records
  });

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    if (!loginForm.email) {
      setErrors((prev) => ({ ...prev, email: 'البريد الإلكتروني مطلوب' }));
      return;
    }

    if (!loginForm.password) {
      setErrors((prev) => ({ ...prev, password: 'كلمة المرور مطلوبة' }));
      return;
    }

    try {
      setIsLoading(true);
      // In a real app, this would call the actual login API
      // For now, we'll simulate a successful login after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful login
      console.log('Login with:', loginForm);

      // Navigate to dashboard after successful login
      router.push('/patient-portal/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrors((prev) => ({
        ...prev,
        form: 'فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    if (!registerForm.name) {
      setErrors((prev) => ({ ...prev, name: 'الاسم مطلوب' }));
      return;
    }

    if (!registerForm.email) {
      setErrors((prev) => ({ ...prev, email: 'البريد الإلكتروني مطلوب' }));
      return;
    }

    if (!registerForm.phone) {
      setErrors((prev) => ({ ...prev, phone: 'رقم الهاتف مطلوب' }));
      return;
    }

    if (!registerForm.password) {
      setErrors((prev) => ({ ...prev, password: 'كلمة المرور مطلوبة' }));
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'كلمات المرور غير متطابقة',
      }));
      return;
    }

    if (!registerForm.fileNumber) {
      setErrors((prev) => ({ ...prev, fileNumber: 'رقم الملف الطبي مطلوب' }));
      return;
    }

    try {
      setIsLoading(true);
      // In a real app, this would call the actual registration API
      // For now, we'll simulate a successful registration after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate successful registration
      console.log('Register with:', registerForm);

      // Switch to login tab after successful registration
      setActiveTab('login');
      setLoginForm({
        email: registerForm.email,
        password: registerForm.password,
      });
    } catch (error) {
      console.error('Registration error:', error);
      setErrors((prev) => ({
        ...prev,
        form: 'فشل التسجيل. يرجى المحاولة مرة أخرى.',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Logo and title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">Rushita</span>
            <span className="text-3xl font-medium ml-1">Health</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            بورتل المرضى
          </h1>
          <p className="text-sm text-muted-foreground">
            إدارة صحتك بسهولة ومتابعة حالتك الطبية
          </p>
        </div>

        {/* Auth tabs */}
        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'login' | 'register')}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
            <TabsTrigger value="register">إنشاء حساب</TabsTrigger>
          </TabsList>

          {/* Login tab */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>تسجيل الدخول</CardTitle>
                <CardDescription>
                  أدخل بيانات الدخول للوصول إلى حسابك
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLoginSubmit}>
                <CardContent className="space-y-4">
                  {errors.form && (
                    <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                      {errors.form}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className={`pl-8 ${
                          errors.email ? 'border-destructive' : ''
                        }`}
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, email: e.target.value })
                        }
                        dir="ltr"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-destructive text-xs">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">كلمة المرور</Label>
                      <a
                        href="#"
                        className="text-xs text-primary hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle forgot password
                        }}
                      >
                        نسيت كلمة المرور؟
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className={`pl-8 pr-10 ${
                          errors.password ? 'border-destructive' : ''
                        }`}
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        }
                        dir="ltr"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-destructive text-xs">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                        جاري تسجيل الدخول...
                      </>
                    ) : (
                      'تسجيل الدخول'
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Register tab */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>إنشاء حساب جديد</CardTitle>
                <CardDescription>
                  أدخل بياناتك لإنشاء حساب في بورتل المرضى
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegisterSubmit}>
                <CardContent className="space-y-4">
                  {errors.form && (
                    <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                      {errors.form}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                      id="name"
                      placeholder="الاسم الكامل"
                      className={errors.name ? 'border-destructive' : ''}
                      value={registerForm.name}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          name: e.target.value,
                        })
                      }
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="your@email.com"
                        className={`pl-8 ${
                          errors.email ? 'border-destructive' : ''
                        }`}
                        value={registerForm.email}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            email: e.target.value,
                          })
                        }
                        dir="ltr"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-destructive text-xs">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <div className="relative">
                      <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="05xxxxxxxx"
                        className={`pl-8 ${
                          errors.phone ? 'border-destructive' : ''
                        }`}
                        value={registerForm.phone}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            phone: e.target.value,
                          })
                        }
                        dir="ltr"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-destructive text-xs">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fileNumber">رقم الملف الطبي</Label>
                    <Input
                      id="fileNumber"
                      placeholder="أدخل رقم ملفك الطبي"
                      className={errors.fileNumber ? 'border-destructive' : ''}
                      value={registerForm.fileNumber}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          fileNumber: e.target.value,
                        })
                      }
                      dir="ltr"
                    />
                    {errors.fileNumber && (
                      <p className="text-destructive text-xs">
                        {errors.fileNumber}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      يمكنك الحصول على رقم الملف الطبي من استقبال العيادة
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">كلمة المرور</Label>
                    <div className="relative">
                      <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        className={`pl-8 pr-10 ${
                          errors.password ? 'border-destructive' : ''
                        }`}
                        value={registerForm.password}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            password: e.target.value,
                          })
                        }
                        dir="ltr"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-destructive text-xs">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                    <Input
                      id="confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      className={
                        errors.confirmPassword ? 'border-destructive' : ''
                      }
                      value={registerForm.confirmPassword}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      dir="ltr"
                    />
                    {errors.confirmPassword && (
                      <p className="text-destructive text-xs">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                        جاري إنشاء الحساب...
                      </>
                    ) : (
                      'إنشاء حساب'
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Rushita Health. جميع الحقوق محفوظة.
        </div>
      </div>
    </div>
  );
}
