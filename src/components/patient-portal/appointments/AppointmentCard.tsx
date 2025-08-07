'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input, Select } from '@/components/common/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  Clock,
  Check,
  X,
  AlertCircle,
  User,
  Edit,
  Save,
  Stethoscope,
} from 'lucide-react';
import { formatDate } from '@/utils/dateTimeUtils';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  clinicName: string;
  date: string;
  time: string;
  status: string;
  notes: string;
  createdAt: string;
  doctorAvatar?: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  isEditing: boolean;
  editingAppointmentId: string | null;
  formData: any;
  onCancel: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  getStatusBadge: (status: string) => any;
  variants: any;
}

export function AppointmentCard({
  appointment,
  isEditing,
  editingAppointmentId,
  formData,
  onCancel,
  onInputChange,
  onSelectChange,
  getStatusBadge,
  variants,
}: AppointmentCardProps) {
  const isCurrentlyEditing =
    isEditing && editingAppointmentId === appointment.id;

  return (
    <motion.div variants={variants}>
      <Card
        className={cn(
          'overflow-hidden transition-all duration-300 hover:shadow-md',
          isCurrentlyEditing ? 'border-primary ring-1 ring-primary/20' : ''
        )}
      >
        {isCurrentlyEditing && (
          <div className="bg-primary/10 px-6 py-2 text-sm font-medium text-primary flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              تعديل بيانات الموعد
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={onCancel}
                className="h-7 gap-1 border-primary/20 bg-white px-2 text-xs hover:bg-primary/5"
              >
                <X className="h-3 w-3" />
                إلغاء
              </Button>
            </div>
          </div>
        )}
        <CardContent className={cn('p-6', isCurrentlyEditing ? 'pt-4' : '')}>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              {isCurrentlyEditing ? (
                <div className="rounded-full bg-primary/10 p-3 h-12 w-12 flex items-center justify-center">
                  <Edit className="h-5 w-5 text-primary" />
                </div>
              ) : (
                <Avatar className="h-14 w-14 border-2 border-primary/10 ring-2 ring-primary/5">
                  <AvatarImage
                    src={appointment.doctorAvatar}
                    alt={appointment.doctorName}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1">
                {isCurrentlyEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="doctorName"
                        className="text-xs font-medium text-muted-foreground"
                      >
                        اسم الطبيب
                      </Label>
                      <Input
                        id="doctorName"
                        name="doctorName"
                        value={formData.doctorName}
                        onChange={onInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label
                          htmlFor="specialty"
                          className="text-xs font-medium text-muted-foreground"
                        >
                          التخصص
                        </Label>
                        <Input
                          id="specialty"
                          name="specialty"
                          value={formData.specialty}
                          onChange={onInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="clinicName"
                          className="text-xs font-medium text-muted-foreground"
                        >
                          العيادة
                        </Label>
                        <Input
                          id="clinicName"
                          name="clinicName"
                          value={formData.clinicName}
                          onChange={onInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <Label
                          htmlFor="date"
                          className="text-xs font-medium text-muted-foreground"
                        >
                          التاريخ
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={onInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="time"
                          className="text-xs font-medium text-muted-foreground"
                        >
                          الوقت
                        </Label>
                        <Input
                          id="time"
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={onInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="status"
                          className="text-xs font-medium text-muted-foreground"
                        >
                          الحالة
                        </Label>
                        <Select
                          id="status"
                          value={formData.status}
                          onChange={(e) =>
                            onSelectChange('status', e.target.value)
                          }
                          options={[
                            { value: 'confirmed', label: 'مؤكد' },
                            { value: 'cancelled', label: 'ملغي' },
                            { value: 'completed', label: 'مكتمل' },
                          ]}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="notes"
                        className="text-xs font-medium text-muted-foreground"
                      >
                        ملاحظات
                      </Label>
                      <Input
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={onInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="font-semibold text-lg">
                        {appointment.doctorName}
                      </h3>
                      <Badge
                        variant="outline"
                        className="mr-2 bg-primary/5 border-primary/10"
                      >
                        <Stethoscope className="h-3 w-3 mr-1" />
                        {appointment.specialty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                      {appointment.clinicName}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 bg-primary/5 border-primary/10 text-xs px-2 py-0.5"
                      >
                        <Calendar className="h-3 w-3" />
                        {formatDate(appointment.date)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 bg-primary/5 border-primary/10 text-xs px-2 py-0.5"
                      >
                        <Clock className="h-3 w-3" />
                        {appointment.time}
                      </Badge>
                      <Badge
                        variant={
                          getStatusBadge(appointment.status).variant as any
                        }
                        className="flex items-center gap-1 text-xs px-2 py-0.5"
                      >
                        {getStatusBadge(appointment.status).icon}
                        {getStatusBadge(appointment.status).label}
                      </Badge>
                    </div>
                    {appointment.notes && (
                      <div className="mt-3 text-sm flex items-start p-2 bg-muted/30 rounded-md">
                        <AlertCircle className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-muted-foreground" />
                        <span>ملاحظات: {appointment.notes}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            {!isCurrentlyEditing && (
              <div className="flex flex-col gap-2 md:self-center">
                <Button
                  size="sm"
                  asChild
                  className="bg-primary hover:bg-primary/90 h-7 px-3 text-xs rounded-md"
                >
                  <Link
                    href={`/patient-portal/appointments/${appointment.id}`}
                    className="flex items-center gap-1.5"
                  >
                    <Calendar className="h-3 w-3" />
                    <span>التفاصيل</span>
                  </Link>
                </Button>

                {appointment.status === 'confirmed' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-destructive/20 bg-destructive/5 hover:bg-destructive/10 text-destructive h-7 px-3 text-xs rounded-md flex items-center gap-1.5"
                  >
                    <X className="h-3 w-3" />
                    <span>إلغاء</span>
                  </Button>
                )}
                {appointment.status === 'completed' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1.5 border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 rounded-md px-4 py-2 h-9"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>طلب موعد متابعة</span>
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
