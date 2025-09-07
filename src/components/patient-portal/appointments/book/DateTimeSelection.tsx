'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { TextArea } from '@/components/common/form';
import { AppointmentCalendar } from '@/components/ui/appointment-calendar';
import { Calendar, CalendarDays, Clock, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DateTimeSelectionProps {
  selectedDate: Date | undefined;
  selectedTime: string | null;
  appointmentReason: string;
  availableTimeSlots: string[];
  onDateSelect: (date: Date | undefined) => void;
  onTimeSelect: (time: string) => void;
  onReasonChange: (reason: string) => void;
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

export function DateTimeSelection({
  selectedDate,
  selectedTime,
  appointmentReason,
  availableTimeSlots,
  onDateSelect,
  onTimeSelect,
  onReasonChange,
}: DateTimeSelectionProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <div className="rounded-full p-1.5 bg-amber-500/10">
          <Calendar className="h-5 w-5 text-amber-500" />
        </div>
        {t('patientPortal.appointments.booking.dateTimeSelection.title')}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Calendar */}
        <motion.div variants={itemVariants} className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <div className="rounded-full p-1 bg-blue-500/10">
              <CalendarDays className="h-4 w-4 text-blue-500" />
            </div>
            {t('patientPortal.appointments.booking.dateTimeSelection.dateLabel')}
          </Label>
          <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-0">
              <AppointmentCalendar
                selectedDate={selectedDate}
                onSelect={onDateSelect}
                disabled={(date) => {
                  const day = date.getDay();
                  return (
                    date < new Date() ||
                    day === 5 || // Friday
                    day === 6 // Saturday
                  );
                }}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Time slots */}
        <motion.div variants={itemVariants} className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <div className="rounded-full p-1 bg-amber-500/10">
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            {t('patientPortal.appointments.booking.dateTimeSelection.timeLabel')}
          </Label>
          <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-4">
              {selectedDate ? (
                <div className="grid grid-cols-3 gap-2">
                  {availableTimeSlots.map((time) => (
                    <Button
                      key={time}
                      variant="ghost"
                      className={cn(
                        'justify-center border border-border/50 hover:bg-amber-500/10 hover:text-amber-600 transition-all duration-200',
                        selectedTime === time &&
                          'bg-amber-500/10 text-amber-600 border-amber-500/50'
                      )}
                      onClick={() => onTimeSelect(time)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full p-3 bg-amber-500/10 mb-4">
                    <Clock className="h-8 w-8 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-medium">{t('patientPortal.appointments.booking.dateTimeSelection.emptyTimeSlots.title')}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t('patientPortal.appointments.booking.dateTimeSelection.emptyTimeSlots.message')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Appointment reason */}
      <motion.div variants={itemVariants} className="space-y-3">
        <Label
          htmlFor="reason"
          className="text-base font-medium flex items-center gap-2"
        >
          <div className="rounded-full p-1 bg-purple-500/10">
            <FileText className="h-4 w-4 text-purple-500" />
          </div>
          {t('patientPortal.appointments.booking.dateTimeSelection.reasonLabel')}
        </Label>
        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-4">
            <TextArea
              id="reason"
              placeholder={t('patientPortal.appointments.booking.dateTimeSelection.reasonPlaceholder')}
              value={appointmentReason}
              onChange={(e) => onReasonChange(e.target.value)}
              className="min-h-[100px] bg-transparent border-border/50 focus-visible:ring-amber-500"
            />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
