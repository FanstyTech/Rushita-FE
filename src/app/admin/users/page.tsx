'use client';

import PageLayout from '@/components/layouts/PageLayout';
import { useState } from 'react';
import { PermissionsModal } from '@/components/modals/PermissionsModal';

// Import constants from mock data
const organizationalUnits = [
  '../Finance/AccountsReceivable',
  '../Finance/AccountsPayable',
  '../HR/Recruitment',
  '../HR/EmployeeRelations',
  '../IT/Infrastructure',
  '../IT/SupportServices',
  '../Marketing/ContentCreation',
  '../Marketing/DigitalAdvertising',
  '../Sales/CorporateClients',
  '../Sales/SMBClients',
  '../Operations/SupplyChain',
  '../Operations/Management',
  '../Legal/Compliance',
];

const userSources = ['Local', 'Azure AD', 'Google Workspace', 'Okta'];
const roles = ['Admin', 'User', 'Manager', 'Analyst'];
const statuses = ['Active', 'Inactive', 'Suspended', 'Seated', 'Unseated'];

export default function UsersPage() {
  const [selectedUser] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: '',
    source: '',
    unit: '',
  });

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          {/* Actions Row */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add User
              </button>

              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414v6.586a1 1 0 01-.293.707l-2 2A1 1 0 0111 23v-9.586l-6.414-6.414A1 1 0 014 6.586V4z"
                  />
                </svg>
                Filters
                {Object.values(filters).some(Boolean) && (
                  <span className="ml-1 inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                    {Object.values(filters).filter(Boolean).length}
                  </span>
                )}
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search users..."
                className="block w-full rounded-lg border-0 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {isFilterOpen && (
            <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Role Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    value={filters.role}
                    onChange={(e) => handleFilterChange('role', e.target.value)}
                    className="block w-full rounded-lg border-0 py-2.5 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">All Roles</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange('status', e.target.value)
                    }
                    className="block w-full rounded-lg border-0 py-2.5 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">All Status</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Source Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Source
                  </label>
                  <select
                    value={filters.source}
                    onChange={(e) =>
                      handleFilterChange('source', e.target.value)
                    }
                    className="block w-full rounded-lg border-0 py-2.5 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">All Sources</option>
                    {userSources.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Organizational Unit Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Unit
                  </label>
                  <select
                    value={filters.unit}
                    onChange={(e) => handleFilterChange('unit', e.target.value)}
                    className="block w-full rounded-lg border-0 py-2.5 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">All Units</option>
                    {organizationalUnits.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              {Object.values(filters).some(Boolean) && (
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setFilters({
                        search: '',
                        role: '',
                        status: '',
                        source: '',
                        unit: '',
                      });
                    }}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* <Table<User>
          data={users}
          columns={columns}
          isLoading={dataLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          noDataMessage={{
            title: 'No users found',
            subtitle: 'Start by adding a new user to the system',
          }}
        /> */}
      </div>

      {selectedUser && (
        <PermissionsModal
          isOpen={isPermissionsModalOpen}
          onClose={() => setIsPermissionsModalOpen(false)}
          userName={selectedUser.name}
          userId={selectedUser.id}
        />
      )}
    </PageLayout>
  );
}
