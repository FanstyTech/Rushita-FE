'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { Search, MapPin, Plus, Edit2, Trash2, MoreVertical, Users, UserRound, X, Star } from 'lucide-react';
import Image from 'next/image';
import type { Clinic } from '@/mockData/clinics';
import { useRouter } from 'next/navigation';
import ClinicCardSkeleton from '@/app/admin/clinics/loading';
import Link from 'next/link';

// Mock data generator functions
const cities = ['Riyadh', 'Jeddah', 'Dammam', 'Makkah', 'Medina', 'Tabuk', 'Al Khobar', 'Abha', 'Buraidah'];
const specialties = ['General Medicine', 'Cardiology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Dentistry'];
const facilities = ['Laboratory', 'Pharmacy', 'Emergency Room', 'X-Ray', 'MRI', 'Surgery Rooms'];

const generateMockClinicData = (name: string): Clinic => {
  const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  const city = getRandomItem(cities);
  const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
  const colors = ['67e8f9', 'a5b4fc', 'fca5a5', '86efac', 'fcd34d', 'c084fc', '94a3b8', '60a5fa', '4ade80'];
  
  return {
    id: Date.now().toString(),
    name,
    city,
    status: Math.random() > 0.2 ? 'Active' : 'Inactive',
    patients: getRandomNumber(50, 300),
    doctors: getRandomNumber(5, 25),
    logo: `https://placehold.co/400x400/${getRandomItem(colors)}/ffffff.png?text=${initials}&font=roboto`,
    description: `Advanced medical center in ${city} specializing in ${getRandomItem(specialties)} with ${getRandomItem(facilities)}.`,
    workingHours: {
      weekdays: '8:00 AM - 10:00 PM',
      weekends: '9:00 AM - 6:00 PM'
    },
    specialties: Array(getRandomNumber(2, 4)).fill(0).map(() => getRandomItem(specialties)),
    facilities: Array(getRandomNumber(3, 6)).fill(0).map(() => getRandomItem(facilities)),
    contactInfo: {
      phone: `+966 ${getRandomNumber(10, 99)} ${getRandomNumber(100, 999)} ${getRandomNumber(1000, 9999)}`,
      email: `info@${name.toLowerCase().replace(/\s+/g, '')}.com`,
      address: `${getRandomNumber(1, 999)} ${city} Street, ${city}, Saudi Arabia`
    },
    rating: Number((Math.random() * 2 + 3).toFixed(1))
  };
};

export default function ClinicsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clinicsList, setClinicsList] = useState<Clinic[]>([]);
  const [newClinicName, setNewClinicName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
          setIsModalOpen(false);
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
        setClinicsList(clinicsList.filter(clinic => clinic.id !== id));
      }
    } catch (error) {
      console.error('Error deleting clinic:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredClinics = clinicsList.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinic.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || clinic.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <PageLayout title="Clinics" description="Manage clinics"  >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse" />
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4 justify-between">
              <div className="flex-1 min-w-[280px] max-w-md">
                <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse" />
              </div>
              <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse" />
            </div>

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
    <PageLayout title="Clinics" description="Manage clinics">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/admin/clinics/add">
            <button 
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              Add New Clinic
            </button>
          </Link>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex-1 min-w-[280px] max-w-md relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search clinics..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClinics.map((clinic) => (
              <div key={clinic.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
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
                        <span className="text-sm font-medium">{clinic.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{clinic.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{clinic.description}</p>
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
      </div>

      {/* Add Clinic Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add New Clinic</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700 mb-1">
                  Clinic Name
                </label>
                <input
                  type="text"
                  id="clinicName"
                  value={newClinicName}
                  onChange={(e) => setNewClinicName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter clinic name"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddClinic}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  Generate Clinic
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}