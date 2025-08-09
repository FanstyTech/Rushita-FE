'use client';

import { motion } from 'framer-motion';
import { Mars, Venus } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

interface GenderSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function GenderSelector({ value, onChange }: GenderSelectorProps) {
  const { language } = useLanguage();

  // Multilingual labels
  const labels = {
    title: {
      en: 'Select Gender',
      ar: 'اختر الجنس',
      es: 'Seleccionar Género'
    },
    male: {
      en: 'Male',
      ar: 'ذكر',
      es: 'Masculino'
    },
    female: {
      en: 'Female',
      ar: 'أنثى',
      es: 'Femenino'
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <h3 className="text-base font-medium mb-4 text-gray-700 dark:text-gray-300">
        {labels.title[language as keyof typeof labels.title]}
      </h3>
      <div className="flex gap-6 justify-center w-full max-w-md">
        <motion.div
          className={`relative cursor-pointer flex flex-col items-center justify-center p-6 rounded-2xl border-2 w-full ${value === 'male' 
            ? 'border-primary bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 shadow-lg shadow-primary/10'
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
          }`}
          whileHover={{
            scale: 1.03,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onChange('male')}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`rounded-full p-3 mb-3 ${value === 'male' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
            <Mars className={`h-8 w-8 ${value === 'male' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
          </div>
          <span className={`font-medium text-base ${value === 'male' ? 'text-primary dark:text-primary-foreground' : 'text-gray-700 dark:text-gray-300'}`}>
            {labels.male[language as keyof typeof labels.male]}
          </span>
          
          {value === 'male' && (
            <motion.div 
              className="absolute -top-1 -right-1 bg-primary text-white rounded-full p-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className={`relative cursor-pointer flex flex-col items-center justify-center p-6 rounded-2xl border-2 w-full ${value === 'female' 
            ? 'border-primary bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 shadow-lg shadow-primary/10'
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
          }`}
          whileHover={{
            scale: 1.03,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onChange('female')}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className={`rounded-full p-3 mb-3 ${value === 'female' ? 'bg-pink-100 dark:bg-pink-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
            <Venus className={`h-8 w-8 ${value === 'female' ? 'text-pink-600 dark:text-pink-400' : 'text-gray-500 dark:text-gray-400'}`} />
          </div>
          <span className={`font-medium text-base ${value === 'female' ? 'text-primary dark:text-primary-foreground' : 'text-gray-700 dark:text-gray-300'}`}>
            {labels.female[language as keyof typeof labels.female]}
          </span>
          
          {value === 'female' && (
            <motion.div 
              className="absolute -top-1 -right-1 bg-primary text-white rounded-full p-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
