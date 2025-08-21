'use client';

import { useState, useMemo } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Column, Table } from '@/components/common/Table';
import FilterBar, { FilterState } from '@/components/common/FilterBar';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  FileText,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// Mock data
const mockTransactionData = {
  items: [
    {
      id: '1',
      transactionType: 'Inflow',
      amount: 150.00,
      date: '2024-01-15',
      description: 'Visit Payment',
      referenceType: 'Revenue',
      referenceId: 'REV-001',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      transactionType: 'Outflow',
      amount: 75.00,
      date: '2024-01-14',
      description: 'Medical Supplies',
      referenceType: 'Expense',
      referenceId: 'EXP-001',
      createdAt: '2024-01-14T14:20:00Z'
    },
    {
      id: '3',
      transactionType: 'Inflow',
      amount: 200.00,
      date: '2024-01-13',
      description: 'Lab Test Payment',
      referenceType: 'Revenue',
      referenceId: 'REV-002',
      createdAt: '2024-01-13T09:15:00Z'
    },
    {
      id: '4',
      transactionType: 'Outflow',
      amount: 2500.00,
      date: '2024-01-12',
      description: 'Staff Salary',
      referenceType: 'Salary',
      referenceId: 'SAL-001',
      createdAt: '2024-01-12T16:45:00Z'
    },
    {
      id: '5',
      transactionType: 'Inflow',
      amount: 300.00,
      date: '2024-01-11',
      description: 'Treatment Payment',
      referenceType: 'Revenue',
      referenceId: 'REV-003',
      createdAt: '2024-01-11T11:30:00Z'
    }
  ],
  totalPages: 1,
  totalCount: 5
};

const transactionTypes = [
  { value: 'Inflow', label: 'Inflow' },
  { value: 'Outflow', label: 'Outflow' }
];

const referenceTypes = [
  { value: 'Revenue', label: 'Revenue' },
  { value: 'Expense', label: 'Expense' },
  { value: 'Salary', label: 'Salary' },
  { value: 'Invoice', label: 'Invoice' }
];

export default function TransactionsPage() {
  const [isLoading, setIsLoading] = useState(false);

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getTransactionTypeColor = (type: string) => {
    return type === 'Inflow' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  };

  const getReferenceTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      Revenue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      Expense: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      Salary: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      Invoice: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    };
    return colors[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  const columns: Column<any>[] = [
    {
      header: 'Type',
      accessor: 'transactionType',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.transactionType === 'Inflow' ? (
            <ArrowUpRight className="w-4 h-4 text-green-600" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-600" />
          )}
          <Badge className={getTransactionTypeColor(row.original.transactionType)}>
            {row.original.transactionType}
          </Badge>
        </div>
      ),
    },
    {
      header: 'Amount',
      accessor: 'amount',
      cell: ({ row }) => (
        <span className={`font-semibold ${
          row.original.transactionType === 'Inflow' 
            ? 'text-green-600 dark:text-green-400' 
            : 'text-red-600 dark:text-red-400'
        }`}>
          {row.original.transactionType === 'Inflow' ? '+' : '-'}
          {formatCurrency(row.original.amount)}
        </span>
      ),
    },
    {
      header: 'Date',
      accessor: 'date',
      cell: ({ row }) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(row.original.date).toLocaleDateString()}
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
          {row.original.referenceType}
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

  // Summary cards data
  const summaryData = useMemo(() => {
    const totalInflow = mockTransactionData.items
      .filter(item => item.transactionType === 'Inflow')
      .reduce((sum, item) => sum + item.amount, 0);
    
    const totalOutflow = mockTransactionData.items
      .filter(item => item.transactionType === 'Outflow')
      .reduce((sum, item) => sum + item.amount, 0);
    
    const netAmount = totalInflow - totalOutflow;
    const thisMonthTransactions = mockTransactionData.items
      .filter(item => new Date(item.date).getMonth() === new Date().getMonth());

    return {
      totalInflow,
      totalOutflow,
      netAmount,
      totalTransactions: mockTransactionData.items.length,
      thisMonthTransactions: thisMonthTransactions.length
    };
  }, []);

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Inflow</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  +{formatCurrency(summaryData.totalInflow)}
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Outflow</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  -{formatCurrency(summaryData.totalOutflow)}
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Net Amount</p>
                <p className={`text-2xl font-bold ${
                  summaryData.netAmount >= 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {summaryData.netAmount >= 0 ? '+' : ''}{formatCurrency(summaryData.netAmount)}
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {summaryData.totalTransactions}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {summaryData.thisMonthTransactions} this month
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
          additionalFilters={[
            {
              icon: <TrendingUp className="w-4 h-4" />,
              label: 'Transaction Type',
              options: [
                { value: '', label: 'All Types' },
                ...transactionTypes
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
                { value: '', label: 'All References' },
                ...referenceTypes
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
        <Table<any>
          data={mockTransactionData.items}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            pageSize: filter.pageSize || 10,
            pageIndex: (filter.pageNumber || 1) - 1,
            pageCount: mockTransactionData.totalPages,
            onPageChange: (page: number) =>
              setFilter((prev) => ({ ...prev, pageNumber: page + 1 })),
          }}
        />
      </div>
    </PageLayout>
  );
}