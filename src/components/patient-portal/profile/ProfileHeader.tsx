'use client';

import { Edit, Save, X, FileText, Calendar, Droplets } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PatientPortalProfileDto } from '@/lib/api/types/clinic-patient';
import { getBloodTypeLabel } from '@/utils/textUtils';
import { useState } from 'react';
import AvatarUpload from '@/components/common/AvatarUpload';
import { AttachmentDto } from '@/lib/api/types/attachment';

interface ProfileHeaderProps {
  patientData: PatientPortalProfileDto;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  formatDate: (dateString: string) => string;
  onImageChange?: (attachment: AttachmentDto) => void;
}

export function ProfileHeader({
  patientData,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  formatDate,
  onImageChange,
}: ProfileHeaderProps) {
  const { t } = useTranslation();
  const [avatarUrl, setAvatarUrl] = useState<string>(
    patientData.personalInfo?.imageUrl || '/avatars/patient.png'
  );

  const handleImageUploaded = (attachment: AttachmentDto) => {
    setAvatarUrl(attachment.previewUrl || '');
    if (onImageChange) {
      onImageChange(attachment);
    }
  };

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-4 border-primary/10 shadow-md">
                <AvatarImage
                  src={avatarUrl}
                  alt={patientData.personalInfo?.shortName}
                />
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                  {patientData.personalInfo?.shortName &&
                    patientData.personalInfo.shortName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .substring(0, 2)}
                </AvatarFallback>
              </Avatar>

              {isEditing && patientData.userId && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <AvatarUpload
                    entityId={patientData.userId}
                    onImageUploaded={handleImageUploaded}
                  />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">
                {patientData.personalInfo?.shortName}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <FileText className="h-4 w-4 text-primary/70" />
                <span>
                  {t('patientPortal.profile.header.medicalFileNumber')}:{' '}
                  {patientData.patientNumber}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-primary/5 flex items-center gap-1 px-2 py-1"
                >
                  <Calendar className="h-3.5 w-3.5 text-primary/70" />
                  {t('patientPortal.profile.header.registrationDate')}:{' '}
                  {formatDate(patientData.registrationDate)}
                </Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1 px-2 py-1">
                  <Droplets className="h-3.5 w-3.5" />
                  {t('patientPortal.profile.header.bloodType')}:{' '}
                  {getBloodTypeLabel(patientData.medicalInfo?.bloodType)}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  onClick={onSave}
                  className="flex items-center gap-1 shadow-sm"
                >
                  <Save className="h-4 w-4" />
                  {t('patientPortal.profile.header.saveChanges')}
                </Button>
                <Button
                  variant="outline"
                  onClick={onCancel}
                  className="flex items-center gap-1 border-border/50"
                >
                  <X className="h-4 w-4" />
                  {t('patientPortal.profile.header.cancel')}
                </Button>
              </>
            ) : (
              <Button
                onClick={onEdit}
                className="flex items-center gap-1 shadow-sm"
              >
                <Edit className="h-4 w-4" />
                {t('patientPortal.profile.header.editProfile')}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
