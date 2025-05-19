import PageLayout from '@/components/layouts/PageLayout';
import SectionTitle from '@/components/common/SectionTitle';

export default function ReportsPage() {
  return (
    <PageLayout title="Reports">
      <div className="flex items-center justify-between mb-6">
        <SectionTitle>Statistics & Reports</SectionTitle>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition">Download Report</button>
      </div>
      <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-gray-400 text-lg mb-4">[Charts and statistics will appear here]</div>
        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-300">[Chart Placeholder]</span>
        </div>
      </div>
    </PageLayout>
  );
} 