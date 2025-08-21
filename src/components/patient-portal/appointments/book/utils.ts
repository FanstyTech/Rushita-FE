import { SelectOption } from '@/lib/api/types/select-option';

export function generateTimeSlots() {
  const slots = [];
  const startHour = 9;
  const endHour = 17;
  const interval = 30; // minutes

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      slots.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  return slots;
}

export function canProceedToNextStep(
  activeStep: number,
  selectedClinic: SelectOption | null,
  selectedSpecialty: SelectOption | null,
  selectedDoctor: SelectOption | null,
  selectedDate: Date | undefined,
  selectedTime: string | null
) {
  switch (activeStep) {
    case 0:
      return selectedClinic !== null;
    case 1:
      return selectedSpecialty !== null;
    case 2:
      return selectedDoctor !== null;
    case 3:
      return selectedDate !== undefined && selectedTime !== null;
    default:
      return true;
  }
}
