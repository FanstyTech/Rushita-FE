import React from 'react';
import { Upload } from 'lucide-react';
import { useAttachment } from '@/lib/api/hooks/useAttachment';
import { EntityType } from '@/lib/api/types/attachment';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { AttachmentDto } from '@/lib/api/types/attachment';

interface AvatarUploadProps {
  entityId: string;
  onImageUploaded: (attachment: AttachmentDto) => void;
  className?: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  entityId,
  onImageUploaded,
  className = '',
}) => {
  const { t } = useTranslation();
  const { uploadFile } = useAttachment();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error(
        t(
          'common.errors.invalidImageType',
          'Invalid image type. Please use JPEG, PNG, GIF or WEBP.'
        )
      );
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error(
        t(
          'common.errors.imageTooLarge',
          'Image is too large. Maximum size is 5MB.'
        )
      );
      return;
    }

    const result = await uploadFile.mutateAsync({
      file,
      createDto: {
        entityId,
        entityType: EntityType.User,
        isTemp: false,
        description: 'Profile Avatar',
      },
    });

    if (result && result.id) {
      onImageUploaded(result);
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <label
        htmlFor="avatar-upload"
        className={`
          flex items-center justify-center rounded-full 
          bg-black/50 w-full h-full cursor-pointer
          hover:bg-black/70 transition-colors
          ${uploadFile.isPending ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <Upload className="h-8 w-8 text-white" />
        <input
          id="avatar-upload"
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploadFile.isPending}
        />
      </label>
    </div>
  );
};

export default AvatarUpload;
