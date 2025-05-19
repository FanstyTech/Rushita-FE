import PageLayout from '@/components/layouts/PageLayout';
import SectionTitle from '@/components/common/SectionTitle';

const patient = {
  name: 'John Doe',
  age: 34,
  gender: 'Male',
  lastVisit: '2024-06-01',
};

const treatments = [
  { id: 1, date: '2024-06-01', diagnosis: 'Flu', prescription: 'Rest, fluids', notes: 'Follow up in 1 week.' },
  { id: 2, date: '2024-05-10', diagnosis: 'Allergy', prescription: 'Antihistamines', notes: 'Avoid allergens.' },
];

export default function PatientDetails() {
  return (
    <PageLayout title={patient.name}>
      <div className="flex items-center justify-between mb-6">
        <SectionTitle>Patient Details</SectionTitle>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition">+ Add Treatment</button>
      </div>
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-xs text-gray-500">Age</div>
            <div className="text-lg font-semibold text-gray-900">{patient.age}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Gender</div>
            <div className="text-lg font-semibold text-gray-900">{patient.gender}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Last Visit</div>
            <div className="text-lg font-semibold text-gray-900">{patient.lastVisit}</div>
          </div>
        </div>
      </div>
      <SectionTitle>Treatment History</SectionTitle>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Prescription</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {treatments.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{t.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{t.diagnosis}</td>
                <td className="px-6 py-4 whitespace-nowrap">{t.prescription}</td>
                <td className="px-6 py-4 whitespace-nowrap">{t.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
} 