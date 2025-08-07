import { format } from 'date-fns';
import { arDZ } from 'date-fns/locale';

export function filterAppointments(
  appointments: any[],
  searchQuery: string,
  selectedSpecialty: string,
  selectedStatus: string,
  activeTab: string
) {
  return appointments.filter((appointment) => {
    // Filter by search query
    const matchesSearch =
      appointment.doctorName.includes(searchQuery) ||
      appointment.specialty.includes(searchQuery) ||
      appointment.clinicName.includes(searchQuery) ||
      appointment.notes.includes(searchQuery);

    // Filter by specialty
    const matchesSpecialty =
      selectedSpecialty === 'all' ||
      (selectedSpecialty === 'general' && appointment.specialty === 'طب عام') ||
      (selectedSpecialty === 'dental' && appointment.specialty === 'أسنان') ||
      (selectedSpecialty === 'dermatology' &&
        appointment.specialty === 'جلدية') ||
      (selectedSpecialty === 'ophthalmology' &&
        appointment.specialty === 'عيون') ||
      (selectedSpecialty === 'internal' && appointment.specialty === 'باطنية');

    // Filter by status
    const matchesStatus =
      selectedStatus === 'all' || appointment.status === selectedStatus;

    // Filter by tab (upcoming or past)
    const today = new Date();
    const appointmentDate = new Date(appointment.date);
    const isUpcoming = appointmentDate >= today;
    const matchesTab =
      (activeTab === 'upcoming' && isUpcoming) ||
      (activeTab === 'past' && !isUpcoming);

    return matchesSearch && matchesSpecialty && matchesStatus && matchesTab;
  });
}
