import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Doctor, CreateDoctorDto, UpdateDoctorDto } from '../types/doctor';

export const doctorService = {
  getAll: () => {
    return apiClient.get<Doctor[]>(API_ENDPOINTS.doctors.list);
  },

  getById: (id: string) => {
    return apiClient.get<Doctor>(API_ENDPOINTS.doctors.details(id));
  },

  create: (data: CreateDoctorDto) => {
    return apiClient.post<Doctor>(API_ENDPOINTS.doctors.create, data);
  },

  update: (id: string, data: UpdateDoctorDto) => {
    return apiClient.put<Doctor>(API_ENDPOINTS.doctors.update(id), data);
  },

  delete: (id: string) => {
    return apiClient.delete(API_ENDPOINTS.doctors.delete(id));
  },
};
