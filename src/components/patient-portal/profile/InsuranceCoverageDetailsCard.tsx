'use client';

import { motion, Variants } from 'framer-motion';
import {
  Receipt,
  Percent,
  DollarSign,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Add this import
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface InsuranceCoverageDetailsCardProps {
  insuranceInfo: {
    copayment: number;
    annualLimit: number;
    exclusions: string;
    notes: string;
  };
  variants: Variants;
}

export function InsuranceCoverageDetailsCard({
  insuranceInfo,
  variants,
}: InsuranceCoverageDetailsCardProps) {
  const { t } = useTranslation(); // Add this hook

  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
        <CardHeader className="p-6 pb-0">
          <div className="flex items-center justify-between mb-1">
            <CardTitle className="flex items-center text-lg">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Receipt className="h-4 w-4 text-primary" />
              </div>
              {t('patientPortal.profile.insuranceCoverage.title')}
            </CardTitle>
          </div>
          <CardDescription className="text-muted-foreground text-sm">
            {t('patientPortal.profile.insuranceCoverage.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
              <div className="text-sm font-medium text-muted-foreground">
                {t('patientPortal.profile.insuranceCoverage.copayment')}
              </div>
              <div className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-primary/70" />
                <span className="font-medium">{insuranceInfo.copayment}%</span>
              </div>
            </div>

            <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
              <div className="text-sm font-medium text-muted-foreground">
                {t('patientPortal.profile.insuranceCoverage.annualLimit')}
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary/70" />
                <span className="font-medium">
                  {insuranceInfo.annualLimit}{' '}
                  {t('patientPortal.profile.insuranceCoverage.riyal')}
                </span>
              </div>
            </div>

            <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
              <div className="text-sm font-medium text-muted-foreground">
                {t('patientPortal.profile.insuranceCoverage.exclusions')}
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-primary/70 mt-0.5" />
                <span className="font-medium">
                  {insuranceInfo.exclusions ||
                    t('patientPortal.profile.insuranceCoverage.noExclusions')}
                </span>
              </div>
            </div>

            <div className="space-y-2 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
              <div className="text-sm font-medium text-muted-foreground">
                {t('patientPortal.profile.insuranceCoverage.notes')}
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-primary/70 mt-0.5" />
                <span className="font-medium">
                  {insuranceInfo.notes ||
                    t('patientPortal.profile.insuranceCoverage.noNotes')}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
