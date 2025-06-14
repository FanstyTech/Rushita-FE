'use client';

import { Search as FiSearch, PlusIcon, List as FiList } from 'lucide-react';
import { Input } from './form';
import Dropdown, { DropdownOption } from './Dropdown';
import Button from './Button';

export interface FilterState {
  pageNumber: number;
  pageSize: number;
  sortColumn: string;
  sortDirection: string;
  searchValue?: string;
  isActive?: boolean;
  [key: string]: string | number | boolean | undefined;
}

interface FilterBarProps {
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
  onAddNew?: () => void;
  searchPlaceholder?: string;
  haveStatusFilter?: boolean;
  additionalFilters?: {
    icon: React.ReactNode;
    label: string;
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
}

export default function FilterBar({
  filter,
  onFilterChange,
  onAddNew,
  searchPlaceholder = 'Search...',
  haveStatusFilter = true,
  additionalFilters = [],
}: FilterBarProps) {
  const clearFilters = () => {
    // Create clearedFilter with the same type as filter
    const clearedFilter: FilterState = {
      ...filter,
      pageNumber: 1,
      pageSize: filter.pageSize,
      sortColumn: '',
      sortDirection: '',
      searchValue: '',
      isActive: undefined,
    };

    // Clear additional filter values
    additionalFilters?.forEach((additionalFilter) => {
      const key = Object.keys(filter).find(
        (k) => filter[k] === additionalFilter.value
      );
      if (key) {
        clearedFilter[key] = undefined;
      }
    });

    onFilterChange(clearedFilter);
  };

  const showClearFilters =
    (filter.searchValue && filter.searchValue.trim() !== '') ||
    filter.isActive !== undefined ||
    additionalFilters?.some((af) => {
      const key = Object.keys(filter).find((k) => filter[k] === af.value);
      return key && filter[key] !== undefined && filter[key] !== '';
    });

  return (
    <div className="flex items-center gap-4 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
      {/* Search Input */}
      <div className="flex-1 relative">
        <Input
          hasBorder={false}
          placeholder={searchPlaceholder}
          value={filter.searchValue}
          onChange={(e) =>
            onFilterChange({
              ...filter,
              searchValue: e.target.value,
            })
          }
          startIcon={
            <FiSearch width={16} height={16} className="text-gray-500" />
          }
        />
      </div>

      {/* Status Filter */}
      {haveStatusFilter && (
        <div>
          <Dropdown
            icon={<FiList className="w-4 h-4" />}
            label="Status"
            options={[
              { value: '', label: 'All Status' },
              { value: 'true', label: 'Active' },
              { value: 'false', label: 'Inactive' },
            ]}
            value={filter.isActive?.toString() || ''}
            onChange={(value) =>
              onFilterChange({
                ...filter,
                isActive: value === '' ? undefined : value === 'true',
              })
            }
          />
        </div>
      )}

      {/* Additional Filters */}
      {additionalFilters.map((filterProps, index) => (
        <div key={index}>
          <Dropdown {...filterProps} />
        </div>
      ))}

      {/* Filter Actions */}
      <div className="pl-2 flex items-center gap-2">
        <button
          onClick={clearFilters}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
            showClearFilters
              ? 'text-blue-600 hover:bg-blue-50'
              : 'text-gray-400'
          }`}
        >
          Clear
        </button>
        {onAddNew && (
          <>
            <div className="h-8 w-px bg-gray-200"></div>
            <Button onClick={onAddNew} className="gap-2">
              <PlusIcon className="h-5 w-5" />
              Add New
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
