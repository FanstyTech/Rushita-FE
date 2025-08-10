'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/common/form';
import { CardContent, CardFooter } from '@/components/ui/card';

interface LoginFormProps {
  phoneNumber: string;
  phoneCode: string;
  handleLoginSubmit: (e: string) => void;
  isLoading: boolean;
}

export function LoginForm({ handleLoginSubmit, isLoading }: LoginFormProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    handleLoginSubmit(password);
  };

  return (
    <form onSubmit={handleLogin}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <Input
              label=" كلمة المرور "
              type={showPassword ? 'text' : 'password'}
              id="register-password"
              onChange={(e) => setPassword(e.target.value)}
              startIcon={<Lock className="h-4 w-4" />}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute ltr:right-3  rtl:left-3  top-9 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
          {error && (
            <motion.p
              className="text-destructive text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}
        </div>
        <div className="flex justify-end">
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
      </CardContent>
      <CardFooter>
        <motion.div
          className="w-full mt-3"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            className="w-full relative overflow-hidden group h-12"
            disabled={isLoading}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
              animate={isLoading ? { opacity: 0.2 } : { opacity: 0 }}
            />
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <motion.span
                  className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <span>جاري تسجيل الدخول...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>تسجيل الدخول</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </motion.div>
              </div>
            )}
          </Button>
        </motion.div>
      </CardFooter>
    </form>
  );
}
