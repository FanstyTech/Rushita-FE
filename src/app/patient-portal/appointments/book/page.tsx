'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Calendar,
  Stethoscope,
  User,
  Building,
  FileText,
} from 'lucide-react';
import {
  BookingHeader,
  BookingSteps,
  ClinicSelection,
  SpecialtySelection,
  DoctorSelection,
  DateTimeSelection,
  AppointmentConfirmation,
  BookingFooter,
  mockSpecialties,
  mockDoctors,
  mockClinics,
  generateTimeSlots,
  formatDate,
  canProceedToNextStep,
  BookingStep,
} from '@/components/patient-portal/appointments/book';

export default function BookAppointmentPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedClinic, setSelectedClinic] = useState<string | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentReason, setAppointmentReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter specialties by selected clinic
  const filteredSpecialties = selectedClinic
    ? mockSpecialties.filter((_, index) => index < 4) // Just a dummy filter for demo
    : [];

  // Filter doctors by selected specialty
  const filteredDoctors = selectedSpecialty
    ? mockDoctors.filter((doctor) => doctor.specialty === selectedSpecialty)
    : [];

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
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to appointments page
      router.push('/patient-portal/appointments');
    }, 1500);
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
              clinics={mockClinics}
              selectedClinic={selectedClinic}
              onClinicSelect={setSelectedClinic}
            />
          )}

          {/* Step 2: Select specialty */}
          {activeStep === 1 && (
            <SpecialtySelection
              specialties={filteredSpecialties}
              selectedSpecialty={selectedSpecialty}
              onSpecialtySelect={setSelectedSpecialty}
              onPrevStep={handlePrevStep}
            />
          )}

          {/* Step 3: Select doctor */}
          {activeStep === 2 && (
            <DoctorSelection
              doctors={filteredDoctors}
              specialties={mockSpecialties}
              clinics={mockClinics}
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
              clinics={mockClinics}
              specialties={mockSpecialties}
              doctors={mockDoctors}
              formatDate={formatDate}
            />
          )}
        </CardContent>

        <BookingFooter
          activeStep={activeStep}
          totalSteps={steps.length}
          canProceed={canProceed}
          isSubmitting={isSubmitting}
          onPrevStep={handlePrevStep}
          onNextStep={handleNextStep}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
}
