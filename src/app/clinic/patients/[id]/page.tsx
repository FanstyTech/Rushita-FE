'use client';

import { useParams } from 'next/navigation';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
  User2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Activity,
  FileText,
  Clock,
  Heart,
  AlertTriangle,
  AlertCircle,
  Pill,
  Users,
  Download,
  Eye,
  Share2,
  Upload,
  ActivitySquare,
} from 'lucide-react';
import { format } from 'date-fns';
import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import PageLayout from '@/components/layouts/PageLayout';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import {
  getAppointmentStatusClass,
  getAppointmentStatusLabel,
  getMedicalConditionStatusClass,
  getMedicalConditionStatusLabel,
  getRelationshipLabel,
  getSeverityClass,
  getSeverityLabel,
} from '@/utils/textUtils';
import PatientProfileSkeleton from '@/components/skeletons/PatientProfileSkeleton';
// import PatientProfileSkeleton from '@/components/skeletons/PatientProfileSkeleton';
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function PatientProfilePage() {
  const { id } = useParams();
  const { usePatientProfile } = useClinicPatients();
  const { data: patient, isLoading, error } = usePatientProfile(id as string);

  const tabs = [
    { name: 'Overview', icon: Activity },
    { name: 'Medical History', icon: Heart },
    { name: 'Appointments', icon: Calendar },
    { name: 'Documents', icon: FileText },
  ];

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <PatientProfileSkeleton />
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              Error Loading Profile
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Failed to load patient profile. Please try again.
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!patient) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">
              Patient Not Found
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              The requested patient profile could not be found.
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar Section */}
          <div className="relative">
            <Avatar
              name={patient.fullName ?? ''}
              className="ring-4 ring-white shadow-xl"
            />
          </div>

          {/* Patient Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {patient.fullName}
                </h1>
                <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <User2 className="w-4 h-4" />
                    {patient.gender}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {patient.dateOfBirth
                      ? format(new Date(patient.dateOfBirth), 'MMM d, yyyy')
                      : '-'}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button className=" px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                  New Appointment
                </Button>
              </div>
            </div>

            {/* Contact Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {patient.phoneNumber && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900">
                      {patient.phoneNumber}
                    </p>
                  </div>
                </div>
              )}
              {patient.email && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">
                      {patient.email}
                    </p>
                  </div>
                </div>
              )}
              {patient.address && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm font-medium text-gray-900">
                      {patient.address}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <TabGroup>
            <TabList className="flex space-x-1 rounded-xl bg-gray-50 p-1">
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'flex items-center justify-center gap-2',
                      selected
                        ? 'bg-white text-blue-600 shadow'
                        : 'text-gray-500 hover:text-gray-700'
                    )
                  }
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </Tab>
              ))}
            </TabList>
            <TabPanels className="mt-4">
              <TabPanel className="rounded-xl bg-white p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quick Stats */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Quick Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Total Visits</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {patient.stats?.totalVisits}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Last Visit</p>
                        <p className="text-sm font-medium text-gray-900">
                          {patient.stats?.lastVisit
                            ? format(
                                new Date(patient.stats?.lastVisit),
                                'MMM d, yyyy'
                              )
                            : '-'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      {patient.recentActivity?.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {activity.type}
                            </p>
                            <p className="text-xs text-gray-500">
                              {format(new Date(activity.date), 'MMMM d, yyyy')}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {activity.description}
                            </p>
                          </div>
                        </div>
                      ))}
                      {(!patient.recentActivity ||
                        !patient.recentActivity.length) && (
                        <div className="text-center py-8">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <Clock className="w-12 h-12 text-gray-300" />
                            <div>
                              <p className="text-gray-600 font-medium">
                                No Recent Activity
                              </p>
                              <p className="text-sm text-gray-400">
                                Patient has no recorded activities yet
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="space-y-8 p-6">
                  {/* Medical Conditions */}
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.6, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <Activity className="w-5 h-5 text-blue-600" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Medical Conditions
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {patient.medicalHistory.conditions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {patient.medicalHistory.conditions.map(
                            (condition, index) => (
                              <motion.div
                                key={condition.id}
                                whileHover={{ scale: 1.02 }}
                                className="group bg-gray-50 hover:bg-gray-100/80 rounded-lg p-4"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {condition.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      {condition.diagnosedDate
                                        ? format(
                                            new Date(condition.diagnosedDate),
                                            'MMM d, yyyy'
                                          )
                                        : '-'}
                                    </p>
                                  </div>
                                  <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                                    ${
                                      condition.status &&
                                      getMedicalConditionStatusClass(
                                        condition.status
                                      )
                                    }`}
                                  >
                                    {condition.status &&
                                      getMedicalConditionStatusLabel(
                                        condition.status
                                      )}
                                  </span>
                                </div>
                              </motion.div>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-4">
                          <div className="text-center py-8 px-4">
                            <div className="flex flex-col items-center justify-center space-y-3">
                              <ActivitySquare className="w-12 h-12 text-gray-300" />
                              <div>
                                <p className="text-gray-600 font-medium">
                                  No Medical Conditions
                                </p>
                                <p className="text-sm text-gray-400">
                                  No medical conditions have been recorded
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Allergies */}
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                      <motion.div
                        animate={{ y: [-2, 2, -2] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Allergies
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {patient.medicalHistory.allergies.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {patient.medicalHistory.allergies.map(
                            (allergy, index) => (
                              <motion.div
                                key={allergy.id}
                                whileHover={{ scale: 1.02 }}
                                className="group bg-gray-50 hover:bg-gray-100/80 rounded-lg p-4"
                              >
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                                      {allergy.name}
                                    </h4>
                                    <span
                                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                                    ${
                                      allergy.severity &&
                                      getSeverityClass(allergy.severity)
                                    }
                                    }`}
                                    >
                                      <AlertCircle className="w-3 h-3" />
                                      {allergy.severity &&
                                        getSeverityLabel(allergy.severity)}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                    {allergy.reaction}
                                  </p>
                                </div>
                              </motion.div>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 px-4">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <AlertCircle className="w-12 h-12 text-gray-300" />
                            <div>
                              <p className="text-gray-600 font-medium">
                                No Allergies
                              </p>
                              <p className="text-sm text-gray-400">
                                No allergies have been recorded
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Current Medications */}
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.6, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <Pill className="w-5 h-5 text-purple-600" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Current Medications
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr className="bg-gray-50">
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                              >
                                Medication
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Dosage
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Frequency
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Started
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {patient.medicalHistory.medications.map(
                              (medication, index) => (
                                <motion.tr
                                  key={medication.id}
                                  whileHover={{ backgroundColor: '#F9FAFB' }}
                                  className="hover:bg-gray-50"
                                >
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                                    <div className="flex items-center gap-2">
                                      <Pill className="w-4 h-4 text-purple-500" />
                                      <span className="font-medium text-gray-900">
                                        {medication.name}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                                    {medication.dosage}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                                    {medication.frequency}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                                    {format(
                                      new Date(medication.startDate),
                                      'MMM d, yyyy'
                                    )}
                                  </td>
                                </motion.tr>
                              )
                            )}
                          </tbody>
                        </table>
                        {!patient.medicalHistory.medications.length && (
                          <div className="text-center py-8 px-4">
                            <div className="flex flex-col items-center justify-center space-y-3">
                              <Pill className="w-12 h-12 text-gray-300" />
                              <div>
                                <p className="text-gray-600 font-medium">
                                  No Medications
                                </p>
                                <p className="text-sm text-gray-400">
                                  No medications have been prescribed
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Family History */}
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.6, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <Users className="w-5 h-5 text-teal-600" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Family History
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {patient.medicalHistory.familyHistory.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {patient.medicalHistory.familyHistory.map(
                            (item, index) => (
                              <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.02 }}
                                className="group bg-gray-50 hover:bg-gray-100/80 rounded-lg p-4"
                              >
                                <h4 className="font-medium text-gray-900 group-hover:text-teal-600 transition-colors">
                                  {item.condition}
                                </h4>
                                <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                                  <User2 className="w-4 h-4" />
                                  {item.relationship &&
                                    getRelationshipLabel(item.relationship)}
                                </p>
                              </motion.div>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 px-4">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <Users className="w-12 h-12 text-gray-300" />
                            <div>
                              <p className="text-gray-600 font-medium">
                                No Family History
                              </p>
                              <p className="text-sm text-gray-400">
                                No family medical history recorded
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* Appointments Tab */}
              <TabPanel>
                <div className="p-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-6">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.6, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Upcoming Appointments
                        </h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date & Time
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Doctor
                              </th>

                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Notes
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {patient.appointments.map((appointment) => (
                              <motion.tr
                                key={appointment.id}
                                whileHover={{ backgroundColor: '#F9FAFB' }}
                                className="hover:bg-gray-50"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {format(
                                    new Date(appointment.date),
                                    'MMM d, yyyy h:mm a'
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {appointment.type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {appointment.doctor}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                        ${getAppointmentStatusClass(
                                          appointment.status
                                        )}`}
                                  >
                                    {getAppointmentStatusLabel(
                                      appointment.status
                                    )}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {appointment.notes}
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                        {!patient.appointments.length && (
                          <div className="text-center py-8 px-4">
                            <div className="flex flex-col items-center justify-center space-y-3">
                              <Calendar className="w-12 h-12 text-gray-300" />
                              <div>
                                <p className="text-gray-600 font-medium">
                                  No Appointments
                                </p>
                                <p className="text-sm text-gray-400">
                                  No upcoming appointments scheduled
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* Documents Tab */}
              <TabPanel>
                <div className="p-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-6">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.6, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <FileText className="w-5 h-5 text-blue-600" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Medical Documents
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {patient.documents?.map((document) => (
                          <motion.div
                            key={document.id}
                            whileHover={{ scale: 1.01 }}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100/80 group"
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-2 bg-white rounded-lg shadow-sm">
                                <FileText
                                  className={`w-6 h-6 
                                      ${
                                        document.type === 'PDF'
                                          ? 'text-red-500'
                                          : document.type === 'DICOM'
                                          ? 'text-purple-500'
                                          : 'text-blue-500'
                                      }`}
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">
                                  {document.name}
                                </h4>
                                <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                                  <span>
                                    {document.type} • {document.size}
                                  </span>
                                  <span>
                                    Uploaded{' '}
                                    {format(
                                      new Date(document.uploadedAt),
                                      'MMM d, yyyy'
                                    )}
                                  </span>
                                  <span>By {document.uploadedBy}</span>
                                </div>
                                <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                  {document.category}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                <Download className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                <Share2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                        {(!patient.documents || !patient.documents.length) && (
                          <div className="text-center py-8 px-4">
                            <div className="flex flex-col items-center justify-center space-y-3">
                              <FileText className="w-12 h-12 text-gray-300" />
                              <div>
                                <p className="text-gray-600 font-medium">
                                  No Documents
                                </p>
                                <p className="text-sm text-gray-400">
                                  No medical documents have been uploaded
                                </p>
                              </div>
                              <button
                                type="button"
                                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Document
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </PageLayout>
  );
}
