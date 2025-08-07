'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, AlertOctagon, AlertCircle, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Add this import
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HealthAlert {
  id: string;
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
  actionText?: string;
}

interface HealthAlertsCardProps {
  alerts: HealthAlert[];
  variants: any;
}

export function HealthAlertsCard({ alerts, variants }: HealthAlertsCardProps) {
  const { t } = useTranslation(); // Add this hook

  return (
    <motion.div variants={variants} className="mt-6">
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
        <CardHeader className="p-6">
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-primary mr-2" />
            {t('patientPortal.dashboard.healthAlerts.title')}
          </CardTitle>
          <CardDescription>{t('patientPortal.dashboard.healthAlerts.description')}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: index * 0.05 + 0.2,
                      },
                    },
                  }}
                  className={cn(
                    'p-6 relative',
                    alert.priority === 'high' &&
                      'bg-red-50 dark:bg-red-900/20',
                    alert.priority === 'medium' &&
                      'bg-amber-50 dark:bg-amber-900/20',
                    alert.priority === 'low' &&
                      'bg-blue-50 dark:bg-blue-900/20'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'rounded-full p-2 mt-1 flex-shrink-0',
                        alert.priority === 'high' &&
                          'bg-red-100 dark:bg-red-900/50',
                        alert.priority === 'medium' &&
                          'bg-amber-100 dark:bg-amber-900/50',
                        alert.priority === 'low' &&
                          'bg-blue-100 dark:bg-blue-900/50'
                      )}
                    >
                      {alert.priority === 'high' && (
                        <AlertOctagon className="h-5 w-5 text-red-600 dark:text-red-400" />
                      )}
                      {alert.priority === 'medium' && (
                        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      )}
                      {alert.priority === 'low' && (
                        <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div>
                      <h4
                        className={cn(
                          'font-medium mb-1',
                          alert.priority === 'high' &&
                            'text-red-700 dark:text-red-400',
                          alert.priority === 'medium' &&
                            'text-amber-700 dark:text-amber-400',
                          alert.priority === 'low' &&
                            'text-blue-700 dark:text-blue-400'
                        )}
                      >
                        {alert.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {alert.message}
                      </p>
                      {alert.actionUrl && (
                        <Button
                          size="sm"
                          variant={
                            alert.priority === 'high'
                              ? 'destructive'
                              : 'secondary'
                          }
                          className={cn(
                            'mt-1',
                            alert.priority === 'medium' &&
                              'bg-amber-600 hover:bg-amber-700',
                            alert.priority === 'low' &&
                              'bg-blue-600 hover:bg-blue-700'
                          )}
                          asChild
                        >
                          <Link href={alert.actionUrl}>
                            {alert.actionText}
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3 mb-3">
                  <Check className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium">{t('patientPortal.dashboard.healthAlerts.noAlerts.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('patientPortal.dashboard.healthAlerts.noAlerts.description')}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
