'use client';

import {
  Search,
  Stethoscope,
  Filter,
  X,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input, Select } from '@/components/common/form';
import { SelectOption } from '@/lib/api/types/select-option';
import { AppointmentStatus } from '@/lib/api/types/appointment';
import { getAppointmentStatusStyle } from '@/utils/textUtils';

interface AppointmentsFiltersProps {
  searchQuery: string;
  selectedSpecialty: string;
  selectedStatus: string;
  activeTab: string;
  filteredAppointmentsCount: number;
  specialties: SelectOption<string>[];
  onSearchChange: (value: string) => void;
  onSpecialtyChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTabChange: (tab: string) => void;
  onResetFilters: () => void;
}

export function AppointmentsFilters({
  searchQuery,
  selectedSpecialty,
  selectedStatus,
  activeTab,
  filteredAppointmentsCount,
  specialties,
  onSearchChange,
  onSpecialtyChange,
  onStatusChange,
  onTabChange,
  onResetFilters,
}: AppointmentsFiltersProps) {
  return (
    <Card className="border-primary/10 shadow-sm">
      <CardHeader className="bg-primary/5 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              تصفية المواعيد
            </CardTitle>
            <CardDescription className="mt-1">
              يمكنك تصفية المواعيد حسب التخصص والحالة
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs flex items-center gap-1 hover:bg-primary/10"
            onClick={onResetFilters}
          >
            <X className="h-3 w-3" />
            إعادة ضبط الفلاتر
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label
              htmlFor="search"
              className="flex items-center gap-1 text-sm font-medium"
            >
              <Search className="h-3.5 w-3.5 text-primary" />
              بحث
            </Label>
            <Input
              id="search"
              placeholder="ابحث عن طبيب أو تخصص..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              startIcon={<Search className="h-4 w-4 text-muted-foreground" />}
              fullWidth
            />
          </div>

          <div className="space-y-2">
            <Select
              label="Specialty"
              value={selectedSpecialty}
              onChange={(e) => onSpecialtyChange(e.target.value)}
              options={[
                { value: '', label: 'Select Specialty' },
                ...(specialties?.map((specialty: SelectOption<string>) => ({
                  value: specialty.value,
                  label: specialty.label || '',
                })) || []),
              ]}
            />
          </div>
          <div className="space-y-2">
            <Select
              value={selectedStatus}
              label="Appointment status "
              options={[
                { value: 'all', label: 'All' },
                ...Object.entries(AppointmentStatus)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([_, value]) => ({
                    value: value.toString(),
                    label: getAppointmentStatusStyle(value as AppointmentStatus)
                      .label,
                  })),
              ]}
              onChange={(e) => onStatusChange(e.target.value)}
              fullWidth
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {filteredAppointmentsCount} موعد{' '}
              {activeTab === 'upcoming' ? 'قادم' : 'سابق'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 border-primary/20 bg-primary/5 text-xs hover:bg-primary/10"
              onClick={() => onTabChange('upcoming')}
            >
              <ChevronLeft className="h-3 w-3" />
              المواعيد القادمة
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 border-primary/20 bg-primary/5 text-xs hover:bg-primary/10"
              onClick={() => onTabChange('past')}
            >
              <ChevronRight className="h-3 w-3" />
              المواعيد السابقة
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
