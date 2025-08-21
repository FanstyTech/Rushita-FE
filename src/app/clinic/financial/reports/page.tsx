'use client';

import { useState, useMemo } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  FileText,
  BarChart3,
  PieChart,
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar } from 'recharts';

// Mock data for reports
const mockReportData = {
  financialSummary: {
    totalRevenue: 125000,
    totalExpenses: 85000,
    totalSalaries: 45000,
    netProfit: 40000,
    profitMargin: 32
  },
  monthlyData: [
    { month: 'Jan', revenue: 12000, expenses: 8000, profit: 4000 },
    { month: 'Feb', revenue: 15000, expenses: 9000, profit: 6000 },
    { month: 'Mar', revenue: 18000, expenses: 11000, profit: 7000 },
    { month: 'Apr', revenue: 14000, expenses: 8500, profit: 5500 },
    { month: 'May', revenue: 16000, expenses: 9500, profit: 6500 },
    { month: 'Jun', revenue: 19000, expenses: 12000, profit: 7000 },
  ],
  revenueByType: [
    { name: 'Visits', value: 45000, color: '#10B981' },
    { name: 'Treatments', value: 35000, color: '#3B82F6' },
    { name: 'Lab Tests', value: 25000, color: '#F59E0B' },
    { name: 'Radiology', value: 15000, color: '#EF4444' },
    { name: 'Dental', value: 5000, color: '#8B5CF6' }
  ],
  expensesByType: [
    { name: 'Rent', value: 24000, color: '#EF4444' },
    { name: 'Supplies', value: 15000, color: '#F59E0B' },
    { name: 'Utilities', value: 12000, color: '#3B82F6' },
    { name: 'Equipment', value: 18000, color: '#8B5CF6' },
    { name: 'Marketing', value: 8000, color: '#10B981' },
    { name: 'Other', value: 8000, color: '#6B7280' }
  ],
  topDoctors: [
    { name: 'Dr. Smith', revenue: 25000, patients: 45 },
    { name: 'Dr. Johnson', revenue: 22000, patients: 38 },
    { name: 'Dr. Brown', revenue: 20000, patients: 42 },
    { name: 'Dr. Wilson', revenue: 18000, patients: 35 },
    { name: 'Dr. Garcia', revenue: 15000, patients: 28 }
  ]
};

const reportTypes = [
  { value: 'summary', label: 'Financial Summary' },
  { value: 'revenue', label: 'Revenue Analysis' },
  { value: 'expenses', label: 'Expense Analysis' },
  { value: 'doctors', label: 'Doctor Performance' },
  { value: 'monthly', label: 'Monthly Trends' }
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('summary');
  const [dateRange, setDateRange] = useState('month');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  const renderFinancialSummary = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(mockReportData.financialSummary.totalRevenue)}
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatCurrency(mockReportData.financialSummary.totalExpenses)}
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Net Profit</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(mockReportData.financialSummary.netProfit)}
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Profit Margin</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatPercentage(mockReportData.financialSummary.profitMargin)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Monthly Trend Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Financial Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={mockReportData.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10B981" 
              strokeWidth={3}
              name="Revenue"
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#EF4444" 
              strokeWidth={3}
              name="Expenses"
            />
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="#3B82F6" 
              strokeWidth={3}
              name="Profit"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  const renderRevenueAnalysis = () => (
    <div className="space-y-6">
      {/* Revenue by Type Pie Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue by Service Type</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RechartsPieChart>
            <Pie
              data={mockReportData.revenueByType}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {mockReportData.revenueByType.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </Card>

      {/* Revenue Details Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Service Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {mockReportData.revenueByType.map((item, index) => {
                const percentage = (item.value / mockReportData.financialSummary.totalRevenue) * 100;
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatCurrency(item.value)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatPercentage(percentage)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderExpenseAnalysis = () => (
    <div className="space-y-6">
      {/* Expenses by Type Pie Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expenses by Category</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RechartsPieChart>
            <Pie
              data={mockReportData.expensesByType}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {mockReportData.expensesByType.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </Card>

      {/* Expenses Details Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expense Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {mockReportData.expensesByType.map((item, index) => {
                const percentage = (item.value / mockReportData.financialSummary.totalExpenses) * 100;
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatCurrency(item.value)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatPercentage(percentage)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderDoctorPerformance = () => (
    <div className="space-y-6">
      {/* Doctor Performance Bar Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Doctor Revenue Performance</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={mockReportData.topDoctors}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Bar dataKey="revenue" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Doctor Performance Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Doctor Performance Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Doctor Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Patients
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Avg Revenue/Patient
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {mockReportData.topDoctors.map((doctor, index) => {
                const avgRevenue = doctor.revenue / doctor.patients;
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {doctor.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatCurrency(doctor.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {doctor.patients}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatCurrency(avgRevenue)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderMonthlyTrends = () => (
    <div className="space-y-6">
      {/* Monthly Trends Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Financial Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={mockReportData.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10B981" 
              strokeWidth={3}
              name="Revenue"
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#EF4444" 
              strokeWidth={3}
              name="Expenses"
            />
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="#3B82F6" 
              strokeWidth={3}
              name="Profit"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Monthly Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Best Month</h4>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">June</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Revenue: {formatCurrency(19000)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Profit: {formatCurrency(7000)}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Average Monthly</h4>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(15667)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Profit: {formatCurrency(6000)}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Growth Rate</h4>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">+15.3%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">vs Last Period</p>
            <p className="text-sm text-green-600 dark:text-green-400">
              +{formatCurrency(2000)} increase
            </p>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'summary':
        return renderFinancialSummary();
      case 'revenue':
        return renderRevenueAnalysis();
      case 'expenses':
        return renderExpenseAnalysis();
      case 'doctors':
        return renderDoctorPerformance();
      case 'monthly':
        return renderMonthlyTrends();
      default:
        return renderFinancialSummary();
    }
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Reports</h1>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive financial analysis and insights</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Report Type Selector */}
        <Card className="p-6">
          <div className="flex flex-wrap gap-2">
            {reportTypes.map((type) => (
              <Button
                key={type.value}
                variant={selectedReport === type.value ? 'default' : 'outline'}
                onClick={() => setSelectedReport(type.value)}
                className="flex items-center gap-2"
              >
                {type.value === 'summary' && <BarChart3 className="w-4 h-4" />}
                {type.value === 'revenue' && <TrendingUp className="w-4 h-4" />}
                {type.value === 'expenses' && <TrendingDown className="w-4 h-4" />}
                {type.value === 'doctors' && <FileText className="w-4 h-4" />}
                {type.value === 'monthly' && <Calendar className="w-4 h-4" />}
                {type.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Date Range Selector */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Range:</span>
            <div className="flex gap-2">
              <Button
                variant={dateRange === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDateRange('week')}
              >
                Week
              </Button>
              <Button
                variant={dateRange === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDateRange('month')}
              >
                Month
              </Button>
              <Button
                variant={dateRange === 'quarter' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDateRange('quarter')}
              >
                Quarter
              </Button>
              <Button
                variant={dateRange === 'year' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDateRange('year')}
              >
                Year
              </Button>
            </div>
          </div>
        </Card>

        {/* Report Content */}
        {renderReportContent()}
      </div>
    </PageLayout>
  );
}