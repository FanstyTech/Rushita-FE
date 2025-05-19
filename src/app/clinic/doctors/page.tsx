import PageLayout from '@/components/layouts/PageLayout';
import SectionTitle from '@/components/common/SectionTitle';

const doctors = [
  { id: 1, name: 'Dr. Sarah Wilson', specialty: 'General Practitioner', status: 'Active' },
  { id: 2, name: 'Dr. Ahmed Al-Farsi', specialty: 'Cardiologist', status: 'Active' },
  { id: 3, name: 'Dr. Mona Khaled', specialty: 'Dermatologist', status: 'Inactive' },
];

export default function DoctorsPage() {
  return (
    <PageLayout title="Doctors">
      <div className="flex items-center justify-between mb-6">
        <SectionTitle>Doctors Management</SectionTitle>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition">+ Add Doctor</button>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {doctors.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{d.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{d.specialty}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={d.status === 'Active' ? 'text-green-600 font-semibold' : 'text-gray-400 font-semibold'}>{d.status}</span>
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