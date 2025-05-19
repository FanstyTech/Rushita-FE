import AddClinicForm from "./AddClinicForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Clinic | Admin Dashboard",
  description: "Register a new clinic in the healthcare system",
};

export default function AddClinicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Register New Clinic
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Complete the registration process to join our healthcare network
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                8 Simple Steps
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-50 text-green-700">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ~10 Minutes
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="px-6 py-4">
              <nav className="flex space-x-4">
                <span className="px-3 py-2 text-sm font-medium text-blue-700 bg-white rounded-md shadow-sm">
                  Basic Information
                </span>
                <span className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Address
                </span>
                <span className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Branches
                </span>
                <span className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Working Hours
                </span>
                <span className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Employees
                </span>
                <span className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Social Media
                </span>
                <span className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Settings
                </span>
                <span className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Review
                </span>
              </nav>
            </div>
          </div>
          <AddClinicForm />
        </div>
      </div>
    </div>
  );
}