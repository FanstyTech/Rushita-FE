"use client";

import { useState } from 'react';

interface ClinicFormData {
  // Step 1: Basic Information
  clinicName: string;
  email: string;
  phone: string;
  description: string;
  
  // Step 2: Location
  country: string;
  city: string;
  address: string;
  zipCode: string;
  
  // Step 3: Working Hours
  workingHours: {
    [key: string]: { 
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
  
  // Step 4: Additional Info
  website: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

interface StepProps {
  formData: ClinicFormData;
  setFormData: (formData: ClinicFormData) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
}

export default function AddClinicForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ClinicFormData>({
    // Step 1: Basic Information
    clinicName: '',
    email: '',
    phone: '',
    description: '',
    
    // Step 2: Location
    country: '',
    city: '',
    address: '',
    zipCode: '',
    
    // Step 3: Working Hours
    workingHours: {
      monday: { open: '09:00', close: '17:00', isOpen: true },
      tuesday: { open: '09:00', close: '17:00', isOpen: true },
      wednesday: { open: '09:00', close: '17:00', isOpen: true },
      thursday: { open: '09:00', close: '17:00', isOpen: true },
      friday: { open: '09:00', close: '17:00', isOpen: true },
      saturday: { open: '09:00', close: '13:00', isOpen: false },
      sunday: { open: '09:00', close: '13:00', isOpen: false },
    },
    
    // Step 4: Additional Info
    website: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    switch (currentStep) {
      case 1:
        if (!formData.clinicName.trim()) {
          newErrors.clinicName = 'Clinic name is required';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        }
        break;
        
      case 2:
        if (!formData.country.trim()) {
          newErrors.country = 'Country is required';
        }
        if (!formData.city.trim()) {
          newErrors.city = 'City is required';
        }
        if (!formData.address.trim()) {
          newErrors.address = 'Address is required';
        }
        break;
        
      case 3:
        // Validate working hours if needed
        Object.entries(formData.workingHours).forEach(([day, hours]) => {
          if (hours.isOpen) {
            if (!hours.open) {
              newErrors[`${day}Open`] = 'Opening time is required';
            }
            if (!hours.close) {
              newErrors[`${day}Close`] = 'Closing time is required';
            }
          }
        });
        break;
        
      case 4:
        // Validate website and social media URLs if provided
        const urlPattern = /^https?:\/\/.+/;
        if (formData.website && !urlPattern.test(formData.website)) {
          newErrors.website = 'Website must start with http:// or https://';
        }
        if (formData.socialMedia.facebook && !urlPattern.test(formData.socialMedia.facebook)) {
          newErrors.facebook = 'Facebook URL must start with http:// or https://';
        }
        if (formData.socialMedia.instagram && !urlPattern.test(formData.socialMedia.instagram)) {
          newErrors.instagram = 'Instagram URL must start with http:// or https://';
        }
        if (formData.socialMedia.twitter && !urlPattern.test(formData.socialMedia.twitter)) {
          newErrors.twitter = 'Twitter URL must start with http:// or https://';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit form data to your API
      console.log('Submitting form data:', formData);
      // await submitClinicData(formData);
      
      // Show success message
      alert('Clinic information submitted successfully!');
      
      // Reset form
      setFormData({
        clinicName: '',
        email: '',
        phone: '',
        description: '',
        country: '',
        city: '',
        address: '',
        zipCode: '',
        workingHours: {
          monday: { open: '09:00', close: '17:00', isOpen: true },
          tuesday: { open: '09:00', close: '17:00', isOpen: true },
          wednesday: { open: '09:00', close: '17:00', isOpen: true },
          thursday: { open: '09:00', close: '17:00', isOpen: true },
          friday: { open: '09:00', close: '17:00', isOpen: true },
          saturday: { open: '09:00', close: '13:00', isOpen: false },
          sunday: { open: '09:00', close: '13:00', isOpen: false },
        },
        website: '',
        socialMedia: {
          facebook: '',
          instagram: '',
          twitter: '',
        },
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit clinic data. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Clinic Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clinic Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.clinicName}
                  onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.clinicName ? 'border-red-300' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter Clinic Name"
                />
                {errors.clinicName && (
                  <p className="mt-1 text-sm text-red-500">{errors.clinicName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter Email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Add other fields similarly */}
            </div>

            {/* Navigation */}
            <div className="flex justify-end pt-6">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Add other steps similarly */}
      </form>
    </div>
  );
}