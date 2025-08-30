import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { TimeRange } from '@/lib/api/types/clinic';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  appointments: number[];
  completed: number[];
  cancelled: number[];
}

interface ChartSectionProps {
  chartData: {
    daily?: ChartData;
    weekly?: ChartData;
    monthly?: ChartData;
  };
  timeRange: TimeRange;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  chartData,
  timeRange,
}) => {
  // Get current chart data based on timeRange
  const getCurrentChartData = () => {
    switch (timeRange) {
      case TimeRange.Daily:
        return chartData?.daily;
      case TimeRange.Weekly:
        return chartData?.weekly;
      case TimeRange.Monthly:
        return chartData?.monthly;
      default:
        return chartData?.weekly;
    }
  };

  const currentChartData = getCurrentChartData();

  // Chart data configuration
  const lineChartData = {
    labels: currentChartData?.labels || [],
    datasets: [
      {
        label: 'Total Appointments',
        data: currentChartData?.appointments || [],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
      },
      {
        label: 'Completed',
        data: currentChartData?.completed || [],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
      },
      {
        label: 'Cancelled',
        data: currentChartData?.cancelled || [],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          color: 'rgb(107, 114, 128)', // gray-500
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        intersect: false,
        mode: 'index' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: 'rgba(107, 114, 128, 0.8)', // gray-500
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(107, 114, 128, 0.8)', // gray-500
          font: {
            size: 12,
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    },
  };

  return (
    <div className="h-[350px]">
      {currentChartData && currentChartData.labels.length > 0 ? (
        <Line data={lineChartData} options={chartOptions} />
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400 dark:text-gray-500"
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
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No data available for this time range
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartSection;
