'use client';

import {
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
  return (
    <CardFooter className="flex justify-between p-6 bg-muted/30 backdrop-blur-sm">
      <Button
        variant="outline"
        onClick={onPrevStep}
        disabled={activeStep === 0}
      >
        السابق
      </Button>

      {activeStep < totalSteps - 1 ? (
        <Button
          onClick={onNextStep}
          disabled={!canProceed}
        >
          التالي
        </Button>
      ) : (
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'جاري الحجز...' : 'تأكيد الحجز'}
        </Button>
      )}
    </CardFooter>
  );
}
