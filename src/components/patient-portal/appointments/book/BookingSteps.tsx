'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface BookingStep {
  title: string;
  icon: React.ReactNode;
  color: string;
}

interface BookingStepsProps {
  steps: BookingStep[];
  activeStep: number;
  onStepClick: (stepIndex: number) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function BookingSteps({
  steps,
  activeStep,
  onStepClick,
}: BookingStepsProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 md:grid-cols-5"
    >
      {steps.map((step, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card
            className={cn(
              'overflow-hidden backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer',
              activeStep === index && 'border-primary shadow-md',
              step.color === 'blue' &&
                'hover:border-blue-400/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20',
              step.color === 'purple' &&
                'hover:border-purple-400/50 hover:bg-purple-50/50 dark:hover:bg-purple-950/20',
              step.color === 'green' &&
                'hover:border-green-400/50 hover:bg-green-50/50 dark:hover:bg-green-950/20',
              step.color === 'amber' &&
                'hover:border-amber-400/50 hover:bg-amber-50/50 dark:hover:bg-amber-950/20'
            )}
            onClick={() => onStepClick(index)}
          >
            <CardHeader className="flex flex-row items-center gap-2 p-4 bg-muted/30 backdrop-blur-sm">
              <div
                className={cn(
                  'rounded-full p-2',
                  activeStep === index
                    ? 'bg-primary text-primary-foreground'
                    : step.color === 'blue'
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                    : step.color === 'purple'
                    ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400'
                    : step.color === 'green'
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400'
                    : step.color === 'amber'
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {step.icon}
              </div>
              <CardTitle className="text-base">{step.title}</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
