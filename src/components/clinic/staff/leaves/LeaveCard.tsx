import { format } from 'date-fns';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { LeaveStatus, LeaveType } from '@/lib/api/types/clinic-staff-leave';
import Avatar from '@/components/common/Avatar';
import { Card } from '@/components/ui/card';

interface LeaveCardProps {
  leave: {
    id: string;
    staffName: string;
    staffId: string;
    startDate: string;
    endDate: string;
    type: LeaveType;
    status: LeaveStatus;
    reason: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: LeaveStatus) => void;
}

export default function LeaveCard({
  leave,
  onEdit,
  onDelete,
  onStatusChange,
}: LeaveCardProps) {
  const getStatusColor = (status: LeaveStatus) => {
    switch (status) {
      case LeaveStatus.Approved:
        return 'bg-green-100 text-green-800';
      case LeaveStatus.Rejected:
        return 'bg-red-100 text-red-800';
      case LeaveStatus.Cancelled:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card className="p-6 gap-3" key={leave.id}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <Avatar
            name={leave.staffName}
            className="w-10 h-10 rounded-xl text-lg"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {leave.staffName}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-white">
              <span className="inline-flex items-center">
                {format(new Date(leave.startDate), 'MMM dd')} -{' '}
                {format(new Date(leave.endDate), 'MMM dd, yyyy')}
              </span>
              <span className="text-gray-300">•</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  leave.status
                )}`}
              >
                {LeaveStatus[leave.status]}
              </span>
            </div>
          </div>
        </div>

        <Menu as="div" className="relative">
          <MenuButton className="p-2 hover:bg-gray-100   dark:hover:bg-gray-600 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2 w-48 bg-white border-gray-100 dark:border-gray-700 dark:bg-gray-700 rounded-xl shadow-lg border focus:outline-none z-10">
            <div className="py-2">
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => onEdit(leave.id)}
                    className={`${
                      active ? 'bg-gray-50 dark:bg-gray-600' : ''
                    } flex items-center px-4 py-2 text-sm w-full text-left`}
                  >
                    <Edit2 className="w-4 h-4 mr-3" />
                    Edit Leave
                  </button>
                )}
              </MenuItem>
              {leave.status === LeaveStatus.Pending && (
                <>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          onStatusChange(leave.id, LeaveStatus.Approved)
                        }
                        className={`${
                          active ? 'bg-gray-50 dark:bg-gray-600' : ''
                        } flex items-center px-4 py-2 text-sm text-green-600 w-full text-left`}
                      >
                        <CheckCircle className="w-4 h-4 mr-3" />
                        Approve
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          onStatusChange(leave.id, LeaveStatus.Rejected)
                        }
                        className={`${
                          active ? 'bg-gray-50 dark:bg-gray-600' : ''
                        } flex items-center px-4 py-2 text-sm text-red-600 w-full text-left`}
                      >
                        <XCircle className="w-4 h-4 mr-3" />
                        Reject
                      </button>
                    )}
                  </MenuItem>
                </>
              )}
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => onDelete(leave.id)}
                    className={`${
                      active ? 'bg-gray-50 dark:bg-gray-600' : ''
                    } flex items-center px-4 py-2 text-sm text-red-600 w-full text-left`}
                  >
                    <Trash2 className="w-4 h-4 mr-3" />
                    Delete Leave
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>

      <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 dark:bg-black/15">
        {leave.reason}
      </div>

      <div className=" flex items-center gap-3 text-xs">
        <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-700">
          {LeaveType[leave.type]}
        </span>
      </div>
    </Card>
  );
}
