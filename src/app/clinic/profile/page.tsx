'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Edit,
  Camera,
  Save,
  X,
  Plus,
  Trash2,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Globe,
  Percent,
} from 'lucide-react';
import PageLayout from '@/components/layouts/PageLayout';
import ClinicProfileSkeleton from '@/components/skeletons/ClinicProfileSkeleton';
import { getInitials } from '@/utils/textUtils';

interface ClinicInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  hours: {
    day: string;
    hours: string;
  }[];
  about: string;
  specialties: string[];
  staff: {
    id: string;
    name: string;
    role: string;
    image: string;
    speciality: string;
  }[];
  services: {
    name: string;
    description: string;
    price: string;
  }[];
  offers: {
    title: string;
    description: string;
    discount: string;
    validUntil: string;
  }[];
  socialMedia: {
    website: string;
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
}

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  multiline?: boolean;
  className?: string;
}

const EditableField = ({
  value,
  onChange,
  label,
  multiline,
  className,
}: EditableFieldProps) => {
  if (multiline) {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm text-gray-600">{label}</label>
        )}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`text-gray-400 w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
          rows={4}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm text-gray-600">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`text-gray-400 w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      />
    </div>
  );
};

// Mock data - replace with actual API call
const initialData: ClinicInfo = {
  name: 'HealthCare Plus Clinic',
  email: 'contact@healthcareplus.com',
  phone: '+1 (555) 123-4567',
  address: '123 Medical Center Drive, Suite 100, San Francisco, CA 94105',
  hours: [
    { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  about:
    'HealthCare Plus Clinic is a state-of-the-art medical facility providing comprehensive healthcare services. Our team of experienced medical professionals is dedicated to delivering personalized care with the latest medical technologies.',
  specialties: [
    'Family Medicine',
    'Pediatrics',
    'Internal Medicine',
    'Cardiology',
    'Dermatology',
  ],
  staff: [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      role: 'Medical Director',
      image: '/images/staff/doctor1.jpg',
      speciality: 'Internal Medicine',
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      role: 'Senior Physician',
      image: '/images/staff/doctor2.jpg',
      speciality: 'Pediatrics',
    },
    // Add more staff members
  ],
  services: [
    {
      name: 'General Consultation',
      description: 'Comprehensive medical consultation and examination',
      price: '$150',
    },
    {
      name: 'Pediatric Care',
      description: 'Specialized healthcare for children and adolescents',
      price: '$175',
    },
    // Add more services
  ],
  offers: [
    {
      title: 'Summer Health Check',
      description:
        'Complete health checkup including blood work, ECG, and consultation.',
      discount: '20',
      validUntil: '2025-08-31',
    },
    {
      title: 'Family Package',
      description:
        'Health checkup for family of 4, including dental cleaning and eye examination.',
      discount: '25',
      validUntil: '2025-06-30',
    },
    {
      title: 'Senior Care',
      description:
        'Specialized health package for seniors including bone density test and cardiac evaluation.',
      discount: '15',
      validUntil: '2025-12-31',
    },
  ],
  socialMedia: {
    website: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
  },
};

export default function ClinicProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<ClinicInfo>(initialData);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newStaffMember, setNewStaffMember] = useState({
    id: '',
    name: '',
    role: '',
    image: '/images/staff/placeholder.jpg',
    speciality: '',
  });
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    discount: '',
    validUntil: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);

      // Here you would typically upload the file to your server
      // For now, we'll just update the preview
      // const formData = new FormData();
      // formData.append('logo', file);
      // await uploadLogo(formData);
    }
  };

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      try {
        // Replace this with your actual API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSave = () => {
    // TODO: Implement API call to save changes
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(initialData);
    setIsEditing(false);
  };

  const addService = () => {
    if (newService.name && newService.description && newService.price) {
      setEditedData({
        ...editedData,
        services: [...editedData.services, newService],
      });
      setNewService({ name: '', description: '', price: '' });
    }
  };

  const removeService = (index: number) => {
    setEditedData({
      ...editedData,
      services: editedData.services.filter((_, i) => i !== index),
    });
  };

  const addSpecialty = () => {
    if (newSpecialty) {
      setEditedData({
        ...editedData,
        specialties: [...editedData.specialties, newSpecialty],
      });
      setNewSpecialty('');
    }
  };

  const removeSpecialty = (specialty: string) => {
    setEditedData({
      ...editedData,
      specialties: editedData.specialties.filter((s) => s !== specialty),
    });
  };

  const addStaffMember = () => {
    if (
      newStaffMember.name &&
      newStaffMember.role &&
      newStaffMember.speciality
    ) {
      setEditedData({
        ...editedData,
        staff: [
          ...editedData.staff,
          { ...newStaffMember, id: `staff-${Date.now()}` },
        ],
      });
      setNewStaffMember({
        id: '',
        name: '',
        role: '',
        image: '/images/staff/placeholder.jpg',
        speciality: '',
      });
    }
  };

  const removeStaffMember = (id: string) => {
    setEditedData({
      ...editedData,
      staff: editedData.staff.filter((member) => member.id !== id),
    });
  };

  const addOffer = () => {
    if (
      newOffer.title &&
      newOffer.description &&
      newOffer.discount &&
      newOffer.validUntil
    ) {
      setEditedData({
        ...editedData,
        offers: [...editedData.offers, newOffer],
      });
      setNewOffer({ title: '', description: '', discount: '', validUntil: '' });
    }
  };

  const removeOffer = (index: number) => {
    setEditedData({
      ...editedData,
      offers: editedData.offers.filter((_, i) => i !== index),
    });
  };

  if (isLoading) {
    return (
      <PageLayout>
        <ClinicProfileSkeleton />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
          {isEditing && (
            <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-200">
              <Camera className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="relative px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="flex items-end">
              <div className="relative -mt-16 mb-4">
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Clinic Logo"
                    width={112}
                    height={112}
                    className="rounded-2xl border-4 border-white shadow-sm object-cover"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-2xl border-4 border-white shadow-sm bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-3xl font-semibold text-white">
                      {getInitials(editedData.name)}
                    </span>
                  </div>
                )}
                {isEditing && (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm border border-gray-200 hover:bg-gray-50"
                    >
                      <Camera className="w-4 h-4 text-gray-600" />
                    </button>
                  </>
                )}
              </div>
              <div className="ml-4">
                {isEditing ? (
                  <EditableField
                    value={editedData.name}
                    onChange={(value) =>
                      setEditedData({ ...editedData, name: value })
                    }
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">
                    {editedData.name}
                  </h1>
                )}
                <p className="text-gray-600">Healthcare Provider</p>
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900">About</h2>
            {isEditing ? (
              <EditableField
                value={editedData.about}
                onChange={(value) =>
                  setEditedData({ ...editedData, about: value })
                }
                multiline
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {editedData.about}
              </p>
            )}
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {editedData.services.map((service, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors duration-200"
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <EditableField
                        value={service.name}
                        onChange={(value) =>
                          setEditedData({
                            ...editedData,
                            services: editedData.services.map((s, i) =>
                              i === index ? { ...s, name: value } : s
                            ),
                          })
                        }
                        label="Service Name"
                      />
                      <EditableField
                        value={service.description}
                        onChange={(value) =>
                          setEditedData({
                            ...editedData,
                            services: editedData.services.map((s, i) =>
                              i === index ? { ...s, description: value } : s
                            ),
                          })
                        }
                        label="Description"
                      />
                      <EditableField
                        value={service.price}
                        onChange={(value) =>
                          setEditedData({
                            ...editedData,
                            services: editedData.services.map((s, i) =>
                              i === index ? { ...s, price: value } : s
                            ),
                          })
                        }
                        label="Price"
                      />
                      <button
                        onClick={() => removeService(index)}
                        className="text-red-500 hover:text-red-600 flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove Service
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {service.name}
                        </h3>
                        <span className="text-blue-600 font-medium">
                          {service.price}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {service.description}
                      </p>
                    </>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="p-4 rounded-xl border-2 border-dashed border-gray-200">
                  <div className="space-y-3">
                    <EditableField
                      value={newService.name}
                      onChange={(value) =>
                        setNewService({ ...newService, name: value })
                      }
                      label="Service Name"
                    />
                    <EditableField
                      value={newService.description}
                      onChange={(value) =>
                        setNewService({ ...newService, description: value })
                      }
                      label="Description"
                    />
                    <EditableField
                      value={newService.price}
                      onChange={(value) =>
                        setNewService({ ...newService, price: value })
                      }
                      label="Price"
                    />
                    <button
                      onClick={addService}
                      className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Service
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Offers Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Special Offers
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {editedData.offers.map((offer, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-xl hover:border-blue-200 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    {isEditing ? (
                      <EditableField
                        value={offer.title}
                        onChange={(value) => {
                          const newOffers = [...editedData.offers];
                          newOffers[index] = { ...offer, title: value };
                          setEditedData({ ...editedData, offers: newOffers });
                        }}
                        label="Offer Title"
                      />
                    ) : (
                      <h3 className="text-lg font-medium text-gray-900">
                        {offer.title}
                      </h3>
                    )}
                    <div className="text-right">
                      {isEditing ? (
                        <div className="relative">
                          <Percent className="mt-3 absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <EditableField
                            value={offer.discount}
                            onChange={(value) => {
                              const newOffers = [...editedData.offers];
                              newOffers[index] = { ...offer, discount: value };
                              setEditedData({
                                ...editedData,
                                offers: newOffers,
                              });
                            }}
                            label="Discount"
                            className="pl-8"
                          />
                        </div>
                      ) : (
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
                          <Percent className="w-4 h-4 mr-1" />
                          <span className="font-medium">
                            {offer.discount} OFF
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {isEditing ? (
                    <EditableField
                      value={offer.validUntil}
                      onChange={(value) => {
                        const newOffers = [...editedData.offers];
                        newOffers[index] = { ...offer, validUntil: value };
                        setEditedData({ ...editedData, offers: newOffers });
                      }}
                      label="Valid Until"
                    />
                  ) : (
                    <p className="text-gray-600 text-sm">
                      Valid until {offer.validUntil}
                    </p>
                  )}
                  {isEditing ? (
                    <EditableField
                      value={offer.description}
                      onChange={(value) => {
                        const newOffers = [...editedData.offers];
                        newOffers[index] = { ...offer, description: value };
                        setEditedData({ ...editedData, offers: newOffers });
                      }}
                      label="Description"
                      multiline
                    />
                  ) : (
                    <p className="text-gray-600 mt-2">{offer.description}</p>
                  )}
                  {isEditing && (
                    <button
                      onClick={() => removeOffer(index)}
                      className="mt-2 text-sm text-red-600 hover:text-red-700"
                    >
                      Remove Offer
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="p-4 rounded-xl border-2 border-dashed border-gray-200">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start mb-2">
                      <EditableField
                        value={newOffer.title}
                        onChange={(value) =>
                          setNewOffer({ ...newOffer, title: value })
                        }
                        label="Offer Title"
                      />

                      <div className="text-right">
                        <div className="relative">
                          <Percent className="mt-3 absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <EditableField
                            value={newOffer.discount}
                            onChange={(value) =>
                              setNewOffer({ ...newOffer, discount: value })
                            }
                            label="Discount"
                            className="pl-8"
                          />
                        </div>
                      </div>
                    </div>

                    <EditableField
                      value={newOffer.validUntil}
                      onChange={(value) =>
                        setNewOffer({ ...newOffer, validUntil: value })
                      }
                      label="Valid Until"
                    />

                    <EditableField
                      value={newOffer.description}
                      onChange={(value) =>
                        setNewOffer({ ...newOffer, description: value })
                      }
                      label="Description"
                      multiline
                    />
                    <button
                      onClick={addOffer}
                      className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Offer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Staff Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Medical Staff
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {editedData.staff.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors duration-200"
                >
                  <div className="relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm border border-gray-200">
                        <Camera className="w-3 h-3 text-gray-600" />
                      </button>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="flex-1 space-y-2">
                      <EditableField
                        value={member.name}
                        onChange={(value) =>
                          setEditedData({
                            ...editedData,
                            staff: editedData.staff.map((s) =>
                              s.id === member.id ? { ...s, name: value } : s
                            ),
                          })
                        }
                        label="Name"
                      />
                      <EditableField
                        value={member.role}
                        onChange={(value) =>
                          setEditedData({
                            ...editedData,
                            staff: editedData.staff.map((s) =>
                              s.id === member.id ? { ...s, role: value } : s
                            ),
                          })
                        }
                        label="Role"
                      />
                      <EditableField
                        value={member.speciality}
                        onChange={(value) =>
                          setEditedData({
                            ...editedData,
                            staff: editedData.staff.map((s) =>
                              s.id === member.id
                                ? { ...s, speciality: value }
                                : s
                            ),
                          })
                        }
                        label="Speciality"
                      />
                      <button
                        onClick={() => removeStaffMember(member.id)}
                        className="text-red-500 hover:text-red-600 flex items-center gap-1 mt-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove Staff Member
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-gray-600">{member.role}</p>
                      <p className="text-sm text-blue-600">
                        {member.speciality}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="p-4 rounded-xl border-2 border-dashed border-gray-200">
                  <div className="space-y-3">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <Image
                          src={newStaffMember.image}
                          alt="New staff member"
                          width={64}
                          height={64}
                          className="rounded-full"
                        />
                        <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm border border-gray-200">
                          <Camera className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <EditableField
                      value={newStaffMember.name}
                      onChange={(value) =>
                        setNewStaffMember({ ...newStaffMember, name: value })
                      }
                      label="Name"
                    />
                    <EditableField
                      value={newStaffMember.role}
                      onChange={(value) =>
                        setNewStaffMember({ ...newStaffMember, role: value })
                      }
                      label="Role"
                    />
                    <EditableField
                      value={newStaffMember.speciality}
                      onChange={(value) =>
                        setNewStaffMember({
                          ...newStaffMember,
                          speciality: value,
                        })
                      }
                      label="Speciality"
                    />
                    <button
                      onClick={addStaffMember}
                      className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Staff Member
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Contact Information
            </h2>
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <EditableField
                    value={editedData.email}
                    onChange={(value) =>
                      setEditedData({ ...editedData, email: value })
                    }
                    label="Email"
                  />
                  <EditableField
                    value={editedData.phone}
                    onChange={(value) =>
                      setEditedData({ ...editedData, phone: value })
                    }
                    label="Phone"
                  />
                  <EditableField
                    value={editedData.address}
                    onChange={(value) =>
                      setEditedData({ ...editedData, address: value })
                    }
                    label="Address"
                  />
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-700">
                      Social Media
                    </h3>
                    <EditableField
                      value={editedData.socialMedia.website}
                      onChange={(value) =>
                        setEditedData({
                          ...editedData,
                          socialMedia: {
                            ...editedData.socialMedia,
                            website: value,
                          },
                        })
                      }
                      label="Website"
                    />
                    <EditableField
                      value={editedData.socialMedia.facebook}
                      onChange={(value) =>
                        setEditedData({
                          ...editedData,
                          socialMedia: {
                            ...editedData.socialMedia,
                            facebook: value,
                          },
                        })
                      }
                      label="Facebook"
                    />
                    <EditableField
                      value={editedData.socialMedia.instagram}
                      onChange={(value) =>
                        setEditedData({
                          ...editedData,
                          socialMedia: {
                            ...editedData.socialMedia,
                            instagram: value,
                          },
                        })
                      }
                      label="Instagram"
                    />
                    <EditableField
                      value={editedData.socialMedia.twitter}
                      onChange={(value) =>
                        setEditedData({
                          ...editedData,
                          socialMedia: {
                            ...editedData.socialMedia,
                            twitter: value,
                          },
                        })
                      }
                      label="Twitter"
                    />
                    <EditableField
                      value={editedData.socialMedia.linkedin}
                      onChange={(value) =>
                        setEditedData({
                          ...editedData,
                          socialMedia: {
                            ...editedData.socialMedia,
                            linkedin: value,
                          },
                        })
                      }
                      label="LinkedIn"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-gray-900">{editedData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-gray-900">{editedData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="text-gray-900">{editedData.address}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-600 mb-3">Social Media</p>
                    <div className="flex gap-3">
                      {editedData.socialMedia.website && (
                        <a
                          href={editedData.socialMedia.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
                      {editedData.socialMedia.facebook && (
                        <a
                          href={editedData.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Facebook className="w-5 h-5" />
                        </a>
                      )}
                      {editedData.socialMedia.instagram && (
                        <a
                          href={editedData.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                      {editedData.socialMedia.twitter && (
                        <a
                          href={editedData.socialMedia.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                      {editedData.socialMedia.linkedin && (
                        <a
                          href={editedData.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Business Hours
            </h2>
            <div className="space-y-3">
              {editedData.hours.map((schedule, index) => (
                <div key={schedule.day} className="flex justify-between">
                  {isEditing ? (
                    <>
                      <EditableField
                        value={schedule.day}
                        onChange={(value) =>
                          setEditedData({
                            ...editedData,
                            hours: editedData.hours.map((h, i) =>
                              i === index ? { ...h, day: value } : h
                            ),
                          })
                        }
                      />
                      <EditableField
                        value={schedule.hours}
                        onChange={(value) =>
                          setEditedData({
                            ...editedData,
                            hours: editedData.hours.map((h, i) =>
                              i === index ? { ...h, hours: value } : h
                            ),
                          })
                        }
                      />
                    </>
                  ) : (
                    <>
                      <span className="text-gray-600">{schedule.day}</span>
                      <span className="text-gray-900 font-medium">
                        {schedule.hours}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Specialties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Specialties
            </h2>
            <div className="flex flex-wrap gap-2">
              {editedData.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm group relative"
                >
                  {specialty}
                  {isEditing && (
                    <button
                      onClick={() => removeSpecialty(specialty)}
                      className="ml-2 text-blue-400 hover:text-blue-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
              {isEditing && (
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    placeholder="Add specialty"
                    className="px-3 py-1 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={addSpecialty}
                    className="p-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
