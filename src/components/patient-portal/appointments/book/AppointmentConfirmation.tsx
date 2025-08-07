'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Building,
  Stethoscope,
  User,
  CalendarDays,
  FileText,
} from 'lucide-react';
import { Label } from '@/components/ui/label';

interface Clinic {
  id: string;
  name: string;
}

interface Specialty {
  id: string;
  name: string;
}

interface Doctor {
  id: string;
  name: string;
}

interface AppointmentConfirmationProps {
  selectedClinic: string | null;
  selectedSpecialty: string | null;
  selectedDoctor: string | null;
  selectedDate: Date | undefined;
  selectedTime: string | null;
  appointmentReason: string;
  clinics: Clinic[];
  specialties: Specialty[];
  doctors: Doctor[];
  formatDate: (date?: Date) => string;
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
  clinics,
  specialties,
  doctors,
  formatDate,
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
                  {clinics.find((c) => c.id === selectedClinic)?.name}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">التخصص</p>
                <div className="font-medium flex items-center gap-2">
                  <div className="rounded-full p-1 bg-green-500/10">
                    <Stethoscope className="h-4 w-4 text-green-500" />
                  </div>
                  {specialties.find((s) => s.id === selectedSpecialty)?.name}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">الطبيب</p>
                <div className="font-medium flex items-center gap-2">
                  <div className="rounded-full p-1 bg-purple-500/10">
                    <User className="h-4 w-4 text-purple-500" />
                  </div>
                  {doctors.find((d) => d.id === selectedDoctor)?.name}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">التاريخ والوقت</p>
                <div className="font-medium flex items-center gap-2">
                  <div className="rounded-full p-1 bg-amber-500/10">
                    <CalendarDays className="h-4 w-4 text-amber-500" />
                  </div>
                  {formatDate(selectedDate)} - {selectedTime}
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

      <motion.div variants={itemVariants} className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
          <div className="rounded-full p-1 bg-orange-500/10">
            <FileText className="h-4 w-4 text-orange-500" />
          </div>
          شروط الحجز
        </Label>
        <Card className="backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-5 text-sm space-y-3">
            <div className="flex items-start gap-2">
              <div className="rounded-full p-1 bg-blue-500/10 mt-0.5">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
              </div>
              <p>يرجى الحضور قبل الموعد بـ 15 دقيقة.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full p-1 bg-blue-500/10 mt-0.5">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
              </div>
              <p>
                في حالة الرغبة بإلغاء الموعد، يرجى إشعارنا قبل 24 ساعة على
                الأقل.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full p-1 bg-blue-500/10 mt-0.5">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
              </div>
              <p>يرجى إحضار بطاقة الهوية وبطاقة التأمين (إن وجدت).</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full p-1 bg-blue-500/10 mt-0.5">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
              </div>
              <p>يرجى إحضار التقارير الطبية السابقة إن وجدت.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
