'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  User,
  Calendar,
  FileText,
  Stethoscope,
  HeartPulse,
  ChevronRight,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/i18n/LanguageProvider';

interface WelcomeSectionProps {
  userName?: string;
  variants: any;
}

export function WelcomeSection({ userName, variants }: WelcomeSectionProps) {
  const { t } = useTranslation();
  const { direction } = useLanguage();

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          {t('patientPortal.welcome.greeting')}
          {userName || t('patientPortal.welcome.user')}
        </h2>
        <Button variant="outline" size="sm" asChild>
          <Link href="/patient-portal/profile">
            {t('patientPortal.welcome.editProfile')}
            <ChevronRight
              className={`${direction === 'rtl' ? 'mr-2' : 'ml-2'} h-4 w-4`}
            />
          </Link>
        </Button>
      </div>

      {/* Welcome Card */}
      <motion.div variants={variants}>
        <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
          <div className="md:flex">
            <div className="flex-1">
              <CardHeader className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{t('patientPortal.welcome.title')}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {t('patientPortal.welcome.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="flex flex-wrap gap-3">
                  <Button variant="default" asChild>
                    <Link href="/patient-portal/appointments/book">
                      <Calendar
                        className={`${
                          direction === 'rtl' ? 'ml-2' : 'mr-2'
                        } h-4 w-4`}
                      />
                      {t('patientPortal.welcome.bookAppointment')}
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/patient-portal/prescriptions">
                      <FileText
                        className={`${
                          direction === 'rtl' ? 'ml-2' : 'mr-2'
                        } h-4 w-4`}
                      />
                      {t('patientPortal.welcome.prescriptions')}
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/patient-portal/visits">
                      <Stethoscope
                        className={`${
                          direction === 'rtl' ? 'ml-2' : 'mr-2'
                        } h-4 w-4`}
                      />
                      {t('patientPortal.welcome.visitHistory')}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </div>
            <div className="hidden md:block w-1/3 bg-gradient-to-br from-primary/10 to-primary/5 border-l border-border/50">
              <div className="h-full flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="mb-2 mx-auto rounded-full bg-primary/20 h-16 w-16 flex items-center justify-center">
                    <HeartPulse className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg mb-1">
                    {t('patientPortal.welcome.tagline')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('patientPortal.welcome.subTagline')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  );
}
