'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  Bell,
  Calendar,
  Pill,
  FlaskConical,
  MessageSquare,
  Info,
  Check,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Add this import
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'medication' | 'test' | 'message' | 'system';
  time: string;
  read: boolean;
  timestamp: Date;
  actionUrl?: string | null;
  actionText?: string | null;
}

interface NotificationsCardProps {
  notifications: Notification[];
  variants: Variants;
  formatRelativeTime: (date: Date) => string;
}

export function NotificationsCard({
  notifications,
  variants,
  formatRelativeTime,
}: NotificationsCardProps) {
  const { t } = useTranslation(); // Add this hook

  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 text-primary mr-2" />
              {t('patientPortal.dashboard.notifications.title')}
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <Check className="h-4 w-4" />
              <span>
                {t('patientPortal.dashboard.notifications.markAllRead')}
              </span>
            </Button>
          </div>
          <CardDescription>
            {t('patientPortal.dashboard.notifications.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: index * 0.05,
                      },
                    },
                  }}
                  className={cn(
                    'flex gap-4 p-6 relative',
                    !notification.read && 'bg-primary/5 dark:bg-primary/10'
                  )}
                >
                  <div
                    className={cn(
                      'rounded-full p-2 flex-shrink-0',
                      notification.type === 'appointment' &&
                        'bg-blue-100 dark:bg-blue-900/50',
                      notification.type === 'medication' &&
                        'bg-green-100 dark:bg-green-900/50',
                      notification.type === 'test' &&
                        'bg-amber-100 dark:bg-amber-900/50',
                      notification.type === 'message' &&
                        'bg-purple-100 dark:bg-purple-900/50',
                      notification.type === 'system' &&
                        'bg-gray-100 dark:bg-gray-800/50'
                    )}
                  >
                    {notification.type === 'appointment' && (
                      <Calendar
                        className={cn(
                          'h-5 w-5 text-blue-600 dark:text-blue-400'
                        )}
                      />
                    )}
                    {notification.type === 'medication' && (
                      <Pill
                        className={cn(
                          'h-5 w-5 text-green-600 dark:text-green-400'
                        )}
                      />
                    )}
                    {notification.type === 'test' && (
                      <FlaskConical
                        className={cn(
                          'h-5 w-5 text-amber-600 dark:text-amber-400'
                        )}
                      />
                    )}
                    {notification.type === 'message' && (
                      <MessageSquare
                        className={cn(
                          'h-5 w-5 text-purple-600 dark:text-purple-400'
                        )}
                      />
                    )}
                    {notification.type === 'system' && (
                      <Info
                        className={cn(
                          'h-5 w-5 text-gray-600 dark:text-gray-400'
                        )}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm truncate">
                        {notification.title}
                      </h4>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {t('patientPortal.dashboard.notifications.ago')}{' '}
                        {formatRelativeTime(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                    {notification.actionUrl && (
                      <div className="mt-2">
                        <Button
                          variant="link"
                          className="h-auto p-0 text-sm"
                          asChild
                        >
                          <Link href={notification.actionUrl}>
                            {notification.actionText ||
                              t(
                                'patientPortal.dashboard.notifications.viewDetails'
                              )}
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                  {!notification.read && (
                    <div className="absolute top-6 left-6">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3 mb-3">
                  <Bell className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium">
                  {t(
                    'patientPortal.dashboard.notifications.noNotifications.title'
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    'patientPortal.dashboard.notifications.noNotifications.description'
                  )}
                </p>
              </div>
            )}
          </div>
        </CardContent>
        {notifications.length > 5 && (
          <CardFooter className="p-6">
            <Button variant="outline" className="w-full group" asChild>
              <Link
                href="/patient-portal/notifications"
                className="flex items-center justify-center"
              >
                {t('patientPortal.dashboard.notifications.viewAll')}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
