'use client';

import { useState } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const doctors = [
  { id: 1, name: 'Dr. Sarah', avatar: '/avatars/doctor-1.jpg' },
  { id: 2, name: 'Dr. John', avatar: '/avatars/doctor-2.jpg' },
  { id: 3, name: 'Dr. Maria', avatar: '/avatars/doctor-3.jpg' },
  { id: 4, name: 'Dr. David', avatar: '/avatars/doctor-4.jpg' },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('monthly');

  const healthMetrics = [
    {
      title: 'Heart Rate',
      value: '80 BPM',
      icon: (
        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      bgColor: 'bg-red-50',
    },
    {
      title: 'Blood Pressure',
      value: '120/80 mmHg',
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Glucose Level',
      value: '95 mg/dL',
      icon: (
        <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      bgColor: 'bg-purple-50',
    },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Heart Rate',
        data: [75, 78, 82, 79, 85, 80],
        borderColor: 'rgb(239, 68, 68)',
        tension: 0.4,
      },
      {
        label: 'Blood Pressure',
        data: [120, 118, 125, 122, 119, 121],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <PageLayout title="Dashboard">
      <div className="space-y-6">
        {/* Health Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {healthMetrics.map((metric, index) => (
            <div
              key={index}
              className={`${metric.bgColor} rounded-xl p-6 shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{metric.value}</p>
                </div>
                <div className="rounded-lg bg-white p-3 shadow-sm">{metric.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Activity</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeRange('weekly')}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  timeRange === 'weekly'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeRange('monthly')}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  timeRange === 'monthly'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setTimeRange('yearly')}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  timeRange === 'yearly'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
          <div className="h-[300px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Doctors and Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctors Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Doctors</h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-500">View all</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="text-center">
                  <div className="inline-block relative">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-400" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-900">{doctor.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Details</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Blood Type</span>
                <span className="text-sm font-medium text-gray-900">A+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Height</span>
                <span className="text-sm font-medium text-gray-900">170 CM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Weight</span>
                <span className="text-sm font-medium text-gray-900">70 KG</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
