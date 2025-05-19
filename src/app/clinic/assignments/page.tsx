import PageLayout from '@/components/layouts/PageLayout';
import SectionTitle from '@/components/common/SectionTitle';

const assignments = [
  { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Wilson', status: 'Assigned' },
  { id: 2, patient: 'Jane Smith', doctor: 'Dr. Ahmed Al-Farsi', status: 'Assigned' },
];

export default function AssignmentsPage() {
  return (
    <PageLayout title="Assignments">
      <div className="flex items-center justify-between mb-6">
        <SectionTitle>Patient Assignments</SectionTitle>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition">+ Assign Patient</button>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {assignments.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{a.patient}</td>
                <td className="px-6 py-4 whitespace-nowrap">{a.doctor}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={a.status === 'Assigned' ? 'text-green-600 font-semibold' : 'text-gray-400 font-semibold'}>{a.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-end">
                  <button className="text-indigo-600 hover:underline font-medium">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
} 