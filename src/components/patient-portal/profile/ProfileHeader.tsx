'use client';

import { Edit, Save, X, FileText, Calendar, Droplets } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ProfileHeaderProps {
  patientData: {
    name: string;
    medicalFileNumber: string;
    registrationDate: string;
    bloodType: string;
  };
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  formatDate: (dateString: string) => string;
}

export function ProfileHeader({ 
  patientData, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  formatDate 
}: ProfileHeaderProps) {
  const { t } = useTranslation();

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-card/80 shadow-md border border-border/50">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24 border-4 border-primary/10 shadow-md">
              <AvatarImage
                src="/avatars/patient.png"
                alt={patientData.name}
              />
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                {patientData.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">
                {patientData.name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <FileText className="h-4 w-4 text-primary/70" />
                <span>{t('patientPortal.profile.header.medicalFileNumber')}: {patientData.medicalFileNumber}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-primary/5 flex items-center gap-1 px-2 py-1"
                >
                  <Calendar className="h-3.5 w-3.5 text-primary/70" />
                  {t('patientPortal.profile.header.registrationDate')}: {formatDate(patientData.registrationDate)}
                </Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1 px-2 py-1">
                  <Droplets className="h-3.5 w-3.5" />
                  {t('patientPortal.profile.header.bloodType')}: {patientData.bloodType}
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
