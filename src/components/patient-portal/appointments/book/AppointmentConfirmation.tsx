'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Building,
  Stethoscope,
  User,
  CalendarDays,
  FileText,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { SelectOption } from '@/lib/api/types/select-option';
import { formatDate } from '@/utils/dateTimeUtils';

interface AppointmentConfirmationProps {
  selectedClinic: SelectOption | null;
  selectedSpecialty: SelectOption | null;
  selectedDoctor: SelectOption | null;
  selectedDate: Date | undefined;
  selectedTime: string | null;
  appointmentReason: string;
  conditions: SelectOption[] | null;
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

export function AppointmentConfirmation({
  selectedClinic,
  selectedSpecialty,
  selectedDoctor,
  selectedDate,
  selectedTime,
  appointmentReason,
  conditions,
}: AppointmentConfirmationProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold">تأكيد الموعد</h2>

      <motion.div variants={itemVariants}>
        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="bg-muted/30 backdrop-blur-sm border-b border-border/50 pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="rounded-full p-1 bg-blue-500/10">
                <FileText className="h-4 w-4 text-blue-500" />
              </div>
              تفاصيل الموعد
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">العيادة</p>
                <div className="font-medium flex items-center gap-2">
                  <div className="rounded-full p-1 bg-blue-500/10">
                    <Building className="h-4 w-4 text-blue-500" />
                  </div>
                  {selectedClinic?.label}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">التخصص</p>
                <div className="font-medium flex items-center gap-2">
                  <div className="rounded-full p-1 bg-green-500/10">
                    <Stethoscope className="h-4 w-4 text-green-500" />
                  </div>
                  {selectedSpecialty?.label}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">الطبيب</p>
                <div className="font-medium flex items-center gap-2">
                  <div className="rounded-full p-1 bg-purple-500/10">
                    <User className="h-4 w-4 text-purple-500" />
                  </div>
                  {selectedDoctor?.label}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">التاريخ والوقت</p>
                <div className="font-medium flex items-center gap-2">
                  <div className="rounded-full p-1 bg-amber-500/10">
                    <CalendarDays className="h-4 w-4 text-amber-500" />
                  </div>
                  {formatDate(selectedDate?.toString() || '')} - {selectedTime}
                </div>
              </div>
            </div>

            {appointmentReason && (
              <div className="space-y-2 border-t border-border/50 pt-4">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <div className="rounded-full p-1 bg-indigo-500/10">
                    <FileText className="h-4 w-4 text-indigo-500" />
                  </div>
                  سبب الزيارة
                </p>
                <p className="font-medium pr-7">{appointmentReason}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {conditions?.length != 0 && (
        <motion.div variants={itemVariants} className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <div className="rounded-full p-1 bg-orange-500/10">
              <FileText className="h-4 w-4 text-orange-500" />
            </div>
            شروط الحجز
          </Label>
          <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-5 text-sm space-y-3">
              {conditions?.map((condition) => {
                return (
                  <div className="flex items-start gap-2" key={condition.value}>
                    <div className="rounded-full p-1 bg-blue-500/10 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    </div>
                    <span className="text-sm">{condition.label}</span>{' '}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
