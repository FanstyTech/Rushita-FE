'use client';

import { useState } from 'react';
import {
  useDoctors,
  useCreateDoctor,
  useUpdateDoctor,
  useDeleteDoctor,
} from '@/lib/api/hooks/useDoctor';
import { DoctorModal } from './components/DoctorModal';
import type {
  Doctor,
  CreateDoctorDto,
  UpdateDoctorDto,
} from '@/lib/api/types/doctor';

export default function DoctorsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: doctors, isLoading: isLoadingDoctors } = useDoctors();
  const createDoctor = useCreateDoctor();
  const updateDoctor = useUpdateDoctor(selectedDoctor?.id ?? '');
  const deleteDoctor = useDeleteDoctor();

  const handleCreate = async (data: CreateDoctorDto) => {
    try {
      await createDoctor.mutateAsync(data);
      setIsModalOpen(false);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleUpdate = async (data: UpdateDoctorDto) => {
    if (!selectedDoctor) return;
    try {
      await updateDoctor.mutateAsync(data);
      setIsModalOpen(false);
      setSelectedDoctor(undefined);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoctor.mutateAsync(id);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const openCreateModal = () => {
    setSelectedDoctor(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  if (isLoadingDoctors) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Doctors</h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Doctor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors?.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              {doctor.imageUrl && (
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">{doctor.name}</h2>
                <p className="text-gray-600">{doctor.specialization}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {doctor.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> {doctor.phone}
              </p>
              {doctor.address && (
                <p className="text-gray-600">
                  <span className="font-medium">Address:</span> {doctor.address}
                </p>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleDelete(doctor.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => openEditModal(doctor)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <DoctorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDoctor(undefined);
        }}
        doctor={selectedDoctor}
        onSubmit={selectedDoctor ? handleUpdate : handleCreate}
        isLoading={createDoctor.isPending || updateDoctor.isPending}
      />
    </div>
  );
}
