'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
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
  Plus,
  ActivitySquare,
  ArrowLeft,
} from 'lucide-react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import PageLayout from '@/components/layouts/PageLayout';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import {
  AddConditionModal,
  AddAllergyModal,
  AddFamilyHistoryModal,
} from '@/components/clinic/patients/modals';

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
import { twMerge } from 'tailwind-merge';

export default function PatientProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = params;

  const { usePatientProfile } = useClinicPatients();
  const { data: patient, isLoading, error } = usePatientProfile(id as string);

  const tabs = [
    { name: t('clinic.patients.profile.tabs.overview'), icon: Activity },
    { name: t('clinic.patients.profile.tabs.medicalHistory'), icon: Heart },
    { name: t('clinic.patients.profile.tabs.appointments'), icon: Calendar },
    { name: t('clinic.patients.profile.tabs.documents'), icon: FileText },
  ];

  // Modal states
  const [isAddConditionOpen, setIsAddConditionOpen] = useState(false);
  const [isAddAllergyOpen, setIsAddAllergyOpen] = useState(false);
  const [isAddFamilyHistoryOpen, setIsAddFamilyHistoryOpen] = useState(false);

  if (isLoading) {
    return <PatientProfileSkeleton />;
  }

  if (error) {
    return (
      <PageLayout
        title={t('clinic.patients.profile.errors.loadingProfile')}
        description={t(
          'clinic.patients.profile.errors.loadingProfileDescription'
        )}
      >
        <div className="text-center py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <AlertCircle className="w-16 h-16 text-red-500" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {t('clinic.patients.profile.errors.loadingProfile')}
              </h3>
              <p className="text-sm text-gray-500">
                {t('clinic.patients.profile.errors.loadingProfileDescription')}
              </p>
            </div>
            <button
              onClick={() => router.push('/clinic/patients')}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('clinic.patients.actions.view')}
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!patient) {
    return (
      <PageLayout
        title={t('clinic.patients.profile.errors.patientNotFound')}
        description={t(
          'clinic.patients.profile.errors.patientNotFoundDescription'
        )}
      >
        <div className="text-center py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <User2 className="w-16 h-16 text-gray-300" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {t('clinic.patients.profile.errors.patientNotFound')}
              </h3>
              <p className="text-sm text-gray-500">
                {t('clinic.patients.profile.errors.patientNotFoundDescription')}
              </p>
            </div>
            <button
              onClick={() => router.push('/clinic/patients')}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('clinic.patients.actions.view')}
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div className="flex items-start gap-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User2 className="w-10 h-10 text-white" />
              </div>
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
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"
              >
                <Activity className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {patient.fullName}
              </h1>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{patient.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{patient.address}</span>
                </div>
              </div>
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
                    twMerge(
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
                    <h3 className="font-medium text-gray-900">
                      {t('clinic.patients.profile.overview.quickStats')}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">
                          {t('clinic.patients.profile.overview.totalVisits')}
                        </p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {patient.stats?.totalVisits}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">
                          {t('clinic.patients.profile.overview.lastVisit')}
                        </p>
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
                      {t('clinic.patients.profile.overview.recentActivity')}
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
                                {t(
                                  'clinic.patients.profile.overview.noRecentActivity'
                                )}
                              </p>
                              <p className="text-sm text-gray-400">
                                {t(
                                  'clinic.patients.profile.overview.noRecentActivityDescription'
                                )}
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
                <div className="space-y-8 py-6">
                  {/* Medical Conditions */}
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 1, 0.5],
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
                          {t(
                            'clinic.patients.profile.medicalHistory.conditions'
                          )}
                        </h3>
                      </div>
                      <motion.button
                        onClick={() => setIsAddConditionOpen(true)}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: '0 8px 20px -8px rgba(59, 130, 246, 0.5)',
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 backdrop-blur-sm"
                      >
                        <div className="absolute inset-0 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 180 }}
                          transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 10,
                          }}
                          className="relative"
                        >
                          <Plus className="w-5 h-5 stroke-[3]" />
                        </motion.div>
                        <span className="sr-only">
                          {t('clinic.patients.profile.buttons.addCondition')}
                        </span>
                      </motion.button>
                    </div>
                    <div className="space-y-3">
                      {patient.medicalHistory.conditions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {patient.medicalHistory.conditions.map(
                            (condition) => (
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
                        <div className="text-center py-8 px-4">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <ActivitySquare className="w-12 h-12 text-gray-300" />
                            <div>
                              <p className="text-gray-600 font-medium">
                                {t(
                                  'clinic.patients.profile.medicalHistory.noConditions'
                                )}
                              </p>
                              <p className="text-sm text-gray-400">
                                {t(
                                  'clinic.patients.profile.medicalHistory.noConditionsDescription'
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Allergies */}
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
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
                          {t(
                            'clinic.patients.profile.medicalHistory.allergies'
                          )}
                        </h3>
                      </div>
                      <motion.button
                        onClick={() => setIsAddAllergyOpen(true)}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: '0 8px 20px -8px rgba(239, 68, 68, 0.5)',
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 backdrop-blur-sm"
                      >
                        <div className="absolute inset-0 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 180 }}
                          transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 10,
                          }}
                          className="relative"
                        >
                          <Plus className="w-5 h-5 stroke-[3]" />
                        </motion.div>
                        <span className="sr-only">
                          {t('clinic.patients.profile.buttons.addAllergy')}
                        </span>
                      </motion.button>
                    </div>
                    <div className="space-y-3">
                      {patient.medicalHistory.allergies.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {patient.medicalHistory.allergies.map((allergy) => (
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
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 px-4">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <AlertCircle className="w-12 h-12 text-gray-300" />
                            <div>
                              <p className="text-gray-600 font-medium">
                                {t(
                                  'clinic.patients.profile.medicalHistory.noAllergies'
                                )}
                              </p>
                              <p className="text-sm text-gray-400">
                                {t(
                                  'clinic.patients.profile.medicalHistory.noAllergiesDescription'
                                )}
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
                        {t(
                          'clinic.patients.profile.medicalHistory.medications'
                        )}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr className="bg-gray-50">
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-start text-sm font-semibold text-gray-900"
                              >
                                {t(
                                  'clinic.patients.profile.medicalHistory.medicationHeaders.medication'
                                )}
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-start text-sm font-semibold text-gray-900"
                              >
                                {t(
                                  'clinic.patients.profile.medicalHistory.medicationHeaders.dosage'
                                )}
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-start text-sm font-semibold text-gray-900"
                              >
                                {t(
                                  'clinic.patients.profile.medicalHistory.medicationHeaders.frequency'
                                )}
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-start text-sm font-semibold text-gray-900"
                              >
                                {t(
                                  'clinic.patients.profile.medicalHistory.medicationHeaders.started'
                                )}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {patient.medicalHistory.medications.map(
                              (medication) => (
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
                                  {t(
                                    'clinic.patients.profile.medicalHistory.noMedications'
                                  )}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {t(
                                    'clinic.patients.profile.medicalHistory.noMedicationsDescription'
                                  )}
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
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ y: [-2, 2, -2] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <Users className="w-5 h-5 text-green-600" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {t(
                            'clinic.patients.profile.medicalHistory.familyHistory'
                          )}
                        </h3>
                      </div>
                      <motion.button
                        onClick={() => setIsAddFamilyHistoryOpen(true)}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: '0 8px 20px -8px rgba(34, 197, 94, 0.5)',
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 backdrop-blur-sm"
                      >
                        <div className="absolute inset-0 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 180 }}
                          transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 10,
                          }}
                          className="relative"
                        >
                          <Plus className="w-5 h-5 stroke-[3]" />
                        </motion.div>
                        <span className="sr-only">
                          {t(
                            'clinic.patients.profile.buttons.addFamilyHistory'
                          )}
                        </span>
                      </motion.button>
                    </div>
                    <div className="space-y-3">
                      {patient.medicalHistory.familyHistory.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {patient.medicalHistory.familyHistory.map((item) => (
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
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 px-4">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <Users className="w-12 h-12 text-gray-300" />
                            <div>
                              <p className="text-gray-600 font-medium">
                                {t(
                                  'clinic.patients.profile.medicalHistory.noFamilyHistory'
                                )}
                              </p>
                              <p className="text-sm text-gray-400">
                                {t(
                                  'clinic.patients.profile.medicalHistory.noFamilyHistoryDescription'
                                )}
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
                          {t('clinic.patients.profile.appointments.upcoming')}
                        </h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t(
                                  'clinic.patients.profile.appointments.headers.dateTime'
                                )}
                              </th>
                              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t(
                                  'clinic.patients.profile.appointments.headers.type'
                                )}
                              </th>
                              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t(
                                  'clinic.patients.profile.appointments.headers.doctor'
                                )}
                              </th>

                              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t(
                                  'clinic.patients.profile.appointments.headers.status'
                                )}
                              </th>
                              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t(
                                  'clinic.patients.profile.appointments.headers.notes'
                                )}
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
                                  {t(
                                    'clinic.patients.profile.appointments.noAppointments'
                                  )}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {t(
                                    'clinic.patients.profile.appointments.noAppointmentsDescription'
                                  )}
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
                          {t('clinic.patients.profile.documents.title')}
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
                                  {t(
                                    'clinic.patients.profile.documents.noDocuments'
                                  )}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {t(
                                    'clinic.patients.profile.documents.noDocumentsDescription'
                                  )}
                                </p>
                              </div>
                              <button
                                type="button"
                                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                <Upload className="w-4 h-4 mr-2" />
                                {t('clinic.patients.profile.buttons.uploaded')}
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
      <AddConditionModal
        patientId={patient?.id}
        isOpen={isAddConditionOpen}
        onClose={() => setIsAddConditionOpen(false)}
      />
      <AddAllergyModal
        patientId={patient?.id}
        isOpen={isAddAllergyOpen}
        onClose={() => setIsAddAllergyOpen(false)}
      />
      <AddFamilyHistoryModal
        patientId={patient?.id}
        isOpen={isAddFamilyHistoryOpen}
        onClose={() => setIsAddFamilyHistoryOpen(false)}
      />
    </PageLayout>
  );
}
