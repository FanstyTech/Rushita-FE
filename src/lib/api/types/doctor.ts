export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  address?: string;
  imageUrl?: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDoctorDto {
  name: string;
  specialization: string;
  email: string;
  phone: string;
  address?: string;
  imageUrl?: string;
}

export interface UpdateDoctorDto extends Partial<CreateDoctorDto> {
  specialization: string;
}
