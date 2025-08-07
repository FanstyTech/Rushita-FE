'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarCheck, Stethoscope, FilePlus2, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/i18n/LanguageProvider';

interface QuickAction {
  id: string;
  titleKey: string;
  icon: any;
  url: string;
  color: 'blue' | 'purple' | 'green' | 'amber';
}

interface QuickActionsProps {
  actions: QuickAction[];
  containerVariants: any;
  itemVariants: any;
}

export function QuickActions({
  actions,
  containerVariants,
  itemVariants,
}: QuickActionsProps) {
  const { t } = useTranslation();
  const { direction } = useLanguage();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-4 gap-4"
    >
      {actions.map((action) => (
        <motion.div key={action.id} variants={itemVariants}>
          <Link href={action.url}>
            <Card
              className={cn(
                'h-full overflow-hidden backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]',
                action.color === 'blue' &&
                  'hover:border-blue-400/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20',
                action.color === 'purple' &&
                  'hover:border-purple-400/50 hover:bg-purple-50/50 dark:hover:bg-purple-950/20',
                action.color === 'green' &&
                  'hover:border-green-400/50 hover:bg-green-50/50 dark:hover:bg-green-950/20',
                action.color === 'amber' &&
                  'hover:border-amber-400/50 hover:bg-amber-50/50 dark:hover:bg-amber-950/20'
              )}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div
                  className={cn(
                    'rounded-full p-3 mb-3',
                    action.color === 'blue' &&
                      'bg-blue-100 dark:bg-blue-900/50',
                    action.color === 'purple' &&
                      'bg-purple-100 dark:bg-purple-900/50',
                    action.color === 'green' &&
                      'bg-green-100 dark:bg-green-900/50',
                    action.color === 'amber' &&
                      'bg-amber-100 dark:bg-amber-900/50'
                  )}
                >
                  <action.icon
                    className={cn(
                      'h-6 w-6',
                      action.color === 'blue' &&
                        'text-blue-600 dark:text-blue-400',
                      action.color === 'purple' &&
                        'text-purple-600 dark:text-purple-400',
                      action.color === 'green' &&
                        'text-green-600 dark:text-green-400',
                      action.color === 'amber' &&
                        'text-amber-600 dark:text-amber-400'
                    )}
                  />
                </div>
                <h3 className="font-medium">{t(action.titleKey)}</h3>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
