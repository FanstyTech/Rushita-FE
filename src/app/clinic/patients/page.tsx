'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import PageLayout from '@/components/layouts/PageLayout';
import { Table } from '@/components/common/Table';
import type { Column } from '@/components/common/Table';
import {
  PatientStatus,
  Gender,
  ClinicPatientListDto,
} from '@/lib/api/types/clinic-patient';
import { ConfirmationModal } from '@/components/common';
import { Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { getGenderLabel } from '@/utils/textUtils';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import { FiList } from 'react-icons/fi';
import { SelectOption } from '@/lib/api/types/select-option';
import Link from 'next/link';
import { User } from 'lucide-react';
import Avatar from '@/components/common/Avatar';
import { useTranslation } from 'react-i18next';

export default function ClinicPatientsPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 5,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    clinicId: '',
    status: undefined as PatientStatus | undefined,
    gender: undefined as Gender | undefined,
    fromDate: undefined as string | undefined,
    toDate: undefined as string | undefined,
  });

  // API hooks
  const { usePatientsList, deletePatient } = useClinicPatients();

  const { data: patientsList, isLoading: patientsLoading } =
    usePatientsList(filters);

  // Effects
  useEffect(() => {
    if (user) {
      const clinicId = user.clinicInfo?.id;
      if (clinicId) {
        setFilters((prev) => ({ ...prev, clinicId }));
      }
    }
  }, [user]);

  // Event handlers
  const handleAddNew = () => {
    router.push('/clinic/patients/add');
  };

  const handleEdit = (id: string) => {
    router.push(`/clinic/patients/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setPatientToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (patientToDelete) {
      await deletePatient.mutateAsync(patientToDelete);
      setIsDeleteModalOpen(false);
      setPatientToDelete(null);
    }
  };

  const genderOptions = Object.entries(Gender)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      value: value.toString(),
      label:
        key === 'Male'
          ? t('clinic.patients.filters.male')
          : t('clinic.patients.filters.female'),
    }));

  const columns: Column<ClinicPatientListDto>[] = [
    {
      header: t('clinic.patients.table.name'),
      accessor: 'fullName',
      cell: ({ row }: { row: { original: ClinicPatientListDto } }) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.original.fullName} size="sm" />
          <div>
            <div className="font-medium">{row.original.fullName}</div>
          </div>
        </div>
      ),
    },
    {
      header: t('clinic.patients.table.contact'),
      accessor: 'phoneNumber',
      cell: ({ row }: { row: { original: ClinicPatientListDto } }) => (
        <div>
          <div>{row.original.phoneNumber}</div>
          <div className="text-sm">{row.original.email}</div>
        </div>
      ),
    },
    {
      header: t('clinic.patients.table.gender'),
      accessor: 'gender',
      cell: ({ row }: { row: { original: ClinicPatientListDto } }) => (
        <div>
          <div>{getGenderLabel(row.original.gender)}</div>
        </div>
      ),
    },
    {
      header: t('clinic.patients.table.dateOfBirth'),
      accessor: 'dateOfBirth',
      cell: ({ row }: { row: { original: ClinicPatientListDto } }) =>
        row.original.dateOfBirth
          ? format(new Date(row.original.dateOfBirth), 'MMM d, yyyy')
          : t('clinic.patients.dateFormat.noDate'),
    },
    {
      header: t('clinic.patients.table.totalVisits'),
      accessor: 'totalVisits',
    },
    {
      header: t('clinic.patients.table.lastVisitDate'),
      accessor: 'lastVisitDate',
      cell: ({ row }: { row: { original: ClinicPatientListDto } }) =>
        row.original.lastVisitDate
          ? format(new Date(row.original.lastVisitDate), 'MMM d, yyyy')
          : t('clinic.patients.dateFormat.noDate'),
    },

    {
      header: t('clinic.patients.table.actions'),
      accessor: 'id',
      cell: ({ row }: { row: { original: ClinicPatientListDto } }) => (
        <div className="flex gap-2">
          <Link
            href={`/clinic/patients/${row.original.id}`}
            className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
            title={t('clinic.patients.actions.view')}
          >
            <User className="w-4 h-4" />
          </Link>

          <button
            onClick={() => handleEdit(row.original.id)}
            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
            title={t('clinic.patients.actions.edit')}
          >
            <Pencil className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleDelete(row.original.id)}
            className="p-1 text-red-600 hover:text-red-800 transition-colors"
            title={t('clinic.patients.actions.delete')}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <PageLayout>
      <div className="space-y-4">
        <FilterBar
          filter={filters}
          onFilterChange={(newFilter) => {
            setFilters((prev) => ({
              ...prev,
              ...newFilter,
              pageNumber: newFilter.pageNumber ?? prev.pageNumber,
              pageSize: newFilter.pageSize ?? prev.pageSize,
              sortColumn: newFilter.sortColumn ?? prev.sortColumn,
              sortDirection: newFilter.sortDirection ?? prev.sortDirection,
            }));
          }}
          onAddNew={handleAddNew}
          haveStatusFilter={false}
          additionalFilters={[
            {
              icon: <FiList className="w-4 h-4" />,
              label: t('clinic.patients.filters.gender'),
              options: [
                { value: '', label: t('clinic.patients.filters.all') },
                ...(genderOptions?.map((gender: SelectOption<string>) => ({
                  value: gender.value,
                  label: gender.label || '',
                })) || []),
              ],
              value: String(filters.gender || ''),
              onChange: (value) =>
                setFilters((prev) => ({
                  ...prev,
                  gender: value,
                })),
            },
          ]}
        />

        {/* Table */}
        <Table<ClinicPatientListDto>
          data={patientsList?.items || []}
          columns={columns}
          isLoading={patientsLoading}
          pagination={{
            pageSize: filters.pageSize,
            pageIndex: filters.pageNumber - 1,
            pageCount: patientsList?.totalPages || 0,
            onPageChange: (pageIndex: number) =>
              setFilters((prev) => ({ ...prev, pageNumber: pageIndex + 1 })),
          }}
        />

        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title={t('clinic.patients.deleteModal.title')}
          message={t('clinic.patients.deleteModal.message')}
          secondaryMessage={t('clinic.patients.deleteModal.secondaryMessage')}
          isLoading={deletePatient.isPending}
        />
      </div>
    </PageLayout>
  );
}
