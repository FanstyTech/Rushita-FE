'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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

  const { data: summaryData } = useTransactionSummary({});

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

  const getTransactionTypeLabel = (type: TransactionType) => {
    return type === TransactionType.Inflow
      ? t('clinic.financial.transactions.transactionTypes.inflow')
      : t('clinic.financial.transactions.transactionTypes.outflow');
  };

  const getReferenceTypeLabel = (type: ReferenceType) => {
    const labels: { [key: number]: string } = {
      [ReferenceType.Revenue]: t(
        'clinic.financial.transactions.referenceTypes.revenue'
      ),
      [ReferenceType.Expense]: t(
        'clinic.financial.transactions.referenceTypes.expense'
      ),
      [ReferenceType.Salary]: t(
        'clinic.financial.transactions.referenceTypes.salary'
      ),
      [ReferenceType.Invoice]: t(
        'clinic.financial.transactions.referenceTypes.invoice'
      ),
    };
    return labels[type] || '';
  };

  const columns: Column<ClinicTransactionListDto>[] = [
    {
      header: t('clinic.financial.transactions.table.columns.type'),
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
            {getTransactionTypeLabel(row.original.transactionType)}
          </Badge>
        </div>
      ),
    },
    {
      header: t('clinic.financial.transactions.table.columns.amount'),
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
      header: t('clinic.financial.transactions.table.columns.date'),
      accessor: 'transactionDate',
      cell: ({ row }) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(row.original.transactionDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: t('clinic.financial.transactions.table.columns.description'),
      accessor: 'description',
      cell: ({ row }) => (
        <span className="font-medium text-gray-900 dark:text-white">
          {row.original.description}
        </span>
      ),
    },
    {
      header: t('clinic.financial.transactions.table.columns.referenceType'),
      accessor: 'referenceType',
      cell: ({ row }) => (
        <Badge className={getReferenceTypeColor(row.original.referenceType)}>
          {getReferenceTypeLabel(row.original.referenceType)}
        </Badge>
      ),
    },
    {
      header: t('clinic.financial.transactions.table.columns.referenceId'),
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
                  {t('clinic.financial.transactions.summary.cards.totalInflow')}
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
                  {t(
                    'clinic.financial.transactions.summary.cards.totalOutflow'
                  )}
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
                  {t('clinic.financial.transactions.summary.cards.netAmount')}
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
                  {t(
                    'clinic.financial.transactions.summary.cards.totalTransactions'
                  )}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {summaryData?.totalTransactions || 0}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {summaryData?.thisMonthTransactions || 0}{' '}
                  {t('clinic.financial.transactions.summary.cards.thisMonth')}
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
          searchPlaceholder={t(
            'clinic.financial.transactions.filters.searchPlaceholder'
          )}
          additionalFilters={[
            {
              icon: <TrendingUp className="w-4 h-4" />,
              label: t('clinic.financial.transactions.filters.transactionType'),
              options: [
                {
                  value: '',
                  label: t('clinic.financial.transactions.filters.allTypes'),
                },
                ...Object.entries(TransactionType)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([, value]) => ({
                    value: value.toString(),
                    label: getTransactionTypeLabel(value as TransactionType),
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
              label: t('clinic.financial.transactions.filters.referenceType'),
              options: [
                {
                  value: '',
                  label: t('clinic.financial.transactions.filters.allTypes'),
                },
                ...Object.entries(ReferenceType)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([, value]) => ({
                    value: value.toString(),
                    label: getReferenceTypeLabel(value as ReferenceType),
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
          noDataMessage={{
            subtitle: t(
              'clinic.financial.transactions.emptyStates.noTransactions.description'
            ),
            title: t(
              'clinic.financial.transactions.emptyStates.noTransactions.title'
            ),
          }}
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
