'use client';

import { useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, TextArea } from '@/components/common/form';
import { Button } from '@/components/ui/button';
import Modal from '@/components/common/Modal';
import { Column, Table } from '@/components/common/Table';
import PageLayout from '@/components/layouts/PageLayout';
import { useServicePrice } from '@/lib/api/hooks/useServicePrice';
import { useClinicStaff } from '@/lib/api/hooks/useClinicStaff';
import {
  ServicePriceListDto,
  ServiceType,
} from '@/lib/api/types/service-price';
import { SelectOption } from '@/lib/api/types/select-option';
import {
  ServicePriceFormData,
  ParsedServicePriceData,
  servicePriceSchema,
} from './validation';
import { Pencil, Trash2, DollarSign } from 'lucide-react';
import { FiList, FiUser } from 'react-icons/fi';
import { ConfirmationModal } from '@/components/common';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import { GetClinicStaffForDropdownInput } from '@/lib/api/types/clinic-staff';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { getServiceTypeColor, getServiceTypeLabel } from '@/utils/textUtils';
import ServicePriceCardsSkeleton from '@/components/skeletons/ServicePriceCardsSkeleton';

export default function ServicePricesPage() {
  const { user } = useAuth();

  // Extract clinicId and staffId directly from user
  const clinicId = user?.clinicInfo?.id || '';
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] =
    useState<ServicePriceListDto | null>(null);
  const [serviceOptions, setServiceOptions] = useState<SelectOption<string>[]>(
    []
  );

  // Create staff filter with debounced search
  const staffFilter = useMemo<GetClinicStaffForDropdownInput>(
    () => ({
      clinicId,
      filter: '', // Note: API expects 'filter'
    }),
    [clinicId]
  );

  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',

    serviceType: undefined as ServiceType | undefined,
    clinicId: undefined as string | undefined,
    doctorId: undefined as string | undefined,
    isActive: undefined as boolean | undefined,
  });

  // Hooks
  const { useClinicStaffForDropdown } = useClinicStaff();
  const { data: doctors } = useClinicStaffForDropdown(staffFilter);

  const form = useForm<ServicePriceFormData>({
    resolver: zodResolver(servicePriceSchema),
    defaultValues: {
      serviceType: undefined,
      serviceId: '',
      price: 0,
      notes: '',
      clinicId: clinicId,
      doctorId: '',
      isActive: 'true',
    },
  });
  // API Hooks
  const {
    createOrUpdateServicePrice,
    deleteServicePrice,
    useServicePricesList,
    useServicePriceDetails,
    useServicesByType,
    useServicePriceSummary,
  } = useServicePrice();
  // Get data using the new hook structure
  const { data: servicePrices, isLoading } = useServicePricesList(filter);

  // Fetch service price details when in edit mode
  const { data: servicePriceDetails, isLoading: isLoadingDetails } =
    useServicePriceDetails(selectedPrice?.id || '');

  // Load service options when service type changes
  const { data: services } = useServicesByType({
    filter: '',
    serviceType: Number(form.watch('serviceType')) as ServiceType,
  });

  // Get service price summary data
  const { data: servicePriceSummary = [], isLoading: isLoadingSummary } =
    useServicePriceSummary({
      clinicId: clinicId,
      doctorId: filter.doctorId?.toString(),
    });

  // Effect to update service options when service type changes
  useEffect(() => {
    if (services) {
      setServiceOptions(
        services.map((service) => ({
          value: service.value,
          label: service.label,
        }))
      );
    } else {
      setServiceOptions([]);
    }
  }, [services]);

  // Effect to populate form with service price details when editing
  useEffect(() => {
    if (selectedPrice && servicePriceDetails) {
      form.reset({
        serviceType: servicePriceDetails.serviceType,
        serviceId: servicePriceDetails.serviceId || '',
        price: servicePriceDetails.price,
        notes: servicePriceDetails.notes || '',
        clinicId: servicePriceDetails.clinicId,
        doctorId: servicePriceDetails.doctorId?.toString() || '',
        isActive: servicePriceDetails.isActive ? 'true' : 'false',
      });
    }
  }, [selectedPrice, servicePriceDetails, form]);

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Get service type badge color based on type

  const columns: Column<ServicePriceListDto>[] = [
    {
      header: 'Service Type',
      accessor: 'serviceType',
      cell: ({ row }) => {
        const type = row.original.serviceType;
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getServiceTypeColor(
              type
            )}`}
          >
            {getServiceTypeLabel(type)}
          </span>
        );
      },
    },
    {
      header: 'Service',
      accessor: 'serviceName',
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.serviceName || 'General (All Services)'}
        </span>
      ),
    },
    {
      header: 'Price',
      accessor: 'price',
      cell: ({ row }) => (
        <span className="font-medium text-emerald-600 dark:text-emerald-400">
          {formatCurrency(row.original.price)}
        </span>
      ),
    },
    {
      header: 'Clinic',
      accessor: 'clinicName',
    },
    {
      header: 'Doctor',
      accessor: 'doctorName',
    },
    {
      header: 'Status',
      accessor: 'isActive',
      cell: ({ row }) => {
        const isActive = row.original.isActive;
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isActive
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            }`}
          >
            {isActive ? 'Active' : 'Inactive'}
          </span>
        );
      },
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => handleEdit(row.original)}
            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleDelete(row.original)}
            className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Handlers
  const onSubmit = async (formData: ServicePriceFormData) => {
    const payload: ParsedServicePriceData = {
      serviceType: formData.serviceType,
      serviceId: formData.serviceId || undefined,
      price: formData.price,
      notes: formData.notes,
      clinicId: formData.clinicId,
      doctorId: formData.doctorId || undefined,
      isActive: formData.isActive === 'true',
      ...(selectedPrice && { id: selectedPrice.id }),
    };

    await createOrUpdateServicePrice.mutateAsync(payload);

    handleCloseModal();
  };

  const handleAdd = () => {
    setSelectedPrice(null);
    form.reset({
      serviceType: ServiceType.Visit,
      serviceId: '',
      price: 0,
      notes: '',
      clinicId: clinicId,
      doctorId: '',
      isActive: 'true',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (price: ServicePriceListDto) => {
    setSelectedPrice(price);
    // Form will be populated by the useEffect that watches servicePriceDetails
    setIsModalOpen(true);
  };

  const handleDelete = async (price: ServicePriceListDto) => {
    setSelectedPrice(price);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedPrice) {
      await deleteServicePrice.mutateAsync(selectedPrice.id);
      setIsDeleteModalOpen(false);
      setSelectedPrice(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.reset();
    setSelectedPrice(null);
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Service Type Cards */}
        {isLoadingSummary ? (
          <ServicePriceCardsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(ServiceType)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => {
                const serviceType = Number(value) as ServiceType;
                const summaryItem = servicePriceSummary?.find(
                  (item) => item.serviceType === serviceType
                );
                const count = summaryItem?.count || 0;
                const avgPrice = summaryItem?.averagePrice
                  ? formatCurrency(summaryItem.averagePrice)
                  : '$0.00';

                return (
                  <button
                    key={value}
                    onClick={() =>
                      setFilter((prev) => ({
                        ...prev,
                        serviceType:
                          filter.serviceType === serviceType
                            ? undefined
                            : serviceType,
                      }))
                    }
                    className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                      filter.serviceType === serviceType
                        ? 'bg-primary-100 border-2 border-primary-500 dark:bg-primary-900/30 dark:border-primary-700'
                        : 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border-2 border-transparent'
                    } shadow`}
                  >
                    <span
                      className={`inline-flex items-center justify-center p-3 rounded-full mb-2 ${getServiceTypeColor(
                        serviceType
                      )}`}
                    >
                      {key === 'Visit' && <FiUser className="w-6 h-6" />}
                      {key === 'Prescription' && <FiList className="w-6 h-6" />}
                      {key === 'LabTest' && (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                          />
                        </svg>
                      )}
                      {key === 'Radiology' && (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                          />
                        </svg>
                      )}
                      {key === 'Dental' && (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {key}
                    </span>
                    <div className="flex justify-between w-full mt-2">
                      <div className="text-center px-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">
                          Count
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {count}
                        </span>
                      </div>
                      <div className="text-center px-2 border-l border-gray-200 dark:border-gray-700">
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">
                          Avg Price
                        </span>
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">
                          {avgPrice}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        )}
        {/* Header with filter info */}
        <FilterBar
          filter={filter}
          onFilterChange={(newFilter) => {
            setFilter((prev) => ({
              ...prev,
              ...newFilter,
              pageNumber: newFilter.pageNumber ?? prev.pageNumber,
              pageSize: newFilter.pageSize ?? prev.pageSize,
              sortColumn: newFilter.sortColumn ?? prev.sortColumn,
              sortDirection: newFilter.sortDirection ?? prev.sortDirection,
            }));
          }}
          onAddNew={handleAdd}
          additionalFilters={[
            {
              icon: <FiUser className="w-4 h-4" />,
              label: 'Doctor',
              options: [
                {
                  value: '',
                  label: 'All Doctors',
                },
                ...(doctors?.map((doctor: SelectOption<string>) => ({
                  value: doctor.value,
                  label: doctor.label || '',
                })) || []),
              ],
              value: String(filter.doctorId || ''),
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  doctorId: value || undefined,
                })),
            },
          ]}
        />

        <Table<ServicePriceListDto>
          data={servicePrices?.items ?? []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize || 10,
            pageIndex: (filter.pageNumber || 1) - 1,
            pageCount: servicePrices?.totalPages || 0,
            onPageChange: (page: number) =>
              setFilter((prev) => ({ ...prev, pageNumber: page + 1 })),
          }}
        />
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              isLoading={createOrUpdateServicePrice.isPending}
            >
              {selectedPrice ? 'Save Changes' : 'Add Category'}
            </Button>
          </div>
        }
        title={selectedPrice ? 'Edit Service Price' : 'Add New Service Price'}
      >
        <form className="space-y-6">
          {isLoadingDetails && selectedPrice ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <>
              <Select
                label="Service Type"
                required={true}
                value={String(form.watch('serviceType'))}
                {...form.register('serviceType')}
                error={form.formState.errors.serviceType?.message}
                options={Object.entries(ServiceType)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => ({
                    value: value.toString(),
                    label: key,
                  }))}
              />

              {form.watch('serviceType') > 1 && (
                <Select
                  value={String(form.watch('serviceId'))}
                  label="Service"
                  {...form.register('serviceId')}
                  error={form.formState.errors.serviceId?.message}
                  options={[
                    { value: '', label: 'General (All Services)' },
                    ...serviceOptions,
                  ]}
                />
              )}

              <Input
                label="Price"
                required={true}
                type="number"
                step="0.01"
                min="0"
                startIcon={<DollarSign className="w-4 h-4" />}
                {...form.register('price')}
                error={form.formState.errors.price?.message}
              />

              <Select
                label="Doctor"
                value={String(form.watch('doctorId'))}
                {...form.register('doctorId')}
                error={form.formState.errors.doctorId?.message}
                options={[
                  { value: '', label: 'Select Doctor' },
                  ...(doctors?.map((doctor: SelectOption<string>) => ({
                    value: doctor.value,
                    label: doctor.label || '',
                  })) || []),
                ]}
                disabled={!form.watch('clinicId')}
              />

              <TextArea
                label="Notes"
                {...form.register('notes')}
                error={form.formState.errors.notes?.message}
              />

              <Select
                required={true}
                value={String(form.watch('isActive'))}
                label="Status"
                {...form.register('isActive')}
                error={form.formState.errors.isActive?.message}
                options={[
                  { value: 'true', label: 'Active' },
                  { value: 'false', label: 'Inactive' },
                ]}
              />
            </>
          )}
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Service Price"
        message="Are you sure you want to delete this service price?"
        secondaryMessage="This action cannot be undone."
        variant="error"
        confirmText="Delete"
        isLoading={deleteServicePrice.isPending}
      />
    </PageLayout>
  );
}
