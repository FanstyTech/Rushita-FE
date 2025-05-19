import PageLayout from '@/components/layouts/PageLayout';
import SectionTitle from '@/components/common/SectionTitle';

const lookups = [
  { id: 1, type: 'Specialty', value: 'Cardiology' },
  { id: 2, type: 'Specialty', value: 'Dermatology' },
  { id: 3, type: 'Treatment Type', value: 'Medication' },
  { id: 4, type: 'City', value: 'Riyadh' },
];

export default function LookupsPage() {
  return (
    <PageLayout title="Lookup Tables">
      <div className="flex items-center justify-between mb-6">
        <SectionTitle>Manage Lookup Tables</SectionTitle>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition">+ Add Lookup</button>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {lookups.map((l) => (
              <tr key={l.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{l.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{l.value}</td>
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