'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { AppointmentStatus } from '@/lib/api/types/appointment';
import { Check, ChevronDown } from 'lucide-react';

interface StatusDropdownProps {
  currentStatus: AppointmentStatus;
  onStatusChange: (status: AppointmentStatus) => Promise<void>;
}

const statusOptions = [
  { value: AppointmentStatus.Scheduled, label: 'Scheduled' },
  { value: AppointmentStatus.Confirmed, label: 'Confirmed' },
  { value: AppointmentStatus.InProgress, label: 'In Progress' },
  { value: AppointmentStatus.Completed, label: 'Completed' },
  { value: AppointmentStatus.Cancelled, label: 'Cancelled' },
  { value: AppointmentStatus.NoShow, label: 'No Show' },
];

export function StatusDropdown({ currentStatus, onStatusChange }: StatusDropdownProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusStyle = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.Confirmed:
        return 'bg-green-100 text-green-800';
      case AppointmentStatus.InProgress:
        return 'bg-yellow-100 text-yellow-800';
      case AppointmentStatus.Completed:
        return 'bg-blue-100 text-blue-800';
      case AppointmentStatus.Cancelled:
        return 'bg-red-100 text-red-800';
      case AppointmentStatus.NoShow:
        return 'bg-orange-100 text-orange-800';
      case AppointmentStatus.Scheduled:
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = async (status: AppointmentStatus) => {
    if (status === currentStatus) return;
    
    try {
      setIsUpdating(true);
      await onStatusChange(status);
    } finally {
      setIsUpdating(false);
    }
  };

  const currentStatusLabel = statusOptions.find(opt => opt.value === currentStatus)?.label || 'Unknown';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn("w-40 justify-between", getStatusStyle(currentStatus))}
          disabled={isUpdating}
        >
          {isUpdating ? 'Updating...' : currentStatusLabel}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {statusOptions.map((status) => (
          <DropdownMenuItem
            key={status.value}
            onSelect={() => handleStatusChange(status.value)}
            className="cursor-pointer"
          >
            <div className="flex items-center w-full">
              <span className={cn("mr-2", getStatusStyle(status.value), 'px-2 py-1 rounded text-xs')}>
                {status.label}
              </span>
              {status.value === currentStatus && <Check className="h-4 w-4 ml-auto" />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
