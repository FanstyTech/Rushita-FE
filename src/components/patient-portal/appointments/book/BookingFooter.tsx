'use client';

import {
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface BookingFooterProps {
  activeStep: number;
  totalSteps: number;
  canProceed: boolean;
  isSubmitting: boolean;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit: () => void;
}

export function BookingFooter({
  activeStep,
  totalSteps,
  canProceed,
  isSubmitting,
  onPrevStep,
  onNextStep,
  onSubmit,
}: BookingFooterProps) {
  const { t } = useTranslation();

  return (
    <CardFooter className="flex justify-between p-6 bg-muted/30 backdrop-blur-sm">
      <Button
        variant="outline"
        onClick={onPrevStep}
        disabled={activeStep === 0}
      >
        {t('patientPortal.appointments.booking.footer.previousButton')}
      </Button>

      {activeStep < totalSteps - 1 ? (
        <Button
          onClick={onNextStep}
          disabled={!canProceed}
        >
          {t('patientPortal.appointments.booking.footer.nextButton')}
        </Button>
      ) : (
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? t('patientPortal.appointments.booking.footer.submittingButton') : t('patientPortal.appointments.booking.footer.confirmButton')}
        </Button>
      )}
    </CardFooter>
  );
}
