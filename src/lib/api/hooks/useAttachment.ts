import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { attachmentService } from '../services/attachment.service';
import { toast } from '@/components/ui/Toast';
import type {
  CreateAttachmentDto,
  CreateMultipleAttachmentsDto,
  EntityType,
  FileUploadProgress,
  AttachmentDto,
} from '../types/attachment';

export function useAttachment() {
  const queryClient = useQueryClient();

  const ATTACHMENTS_QUERY_KEY = 'attachments';

  const invalidateAttachments = () =>
    queryClient.invalidateQueries({ queryKey: [ATTACHMENTS_QUERY_KEY] });

  const handleSuccess = (message: string, invalidate = true) => {
    toast.success(message);
    if (invalidate) invalidateAttachments();
  };

  const handleError = (error: unknown) => {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    toast.error(message);
  };

  const getAttachments = (entityId: string, entityType: EntityType) =>
    useQuery({
      queryKey: [ATTACHMENTS_QUERY_KEY, entityId, entityType],
      queryFn: async () => {
        const { success, result, message } =
          await attachmentService.getByEntity(entityId, entityType);

        if (!success) throw new Error(message || 'Failed to fetch attachments');
        return result;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

  const uploadFile = useMutation({
    mutationFn: async ({
      file,
      createDto,
      onProgress,
    }: {
      file: File;
      createDto: Omit<CreateAttachmentDto, 'file'>;
      onProgress?: (progress: FileUploadProgress) => void;
    }): Promise<AttachmentDto | null> => {
      const response = await attachmentService.upload(
        { ...createDto, file },
        onProgress
      );
      if (!response.success) {
        throw new Error(response.message || 'Failed to upload file');
      }
      return response.result;
    },
    onSuccess: () => handleSuccess('File uploaded successfully'),
    onError: handleError,
  });

  const uploadMultipleFiles = useMutation({
    mutationFn: async ({
      files,
      createDto,
      onProgress,
    }: {
      showSuccessMsg: boolean;
      files: File[];
      createDto: Omit<CreateMultipleAttachmentsDto, 'files'>;
      onProgress?: (progress: FileUploadProgress) => void;
    }) => {
      const response = await attachmentService.uploadMultiple(
        files,
        createDto,
        onProgress
      );
      if (!response.success) {
        throw new Error(response.message || 'Failed to upload files');
      }
      return response.result;
    },
    onSuccess: (data) => {
      const count = data?.length || 0;
      handleSuccess(
        `${count} file${count === 1 ? '' : 's'} uploaded successfully`
      );
    },
    onError: handleError,
  });

  const deleteAttachment = useMutation({
    mutationFn: async ({
      id,
    }: {
      id: string;
    }) => {
      const response = await attachmentService.delete(id);
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete attachment');
      }
      return response.result;
    },
    onSuccess: () => handleSuccess('Attachment deleted successfully'),
    onError: handleError,
  });

  const downloadAttachment = useMutation({
    mutationFn: (id: string) => attachmentService.download(id),
    onError: handleError,
  });

  return {
    getAttachments,
    uploadFile,
    uploadMultipleFiles,
    deleteAttachment,
    downloadAttachment,
  };
}
