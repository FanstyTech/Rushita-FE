'use client';

import { useState } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Column, Table } from '@/components/common/Table';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { useTransaction } from '@/lib/api/hooks/useTransaction';
import {
  TransactionType,
  ReferenceType,
  ClinicTransactionListDto,
} from '@/lib/api/types/transaction';

export default function TransactionsPage() {
  const [filter, setFilter] = useState<FilterState>({
    pageNumber: 1,
    pageSize: 10,
    sortColumn: '',
    sortDirection: '',
    searchValue: '',
    transactionType: undefined,
    referenceType: undefined,
    fromDate: undefined,
    toDate: undefined,
  });

  // API Hooks
  const { useTransactionsList, useTransactionSummary } = useTransaction();

  const { data: transactionsData, isLoading: isLoadingTransactions } =
    useTransactionsList(filter);

  const { data: summaryData, isLoading: isLoadingSummary } =
    useTransactionSummary({});

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getTransactionTypeColor = (type: TransactionType) => {
    return type === TransactionType.Inflow
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  };

  const getReferenceTypeColor = (type: ReferenceType) => {
    const colors: { [key: number]: string } = {
      [ReferenceType.Revenue]:
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      [ReferenceType.Expense]:
        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      [ReferenceType.Salary]:
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      [ReferenceType.Invoice]:
        'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    };
    return (
      colors[type] ||
      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    );
  };

  const columns: Column<ClinicTransactionListDto>[] = [
    {
      header: 'Type',
      accessor: 'transactionType',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.transactionType === TransactionType.Inflow ? (
            <ArrowUpRight className="w-4 h-4 text-green-600" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-600" />
          )}
          <Badge
            className={getTransactionTypeColor(row.original.transactionType)}
          >
            {TransactionType[row.original.transactionType]}
          </Badge>
        </div>
      ),
    },
    {
      header: 'Amount',
      accessor: 'amount',
      cell: ({ row }) => (
        <span
          className={`font-semibold ${
            row.original.transactionType === TransactionType.Inflow
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {row.original.transactionType === TransactionType.Inflow ? '+' : '-'}
          {formatCurrency(row.original.amount)}
        </span>
      ),
    },
    {
      header: 'Date',
      accessor: 'transactionDate',
      cell: ({ row }) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(row.original.transactionDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Description',
      accessor: 'description',
      cell: ({ row }) => (
        <span className="font-medium text-gray-900 dark:text-white">
          {row.original.description}
        </span>
      ),
    },
    {
      header: 'Reference Type',
      accessor: 'referenceType',
      cell: ({ row }) => (
        <Badge className={getReferenceTypeColor(row.original.referenceType)}>
          {ReferenceType[row.original.referenceType]}
        </Badge>
      ),
    },
    {
      header: 'Reference ID',
      accessor: 'referenceId',
      cell: ({ row }) => (
        <span className="text-gray-600 dark:text-gray-400 font-mono text-sm">
          {row.original.referenceId}
        </span>
      ),
    },
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Inflow
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  +{formatCurrency(summaryData?.totalInflow || 0)}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Outflow
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  -{formatCurrency(summaryData?.totalOutflow || 0)}
                </p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Net Amount
                </p>
                <p
                  className={`text-2xl font-bold ${
                    (summaryData?.netAmount || 0) >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {(summaryData?.netAmount || 0) >= 0 ? '+' : ''}
                  {formatCurrency(summaryData?.netAmount || 0)}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Transactions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {summaryData?.totalTransactions || 0}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {summaryData?.thisMonthTransactions || 0} this month
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filter Bar */}
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
          haveStatusFilter={false}
          additionalFilters={[
            {
              icon: <TrendingUp className="w-4 h-4" />,
              label: 'Transaction Type',
              options: [
                { value: '', label: 'All Types' },
                ...Object.entries(TransactionType)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => ({
                    value: value.toString(),
                    label: key,
                  })),
              ],
              value: String(filter.transactionType || ''),
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  transactionType: value || undefined,
                })),
            },
            {
              icon: <FileText className="w-4 h-4" />,
              label: 'Reference Type',
              options: [
                { value: '', label: 'All Types' },
                ...Object.entries(ReferenceType)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => ({
                    value: value.toString(),
                    label: key,
                  })),
              ],
              value: String(filter.referenceType || ''),
              onChange: (value) =>
                setFilter((prev) => ({
                  ...prev,
                  referenceType: value || undefined,
                })),
            },
          ]}
        />

        {/* Table */}
        <Table<ClinicTransactionListDto>
          data={transactionsData?.items || []}
          columns={columns}
          isLoading={isLoadingTransactions}
          pagination={{
            pageSize: filter.pageSize || 10,
            pageIndex: (filter.pageNumber || 1) - 1,
            pageCount: transactionsData?.totalPages || 0,
            onPageChange: (page: number) =>
              setFilter((prev) => ({ ...prev, pageNumber: page + 1 })),
          }}
        />
      </div>
    </PageLayout>
  );
}
