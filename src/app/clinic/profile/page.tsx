'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useRef, Suspense } from 'react';
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

  Percent,
} from 'lucide-react';
import PageLayout from '@/components/layouts/PageLayout';
import ClinicProfileSkeleton from '@/components/skeletons/ClinicProfileSkeleton';
import { getDayLabel, getInitials, GetStaffType } from '@/utils/textUtils';
import { useClinic } from '@/lib/api/hooks/useClinic';
import { ClinicDto } from '@/lib/api/types/clinic';
import Select from "react-select";
import { useSpecialty } from '@/lib/api/hooks/useSpecialty';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


const EditableField = dynamic(() => import('@/components/EditableField'), {
  ssr: false,
  loading: () => <div className="animate-pulse h-8 bg-gray-200 rounded"></div>,
});


function ClinicProfileContent() {


  const [isEditing, setIsEditing] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
  });
  const { useSpecialtiesDropdown: getSpecialtiesForDropdown } = useSpecialty();
  const { data: specialties } = getSpecialtiesForDropdown();


  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    discount: '',
    validUntil: '',
  });
  const { useClinicDetails, UpdateUserInf } = useClinic();
  const [userId, setUserId] = useState<string | null>(null);


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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.clinicInfo.id);
    }
  }, []);
  const { data, isLoading, error } = useClinicDetails(userId || '');
  const [editedData, setEditedData] = useState<ClinicDto>();




  const handleSave = () => {
    setIsEditing(false);
    console.log(editedData)
    if (editedData)
      UpdateUserInf(editedData);
  };

  const handleCancel = () => {
    setEditedData(data);
    setIsEditing(false);
  };

  // const addService = () => {
  //   if (newService.name && newService.description && newService.price) {
  //     setEditedData({
  //       ...editedData,
  //       services: [...editedData.services, newService],
  //     });
  //     setNewService({ name: '', description: '', price: '' });
  //   }
  // };

  // const removeService = (index: number) => {
  //   setEditedData({
  //     ...editedData,
  //     services: editedData.services.filter((_, i) => i !== index),
  //   });
  // };

  // const addSpecialty = () => {
  //   if (newSpecialty && editedData) {
  //     const results = editedData.specialtiess.find(item => item.trim().toLocaleLowerCase() == newSpecialty.trim().toLocaleLowerCase())
  //     if (results != undefined) {
  //       setErrorSpecialty(true)
  //       return;
  //     }
  //     setErrorSpecialty(false)

  //     setEditedData({
  //       ...editedData,
  //       specialtiess: [...editedData.specialtiess, newSpecialty.trim() || ""],
  //     });
  //     setNewSpecialty('');
  //   }
  // };


  // const addStaffMember = () => {
  //   if (
  //     newStaffMember.name &&
  //     newStaffMember.role &&
  //     newStaffMember.speciality &&
  //     editedData
  //   ) {
  //     setEditedData({
  //       ...editedData,
  //       staff: [
  //         ...editedData.staff,
  //         { ...newStaffMember, id: `staff-${Date.now()}` },
  //       ],
  //     });
  //     setNewStaffMember({
  //       id: '',
  //       name: '',
  //       role: '',
  //       image: '/images/staff/placeholder.jpg',
  //       speciality: '',
  //     });
  //   }
  // };

  // const removeStaffMember = (id: string) => {
  //   if (editedData)
  //     setEditedData({
  //       ...editedData,
  //       staffdto: editedData.staffdto.filter((member) => member.id !== id),
  //     });
  // };

  // const addOffer = () => {
  //   if (
  //     newOffer.title &&
  //     newOffer.description &&
  //     newOffer.discount &&
  //     newOffer.validUntil
  //   ) {
  //     setEditedData({
  //       ...editedData,
  //       offers: [...editedData.offers, newOffer],
  //     });
  //     setNewOffer({ title: '', description: '', discount: '', validUntil: '' });
  //   }
  // };

  // const removeOffer = (index: number) => {
  //   setEditedData({
  //     ...editedData,
  //     offers: editedData.offers.filter((_, i) => i !== index),
  //   });
  // };

  useEffect(() => {
    setEditedData(data)
  }, [data])
  if (isLoading) {
    return (
      <PageLayout>
        <ClinicProfileSkeleton />
      </PageLayout>
    );
  }

  if (data) {
    return (
      <PageLayout>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
            {isEditing && (
              <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-200">
                <Camera className="w-5 h-5" />
              </button>
            )}
          </div>
          <Card className="relative  px-6 pb-6 rounded-none" >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div className="flex items-end">
                <div className="relative -mt-16 mb-4">
                  {logoPreview ? (
                    <Image
                      src={logoPreview || ""}
                      alt="Clinic Logo"
                      width={112}
                      height={112}
                      className="rounded-2xl border-4 border-white shadow-sm object-cover"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-2xl border-4 border-white shadow-sm bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-3xl font-semibold text-white">
                        {getInitials(editedData?.name || "")}
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
                        <Camera className="w-4 h-4 " />
                      </button>
                    </>
                  )}
                </div>
                <div className="rtl:mr-4 ml-4">
                  {isEditing ? (
                    <EditableField
                      className='mt-3 mb-1'
                      value={editedData?.name || ""}
                      onChange={(value) => {
                        console.log(1)
                        if (editedData)
                          setEditedData({ ...editedData, name: value })
                      }
                      }
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-card-foreground">
                      {editedData?.name || ""}
                    </h1>
                  )}
                  <p className="text-foreground">Healthcare Provider</p>
                </div>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      variant="SaveButton"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outlinetow"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outlinetow"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="  shadow-sm "
            >
              <Card className='p-6 gap-0'>
                <h2 className="text-xl font-semibold mb-4 ">About</h2>
                {isEditing ? (
                  <EditableField
                    value={editedData?.bio || ""}
                    onChange={(value) => {
                      if (editedData)
                        setEditedData({ ...editedData, bio: value })
                    }
                    }
                    multiline
                  />
                ) : (
                  <p className=" leading-relaxed">
                    {editedData?.bio}
                  </p>
                )}
              </Card>
            </motion.div>

            {/* Services Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className=""
            >
              <Card className='p-6'>
                <h2 className="text-xl font-semibold mb-4 ">
                  Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* {editedData.services.map((service, index) => (
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
                          <h3 className="font-semibold ">
                            {service.name}
                          </h3>
                          <span className="text-blue-600 font-medium">
                            {service.price}
                          </span>
                        </div>
                        <p className=" text-sm">
                          {service.description}
                        </p>
                      </>
                    )}
                  </div>
                ))} */}
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
                        {/* <button
                        onClick={addService}
                        className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Service
                      </button> */}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Offers Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="shadow-md"
            >
              <Card className='p-6'>
                <h2 className="text-xl font-semibold mb-4 ">
                  Special Offers
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {/* {editedData.offers.map((offer, index) => (
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
                        <h3 className="text-lg font-medium ">
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
                      <p className=" text-sm">
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
                ))} */}
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
                        {/* <button
                        onClick={addOffer}
                        className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Offer
                      </button> */}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Staff Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className=""
            >
              <Card className='p-6'>

                <h2 className="text-xl font-semibold mb-4 ">
                  Medical Staff
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {editedData?.staffdto.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors duration-200"
                    >
                      <div className="relative">
                        {/* <Image
                        src={member.image}
                        alt={member.name}
                        width={64}
                        height={64}
                        className="rounded-full"
                      /> */}
                        {/* {isEditing && (
                        <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm border border-gray-200">
                          <Camera className="w-3 h-3 text-gray-600" />
                        </button>
                      )} */}
                      </div>
                      <div>
                        <h3 className="font-semibold ">
                          {member.name}
                        </h3>
                        <p className="text-foreground/50">{GetStaffType(member.staffType)}</p>
                        <p className="text-sm text-blue-600">
                          {member.specialty}
                        </p>
                      </div>
                      {/* )} */}
                    </div>
                  ))}

                </div>
              </Card>

            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="  shadow-sm "
            >
              <Card className='p-6 '>
                <h2 className="text-xl font-semibold mb-4 ">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <EditableField
                        value={editedData?.email || ""}
                        onChange={(value) => {
                          if (editedData) {
                            setEditedData({ ...editedData, email: value })
                          }
                        }
                        }
                        label="Email"
                      />
                      <EditableField
                        value={editedData?.phoneNumber || ""}
                        onChange={(value) => {
                          if (editedData) {

                            setEditedData({ ...editedData, phoneNumber: value })
                          }
                        }
                        }
                        label="Phone"
                      />
                      <EditableField
                        value={editedData?.address || ""}
                        onChange={(value) => {
                          if (editedData) {
                            setEditedData({ ...editedData, address: value })
                          }
                        }
                        }
                        label="Address"
                      />
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-foreground ">
                          Social Media
                        </h3>
                        {/* <EditableField
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
                      /> */}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-foreground/50">Email</p>
                          <p className="">{editedData?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-foreground/50">Phone</p>
                          <p className="">{editedData?.phoneNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-foreground/50">Address</p>
                          <p className="">{editedData?.address}</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm text-foreground mb-3">Social Media</p>
                        <div className="flex gap-3">
                          {/* {editedData.socialMedia.website && (
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
                        )} */}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className=" shadow-sm "
            >
              <Card className='p-6'>
                <h2 className="text-xl font-semibold mb-4 ">
                  Business Hours
                </h2>
                <div className="space-y-3">
                  {editedData?.workingHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      {isEditing ? (
                        <>
                          <span className="">{getDayLabel(schedule.day).slice(0, 6)}{getDayLabel(schedule.day).length > 6 ? "..." : ""}</span>

                          <div className='flex gap-2  justify-end  w-4/5 overflow-hidden'>
                            <EditableField
                              istime
                              className='w-[90%]'
                              value={schedule.openTime.slice(0, 5)}
                              onChange={(value) => {
                                if (editedData) {
                                  const updatedWorkingHours = editedData.workingHours.map((wh) =>
                                    wh.day === schedule.day
                                      ? { ...wh, openTime: normalizeTimeInput(value) }
                                      : wh
                                  );
                                  setEditedData({
                                    ...editedData,
                                    workingHours: updatedWorkingHours
                                  });
                                }
                              }}

                            />
                            <EditableField
                              istime
                              className='w-[90%]'
                              value={schedule.closeTime.slice(0, 5)}

                              onChange={(value) => {
                                if (editedData) {
                                  const updatedWorkingHours = editedData.workingHours.map((wh) =>
                                    wh.day === schedule.day
                                      ? { ...wh, closeTime: normalizeTimeInput(value) }
                                      : wh
                                  );
                                  setEditedData({
                                    ...editedData,
                                    workingHours: updatedWorkingHours
                                  });
                                }
                              }}

                            />
                          </div>

                        </>
                      ) : (
                        <>
                          <span className="">{getDayLabel(schedule.day)}</span>
                          <span className=" font-medium">
                            {schedule.openTime?.slice(0, 5)}
                            -
                            {schedule.closeTime?.slice(0, 5)}

                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Specialties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="shadow-sm"
            >
              <Card className=' p-6'>
                <h2 className="text-xl font-semibold mb-4 ">
                  Specialties
                </h2>
                <div className="flex flex-wrap gap-2">

                  {isEditing || editedData?.specialtiess.map((specialty) => (
                    <Badge
                      key={specialty.id}
                      className='text-white'
                    >
                      {specialty.specialties}

                    </Badge>
                  ))}
                  {isEditing && (
                    <>
                      <div className="flex gap-2 items-center">
                        <Select
                          isMulti
                          options={Array.isArray(specialties) ? specialties : []}
                          value={
                            Array.isArray(specialties) && Array.isArray(editedData?.specialtiess)
                              ? specialties.filter(opt => editedData.specialtiess.some(s => s.specialties === opt.label))
                              : []
                          }
                          onChange={(selected) => {
                            if (editedData) {
                              setEditedData({
                                ...editedData,
                                specialtiess: Array.isArray(selected)
                                  ? selected.map(opt => ({ id: crypto.randomUUID(), specialties: opt.label }))
                                  : [],
                              });
                            }
                          }}
                          placeholder="اختر أو اكتب فئات التجارة"
                          className="w-full"
                          classNamePrefix="select"
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              borderRadius: '0.75rem',
                              borderColor: state.isFocused ? '#2563eb' : '#e5e7eb',
                              boxShadow: state.isFocused ? '0 0 0 1px #2563eb' : 'none',
                              minHeight: '2.5rem',
                              background: 'var(--Card)'
                            }),
                            option: (base, state) => ({
                              ...base,
                              backgroundColor: state.isSelected
                                ? '#dbeafe'
                                : state.isFocused
                                  ? '#f1f5f9'
                                  : 'white',
                              color: state.isSelected ? '#2563eb' : '#1e293b',
                              padding: '0.5rem 1rem',
                            }),
                            multiValue: (base) => ({
                              ...base,
                              backgroundColor: '#dbeafe',

                              color: '#2563eb',
                              borderRadius: '9999px',
                              padding: '0 0.5rem',
                            }),
                            multiValueLabel: (base) => ({
                              ...base,
                              color: '#2563eb',
                            }),
                            multiValueRemove: (base) => ({
                              ...base,
                              color: '#2563eb',

                              transition: '.5s',
                              ':hover': {
                                backgroundColor: '#2563eb',
                                color: 'white',
                              },
                            }),
                          }}
                          noOptionsMessage={() => "لا توجد خيارات"}
                        />

                      </div>
                    </>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </PageLayout>
    );
  }
  if (error) return <div>Error: {error.message}</div>;


}

export default function ClinicProfile() {
  return (
    <Suspense fallback={<ClinicProfileSkeleton />}>
      <ClinicProfileContent />
    </Suspense>
  );
}

const normalizeTimeInput = (input: string) => {
  // Remove any whitespace
  input = input.trim();
  // If input is just a number (e.g., "7" or "12"), convert to "07:00" or "12:00"
  if (/^\d{1,2}$/.test(input)) {
    return input.padStart(2, '0') + ':00';
  }
  // If input is "7:30" or "12:15", pad hour if needed
  if (/^\d{1,2}:\d{2}$/.test(input)) {
    const [h, m] = input.split(':');
    return h.padStart(2, '0') + ':' + m;
  }
  // Otherwise, return as is
  return input;
};
