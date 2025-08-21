'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Stethoscope, User, Building, FileText } from 'lucide-react';
import {
  BookingHeader,
  BookingSteps,
  ClinicSelection,
  SpecialtySelection,
  DoctorSelection,
  DateTimeSelection,
  AppointmentConfirmation,
  BookingFooter,
  generateTimeSlots,
  canProceedToNextStep,
  BookingStep,
} from '@/components/patient-portal/appointments/book';
import { useClinicBookingCondition } from '@/lib/api/hooks/useClinicBookingCondition';
import { useClinic } from '@/lib/api/hooks/useClinic';
import { useClinicStaff } from '@/lib/api/hooks/useClinicStaff';
import { GetClinicStaffForDropdownInput } from '@/lib/api/types/clinic-staff';
import { SelectOption } from '@/lib/api/types/select-option';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients'; // إضافة hook المرضى
import {
  SavePatientAppointmentDto,
  VisitType,
} from '@/lib/api/types/clinic-patient'; // إضافة الأنواع المطلوبة

export default function BookAppointmentPage() {
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [selectedClinic, setSelectedClinic] =
    useState<SelectOption<string> | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<SelectOption<string> | null>(null);
  const [selectedDoctor, setSelectedDoctor] =
    useState<SelectOption<string> | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentReason, setAppointmentReason] = useState('');

  // Create staff filter with debounced search
  const staffFilter = useMemo<GetClinicStaffForDropdownInput>(() => {
    const filterObj: GetClinicStaffForDropdownInput = { filter: '' };

    if (selectedClinic && selectedSpecialty) {
      filterObj.clinicId = selectedClinic.value;
      filterObj.specialtyId = selectedSpecialty.value;
    }
    return filterObj;
  }, [selectedClinic, selectedSpecialty]);

  // API Hooks
  const { savePatientAppointment } = useClinicPatients();

  const { useClinicsForDropdown, useClinicSpecialtiesForDropdown } =
    useClinic();
  const { useClinicStaffForDropdown } = useClinicStaff();
  const { useClinicBookingConditionsDropdown } = useClinicBookingCondition();

  const { data: clinics, isLoading: isClinicsLoadding } =
    useClinicsForDropdown();
  const { data: clinicSpecialties, isLoading: isClinicSpecialtiesLoadding } =
    useClinicSpecialtiesForDropdown(selectedClinic?.value || '');

  const { data: conditions, isLoading: isConditionsLoadding } =
    useClinicBookingConditionsDropdown({
      clinicId: selectedClinic?.value,
    });
  const { data: doctors, isLoading: isDoctorsLoadding } =
    useClinicStaffForDropdown(staffFilter);

  // Get available time slots
  const availableTimeSlots = generateTimeSlots();

  // Steps for booking process
  const steps: BookingStep[] = [
    {
      title: 'اختيار العيادة',
      icon: <Building className="h-5 w-5" />,
      color: 'blue',
    },
    {
      title: 'اختيار التخصص',
      icon: <Stethoscope className="h-5 w-5" />,
      color: 'green',
    },
    {
      title: 'اختيار الطبيب',
      icon: <User className="h-5 w-5" />,
      color: 'purple',
    },
    {
      title: 'اختيار الموعد',
      icon: <Calendar className="h-5 w-5" />,
      color: 'amber',
    },
    {
      title: 'تأكيد الحجز',
      icon: <FileText className="h-5 w-5" />,
      color: 'blue',
    },
  ];

  // Handle next step
  const handleNextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  // Handle previous step
  const handlePrevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  // Handle step click
  const handleStepClick = (stepIndex: number) => {
    // Allow going back to previous steps but not skipping ahead
    if (stepIndex <= activeStep) {
      setActiveStep(stepIndex);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedClinic || !selectedDoctor || !selectedDate || !selectedTime) {
      return;
    }

    const appointmentDate = selectedDate.toISOString().split('T')[0];
    const [hours, minutes] = selectedTime.split(':');
    const startTime = `${hours.padStart(2, '0')}:${minutes.padStart(
      2,
      '0'
    )}:00`;

    const appointmentData: SavePatientAppointmentDto = {
      date: appointmentDate,
      startTime: startTime,
      appointmentReason: appointmentReason || '',
      staffId: selectedDoctor.value,
      clinicId: selectedClinic.value,
      type: VisitType.New,
    };
    await savePatientAppointment.mutateAsync(appointmentData);
    router.push('/patient-portal/appointments');
  };

  // Check if can proceed to next step
  const canProceed = canProceedToNextStep(
    activeStep,
    selectedClinic,
    selectedSpecialty,
    selectedDoctor,
    selectedDate,
    selectedTime
  );

  return (
    <div className="space-y-6">
      <BookingHeader />

      <BookingSteps
        steps={steps}
        activeStep={activeStep}
        onStepClick={handleStepClick}
      />

      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
        <CardContent className="p-6">
          {/* Step 1: Select clinic */}
          {activeStep === 0 && (
            <ClinicSelection
              clinics={clinics || []}
              selectedClinic={selectedClinic}
              onClinicSelect={setSelectedClinic}
            />
          )}

          {/* Step 2: Select specialty */}
          {activeStep === 1 && (
            <SpecialtySelection
              specialties={clinicSpecialties || []}
              selectedSpecialty={selectedSpecialty}
              onSpecialtySelect={setSelectedSpecialty}
              onPrevStep={handlePrevStep}
            />
          )}

          {/* Step 3: Select doctor */}
          {activeStep === 2 && (
            <DoctorSelection
              doctors={doctors || []}
              selectedClinic={selectedClinic}
              selectedSpecialty={selectedSpecialty}
              selectedDoctor={selectedDoctor}
              onDoctorSelect={setSelectedDoctor}
              onPrevStep={handlePrevStep}
            />
          )}

          {/* Step 4: Select date and time */}
          {activeStep === 3 && (
            <DateTimeSelection
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              appointmentReason={appointmentReason}
              availableTimeSlots={availableTimeSlots}
              onDateSelect={setSelectedDate}
              onTimeSelect={setSelectedTime}
              onReasonChange={setAppointmentReason}
            />
          )}

          {/* Step 5: Confirm appointment */}
          {activeStep === 4 && (
            <AppointmentConfirmation
              selectedClinic={selectedClinic}
              selectedSpecialty={selectedSpecialty}
              selectedDoctor={selectedDoctor}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              appointmentReason={appointmentReason}
              conditions={conditions || []}
            />
          )}
        </CardContent>

        <BookingFooter
          activeStep={activeStep}
          totalSteps={steps.length}
          canProceed={canProceed}
          isSubmitting={savePatientAppointment.isPending}
          onPrevStep={handlePrevStep}
          onNextStep={handleNextStep}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
}
