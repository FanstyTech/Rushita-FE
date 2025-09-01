import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import Cookies from 'js-cookie';

import type { ApiResponse } from '../types/api';
import type {
  AttachmentDto,
  CreateAttachmentDto,
  EntityType,
  CreateMultipleAttachmentsDto,
  FileUploadProgress,
} from '../types/attachment';

function appendFormData(
  dto: Partial<CreateAttachmentDto | CreateMultipleAttachmentsDto>,
  files?: File[]
): FormData {
  const formData = new FormData();

  if (files) {
    files.forEach((file) => formData.append('files', file));
  } else if ('file' in dto && dto.file) {
    formData.append('file', dto.file);
  }

  if (dto.entityId) formData.append('entityId', dto.entityId);
  if (dto.entityType) formData.append('entityType', dto.entityType.toString());
  if (dto.uploadedBy) formData.append('uploadedBy', dto.uploadedBy);
  if (dto.description) formData.append('description', dto.description);
  if (dto.specificPath) formData.append('specificPath', dto.specificPath);

  return formData;
}

function handleUploadProgress(
  onProgress?: (progress: FileUploadProgress) => void
) {
  return (event: ProgressEvent) => {
    if (onProgress && event.total) {
      onProgress({
        loaded: event.loaded,
        total: event.total,
        percentage: Math.round((event.loaded * 100) / event.total),
      });
    }
  };
}

export const attachmentService = {
  async getById(id: string): Promise<ApiResponse<AttachmentDto>> {
    return apiClient.get(API_ENDPOINTS.ATTACHMENT.GET_BY_ID.replace(':id', id));
  },

  async getByEntity(
    entityId: string,
    entityType: EntityType
  ): Promise<ApiResponse<AttachmentDto[]>> {
    return apiClient.get(API_ENDPOINTS.ATTACHMENT.GET_BY_ENTITY, {
      params: { entityId, entityType: entityType.toString() },
    });
  },

  async upload(
    dto: CreateAttachmentDto,
    onProgress?: (progress: FileUploadProgress) => void
  ): Promise<ApiResponse<AttachmentDto>> {
    const formData = appendFormData(dto);
    const token = Cookies.get('auth-token');
    return apiClient.post(API_ENDPOINTS.ATTACHMENT.UPLOAD, formData, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      onUploadProgress: handleUploadProgress(onProgress),
    });
  },

  async uploadMultiple(
    files: File[],
    dto: Omit<CreateMultipleAttachmentsDto, 'files'>,
    onProgress?: (progress: FileUploadProgress) => void
  ): Promise<ApiResponse<AttachmentDto[]>> {
    const formData = appendFormData(dto, files);
    const token = Cookies.get('auth-token');

    return apiClient.post(API_ENDPOINTS.ATTACHMENT.UPLOAD_MULTIPLE, formData, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      onUploadProgress: handleUploadProgress(onProgress),
    });
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(API_ENDPOINTS.ATTACHMENT.DELETE, {
      id,
    });
  },

  async download(id: string): Promise<Blob> {
    return apiClient.get(API_ENDPOINTS.ATTACHMENT.DOWNLOAD, {
      params: { id },
      // responseType: 'blob',
    });
  },

  async getUrl(id: string): Promise<ApiResponse<string>> {
    return apiClient.get(API_ENDPOINTS.ATTACHMENT.GET_URL, { params: { id } });
  },

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  },

  getFileIcon(contentType: string): string {
    if (contentType.startsWith('image/')) return '';
    if (contentType.includes('pdf')) return '';
    if (contentType.includes('word') || contentType.includes('document'))
      return '';
    if (contentType.includes('excel') || contentType.includes('spreadsheet'))
      return '';
    if (
      contentType.includes('powerpoint') ||
      contentType.includes('presentation')
    )
      return '';
    if (contentType.includes('zip') || contentType.includes('rar')) return '';
    return '';
  },

  validateFile(file: File, maxSize?: number, allowedTypes?: string[]): void {
    if (maxSize && file.size > maxSize) {
      throw new Error(
        `File exceeds max size of ${this.formatFileSize(maxSize)}`
      );
    }

    if (
      allowedTypes &&
      !allowedTypes.some((type) => {
        return type.endsWith('/*')
          ? file.type.startsWith(type.slice(0, -1))
          : file.type === type;
      })
    ) {
      throw new Error(`File type ${file.type} is not allowed`);
    }
  },
};
