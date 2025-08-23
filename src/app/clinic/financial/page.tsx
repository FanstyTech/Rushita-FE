'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  RefreshCw,
  Eye,
  CreditCard,
  Receipt,
  BarChart3,
} from 'lucide-react';
import PageLayout from '@/components/layouts/PageLayout';
import { useInvoice } from '@/lib/api/hooks/useInvoice';
import { useExpense } from '@/lib/api/hooks/useExpense';
import { useRevenue } from '@/lib/api/hooks/useRevenue';
import { useTransaction } from '@/lib/api/hooks/useTransaction';

interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  patients: number;
  avgRevenuePerPatient: number;
}

export default function FinancialDashboardPage() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<
    'week' | 'month' | 'year'
  >('month');

  // Calculate date range based on selected period
  const getDateRange = () => {
    const now = new Date();
    const endDate = now.toISOString().split('T')[0]; // Today
    let startDate: string;

    switch (selectedPeriod) {
      case 'week':
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        startDate = weekAgo.toISOString().split('T')[0];
        break;
      case 'month':
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        startDate = monthAgo.toISOString().split('T')[0];
        break;
      case 'year':
        const yearAgo = new Date(now);
        yearAgo.setFullYear(now.getFullYear() - 1);
        startDate = yearAgo.toISOString().split('T')[0];
        break;
      default:
        const defaultMonthAgo = new Date(now);
        defaultMonthAgo.setMonth(now.getMonth() - 1);
        startDate = defaultMonthAgo.toISOString().split('T')[0];
    }

    return { startDate, endDate };
  };

  const dateRange = getDateRange();

  // Fetch data using hooks with date filters
  const {
    data: invoiceDashboard,
    isLoading: isLoadingInvoiceDashboard,
    refetch: refetchInvoices,
  } = useInvoice().useInvoiceDashboardStats({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  const {
    data: expenseDashboard,
    isLoading: isLoadingExpenseDashboard,
    refetch: refetchExpenses,
  } = useExpense().useExpenseDashboardStats({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  const {
    data: revenueDashboard,
    isLoading: isLoadingRevenueDashboard,
    refetch: refetchRevenue,
  } = useRevenue().useRevenueDashboardStats({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  const {
    data: transactionDashboard,
    isLoading: isLoadingTransactionDashboard,
    refetch: refetchTransactions,
  } = useTransaction().useTransactionDashboardStats({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  // Navigation functions
  const navigateToTransactions = () =>
    router.push('/clinic/financial/transactions');

  // Refresh all data
  const handleRefresh = () => {
    refetchInvoices();
    refetchExpenses();
    refetchRevenue();
    refetchTransactions();
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate totals
  const totalRevenue = revenueDashboard?.totalRevenue || 0;
  const totalExpenses = expenseDashboard?.totalExpenses || 0;
  const netProfit = totalRevenue - totalExpenses;

  // Calculate profit margin
  const calculateProfitMargin = () => {
    if (totalRevenue === 0) return 0;
    return (netProfit / totalRevenue) * 100;
  };

  // Chart colors
  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const isLoading =
    isLoadingInvoiceDashboard ||
    isLoadingExpenseDashboard ||
    isLoadingRevenueDashboard ||
    isLoadingTransactionDashboard;

  // Combine revenue and expense data for charts
  const combineChartData = () => {
    const revenueData = revenueDashboard?.monthlyRevenue || [];
    const expenseData = expenseDashboard?.monthlyExpenses || [];

    // Create a map to combine data by time period
    const dataMap = new Map();

    // Determine the appropriate time granularity based on selectedPeriod
    const getTimeKey = (dateStr: string) => {
      const date = new Date(dateStr);
      switch (selectedPeriod) {
        case 'week':
          // For week view, show daily data
          return date.toISOString().split('T')[0]; // YYYY-MM-DD
        case 'month':
          // For month view, show daily data to avoid grouping
          return date.toISOString().split('T')[0]; // YYYY-MM-DD
        case 'year':
          // For year view, show monthly data
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            '0'
          )}`;
        default:
          return date.toISOString().split('T')[0];
      }
    };

    // Add revenue data
    revenueData.forEach((item) => {
      const timeKey = getTimeKey(item.month);
      dataMap.set(timeKey, {
        period: timeKey,
        revenue: item.totalAmount,
        expenses: 0,
      });
    });

    // Add expense data
    expenseData.forEach((item) => {
      const timeKey = getTimeKey(item.month);
      const existing = dataMap.get(timeKey) || {
        period: timeKey,
        revenue: 0,
        expenses: 0,
      };
      existing.expenses = item.totalAmount;
      dataMap.set(timeKey, existing);
    });

    // Convert to array and sort by time period
    return Array.from(dataMap.values()).sort((a, b) =>
      a.period.localeCompare(b.period)
    );
  };

  const chartData = combineChartData();

  useEffect(() => {
    const dateRange = getDateRange();
    refetchInvoices({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
    refetchExpenses({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
    refetchRevenue({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
    refetchTransactions({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
  }, [selectedPeriod]);

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              لوحة التحكم المالية
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              نظرة عامة على الأداء المالي للعيادة
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
              />
              تحديث
            </Button>
            <Button
              variant={selectedPeriod === 'week' ? 'default' : 'outline'}
              onClick={() => setSelectedPeriod('week')}
              size="sm"
            >
              أسبوع
            </Button>
            <Button
              variant={selectedPeriod === 'month' ? 'default' : 'outline'}
              onClick={() => setSelectedPeriod('month')}
              size="sm"
            >
              شهر
            </Button>
            <Button
              variant={selectedPeriod === 'year' ? 'default' : 'outline'}
              onClick={() => setSelectedPeriod('year')}
              size="sm"
            >
              سنة
            </Button>
          </div>
        </div>

        {/* Main KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Revenue Card */}
          <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  إجمالي الإيرادات
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(totalRevenue)}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+12.5%</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>

          {/* Total Expenses Card */}
          <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  إجمالي المصروفات
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(totalExpenses)}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                  <span className="text-xs text-red-600">-3.2%</span>
                </div>
              </div>
              <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <CreditCard className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </Card>

          {/* Net Profit Card */}
          <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  صافي الربح
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(netProfit)}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-blue-600 mr-1" />
                  <span className="text-xs text-blue-600">+8.1%</span>
                </div>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>

          {/* Total Invoices Card */}
          <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  إجمالي الفواتير
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {invoiceDashboard?.totalInvoices || 0}
                </p>
                <div className="flex items-center mt-1">
                  <FileText className="w-3 h-3 text-purple-600 mr-1" />
                  <span className="text-xs text-purple-600">
                    {invoiceDashboard?.totalPaid || 0} مدفوعة
                  </span>
                </div>
              </div>
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Receipt className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue vs Expenses Chart */}
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                الإيرادات مقابل المصروفات
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="period" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10B981"
                      strokeWidth={2}
                      name="الإيرادات"
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="#EF4444"
                      strokeWidth={2}
                      name="المصروفات"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  لا توجد بيانات متوفرة
                </div>
              )}
            </CardContent>
          </Card>

          {/* Invoice Status Chart */}
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                حالة الفواتير
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {invoiceDashboard ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: 'مدفوعة',
                          value: invoiceDashboard?.totalPaid || 0,
                        },
                        {
                          name: 'معلقة',
                          value: invoiceDashboard?.totalUnpaid || 0,
                        },
                        {
                          name: 'متأخرة',
                          value: invoiceDashboard?.overdueInvoices || 0,
                        },
                      ].filter((item) => item.value > 0)}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  لا توجد بيانات متوفرة
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              المعاملات الأخيرة
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={navigateToTransactions}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              عرض الكل
            </Button>
          </div>

          <div className="space-y-3">
            {[
              {
                id: 1,
                date: '2024-08-23',
                description: 'فاتورة زيارة - أحمد محمد',
                type: 'revenue',
                amount: 250,
                status: 'completed',
              },
              {
                id: 2,
                date: '2024-08-22',
                description: 'شراء مستلزمات طبية',
                type: 'expense',
                amount: -450,
                status: 'completed',
              },
              {
                id: 3,
                date: '2024-08-22',
                description: 'فاتورة زيارة - فاطمة علي',
                type: 'revenue',
                amount: 180,
                status: 'pending',
              },
              {
                id: 4,
                date: '2024-08-21',
                description: 'دفع إيجار العيادة',
                type: 'expense',
                amount: -2000,
                status: 'completed',
              },
            ].map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      transaction.type === 'revenue'
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-red-100 dark:bg-red-900/30'
                    }`}
                  >
                    {transaction.type === 'revenue' ? (
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(transaction.date).toLocaleDateString('ar-EG')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold text-sm ${
                      transaction.amount > 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {formatCurrency(Math.abs(transaction.amount))}
                  </p>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      transaction.status === 'completed'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}
                  >
                    {transaction.status === 'completed' ? 'مكتمل' : 'معلق'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Key Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                هامش الربح
              </p>
              <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                {calculateProfitMargin().toFixed(1)}%
              </p>
            </div>
          </Card>

          <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                متوسط الزيارة
              </p>
              <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                {formatCurrency(285)}
              </p>
            </div>
          </Card>

          <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                معدل التحصيل
              </p>
              <p className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
                94.2%
              </p>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
