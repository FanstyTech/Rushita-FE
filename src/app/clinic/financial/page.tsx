'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/api/hooks/useAuth';
import { useInvoice } from '@/lib/api/hooks/useInvoice';
import { useExpense } from '@/lib/api/hooks/useExpense';
import { useRevenue } from '@/lib/api/hooks/useRevenue';
import { useTransaction } from '@/lib/api/hooks/useTransaction';
import PageLayout from '@/components/layouts/PageLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  FileText,
  CreditCard,
  Calendar,
  BarChart3,
  RefreshCw,
  Eye,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';
import { useRouter } from 'next/navigation';
import { RevenueType } from '@/lib/api/types/revenue';
import { InvoiceStatus } from '@/lib/api/types/invoice';

export default function FinancialDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isLoading, setIsLoading] = useState(false);
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false);

  // Calculate date range based on selected period
  const getDateRange = () => {
    const now = new Date();
    const startDate = new Date();

    switch (selectedPeriod) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 1);
    }

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: now.toISOString().split('T')[0],
    };
  };

  const dateRange = getDateRange();

  // API Hooks - Using GetDashboardStats
  const { useInvoiceDashboardStats } = useInvoice();
  const { useExpenseDashboardStats } = useExpense();
  const { useRevenueDashboardStats } = useRevenue();
  const { useTransactionDashboardStats } = useTransaction();

  // Get dashboard data
  const { data: invoiceDashboard, isLoading: isLoadingInvoiceDashboard } =
    useInvoiceDashboardStats({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });

  const { data: expenseDashboard, isLoading: isLoadingExpenseDashboard } =
    useExpenseDashboardStats({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });

  const { data: revenueDashboard, isLoading: isLoadingRevenueDashboard } =
    useRevenueDashboardStats({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });

  const {
    data: transactionDashboard,
    isLoading: isLoadingTransactionDashboard,
  } = useTransactionDashboardStats({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number, total: number) => {
    if (total === 0) return '0%';
    return `${((value / total) * 100).toFixed(1)}%`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const calculateNetProfit = () => {
    const totalRevenue = revenueDashboard?.totalRevenue || 0;
    const totalExpenses = expenseDashboard?.totalExpenses || 0;
    return totalRevenue - totalExpenses;
  };

  const calculateProfitMargin = () => {
    const netProfit = calculateNetProfit();
    const totalRevenue = revenueDashboard?.totalRevenue || 0;
    if (totalRevenue === 0) return 0;
    return (netProfit / totalRevenue) * 100;
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const navigateToInvoices = () => router.push('/clinic/financial/invoices');
  const navigateToExpenses = () => router.push('/clinic/financial/expenses');
  const navigateToRevenues = () => router.push('/clinic/financial/revenues');
  const navigateToTransactions = () =>
    router.push('/clinic/financial/transactions');

  // Prepare chart data - إصلاح البيانات الشهرية
  const monthlyData = (() => {
    // إذا كانت البيانات من API فارغة، استخدم بيانات وهمية للعرض
    if (
      !revenueDashboard?.monthlyRevenue ||
      revenueDashboard.monthlyRevenue.length === 0
    ) {
      // إنشاء بيانات وهمية للشهور الـ 6 الماضية
      const months = [];
      const now = new Date();
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, '0')}`;
        months.push({
          month: monthKey,
          revenue: Math.floor(Math.random() * 5000) + 1000, // إيرادات عشوائية
          expenses: Math.floor(Math.random() * 3000) + 500, // مصروفات عشوائية
          profit: 0, // سيتم حسابها لاحقاً
        });
      }

      // حساب الربح لكل شهر
      months.forEach((item) => {
        item.profit = item.revenue - item.expenses;
      });

      return months;
    }

    console.log(revenueDashboard.monthlyRevenue);
    // إذا كانت البيانات متوفرة، استخدمها مع إصلاح التنسيق
    return revenueDashboard.monthlyRevenue.map((item) => {
      const expenses =
        expenseDashboard?.monthlyExpenses?.find((e) => e.month === item.month)
          ?.totalAmount || 0;
      return {
        month: item.month,
        revenue: item.totalAmount,
        expenses: expenses,
        profit: item.totalAmount - expenses,
      };
    });
  })();

  const getRevenueTypeName = (type: RevenueType) => {
    switch (type) {
      case RevenueType.Visit:
        return 'الزيارات';
      case RevenueType.Donations:
        return 'التبرعات';
      case RevenueType.GovernmentSupport:
        return 'الدعم الحكومي';
      case RevenueType.Other:
        return 'أخرى';
      default:
        return 'غير محدد';
    }
  };

  const getInvoiceStatusName = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.Pending:
        return 'معلق';
      case InvoiceStatus.PartiallyPaid:
        return 'مدفوع جزئياً';
      case InvoiceStatus.Paid:
        return 'مدفوع';
      case InvoiceStatus.Cancelled:
        return 'ملغي';
      default:
        return 'غير محدد';
    }
  };

  const getInvoiceStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.Pending: // Pending
        return '#F59E0B';
      case InvoiceStatus.PartiallyPaid: // PartiallyPaid
        return '#3B82F6';
      case InvoiceStatus.Paid: // Paid
        return '#10B981';
      case InvoiceStatus.Cancelled: // Cancelled
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };
  const revenueTypeColors: Record<RevenueType, string> = {
    [RevenueType.Visit]: '#10B981',
    [RevenueType.Donations]: '#3B82F6',
    [RevenueType.GovernmentSupport]: '#8B5CF6',
    [RevenueType.Other]: '#EF4444',
  };

  const getRevenueTypeColor = (type: RevenueType) =>
    revenueTypeColors[type] ?? '#6B7280';
  const revenueByTypeData = (() => {
    if (
      !revenueDashboard?.revenueByType ||
      revenueDashboard.revenueByType.length === 0
    )
      return [];

    return revenueDashboard.revenueByType.map((item) => ({
      name: item.revenueType,
      value: item.amount,
      color: getRevenueTypeColor(item.revenueType),
    }));
  })();

  const isLoadingData =
    isLoadingInvoiceDashboard ||
    isLoadingExpenseDashboard ||
    isLoadingRevenueDashboard ||
    isLoadingTransactionDashboard;

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              لوحة التحكم المالية
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
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
            >
              أسبوع
            </Button>
            <Button
              variant={selectedPeriod === 'month' ? 'default' : 'outline'}
              onClick={() => setSelectedPeriod('month')}
            >
              شهر
            </Button>
            <Button
              variant={selectedPeriod === 'year' ? 'default' : 'outline'}
              onClick={() => setSelectedPeriod('year')}
            >
              سنة
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Revenue */}
          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={navigateToRevenues}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  إجمالي الإيرادات
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(revenueDashboard?.totalRevenue || 0)}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {revenueDashboard?.revenueCount || 0} معاملة
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>

          {/* Total Expenses */}
          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={navigateToExpenses}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  إجمالي المصروفات
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(expenseDashboard?.totalExpenses || 0)}
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  {expenseDashboard?.expenseCount || 0} معاملة
                </p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                <CreditCard className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </Card>

          {/* Net Profit */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  صافي الربح
                </p>
                <p
                  className={`text-2xl font-bold ${
                    calculateNetProfit() >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {formatCurrency(calculateNetProfit())}
                </p>
                <p
                  className={`text-sm flex items-center mt-1 ${
                    calculateNetProfit() >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 mr-1" />
                  هامش ربح {calculateProfitMargin().toFixed(1)}%
                </p>
              </div>
              <div
                className={`p-3 rounded-full ${
                  calculateNetProfit() >= 0
                    ? 'bg-green-100 dark:bg-green-900'
                    : 'bg-red-100 dark:bg-red-900'
                }`}
              >
                <BarChart3
                  className={`w-6 h-6 ${
                    calculateNetProfit() >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                />
              </div>
            </div>
          </Card>

          {/* Pending Invoices */}
          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={navigateToInvoices}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  الفواتير المعلقة
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(invoiceDashboard?.totalUnpaid || 0)}
                </p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center mt-1">
                  <FileText className="w-4 h-4 mr-1" />
                  {invoiceDashboard?.totalInvoices || 0} فاتورة
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <FileText className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue and Expenses Over Time Chart */}
          <Card className="p-6 border-0 shadow-lg bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                الإيرادات والمصروفات عبر الزمن
              </h3>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                >
                  {monthlyData.length} شهر
                </Badge>
              </div>
            </div>

            {isLoadingData ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 mx-auto mb-4 text-gray-400 animate-spin" />
                  <p className="text-gray-500 dark:text-gray-400">
                    جاري تحميل البيانات...
                  </p>
                </div>
              </div>
            ) : monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#10B981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="expenseGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#EF4444" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#EF4444"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="profitGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#3B82F6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    strokeOpacity={0.5}
                  />

                  <XAxis
                    dataKey="month"
                    stroke="#6B7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => {
                      if (typeof value !== 'string') return '';
                      const parts = value.split('-');
                      if (parts.length !== 2) return value;
                      const [year, month] = parts;
                      const monthNames = [
                        'يناير',
                        'فبراير',
                        'مارس',
                        'أبريل',
                        'مايو',
                        'يونيو',
                        'يوليو',
                        'أغسطس',
                        'سبتمبر',
                        'أكتوبر',
                        'نوفمبر',
                        'ديسمبر',
                      ];
                      return `${monthNames[parseInt(month) - 1]} ${year}`;
                    }}
                  />

                  <YAxis
                    stroke="#6B7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => formatCurrency(value)}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px',
                    }}
                    formatter={(value, name) => [
                      formatCurrency(Number(value)),
                      name === 'revenue'
                        ? 'الإيرادات'
                        : name === 'expenses'
                        ? 'المصروفات'
                        : 'الربح',
                    ]}
                    labelFormatter={(label) => {
                      if (typeof label !== 'string') return '';
                      const parts = label.split('-');
                      if (parts.length !== 2) return label;
                      const [year, month] = parts;
                      const monthNames = [
                        'يناير',
                        'فبراير',
                        'مارس',
                        'أبريل',
                        'مايو',
                        'يونيو',
                        'يوليو',
                        'أغسطس',
                        'سبتمبر',
                        'أكتوبر',
                        'نوفمبر',
                        'ديسمبر',
                      ];
                      return `${monthNames[parseInt(month) - 1]} ${year}`;
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10B981"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                    name="الإيرادات"
                    dot={{
                      fill: '#10B981',
                      strokeWidth: 2,
                      stroke: 'white',
                      r: 4,
                    }}
                    activeDot={{
                      fill: '#10B981',
                      stroke: 'white',
                      strokeWidth: 2,
                      r: 6,
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#EF4444"
                    strokeWidth={3}
                    fill="url(#expenseGradient)"
                    name="المصروفات"
                    dot={{
                      fill: '#EF4444',
                      strokeWidth: 2,
                      stroke: 'white',
                      r: 4,
                    }}
                    activeDot={{
                      fill: '#EF4444',
                      stroke: 'white',
                      strokeWidth: 2,
                      r: 6,
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    name="الربح"
                    dot={{
                      fill: '#3B82F6',
                      strokeWidth: 2,
                      stroke: 'white',
                      r: 4,
                    }}
                    activeDot={{
                      fill: '#3B82F6',
                      stroke: 'white',
                      strokeWidth: 2,
                      r: 6,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <p>لا توجد بيانات متوفرة للعرض</p>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  الإيرادات
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  المصروفات
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  الربح
                </span>
              </div>
            </div>
          </Card>

          {/* Revenue by Type Pie Chart */}
          <Card className="p-3 border-0 shadow-lg bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                توزيع الإيرادات حسب النوع
              </h3>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs"
              >
                {revenueDashboard?.revenueCount || 0} معاملة
              </Badge>
            </div>

            {isLoadingData ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <RefreshCw className="w-5 h-5 mx-auto mb-2 text-gray-400 animate-spin" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    جاري تحميل البيانات...
                  </p>
                </div>
              </div>
            ) : revenueByTypeData && revenueByTypeData.length > 0 ? (
              <div className="relative">
                {/* Pie Chart - أكبر حجماً */}
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={revenueByTypeData}
                      cx="35%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {revenueByTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value))}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        fontSize: '12px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Floating Legend - محسن */}
                <div className="absolute top-2 right-2 w-52 bg-white/98 dark:bg-gray-800/98 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-3">
                  <div className="space-y-1.5">
                    {revenueByTypeData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md p-1.5 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full shadow-sm"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                            {getRevenueTypeName(item.name)}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-gray-900 dark:text-white">
                            {formatCurrency(item.value)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {formatPercentage(
                              item.value,
                              revenueDashboard?.totalRevenue || 0
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total Summary */}
                  <div className="mt-2 pt-1.5 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        الإجمالي
                      </span>
                      <span className="text-xs font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(revenueDashboard?.totalRevenue || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <svg
                    className="w-6 h-6 mx-auto mb-2 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                  </svg>
                  <p className="text-xs">لا توجد بيانات متوفرة للعرض</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Additional Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transaction Flow Chart */}
          <Card className="p-6 border-0 shadow-lg bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                تدفق المعاملات المالية
              </h3>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
              >
                {transactionDashboard?.transactionCount || 0} معاملة
              </Badge>
            </div>

            {isLoadingData ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 mx-auto mb-4 text-gray-400 animate-spin" />
                  <p className="text-gray-500 dark:text-gray-400">
                    جاري تحميل البيانات...
                  </p>
                </div>
              </div>
            ) : transactionDashboard?.monthlyTransactions &&
              transactionDashboard.monthlyTransactions.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={transactionDashboard.monthlyTransactions}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    strokeOpacity={0.5}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="#6B7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => {
                      if (typeof value !== 'string') return '';
                      const parts = value.split('-');
                      if (parts.length !== 2) return value;
                      const [year, month] = parts;
                      const monthNames = [
                        'يناير',
                        'فبراير',
                        'مارس',
                        'أبريل',
                        'مايو',
                        'يونيو',
                        'يوليو',
                        'أغسطس',
                        'سبتمبر',
                        'أكتوبر',
                        'نوفمبر',
                        'ديسمبر',
                      ];
                      return `${monthNames[parseInt(month) - 1]} ${year}`;
                    }}
                  />
                  <YAxis
                    stroke="#6B7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Bar
                    dataKey="inflow"
                    fill="#10B981"
                    name="التدفقات الداخلة"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="outflow"
                    fill="#EF4444"
                    name="التدفقات الخارجة"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <p>لا توجد بيانات متوفرة للعرض</p>
                </div>
              </div>
            )}

            {/* Transaction Summary */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(transactionDashboard?.totalInflow || 0)}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  التدفقات الداخلة
                </div>
              </div>
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-lg font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(transactionDashboard?.totalOutflow || 0)}
                </div>
                <div className="text-xs text-red-600 dark:text-red-400">
                  التدفقات الخارجة
                </div>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(transactionDashboard?.netAmount || 0)}
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  صافي التدفق
                </div>
              </div>
            </div>
          </Card>

          {/* Invoice Status Chart */}
          <Card className="p-6 border-0 shadow-lg bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                حالة الفواتير
              </h3>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
              >
                {invoiceDashboard?.totalInvoices || 0} فاتورة
              </Badge>
            </div>

            {isLoadingData ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 mx-auto mb-4 text-gray-400 animate-spin" />
                  <p className="text-gray-500 dark:text-gray-400">
                    جاري تحميل البيانات...
                  </p>
                </div>
              </div>
            ) : invoiceDashboard?.invoicesByStatus &&
              invoiceDashboard.invoicesByStatus.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={invoiceDashboard.invoicesByStatus.map(
                        (item: any, index: number) => ({
                          name: getInvoiceStatusName(item.status),
                          value: item.amount,
                          color: getInvoiceStatusColor(item.status),
                        })
                      )}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {invoiceDashboard.invoicesByStatus.map(
                        (item: any, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={getInvoiceStatusColor(item.status)}
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value))}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Legend */}
                <div className="grid grid-cols-1 gap-3 mt-6">
                  {invoiceDashboard.invoicesByStatus.map(
                    (item: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{
                              backgroundColor: getInvoiceStatusColor(
                                item.status
                              ),
                            }}
                          />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {getInvoiceStatusName(item.status)}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-gray-900 dark:text-white">
                            {formatCurrency(item.amount)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {item.count} فاتورة
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p>لا توجد بيانات متوفرة للعرض</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Floating Action Button System */}
        <div className="fixed bottom-6 left-6 z-50">
          {/* Main Floating Button */}
          <div className="relative">
            {/* Floating Menu */}
            {isFloatingMenuOpen && (
              <div className="absolute bottom-16 left-0 mb-4 space-y-3">
                {/* Invoices Button */}
                <button
                  onClick={navigateToInvoices}
                  className="group flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-white dark:border-gray-800"
                  title="إدارة الفواتير"
                >
                  <FileText className="w-6 h-6 text-white" />
                  <div className="absolute right-16 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    إدارة الفواتير
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </div>
                </button>

                {/* Revenues Button */}
                <button
                  onClick={navigateToRevenues}
                  className="group flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-white dark:border-gray-800"
                  title="إدارة الإيرادات"
                >
                  <TrendingUp className="w-6 h-6 text-white" />
                  <div className="absolute right-16 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    إدارة الإيرادات
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </div>
                </button>

                {/* Expenses Button */}
                <button
                  onClick={navigateToExpenses}
                  className="group flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-white dark:border-gray-800"
                  title="إدارة المصروفات"
                >
                  <TrendingDown className="w-6 h-6 text-white" />
                  <div className="absolute right-16 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    إدارة المصروفات
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </div>
                </button>

                {/* Transactions Button */}
                <button
                  onClick={navigateToTransactions}
                  className="group flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-white dark:border-gray-800"
                  title="سجل المعاملات"
                >
                  <CreditCard className="w-6 h-6 text-white" />
                  <div className="absolute right-16 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    سجل المعاملات
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </div>
                </button>
              </div>
            )}

            {/* Main Toggle Button */}
            <button
              onClick={() => setIsFloatingMenuOpen(!isFloatingMenuOpen)}
              className="group flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-4 border-white dark:border-gray-800"
            >
              <div
                className={`transform transition-transform duration-300 ${
                  isFloatingMenuOpen ? 'rotate-45' : 'rotate-0'
                }`}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>

              {/* Pulse Animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              مؤشرات الأداء الرئيسية
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  إجمالي الفواتير
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {invoiceDashboard?.totalInvoices || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  معدل تحصيل الفواتير
                </span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {formatPercentage(
                    invoiceDashboard?.totalPaid || 0,
                    invoiceDashboard?.totalAmount || 0
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  متوسط قيمة الفاتورة
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 dark:text-white text-lg">
                    {formatCurrency(
                      (invoiceDashboard?.totalAmount || 0) /
                        (invoiceDashboard?.totalInvoices || 1)
                    )}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  متوسط الإيرادات
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                    {formatCurrency(revenueDashboard?.averageRevenue || 0)}
                  </span>
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              تحليل الربحية
            </h4>
            <div className="space-y-5">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    هامش الربح الإجمالي
                  </span>
                  <span className={`text-lg font-bold ${
                    calculateProfitMargin() >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {calculateProfitMargin().toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div 
                    className={`h-2 rounded-full ${
                      calculateProfitMargin() >= 0 
                        ? 'bg-gradient-to-r from-green-400 to-green-600' 
                        : 'bg-gradient-to-r from-red-400 to-red-600'
                    }`} 
                    style={{ width: `${Math.min(Math.abs(calculateProfitMargin()), 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">نسبة المصروفات</div>
                  <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {formatPercentage(
                      expenseDashboard?.totalExpenses || 0,
                      revenueDashboard?.totalRevenue || 1
                    )}
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">كفاءة التشغيل</div>
                  <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {formatPercentage(
                      revenueDashboard?.totalRevenue || 0,
                      (revenueDashboard?.totalRevenue || 0) +
                        (expenseDashboard?.totalExpenses || 1)
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-800 rounded-xl shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    صافي التدفق
                  </span>
                  <span className={`text-xl font-bold ${
                    (transactionDashboard?.netAmount || 0) >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {formatCurrency(transactionDashboard?.netAmount || 0)}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              التنبيهات
            </h4>
            <div className="space-y-3">
              {(invoiceDashboard?.totalUnpaid || 0) > 0 && (
                <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-yellow-700 dark:text-yellow-300">
                    {formatCurrency(invoiceDashboard.totalUnpaid)} فواتير معلقة
                  </span>
                </div>
              )}
              {calculateNetProfit() < 0 && (
                <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/50">
                  <div className="flex-shrink-0 p-1.5 bg-red-100 dark:bg-red-900/50 rounded-lg">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-red-700 dark:text-red-300">خسارة في الفترة الحالية</div>
                    <div className="text-xs text-red-500 dark:text-red-400">انخفاض بنسبة {Math.abs(calculateNetProfit()).toFixed(1)}%</div>
                  </div>
                </div>
              )}
              {(expenseDashboard?.totalExpenses || 0) > (revenueDashboard?.totalRevenue || 0) * 0.8 && (
                <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/50">
                  <div className="flex-shrink-0 p-1.5 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-amber-700 dark:text-amber-300">المصروفات مرتفعة نسبياً</div>
                    <div className="text-xs text-amber-600 dark:text-amber-400">تشكل {formatPercentage(expenseDashboard?.totalExpenses || 0, revenueDashboard?.totalRevenue || 1)} من الإيرادات</div>
                  </div>
                </div>
              )}
              {(transactionDashboard?.netAmount || 0) < 0 && (
                <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/50">
                  <div className="flex-shrink-0 p-1.5 bg-red-100 dark:bg-red-900/50 rounded-lg">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-red-700 dark:text-red-300">صافي التدفق سالب</div>
                    <div className="text-xs text-red-500 dark:text-red-400">قيمة التدفق: {formatCurrency(transactionDashboard?.netAmount || 0)}</div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
