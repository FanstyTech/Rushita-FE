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
  Wallet,
} from 'lucide-react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layouts/PageLayout';
import { useInvoice } from '@/lib/api/hooks/useInvoice';
import { useExpense } from '@/lib/api/hooks/useExpense';
import { useRevenue } from '@/lib/api/hooks/useRevenue';

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

  // Navigation functions
  const navigateToTransactions = () =>
    router.push('/clinic/financial/transactions');

  // Refresh all data
  const handleRefresh = () => {
    refetchInvoices();
    refetchExpenses();
    refetchRevenue();
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
    isLoadingRevenueDashboard;

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
    // Instead of passing parameters to refetch, we need to invalidate and refetch the queries
    // The queries will automatically use the current dateRange values
    refetchInvoices();
    refetchExpenses();
    refetchRevenue();
  }, [selectedPeriod, refetchInvoices, refetchExpenses, refetchRevenue]);

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Enhanced Header with gradient background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-8 text-white"
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <h1 className="text-3xl font-bold">لوحة التحكم المالية</h1>
                </div>
                <p className="text-blue-100 text-lg">
                  نظرة شاملة على الأداء المالي للعيادة
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm text-blue-100">متصل مباشر</span>
                  </div>
                  <div className="text-sm text-blue-100">
                    آخر تحديث: {new Date().toLocaleTimeString('ar-EG')}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="secondary"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
                  />
                  تحديث البيانات
                </Button>
                <div className="flex gap-2 bg-white/10 p-1 rounded-lg backdrop-blur-sm">
                  {(['week', 'month', 'year'] as const).map((period) => (
                    <Button
                      key={period}
                      variant={
                        selectedPeriod === period ? 'secondary' : 'ghost'
                      }
                      onClick={() => setSelectedPeriod(period)}
                      size="sm"
                      className={`${
                        selectedPeriod === period
                          ? 'bg-white text-blue-600 shadow-lg'
                          : 'text-white hover:bg-white/20'
                      } transition-all duration-200`}
                    >
                      {period === 'week'
                        ? 'أسبوع'
                        : period === 'month'
                        ? 'شهر'
                        : 'سنة'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        </motion.div>

        {/* Enhanced KPI Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Total Revenue Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-600" />

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    إجمالي الإيرادات
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {formatCurrency(totalRevenue)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    مقارنة بالفترة السابقة
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 p-3 shadow-lg">
                  <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold text-green-600">
                    +12.5%
                  </span>
                </div>
                <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Total Expenses Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600" />

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    إجمالي المصروفات
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {formatCurrency(totalExpenses)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    انخفاض في المصروفات
                  </p>
                </div>
                <div className="rounded-xl bg-red-50 dark:bg-red-900/20 p-3 shadow-lg">
                  <CreditCard className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-semibold text-red-600">
                    -3.2%
                  </span>
                </div>
                <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Net Profit Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600" />

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    صافي الربح
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {formatCurrency(netProfit)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    نمو مستمر في الأرباح
                  </p>
                </div>
                <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 p-3 shadow-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold text-blue-600">
                    +8.1%
                  </span>
                </div>
                <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Total Invoices Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600" />

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    إجمالي الفواتير
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {invoiceDashboard?.totalInvoices || 0}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    إدارة الفواتير
                  </p>
                </div>
                <div className="rounded-xl bg-purple-50 dark:bg-purple-900/20 p-3 shadow-lg">
                  <Receipt className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-semibold text-purple-600">
                    {invoiceDashboard?.totalPaid || 0} مدفوعة
                  </span>
                </div>
                <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

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

        {/* Enhanced Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <Receipt className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    المعاملات الأخيرة
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    آخر العمليات المالية
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={navigateToTransactions}
                className="flex items-center gap-2 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all duration-200"
              >
                <Eye className="w-4 h-4" />
                عرض الكل
              </Button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
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
              ].map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="group flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl shadow-sm ${
                        transaction.type === 'revenue'
                          ? 'bg-emerald-100 dark:bg-emerald-900/30'
                          : 'bg-red-100 dark:bg-red-900/30'
                      }`}
                    >
                      {transaction.type === 'revenue' ? (
                        <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(transaction.date).toLocaleDateString('ar-EG')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold text-lg ${
                        transaction.amount > 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {formatCurrency(Math.abs(transaction.amount))}
                    </p>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        transaction.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}
                    >
                      {transaction.status === 'completed' ? 'مكتمل' : 'معلق'}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Key Metrics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center group hover:shadow-xl transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              هامش الربح
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {calculateProfitMargin().toFixed(1)}%
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(calculateProfitMargin(), 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center group hover:shadow-xl transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              متوسط الزيارة
            </p>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              {formatCurrency(285)}
            </p>
            <div className="flex items-center justify-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-600 font-medium">+15.3%</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center group hover:shadow-xl transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <Receipt className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              معدل التحصيل
            </p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              94.2%
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: '94.2%' }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
