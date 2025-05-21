'use client';

import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
  noDataMessage?: {
    title: string;
    subtitle?: string;
  };
}

export function Table<T>({
  data,
  columns,
  isLoading = false,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 5,
  totalItems,
  noDataMessage = {
    title: 'No data found',
    subtitle: 'No records to display',
  },
}: TableProps<T>) {
  const LoadingSkeleton = () => (
    <>
      {[...Array(itemsPerPage)].map((_, i) => (
        <tr key={i}>
          {columns.map((column, j) => (
            <td
              key={j}
              className={`px-6 py-4 whitespace-nowrap ${
                column.className || ''
              }`}
            >
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-full max-w-[150px]" />
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );

  const renderPaginationButton = (page: number, isCurrentPage: boolean) => (
    <button
      key={page}
      onClick={() => onPageChange(page)}
      className={`
        inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded
        ${
          isCurrentPage
            ? 'bg-indigo-600 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }
      `}
    >
      {page}
    </button>
  );

  return (
    <div className=" bg-white shadow-sm rounded-xl border border-gray-200">
      <div className="overflow-x-auto relative">
        {data.length === 0 && !isLoading && (
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] flex justify-center items-center z-10">
            <div className="  px-8 py-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                {noDataMessage.title}
              </h3>
              {noDataMessage.subtitle && (
                <p className="text-sm text-gray-500 text-center">
                  {noDataMessage.subtitle}
                </p>
              )}
            </div>
          </div>
        )}
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50 ${
                    column.className || ''
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {isLoading ? (
              <LoadingSkeleton />
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="h-96"></td>
              </tr>
            ) : (
              data.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 cursor-pointer"
                  style={{ transition: 'background-color .3s, box-shadow .3s' }}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-600 ${
                        column.className || ''
                      }`}
                    >
                      {typeof column.accessor === 'function'
                        ? column.accessor(item)
                        : (item[column.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {data.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                ${
                  currentPage === 1
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-300'
                }`}
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                ${
                  currentPage === totalPages
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-300'
                }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{' '}
                -{' '}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, totalItems || 0)}
                </span>{' '}
                of <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
                renderPaginationButton(page, page === currentPage)
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
