'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import {
  Edit2,
  Trash2,
  UserRound,
  Stethoscope,
  Mail,
  Phone,
  Calendar,
  Clock,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FiPlus, FiSearch, FiChevronDown } from 'react-icons/fi';
import DoctorCardSkeleton from '@/components/skeletons/DoctorCardSkeleton';
import Modal from '@/components/common/Modal';
import { Input } from '@/components/common/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Mock data
const specialties = [
  'General Medicine',
  'Cardiology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'Dentistry',
];

const experiences = ['0-5 years', '5-10 years', '10+ years'];
const statuses = ['Active', 'Inactive'];

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  status: 'Active' | 'Inactive';
  email: string;
  phone: string;
  patients: number;
  experience: string;
  avatar: string;
  workingHours?: {
    [key: string]: {
      start: string;
      end: string;
      isOff: boolean;
    };
  };
}

const workingTimeSchema = z.object({
  schedule: z.record(
    z.string(),
    z.object({
      start: z.string().min(1, 'Start time is required'),
      end: z.string().min(1, 'End time is required'),
      isOff: z.boolean(),
    })
  ),
});

type WorkingTimeFormData = z.infer<typeof workingTimeSchema>;

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

const generateMockDoctors = (count: number): Doctor[] => {
  return Array.from({ length: count }, (_, i) => {
    const name = [
      'Dr. Sarah Wilson',
      'Dr. Ahmed Al-Farsi',
      'Dr. Mona Khaled',
      'Dr. John Smith',
      'Dr. Fatima Hassan',
    ][i % 5];
    const initials = name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
    const colors = ['67e8f9', 'a5b4fc', 'fca5a5', '86efac', 'fcd34d'];

    return {
      id: `doc-${i + 1}`,
      name,
      specialty: specialties[Math.floor(Math.random() * specialties.length)],
      status: Math.random() > 0.2 ? 'Active' : 'Inactive',
      email: name.toLowerCase().replace(/\s+/g, '.') + '@clinic.com',
      phone: `+966 5${Math.floor(Math.random() * 100000000)}`,
      patients: Math.floor(Math.random() * 200) + 50,
      experience: `${Math.floor(Math.random() * 15) + 5} years`,
      avatar: `https://placehold.co/400x400/${
        colors[i % colors.length]
      }/ffffff.png?text=${initials}&font=roboto`,
    };
  });
};

