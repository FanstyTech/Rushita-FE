export enum EntityType {
  User = 1,
  Clinic,
  Visit,
  VisitLabTest,
  VisitRadiologyTest,
}

export interface AttachmentDto {
  id: string;
  fileName: string;
  storageFileName: string;
  contentType: string;
  fileSize: number;
  entityId: string;
  entityType: EntityType;
  description?: string;
  createdBy: string;
  createdAt: string;
  downloadUrl?: string;
  previewUrl?: string;
}

export interface CreateAttachmentDto {
  file: File;
  entityId: string;
  entityType: EntityType;
  description?: string;
  uploadedBy?: string;
  specificPath?: string;
  isTemp: boolean;
}

export interface CreateMultipleAttachmentsDto {
  files: File[];
  entityId: string;
  entityType: EntityType;
  description?: string;
  uploadedBy: string;
  specificPath?: string;
  isTemp: boolean;
}

export interface AttachmentFilterDto {
  entityId?: string;
  entityType?: EntityType;
  pageNumber?: number;
  pageSize?: number;
}

// File upload progress tracking interface
export interface FileUploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}
