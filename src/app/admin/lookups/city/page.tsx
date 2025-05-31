'use client';

import { useState } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { Table } from '@/components/common/Table';
import { Plus, Search as FiSearch, Pencil, Trash2 } from 'lucide-react';
import Modal from '@/components/common/Modal';
import { Input, Select } from '@/components/common/form';
import { FiChevronDown } from 'react-icons/fi';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const citySchema = z.object({
  name: z
    .string()
    .min(2, 'City name must be at least 2 characters')
    .max(50, 'City name cannot exceed 50 characters')
    .regex(
      /^[a-zA-Z\s-]+$/,
      'City name can only contain letters, spaces, and hyphens'
    ),
  countryId: z.string().min(1, 'Please select a country'),
  status: z.enum(['active', 'inactive']),
});

type CityFormData = z.infer<typeof citySchema>;

interface City {
  id: string;
  name: string;
  countryId: string;
  countryName: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const mockCities: City[] = [
  {
    id: '1',
    name: 'New York',
    countryId: '1',
    countryName: 'United States',
    status: 'active',
    createdAt: '2025-05-01',
  },
  {
    id: '2',
    name: 'London',
    countryId: '2',
    countryName: 'United Kingdom',
    status: 'active',
    createdAt: '2025-05-02',
  },
  {
    id: '3',
    name: 'Toronto',
    countryId: '3',
    countryName: 'Canada',
    status: 'active',
    createdAt: '2025-05-03',
  },
];

// Mock countries for the dropdown
const mockCountries = [
  { id: '1', name: 'United States' },
  { id: '2', name: 'United Kingdom' },
  { id: '3', name: 'Canada' },
];

export default function CityPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cities, setCities] = useState<City[]>(mockCities);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    countryId: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CityFormData>({
    resolver: zodResolver(citySchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      countryId: '',
      status: 'active',
    },
  });

  const onSubmit = async (data: CityFormData) => {
    const selectedCountry = mockCountries.find(
      (country) => country.id === data.countryId
    );

    if (selectedCity) {
      // Edit mode
      setCities((prev) =>
        prev.map((city) =>
          city.id === selectedCity.id
            ? {
                ...city,
                ...data,
                countryName: selectedCountry?.name || '',
              }
            : city
        )
      );
      setIsEditModalOpen(false);
    } else {
      // Add mode
      const newCity: City = {
        id: `city-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        ...data,
        countryName: selectedCountry?.name || '',
      };
      setCities((prev) => [newCity, ...prev]);
      setIsAddModalOpen(false);
    }

    reset();
    setSelectedCity(null);
  };

  const handleEdit = (city: City) => {
    setSelectedCity(city);
    setValue('name', city.name);
    setValue('countryId', city.countryId);
    setValue('status', city.status);
    setIsEditModalOpen(true);
  };

  const handleDelete = (city: City) => {
    setSelectedCity(city);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCity) {
      setCities((prev) => prev.filter((city) => city.id !== selectedCity.id));
      setIsDeleteModalOpen(false);
      setSelectedCity(null);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      countryId: '',
    });
  };

  const itemsPerPage = 10;

  const filteredCities = cities.filter((city) => {
    const matchesSearch =
      city.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      city.countryName.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = !filters.status || city.status === filters.status;
    const matchesCountry =
      !filters.countryId || city.countryId === filters.countryId;
    return matchesSearch && matchesStatus && matchesCountry;
  });

  const columns = [
    {
      header: 'Name',
      accessor: 'name' as keyof City,
      className: 'font-medium text-gray-900',
    },
    {
      header: 'Country',
      accessor: 'countryName' as keyof City,
    },
    {
      header: 'Status',
      accessor: (city: City) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
            city.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {city.status}
        </span>
      ),
    },
    {
      header: 'Created At',
      accessor: 'createdAt' as keyof City,
    },
    {
      header: 'Actions',
      accessor: (city: City) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(city)}
            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(city)}
            className="p-1 text-red-600 hover:text-red-800 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5">
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="flex-1 relative">
              <Input
                hasBorder={false}
                placeholder="Search cities..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                startIcon={<FiSearch className="w-4 h-4 text-gray-400" />}
                className="bg-transparent"
              />
            </div>
            {/* Divider */}
            <div className="h-8 w-px bg-gray-200"></div>

            {/* Status Filter */}
            <div>
              <Select
                value={filters.status}
                hasBorder={false}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                options={[
                  { value: '', label: 'All Status' },
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                ]}
                className="appearance-none px-4 py-2.5 text-sm text-gray-600 bg-transparent focus:outline-none cursor-pointer pr-10"
              />
            </div>

            {/* Country Filter */}
            <div className="relative">
              <Select
                value={filters.countryId}
                onChange={(e) =>
                  handleFilterChange('countryId', e.target.value)
                }
                hasBorder={false}
                options={mockCountries.map((country) => ({
                  value: country.id,
                  label: country.name,
                }))}
                className="appearance-none px-4 py-2.5 text-sm text-gray-600 bg-transparent focus:outline-none cursor-pointer pr-10"
              />
            </div>

            {/* Clear Filters */}
            {(filters.search || filters.status || filters.countryId) && (
              <>
                {/* Divider */}
                <div className="h-8 w-px bg-gray-200"></div>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2.5 text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Clear Filters
                </button>
              </>
            )}

            {/* Add City Button */}
            <button
              onClick={() => {
                reset();
                setIsAddModalOpen(true);
              }}
              className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add City
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <Table<City>
            data={filteredCities}
            columns={columns}
            currentPage={currentPage}
            totalPages={Math.ceil(filteredCities.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredCities.length}
            noDataMessage={{
              title: 'No cities found',
              subtitle: 'No cities match your search criteria.',
            }}
          />
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setSelectedCity(null);
          reset();
        }}
        footer={
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
                setSelectedCity(null);
                reset();
              }}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {selectedCity ? 'Save Changes' : 'Add City'}
            </button>
          </div>
        }
        title={`${selectedCity ? 'Edit' : 'Add'} City`}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Name"
              {...register('name')}
              error={errors.name?.message}
              helperText="Enter city name (letters, spaces, and hyphens only)"
              placeholder="Enter city name"
            />

            <Select
              label="Country"
              {...register('countryId')}
              error={errors.countryId?.message}
              options={[
                { value: '', label: 'Select a country' },
                ...mockCountries.map((country) => ({
                  value: country.id,
                  label: country.name,
                })),
              ]}
            />

            <Select
              label="Status"
              {...register('status')}
              error={errors.status?.message}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCity(null);
        }}
        footer={
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedCity(null);
              }}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              className="px-6 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all"
            >
              Delete
            </button>
          </div>
        }
        title="Delete City"
        maxWidth="2xl"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete this city? This action cannot be
            undone.
          </p>
        </div>
      </Modal>
    </PageLayout>
  );
}