export default function DoctorsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    specialty: '',
    experience: '',
    status: '',
  });
  const [activeFilter, setActiveFilter] = useState<
    'specialty' | 'experience' | 'status' | null
  >(null);
  const [isWorkingTimeModalOpen, setIsWorkingTimeModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<WorkingTimeFormData>({
    resolver: zodResolver(workingTimeSchema),
    defaultValues: {
      schedule: daysOfWeek.reduce(
        (acc, day) => ({
          ...acc,
          [day]: {
            start: '09:00',
            end: '17:00',
            isOff: false,
          },
        }),
        {}
      ),
    },
  });

  useEffect(() => {
    const loadDoctors = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDoctors(generateMockDoctors(8));
      setIsLoading(false);
    };
    loadDoctors();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setActiveFilter(null);
  };

  const toggleFilter = (filter: 'specialty' | 'experience' | 'status') => {
    setActiveFilter((current) => (current === filter ? null : filter));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      specialty: '',
      experience: '',
      status: '',
    });
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesSpecialty =
      !filters.specialty || doctor.specialty === filters.specialty;
    const matchesExperience =
      !filters.experience || doctor.experience.includes(filters.experience);
    const matchesStatus = !filters.status || doctor.status === filters.status;
    return (
      matchesSearch && matchesSpecialty && matchesExperience && matchesStatus
    );
  });

  const handleWorkingTime = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    if (doctor.workingHours) {
      Object.entries(doctor.workingHours).forEach(([day, hours]) => {
        setValue(`schedule.${day}`, hours);
      });
    }
    setIsWorkingTimeModalOpen(true);
  };

  const onSubmitWorkingTime = async (data: WorkingTimeFormData) => {
    if (selectedDoctor) {
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === selectedDoctor.id
            ? {
                ...doc,
                workingHours: data.schedule,
              }
            : doc
        )
      );
      setIsWorkingTimeModalOpen(false);
      setSelectedDoctor(null);
      reset();
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-14 animate-pulse" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <DoctorCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5">
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search doctors..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-transparent focus:outline-none text-sm"
              />
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-200"></div>

            {/* Specialty Filter */}
            <div className="relative">
              <button
                onClick={() => toggleFilter('specialty')}
                className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Stethoscope className="w-4 h-4" />
                {filters.specialty || 'Specialty'}
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeFilter === 'specialty' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeFilter === 'specialty' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 p-4 animate-fadeIn z-50">
                  <div className="space-y-2">
                    {specialties.map((specialty) => (
                      <button
                        key={specialty}
                        onClick={() =>
                          handleFilterChange('specialty', specialty)
                        }
                        className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-200"></div>

            {/* Experience Filter */}
            <div className="relative">
              <button
                onClick={() => toggleFilter('experience')}
                className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Calendar className="w-4 h-4" />
                {filters.experience || 'Experience'}
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeFilter === 'experience' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeFilter === 'experience' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 p-4 animate-fadeIn z-50">
                  <div className="space-y-2">
                    {experiences.map((exp) => (
                      <button
                        key={exp}
                        onClick={() => handleFilterChange('experience', exp)}
                        className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {exp}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-200"></div>

            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => toggleFilter('status')}
                className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 hover:text-primary transition-colors"
              >
                <UserRound className="w-4 h-4" />
                {filters.status || 'Status'}
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeFilter === 'status' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeFilter === 'status' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 p-4 animate-fadeIn z-50">
                  <div className="space-y-2">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => handleFilterChange('status', status)}
                        className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Clear Filters */}
            {(filters.specialty || filters.experience || filters.status) && (
              <>
                {/* Divider */}
                <div className="h-8 w-px bg-gray-200"></div>

                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Clear Filters
                </button>
              </>
            )}

            <Link
              href="/clinic/doctors/add"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <FiPlus className="w-4 h-4" />
              Add Doctor
            </Link>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={doctor.avatar}
                    alt={doctor.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-500">{doctor.specialty}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    doctor.status === 'Active'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  {doctor.status}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{doctor.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <UserRound className="w-4 h-4" />
                  <span>{doctor.patients} patients</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{doctor.experience} experience</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleWorkingTime(doctor)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  <Clock className="w-4 h-4" />
                  {doctor.workingHours
                    ? `Working Hours Set`
                    : 'Set Working Hours'}
                </button>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Working Time Modal */}
      <Modal
        isOpen={isWorkingTimeModalOpen}
        onClose={() => {
          setIsWorkingTimeModalOpen(false);
          setSelectedDoctor(null);
          reset();
        }}
        title={`Set Working Hours for ${selectedDoctor?.name}`}
        maxWidth="4xl"
        footer={
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsWorkingTimeModalOpen(false);
                setSelectedDoctor(null);
                reset();
              }}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmitWorkingTime)}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Save Changes
            </button>
          </div>
        }
      >
        <form className="space-y-6">
          <div className="grid gap-6">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="flex items-start gap-4 p-4 rounded-xl bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-900">{day}</h3>
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        {...register(`schedule.${day}.isOff`)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      Day Off
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="time"
                      label="Start Time"
                      {...register(`schedule.${day}.start`)}
                      error={errors.schedule?.[day]?.start?.message}
                      disabled={watch(`schedule.${day}.isOff`)}
                    />
                    <Input
                      type="time"
                      label="End Time"
                      {...register(`schedule.${day}.end`)}
                      error={errors.schedule?.[day]?.end?.message}
                      disabled={watch(`schedule.${day}.isOff`)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </form>
      </Modal>
    </PageLayout>
  );
}
