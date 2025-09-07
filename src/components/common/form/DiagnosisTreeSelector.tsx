'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useWatch,
} from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, ChevronRight, ChevronDown, Check } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Input } from '@/components/ui/input';
import { GetDiagnosesTreeDto } from '@/lib/api/types/diagnosis';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface DiagnosisTreeSelectorProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  diagnosesTree: GetDiagnosesTreeDto[];
}

export default function DiagnosisTreeSelector<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  error,
  disabled = false,
  required = false,
  className,
  diagnosesTree,
}: DiagnosisTreeSelectorProps<T>) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedDiagnosis, setSelectedDiagnosis] =
    useState<GetDiagnosesTreeDto | null>(null);
  const [filteredData, setFilteredData] =
    useState<GetDiagnosesTreeDto[]>(diagnosesTree);

  // Search within tree and filter results
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(diagnosesTree);
      return;
    }

    const query = searchQuery.toLowerCase();

    const searchTree = (
      nodes: GetDiagnosesTreeDto[]
    ): GetDiagnosesTreeDto[] => {
      return nodes
        .map((node) => {
          const nodeMatches =
            node.code.toLowerCase().includes(query) ||
            node.name.toLowerCase().includes(query);

          const matchingChildren = searchTree(node.children);

          if (nodeMatches || matchingChildren.length > 0) {
            if (nodeMatches) {
              setExpandedNodes((prev) => new Set([...prev, node.id]));
            }
            return {
              ...node,
              children: matchingChildren,
            };
          }

          return null;
        })
        .filter((node): node is GetDiagnosesTreeDto => node !== null);
    };

    setFilteredData(searchTree(diagnosesTree));
  }, [searchQuery, diagnosesTree]);

  // Function to open/close tree nodes with state preservation
  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  // Function to search for diagnosis by id with useCallback to prevent unnecessary re-creation
  const findDiagnosisById = useCallback(
    (
      id: string,
      nodes: GetDiagnosesTreeDto[] = diagnosesTree
    ): GetDiagnosesTreeDto | null => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children.length > 0) {
          const found = findDiagnosisById(id, node.children);
          if (found) return found;
        }
      }
      return null;
    },
    [diagnosesTree]
  );

  // Watch field value to sync selectedDiagnosis
  const fieldValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    if (
      fieldValue &&
      (!selectedDiagnosis || selectedDiagnosis.id !== fieldValue)
    ) {
      const diagnosis = findDiagnosisById(fieldValue);
      if (diagnosis) {
        setSelectedDiagnosis(diagnosis);
      }
    }
  }, [fieldValue, selectedDiagnosis, findDiagnosisById]);

  // Render tree node recursively with expansion and selection
  const renderTreeNode = (node: GetDiagnosesTreeDto, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children.length > 0;

    return (
      <div key={node.id} className="w-full">
        <div
          className={twMerge(
            'flex items-center py-1.5 px-2 hover:bg-gray-100 rounded-md cursor-pointer',
            level > 0 && `ml-${level * 4}`,
            selectedDiagnosis?.id === node.id && 'bg-blue-50'
          )}
        >
          {hasChildren ? (
            <div
              className="mr-1 p-0.5 hover:bg-gray-200 rounded-sm"
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(node.id);
              }}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </div>
          ) : (
            <div className="w-5 h-5 mr-1"></div>
          )}

          <div
            className="flex-1 flex items-center"
            onClick={() => {
              if (!hasChildren) {
                setSelectedDiagnosis(node);
              } else {
                toggleNode(node.id);
              }
            }}
          >
            <span className="font-medium text-sm mr-2">{node.code}</span>
            <span className="text-sm text-gray-700">{node.name}</span>
          </div>

          {!hasChildren && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="ml-2 p-1 h-6 w-6"
              onClick={() => {
                setSelectedDiagnosis(node);
              }}
            >
              <Check
                className={twMerge(
                  'h-4 w-4',
                  selectedDiagnosis?.id === node.id
                    ? 'text-green-500'
                    : 'text-gray-400'
                )}
              />
            </Button>
          )}
        </div>

        {isExpanded && hasChildren && (
          <div className="pl-4">
            {node.children.map((childNode) =>
              renderTreeNode(childNode, level + 1)
            )}
          </div>
        )}
      </div>
    );
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
        render={({ field }) => {
          return (
            <div className="relative">
              <Dialog
                open={isOpen}
                onOpenChange={disabled ? undefined : setIsOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                      'w-full justify-between px-4 py-3.5 h-[50px] rounded-xl border-2 border-gray-100 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500',
                      'border border-gray-300',
                      error && 'border-red-500',
                      'focus:outline-none focus-visible:outline-none focus-visible:ring-0',
                      'hover:bg-transparent hover:text-current',
                      disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <span className="flex-grow text-left truncate">
                      {selectedDiagnosis
                        ? `${selectedDiagnosis.code} - ${selectedDiagnosis.name}`
                        : placeholder ||
                          t(
                            'clinic.visits.form.symptomsAndDiagnosis.diagnosisPlaceholder'
                          )}
                    </span>
                    <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-hidden flex flex-col">
                  <DialogHeader>
                    <DialogTitle>
                      {t(
                        'clinic.visits.form.symptomsAndDiagnosis.selectDiagnosis'
                      )}
                    </DialogTitle>
                    <div className="relative mt-2">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder={t(
                          'clinic.visits.form.symptomsAndDiagnosis.searchPlaceholder'
                        )}
                        className="pl-10 pr-4 py-2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </DialogHeader>

                  <div className="flex-1 overflow-y-auto mt-4 border rounded-md p-2">
                    {filteredData.length > 0 ? (
                      filteredData.map((node) => renderTreeNode(node))
                    ) : (
                      <div className="py-4 text-center text-gray-500">
                        {t(
                          'clinic.visits.form.symptomsAndDiagnosis.noDiagnosisFound'
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-2 border-t">
                    <div className="text-sm">
                      {selectedDiagnosis ? (
                        <span className="font-medium">
                          {t(
                            'clinic.visits.form.symptomsAndDiagnosis.selected'
                          )}
                          :{' '}
                          <span className="text-blue-600">
                            {selectedDiagnosis.code} - {selectedDiagnosis.name}
                          </span>
                        </span>
                      ) : (
                        <span className="text-gray-500">
                          {t(
                            'clinic.visits.form.symptomsAndDiagnosis.noDiagnosisSelected'
                          )}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsOpen(false);
                          setSearchQuery('');
                        }}
                      >
                        {t('common.cancel')}
                      </Button>
                      <Button
                        onClick={() => {
                          if (selectedDiagnosis) {
                            field.onChange(selectedDiagnosis.id);
                            setIsOpen(false);
                            setSearchQuery('');
                          }
                        }}
                        disabled={!selectedDiagnosis}
                      >
                        {t('common.confirm')}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
          );
        }}
      />
    </div>
  );
}
