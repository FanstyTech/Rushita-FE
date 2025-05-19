"use client";

import PageLayout from '@/components/layouts/PageLayout';
import SectionTitle from '@/components/common/SectionTitle';
import Modal from '@/components/common/Modal';
import { useState, useEffect } from 'react';
import type { User } from '@/mockData/users';
import { Table } from '@/components/common/Table';
import { PermissionsModal } from '@/components/modals/PermissionsModal';

interface Permission {
  id: string;
  name: string;
  checked: boolean;
  children?: Permission[];
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<{ id: number; name: string } | null>(null);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;
  const fetchUsers = async (page: number) => {
    setDataLoading(true); // Show loading state
    try {
      const response = await fetch(`/api/users?page=${page}&limit=${itemsPerPage}`);
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
      setTotalItems(data.total);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setDataLoading(false); // Hide loading state
    }
  };
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const columns = [
    {
      header: 'Name',
      accessor: (user: User) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            {user.avatar ? (
              <img
                className="h-10 w-10 rounded-full"
                src={user.avatar}
                alt={user.name}
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-lg font-medium text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      ),
      className: ''
    },
    {
      header: 'Role',
      accessor: (user: User) => user.role,
      className: 'text-gray-500'
    },
    {
      header: 'Status',
      accessor: (user: User) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${user.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
          ${user.status === 'Inactive' ? 'bg-red-100 text-red-800' : ''}
          ${user.status === 'Suspended' ? 'bg-yellow-100 text-yellow-800' : ''}
          ${user.status === 'Seated' ? 'bg-blue-100 text-blue-800' : ''}
          ${user.status === 'Unseated' ? 'bg-gray-100 text-gray-800' : ''}
        `}>
          {user.status}
        </span>
      )
    },
    {
      header: 'Organizational Unit',
      accessor: (user: User) => user.organizationalUnit || '-',
      className: 'text-gray-500'
    },
    {
      header: 'User Source',
      accessor: (user: User) => user.userSource || '-',
      className: 'text-gray-500'
    },
    {
      header: 'Updated At',
      accessor: (user: User) => user.updatedAt,
      className: 'text-gray-500'
    },
    {
      header: 'Actions',
      accessor: (user: User) => (
        <div className="relative flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenDropdownId(openDropdownId === user.id ? null : user.id);
            }}
            className="inline-flex items-center justify-center text-gray-400 hover:text-gray-500 transition-colors duration-200 p-1.5 rounded-full hover:bg-gray-100 focus:outline-none"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          {openDropdownId === user.id && (
            <>
              <div 
                className="fixed inset-0 z-30"
                onClick={() => setOpenDropdownId(null)}
              />
              <div
                className="absolute z-40 right-0 mt-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transform origin-top-right"
                style={{
                  top: '100%',
                }}
              >
                <button
                  className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setOpenDropdownId(null);
                  }}
                >
                  <svg 
                    className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                    />
                  </svg>
                  Edit
                </button>
                <button
                  className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setSelectedUser({ id: user.id, name: user.name });
                    setIsPermissionsModalOpen(true);
                    setOpenDropdownId(null);
                  }}
                >
                  <svg 
                    className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" 
                    />
                  </svg>
                  Permissions
                </button>
              </div>
            </>
          )}
        </div>
      ),
      className: 'w-16 pr-4'
    }
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOpenDropdownId(null); 
  };

  return (
    <PageLayout title="Users Management" description="Manage user accounts, roles, and permissions">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add User
          </button>

          <div className="flex flex-1 sm:flex-none flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="block w-full rounded-lg border-0 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <select
              className="block w-full rounded-lg border-0 py-2.5 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="receptionist">Receptionist</option>
              <option value="nurse">Nurse</option>
            </select>

            <select
              className="block w-full rounded-lg border-0 py-2.5 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <Table
          data={users}
          columns={columns}
          isLoading={dataLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          noDataMessage={{
            title: "No users found",
            subtitle: "Start by adding a new user to the system"
          }}
        />
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