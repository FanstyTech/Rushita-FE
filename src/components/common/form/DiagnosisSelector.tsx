'use client';

import { useEffect, useState } from 'react';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { diagnosisService } from '@/lib/api/services/diagnosis.service';
import { DiagnosisListDto } from '@/lib/api/types/diagnosis';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface DiagnosisOption {
  value: string;
  label: string;
  code: string;
}

interface DiagnosisSelectorProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}

export default function DiagnosisSelector<T extends FieldValues>({
  name,
  control,
  label = 'Diagnosis (ICD-10)',
  placeholder = 'Select ICD-10 diagnosis code...',
  error,
  disabled = false,
  required = false,
  className,
  onChange,
}: DiagnosisSelectorProps<T>) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [diagnosisOptions, setDiagnosisOptions] = useState<DiagnosisOption[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] =
    useState<DiagnosisOption | null>(null);

  // Fetch diagnosis options when search query changes
  useEffect(() => {
    const fetchDiagnoses = async () => {
      if (searchQuery.length < 2) return;

      setIsLoading(true);
      try {
        const response = await diagnosisService.getAll({
          pageNumber: 1,
          pageSize: 50,
          code: searchQuery,
        });

        if (response.data?.items) {
          const options = response.data.items.map(
            (diagnosis: DiagnosisListDto) => ({
              value: diagnosis.id,
              label: `${diagnosis.code} - ${diagnosis.name}`,
              code: diagnosis.code,
            })
          );
          setDiagnosisOptions(options);
        }
      } catch (error) {
        console.error('Error fetching diagnoses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchDiagnoses();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // Find and set selected diagnosis when value changes
  const findAndSetSelectedDiagnosis = async (value: string) => {
    if (!value) {
      setSelectedDiagnosis(null);
      return;
    }

    // Check if we already have this diagnosis in our options
    const existingOption = diagnosisOptions.find(
      (option) => option.value === value
    );
    if (existingOption) {
      setSelectedDiagnosis(existingOption);
      return;
    }

    // If not, fetch it from the API
    try {
      const response = await diagnosisService.getOne(value);
      if (response.data) {
        const diagnosis = response.data;
        const option = {
          value: diagnosis.id,
          label: `${diagnosis.code} - ${diagnosis.name}`,
          code: diagnosis.code,
        };
        setSelectedDiagnosis(option);
      }
    } catch (error) {
      console.error('Error fetching diagnosis details:', error);
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <Popover
              open={open && !disabled}
              onOpenChange={disabled ? undefined : setOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  disabled={disabled}
                  className={twMerge(
                    'w-full justify-between px-4 py-3.5 h-[50px] rounded-xl border-2 border-gray-100 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500',
                    'border border-gray-300',
                    error && 'border-red-500',
                    'focus:outline-none focus-visible:outline-none focus-visible:ring-0',
                    'hover:bg-transparent hover:text-current',
                    disabled && 'opacity-50 cursor-not-allowed'
                  )}
                  onClick={() => {
                    if (field.value && !selectedDiagnosis) {
                      findAndSetSelectedDiagnosis(field.value);
                    }
                  }}
                >
                  <span className="flex-grow text-left truncate">
                    {field.value
                      ? selectedDiagnosis?.label || 'Loading...'
                      : placeholder}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[400px]" align="start">
                <Command shouldFilter={false}>
                  <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <CommandInput
                      placeholder="Search ICD-10 codes..."
                      className="h-9 flex-1"
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                    />
                  </div>
                  <CommandList>
                    {isLoading ? (
                      <div className="py-6 text-center">
                        <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
                        <p className="mt-2 text-sm text-gray-500">Loading...</p>
                      </div>
                    ) : diagnosisOptions.length === 0 ? (
                      <CommandEmpty>
                        {searchQuery.length < 2
                          ? 'Type at least 2 characters to search'
                          : 'No diagnosis codes found'}
                      </CommandEmpty>
                    ) : (
                      <CommandGroup>
                        {diagnosisOptions.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={option.value}
                            onSelect={() => {
                              field.onChange(option.value);
                              setSelectedDiagnosis(option);
                              setOpen(false);
                              onChange?.(option.value);
                            }}
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{option.code}</span>
                              <span className="text-sm text-gray-500">
                                {option.label.split(' - ')[1]}
                              </span>
                            </div>
                            <Check
                              className={twMerge(
                                'ml-auto h-4 w-4',
                                field.value === option.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>
        )}
      />
    </div>
  );
}
