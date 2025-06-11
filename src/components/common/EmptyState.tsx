import { LucideIcon } from 'lucide-react';
import Button from './Button';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText?: string;
  onAction?: () => void;
  hasFilters?: boolean;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  buttonText,
  onAction,
  hasFilters,
}: EmptyStateProps) {
  const defaultDescription = hasFilters
    ? 'Try adjusting your search or filter criteria'
    : description;

  return (
    <div className="col-span-full">
      <div className="relative bg-white rounded-3xl p-12 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
          <Icon className="w-12 h-12 text-white mb-3" />
        </div>

        <div className="mt-8 space-y-3">
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{defaultDescription}</p>
        </div>

        {buttonText && onAction && (
          <div className="mt-8">
            <Button
              onClick={onAction}
              className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
