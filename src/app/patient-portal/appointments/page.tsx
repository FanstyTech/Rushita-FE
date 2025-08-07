'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/api/hooks/useAuth';
import {
  AppointmentsHeader,
  AppointmentsFilters,
  AppointmentsList,
  Pagination,
  mockAppointments,
  filterAppointments,
  Appointment,
  FormData,
} from '@/components/patient-portal/appointments';
import { AlertCircle, Check, X } from 'lucide-react';

export default function AppointmentsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingAppointmentId, setEditingAppointmentId] = useState<
    string | null
  >(null);
  const [appointmentsData, setAppointmentsData] = useState(mockAppointments);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    id: '',
    doctorName: '',
    doctorAvatar: '',
    specialty: '',
    clinicName: '',
    date: '',
    time: '',
    status: '',
    notes: '',
    createdAt: '',
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle edit button click
  const handleEdit = (appointment: Appointment) => {
    setIsEditing(true);
    setEditingAppointmentId(appointment.id);
    setFormData({
      id: appointment.id,
      doctorName: appointment.doctorName,
      doctorAvatar: appointment.doctorAvatar || '',
      specialty: appointment.specialty,
      clinicName: appointment.clinicName,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      notes: appointment.notes || '',
      createdAt: appointment.createdAt,
    });
  };

  // Handle cancel button click
  const handleCancel = () => {
    setIsEditing(false);
    setEditingAppointmentId(null);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter appointments
  const filteredAppointments = filterAppointments(
    appointmentsData,
    searchQuery,
    selectedSpecialty,
    selectedStatus,
    activeTab
  );
  function getStatusBadge(status: string) {
    switch (status) {
      case 'confirmed':
        return {
          variant: 'outline',
          label: 'مؤكد',
          icon: <Check className="h-3 w-3 text-green-500" />,
        };
      case 'cancelled':
        return {
          variant: 'destructive',
          label: 'ملغي',
          icon: <X className="h-3 w-3" />,
        };
      case 'completed':
        return {
          variant: 'secondary',
          label: 'مكتمل',
          icon: <Check className="h-3 w-3" />,
        };
      default:
        return {
          variant: 'outline',
          label: 'غير معروف',
          icon: <AlertCircle className="h-3 w-3" />,
        };
    }
  }
  return (
    <div className="space-y-6">
      <AppointmentsHeader />

      <AppointmentsFilters
        searchQuery={searchQuery}
        selectedSpecialty={selectedSpecialty}
        selectedStatus={selectedStatus}
        activeTab={activeTab}
        filteredAppointmentsCount={filteredAppointments.length}
        onSearchChange={setSearchQuery}
        onSpecialtyChange={setSelectedSpecialty}
        onStatusChange={setSelectedStatus}
        onTabChange={setActiveTab}
        onResetFilters={() => {
          setSearchQuery('');
          setSelectedSpecialty('all');
          setSelectedStatus('all');
        }}
      />

      <Tabs
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-2 mb-4 w-full sm:w-auto h-full">
          <TabsTrigger value="upcoming" className="py-4">
            المواعيد القادمة
          </TabsTrigger>
          <TabsTrigger value="past" className="py-4">
            المواعيد السابقة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <AppointmentsList
            appointments={filteredAppointments}
            isLoading={isLoading}
            activeTab={activeTab}
            isEditing={isEditing}
            editingAppointmentId={editingAppointmentId}
            formData={formData}
            onCancel={handleCancel}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <AppointmentsList
            appointments={filteredAppointments}
            isLoading={isLoading}
            activeTab={activeTab}
            isEditing={isEditing}
            editingAppointmentId={editingAppointmentId}
            formData={formData}
            onCancel={handleCancel}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>
      </Tabs>

      <Pagination hasAppointments={filteredAppointments.length > 0} />
    </div>
  );
}
