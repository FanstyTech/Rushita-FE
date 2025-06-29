'use client';

import React from 'react';

export interface Column<T> {
  header: string;
  accessor: keyof T;
  cell?: (props: { row: { original: T } }) => React.ReactNode;
  className?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  pagination?: {
    pageSize: number;
    pageIndex: number;
    pageCount: number;
    onPageChange: (page: number) => void;
  };
  noDataMessage?: {
    title: string;
    subtitle: string;
  };
}

export function Table<T>({
  data,
  columns,
  isLoading = false,
  pagination,
  noDataMessage = {
    title: 'No data found',
    subtitle: 'No records to display',
  },
}: TableProps<T>) {
  const LoadingSkeleton = () => (
    <>
      {[...Array(pagination?.pageSize || 5)].map((_, i) => (
        <tr key={i}>
          {columns.map((column, j) => (
            <td
              key={j}
              className={`px-6 py-4 whitespace-nowrap ${
                column.className || ''
              }`}
            >
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-[150px]" />
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
      onClick={() => pagination?.onPageChange(page)}
      className={`
        inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded
        ${
          isCurrentPage
            ? 'bg-indigo-600 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }
      `}
    >
      {page + 1}
    </button>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto relative">
        {data.length === 0 && !isLoading && (
          <div className="absolute inset-0 bg-black/5 dark:bg-black/20 backdrop-blur-[1px] flex justify-center items-center z-10">
            <div className="px-8 py-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                {noDataMessage.title}
              </h3>
              {noDataMessage.subtitle && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  {noDataMessage.subtitle}
                </p>
              )}
            </div>
          </div>
        )}
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider bg-gray-50 dark:bg-gray-800/80 ${
                    column.className || ''
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
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
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                  style={{ transition: 'background-color .3s, box-shadow .3s' }}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 ${
                        column.className || ''
                      }`}
                    >
                      {column.cell
                        ? column.cell({ row: { original: item } })
                        : (item[column.accessor] ?? '') === '' // null, undefined, or ''
                        ? '-'
                        : String(item[column.accessor])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {data.length > 0 && pagination && pagination.pageCount > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => pagination.onPageChange(pagination.pageIndex - 1)}
              disabled={pagination.pageIndex === 0}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                ${
                  pagination.pageIndex === 0
                    ? 'text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                }`}
            >
              Previous
            </button>
            <button
              onClick={() => pagination.onPageChange(pagination.pageIndex + 1)}
              disabled={pagination.pageIndex === pagination.pageCount - 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                ${
                  pagination.pageIndex === pagination.pageCount - 1
                    ? 'text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing{' '}
                <span className="font-medium">
                  {pagination.pageIndex * pagination.pageSize + 1}
                </span>{' '}
                -{' '}
                <span className="font-medium">
                  {Math.min(
                    (pagination.pageIndex + 1) * pagination.pageSize,
                    data.length
                  )}
                </span>{' '}
                of <span className="font-medium">{data.length}</span> results
              </p>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: pagination.pageCount }, (_, i) => i).map(
                (page) =>
                  renderPaginationButton(page, page === pagination.pageIndex)
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
