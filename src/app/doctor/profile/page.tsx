'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { Camera, Mail, Phone, MapPin, Calendar, Clock, Edit2, Award, Stethoscope, Star } from 'lucide-react';
import Image from 'next/image';

// Types
interface Doctor {
  id: number;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  education: string[];
  certifications: string[];
  languages: string[];
  workingHours: {
    [key: string]: string;
  };
  socialMedia: {
    twitter: string;
    linkedin: string;
    facebook: string;
    instagram: string;
  };
  stats: {
    totalPatients: number;
    experienceYears: number;
    successRate: number;
    ratings: number;
  };
}

export default function DoctorProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch('/api/doctor/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch doctor profile');
        }
        const data = await response.json();
        setDoctor(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorProfile();
  }, []);

  if (error) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Error Loading Profile</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (isLoading || !doctor) {
    return (
      <PageLayout>
        <div className="space-y-8 animate-pulse">
          {/* Header Section Skeleton */}
          <div className="relative bg-gradient-to-br from-indigo-600/50 to-indigo-800/50 rounded-2xl overflow-hidden">
            <div className="relative px-8 py-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Profile Image Skeleton */}
                <div className="relative">
                  <div className="w-40 h-40 rounded-2xl bg-gray-300" />
                </div>

                {/* Profile Info Skeleton */}
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div className="h-8 w-64 bg-gray-300 rounded" />
                  <div className="h-6 w-48 bg-gray-300 rounded" />
                  <div className="h-6 w-32 bg-gray-300 rounded" />

                  {/* Contact Grid Skeleton */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-12 bg-gray-300 rounded-xl" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6">
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-gray-300 rounded" />
                  <div className="h-6 w-16 bg-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Details Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6">
                  <div className="h-6 w-32 bg-gray-300 rounded mb-4" />
                  <div className="space-y-3">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-4 w-full bg-gray-300 rounded" />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Working Hours & Social Media Skeleton */}
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6">
                  <div className="h-6 w-32 bg-gray-300 rounded mb-4" />
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-4 w-full bg-gray-300 rounded" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

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
                    alt={doctor.name}
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
                  <h1 className="text-3xl font-bold text-white">{doctor.name}</h1>
                  <p className="text-xl text-indigo-100">{doctor.specialization}</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-100">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="text-lg font-semibold">{doctor.stats.ratings}</span>
                    <span className="text-sm opacity-80">/ 5.0</span>
                  </div>
                </div>

                {/* Contact Grid */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white">
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">{doctor.email}</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white">
                    <Phone className="w-5 h-5" />
                    <span className="text-sm">{doctor.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm">{doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm">{doctor.experience} of experience</span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="absolute top-4 right-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative group overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{doctor.stats.totalPatients}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Stethoscope className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="relative group overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Experience</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{doctor.stats.experienceYears} Years</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="relative group overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{doctor.stats.successRate}%</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="relative group overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rating</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{doctor.stats.ratings}/5.0</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 text-purple-600 fill-current" />
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Education & Certifications */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>
              <ul className="space-y-4">
                {doctor.education.map((edu, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="w-2 h-2 mt-2 rounded-full bg-indigo-600 group-hover:scale-150 transition-transform duration-300 mr-3" />
                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h2>
              <ul className="space-y-4">
                {doctor.certifications.map((cert, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="w-2 h-2 mt-2 rounded-full bg-indigo-600 group-hover:scale-150 transition-transform duration-300 mr-3" />
                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Working Hours & Social Media */}
          <div className="space-y-6">
            {/* Working Hours */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Working Hours</h2>
              <div className="space-y-4">
                {Object.entries(doctor.workingHours).map(([day, hours], index) => (
                  <div 
                    key={day} 
                    className="flex items-center justify-between p-3 rounded-xl transition-colors duration-200 hover:bg-gray-50"
                  >
                    <span className="text-gray-600 font-medium">{day}</span>
                    <span className={`text-sm font-medium ${hours === 'Closed' ? 'text-red-500' : 'text-green-600'}`}>
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Connect With Me</h2>
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href={doctor.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-transparent hover:from-blue-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">Twitter</span>
                </a>

                <a 
                  href={doctor.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-transparent hover:from-blue-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0A66C2] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">LinkedIn</span>
                </a>

                <a 
                  href={doctor.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-transparent hover:from-blue-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">Facebook</span>
                </a>

                <a 
                  href={doctor.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-pink-50 to-transparent hover:from-pink-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.69 1.379-.898.42-.166 1.051-.36 2.221-.42 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">Instagram</span>
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
