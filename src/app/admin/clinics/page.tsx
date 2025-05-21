'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import {
  Search,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  MoreVertical,
  Users,
  UserRound,
  X,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import type { Clinic } from '@/mockData/clinics';
import { useRouter } from 'next/navigation';
import ClinicCardSkeleton from '@/components/skeletons/ClinicCardSkeleton';
import Link from 'next/link';
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiMapPin,
  FiStar,
  FiX,
  FiChevronDown,
  FiList,
} from 'react-icons/fi';

// Mock data generator functions
const cities = [
  'Riyadh',
  'Jeddah',
  'Dammam',
  'Makkah',
  'Medina',
  'Tabuk',
  'Al Khobar',
  'Abha',
  'Buraidah',
];
const specialties = [
  'General Medicine',
  'Cardiology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'Dentistry',
];
const facilities = [
  'Laboratory',
  'Pharmacy',
  'Emergency Room',
  'X-Ray',
  'MRI',
  'Surgery Rooms',
];

const generateMockClinicData = (name: string): Clinic => {
  const getRandomItem = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];
  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const city = getRandomItem(cities);
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
  const colors = [
    '67e8f9',
    'a5b4fc',
    'fca5a5',
    '86efac',
    'fcd34d',
    'c084fc',
    '94a3b8',
    '60a5fa',
    '4ade80',
  ];

  return {
    id: Date.now().toString(),
    name,
    city,
    status: Math.random() > 0.2 ? 'Active' : 'Inactive',
    patients: getRandomNumber(50, 300),
    doctors: getRandomNumber(5, 25),
    logo: `https://placehold.co/400x400/${getRandomItem(
      colors
    )}/ffffff.png?text=${initials}&font=roboto`,
    description: `Advanced medical center in ${city} specializing in ${getRandomItem(
      specialties
    )} with ${getRandomItem(facilities)}.`,
    workingHours: {
      weekdays: '8:00 AM - 10:00 PM',
      weekends: '9:00 AM - 6:00 PM',
    },
    specialties: Array(getRandomNumber(2, 4))
      .fill(0)
      .map(() => getRandomItem(specialties)),
    facilities: Array(getRandomNumber(3, 6))
      .fill(0)
      .map(() => getRandomItem(facilities)),
    contactInfo: {
      phone: `+966 ${getRandomNumber(10, 99)} ${getRandomNumber(
        100,
        999
      )} ${getRandomNumber(1000, 9999)}`,
      email: `info@${name.toLowerCase().replace(/\s+/g, '')}.com`,
      address: `${getRandomNumber(
        1,
        999
      )} ${city} Street, ${city}, Saudi Arabia`,
    },
    rating: Number((Math.random() * 2 + 3).toFixed(1)),
  };
};

