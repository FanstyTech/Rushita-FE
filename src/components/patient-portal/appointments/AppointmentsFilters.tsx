'use client';

import { Search, Stethoscope, Filter, X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input, Select } from '@/components/common/form';

interface AppointmentsFiltersProps {
  searchQuery: string;
  selectedSpecialty: string;
  selectedStatus: string;
  activeTab: string;
  filteredAppointmentsCount: number;
  onSearchChange: (value: string) => void;
  onSpecialtyChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTabChange: (tab: string) => void;
  onResetFilters: () => void;
}

const specialties = [
  { value: 'all', label: 'جميع التخصصات' },
  { value: 'general', label: 'طب عام' },
  { value: 'dental', label: 'أسنان' },
  { value: 'dermatology', label: 'جلدية' },
  { value: 'ophthalmology', label: 'عيون' },
  { value: 'internal', label: 'باطنية' },
];

const statusOptions = [
  { value: 'all', label: 'جميع الحالات' },
  { value: 'confirmed', label: 'مؤكد' },
  { value: 'cancelled', label: 'ملغي' },
  { value: 'completed', label: 'مكتمل' },
];

export function AppointmentsFilters({
  searchQuery,
  selectedSpecialty,
  selectedStatus,
  activeTab,
  filteredAppointmentsCount,
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
            <Label
              htmlFor="specialty"
              className="flex items-center gap-1 text-sm font-medium"
            >
              <Stethoscope className="h-3.5 w-3.5 text-primary" />
              التخصص
            </Label>
            <Select
              id="specialty"
              value={selectedSpecialty}
              onChange={(e) => onSpecialtyChange(e.target.value)}
              options={specialties}
              placeholder="اختر التخصص"
              fullWidth
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="status"
              className="flex items-center gap-1 text-sm font-medium"
            >
              <Badge className="h-3.5 w-3.5 p-0 text-primary" />
              الحالة
            </Label>
            <Select
              id="status"
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              options={statusOptions}
              placeholder="اختر الحالة"
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
