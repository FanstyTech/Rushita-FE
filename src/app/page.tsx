import PageLayout from '@/components/layouts/PageLayout';
import SectionTitle from '@/components/common/SectionTitle';
import StatCard from '@/components/common/StatCard';
import {
  UserGroupIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const stats = [
  { label: 'Total Patients', value: '2,543', icon: <UserGroupIcon className="h-7 w-7" />, iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
  { label: "Today's Appointments", value: '12', icon: <CalendarIcon className="h-7 w-7" />, iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  { label: 'Pending Diagnoses', value: '8', icon: <ClipboardDocumentListIcon className="h-7 w-7" />, iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  { label: 'Monthly Revenue', value: '$24,500', icon: <ChartBarIcon className="h-7 w-7" />, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
];

export default function Home() {
  return (
    <PageLayout
      title="Dashboard"
      description="Welcome to your clinic overview. Here are your key metrics and recent activity."
    >
      <SectionTitle>Overview</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item) => (
          <StatCard
            key={item.label}
            icon={item.icon}
            iconBg={item.iconBg}
            iconColor={item.iconColor}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Appointments */}
        <div className="bg-white shadow rounded-2xl">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
          </div>
          <div className="px-6 py-8">
            <p className="text-sm text-gray-500">No recent appointments</p>
          </div>
        </div>
        {/* AI Insights */}
        <div className="bg-white shadow rounded-2xl">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
          </div>
          <div className="px-6 py-8">
            <p className="text-sm text-gray-500">No insights available</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
