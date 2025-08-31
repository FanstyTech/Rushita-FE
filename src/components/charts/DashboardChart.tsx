'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DoctorDashboardChartDataDto } from '@/lib/api/types/doctor-dashboard';
import { TimeRange } from '@/lib/api/types/clinic';

interface DashboardChartProps {
  chartData: DoctorDashboardChartDataDto;
  timeRange: TimeRange;
}
interface ChartPoint {
  time: string;
  appointments: number;
  completed: number;
  visits: number;
}

export function DashboardChart({ chartData, timeRange }: DashboardChartProps) {
  let data: ChartPoint[] = [];

  switch (timeRange) {
    case TimeRange.Daily:
      data =
        chartData.daily?.labels.map((label, index) => ({
          time: label,
          appointments: chartData.daily?.appointments[index] || 0,
          completed: chartData.daily?.completed[index] || 0,
          visits: chartData.daily?.visits[index] || 0,
        })) || [];
      break;
    case TimeRange.Weekly:
      data =
        chartData.weekly?.labels.map((label, index) => ({
          time: label,
          appointments: chartData.weekly?.appointments[index] || 0,
          completed: chartData.weekly?.completed[index] || 0,
          visits: chartData.weekly?.visits[index] || 0,
        })) || [];
      break;
    case TimeRange.Monthly:
      data =
        chartData.monthly?.labels.map((label, index) => ({
          time: label,
          appointments: chartData.monthly?.appointments[index] || 0,
          completed: chartData.monthly?.completed[index] || 0,
          visits: chartData.monthly?.visits[index] || 0,
        })) || [];
      break;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="appointments" stroke="#8884d8" />
        <Line type="monotone" dataKey="completed" stroke="#82ca9d" />
        <Line type="monotone" dataKey="visits" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
}