export default function ClinicsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clinicsList, setClinicsList] = useState<Clinic[]>([]);
  const [newClinicName, setNewClinicName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: '',
    location: '',
    specialty: '',
    rating: '',
  });
  const [activeFilter, setActiveFilter] = useState<
    'location' | 'specialty' | 'rating' | null
  >(null);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      specialty: '',
      rating: '',
    });
  };

  const toggleFilter = (filter: 'location' | 'specialty' | 'rating') => {
    setActiveFilter((current) => (current === filter ? null : filter));
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const response = await fetch('/api/clinics');
      const data = await response.json();
      setClinicsList(data);
    } catch (error) {
      console.error('Error fetching clinics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClinic = async () => {
    if (newClinicName.trim()) {
      setIsLoading(true);
      const newClinic = generateMockClinicData(newClinicName.trim());
      try {
        const response = await fetch('/api/clinics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newClinic),
        });

        if (response.ok) {
          setClinicsList([newClinic, ...clinicsList]);
          setNewClinicName('');
        }
      } catch (error) {
        console.error('Error adding clinic:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteClinic = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/clinics/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setClinicsList(clinicsList.filter((clinic) => clinic.id !== id));
      }
    } catch (error) {
      console.error('Error deleting clinic:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredClinics = clinicsList.filter((clinic) => {
    const matchesSearch =
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      clinic.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-14 animate-pulse" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <ClinicCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="mb-8">
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
                placeholder="Search clinics..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-transparent focus:outline-none text-sm"
              />
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-200"></div>

            {/* Location Dropdown */}
            <div className="relative group">
              <button
                onClick={() => toggleFilter('location')}
                className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 group-hover:text-blue-600 transition-colors"
              >
                <FiMapPin className="w-4 h-4" />
                {filters.location || 'Location'}
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeFilter === 'location' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {/* Location Panel */}
              {activeFilter === 'location' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 p-4 animate-fadeIn z-50">
                  <div className="space-y-2">
                    {[
                      'New York',
                      'Los Angeles',
                      'Chicago',
                      'Houston',
                      'Phoenix',
                    ].map((city) => (
                      <label
                        key={city}
                        className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="location"
                          value={city.toLowerCase().replace(' ', '-')}
                          checked={
                            filters.location ===
                            city.toLowerCase().replace(' ', '-')
                          }
                          onChange={(e) => {
                            handleFilterChange('location', e.target.value);
                            setActiveFilter(null);
                          }}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{city}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-200"></div>

            {/* Specialty Dropdown */}
            <div className="relative group">
              <button
                onClick={() => toggleFilter('specialty')}
                className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 group-hover:text-blue-600 transition-colors"
              >
                <FiList className="w-4 h-4" />
                {filters.specialty || 'Specialty'}
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeFilter === 'specialty' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {/* Specialty Panel */}
              {activeFilter === 'specialty' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 p-4 animate-fadeIn z-50">
                  <div className="space-y-2">
                    {[
                      'Cardiology',
                      'Dermatology',
                      'Pediatrics',
                      'Orthopedics',
                      'Neurology',
                    ].map((specialty) => (
                      <label
                        key={specialty}
                        className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="specialty"
                          value={specialty.toLowerCase()}
                          checked={
                            filters.specialty === specialty.toLowerCase()
                          }
                          onChange={(e) => {
                            handleFilterChange('specialty', e.target.value);
                            setActiveFilter(null);
                          }}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {specialty}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-200"></div>

            {/* Rating Filter */}
            <div className="relative group">
              <button
                onClick={() => toggleFilter('rating')}
                className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 group-hover:text-blue-600 transition-colors"
              >
                <FiStar className="w-4 h-4" />
                {filters.rating ? `${filters.rating}+ Stars` : 'Rating'}
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeFilter === 'rating' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {/* Rating Panel */}
              {activeFilter === 'rating' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 p-4 animate-fadeIn z-50">
                  <div className="space-y-2">
                    {[5, 4, 3].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={filters.rating === rating.toString()}
                          onChange={(e) => {
                            handleFilterChange('rating', e.target.value);
                            setActiveFilter(null);
                          }}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 flex items-center gap-1">
                          {rating}+{' '}
                          <FiStar className="w-3 h-3 text-yellow-400" />
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Filter Actions */}
            <div className="pl-2 flex items-center gap-2">
              <button
                onClick={clearFilters}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  Object.values(filters).some((v) => v)
                    ? 'text-blue-600 hover:bg-blue-50'
                    : 'text-gray-400'
                }`}
              >
                Clear
              </button>
              <div className="h-8 w-px bg-gray-200"></div>
              <Link
                href="/admin/clinics/add"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <FiPlus className="w-4 h-4" />
                Add Clinic
              </Link>
            </div>
          </div>
        </div>

        {/* Filter Dropdowns */}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClinics.map((clinic) => (
            <div
              key={clinic.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={clinic.logo}
                      alt={`${clinic.name} logo`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        clinic.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {clinic.status}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">
                        {clinic.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {clinic.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {clinic.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {clinic.city}
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    {clinic.patients} patients
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <UserRound className="w-4 h-4" />
                    {clinic.doctors} doctors
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-end gap-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteClinic(clinic.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
