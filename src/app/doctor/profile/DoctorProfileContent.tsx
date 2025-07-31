'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Award,
  Stethoscope,
  Star,
  Save,
  X,
} from 'lucide-react';
import Image from 'next/image';
import DoctorProfileSkeleton from '@/components/skeletons/DoctorProfileSkeleton';
import { useClinicStaff } from '@/lib/api/hooks/useClinicStaff';
import { ClinicStaffDto } from '@/lib/api/types/clinic-staff';
import { Button } from '@/components/ui/button';
import InputDocto from '@/components/doctor/InputDocto';
import ContainerInput from '@/components/doctor/ContainerInput';
import { Card } from '@/components/ui/card';


export default function DoctorProfileContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState<string>();

  const [editData, setEditData] = useState<ClinicStaffDto | null>()

  const { useClinicStaffDetails } = useClinicStaff()



  const { data, isLoading, error } = useClinicStaffDetails(userId || '');
  useEffect(() => {

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.clinicInfo.id);
    }

  }, []);
  useEffect(() => {
    setEditData(data)
  }, [data])
  const handleSave = () => {
    setIsEditing(false);

  };

  const handleCancel = () => {
    setEditData(data);
    setIsEditing(false);
  };

  if (error) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Error Loading Profile
            </h2>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </div>
      </PageLayout>
    );
  }


  if (isLoading || !data) {
    return (
      <PageLayout>
        <DoctorProfileSkeleton />
      </PageLayout>
    );
  }

  if (data) {
    return (
      <PageLayout>
        <div className="space-y-8">
          {/* Header Section with Glassmorphism */}
          <div className="relative bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative px-8 py-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Profile Image */}
                <div className="relative group">
                  <div className="relative w-40 h-40 rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-2xl transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src="https://placehold.co/400x400/4f46e5/ffffff.png?text=Dr.A&font=roboto"
                      alt=""
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-white">
                      {editData?.name}
                    </h1>
                    <p className="text-xl text-indigo-100">
                      {editData?.specialization}
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-100">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="text-lg font-semibold">
                        {/* {editData.stats.ratings} */}
                      </span>
                      <span className="text-sm opacity-80">/ 5.0</span>
                    </div>
                  </div>

                  {/* Contact Grid */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                    <ContainerInput isEditing={isEditing}>
                      <Mail className="w-5 h-5" />
                      {isEditing ? <InputDocto
                        value={editData?.email || ''}
                        onChange={(val) => {
                          if (editData) {
                            setEditData({ ...editData, email: val });
                          }
                        }}
                        onReset={() => {
                          if (editData) {
                            setEditData({ ...editData, email: '' });
                          }
                        }}
                      />
                        : <span className="text-sm">{editData?.email}</span>}
                    </ContainerInput>
                    <ContainerInput isEditing={isEditing}>
                      <Phone className="w-5 h-5" />
                      {isEditing ? <InputDocto
                        value={editData?.phoneNumber || ''}
                        onChange={(val) => {
                          if (editData) {
                            setEditData({ ...editData, phoneNumber: val });
                          }
                        }}
                        onReset={() => {
                          if (editData) {
                            setEditData({ ...editData, phoneNumber: '' });
                          }
                        }}
                      />

                        :
                        <span className="text-sm">{editData?.phoneNumber}</span>
                      }
                    </ContainerInput>
                    <ContainerInput isEditing={isEditing}>
                      <MapPin className="w-5 h-5" />
                      {isEditing ? <InputDocto
                        value={editData?.address || ''}
                        onChange={(val) => {
                          if (editData) {
                            setEditData({ ...editData, address: val });
                          }
                        }}
                        onReset={() => {
                          if (editData) {
                            setEditData({ ...editData, address: '' });
                          }
                        }}
                      /> :
                        <span className="text-sm">{editData?.address}</span>
                      }
                    </ContainerInput>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white">
                      <Calendar className="w-5 h-5" />
                      <span className="text-sm">
                        {/* {editData.dateOfBirth} of experience */}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <div className='absolute top-4 right-4 flex gap-4'>

                  {isEditing ? (<> <Button
                    onClick={handleSave}
                    variant="SaveButton"

                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                    <Button
                      onClick={handleCancel}
                      variant='ghost'
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button></>) :
                    <Button

                      variant="outlinetow"
                      onClick={() => setIsEditing(!isEditing)}
                      className="border-white hover:bg-white hover:text-black text-white"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="relative group overflow-hidden  shadow-sm border dark:border-foreground/30 border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
              {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">
                    Total Patients
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {/* {editData.stats.totalPatients} */}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="relative group overflow-hidden  shadow-sm border dark:border-foreground/30 border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
              {/* <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Experience</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {/* {editData.stats.experienceYears} Years */}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="relative group overflow-hidden  shadow-sm border dark:border-foreground/30 border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
              {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">
                    Success Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {/* {editData.stats.successRate}% */}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>

            <Card className="relative group overflow-hidden  shadow-sm border dark:border-foreground/30 border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
              {/* <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Rating</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {/* {editData.stats.ratings}/5 */}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Education and Certifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="  shadow-sm border border-gray-100 dark:border-foreground/30 p-6">
              <h2 className="text-xl font-semibold  mb-4">
                Education
              </h2>
              <ul className="space-y-3">
                {/* {editData.education.map((edu, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-600"
                >
                  <Award className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <span>{edu}</span>
                </li>
              ))} */}
              </ul>
            </Card>

            <Card className="  shadow-sm border border-gray-100 dark:border-foreground/30 p-6">
              <h2 className="text-xl font-semibold  mb-4">
                Certifications
              </h2>
              <ul className="space-y-3">
                {/* {editData.certifications.map((cert, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-600"
                >
                  <Award className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <span>{cert}</span>
                </li>
              ))} */}
              </ul>
            </Card>
          </div>

          {/* Languages */}
          <Card className="  shadow-sm border border-gray-100 dark:border-foreground/30 p-6">
            <h2 className="text-xl font-semibold  mb-4">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {/* {editData.languages.map((lang, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {lang}
              </span>
            ))} */}
            </div>
          </Card>
        </div>
      </PageLayout >
    );
  }

}
