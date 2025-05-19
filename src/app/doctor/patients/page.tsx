import PageLayout from '@/components/layouts/PageLayout';
import SectionTitle from '@/components/common/SectionTitle';

const patients = [
  { id: 1, name: 'John Doe', age: 34, gender: 'Male', lastVisit: '2024-06-01' },
  { id: 2, name: 'Jane Smith', age: 28, gender: 'Female', lastVisit: '2024-05-28' },
  { id: 3, name: 'Ali Hassan', age: 41, gender: 'Male', lastVisit: '2024-05-20' },
];

export default function PatientsList() {
  return (
    <PageLayout title="Patients">
      <div className="flex items-center justify-between mb-6">
        <SectionTitle>Patient List</SectionTitle>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition">+ Add Patient</button>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {patients.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{p.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{p.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">{p.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">{p.lastVisit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-end">
                  <button className="text-indigo-600 hover:underline font-medium">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
} 