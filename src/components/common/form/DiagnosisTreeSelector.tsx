'use client';

import { useState, useEffect } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, ChevronRight, ChevronDown, Check, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Input } from '@/components/ui/input';
import { GetDiagnosesTreeDto } from '@/lib/api/types/diagnosis';
import { cn } from '@/lib/utils';

// Dummy ICD-10 data structure with hierarchical categories
// const dummyICD10Data = [
//   {
//     id: 'A00-B99',
//     code: 'A00-B99',
//     name: 'Certain infectious and parasitic diseases',
//     children: [
//       {
//         id: 'A00-A09',
//         code: 'A00-A09',
//         name: 'Intestinal infectious diseases',
//         children: [
//           { id: 'A00', code: 'A00', name: 'Cholera', children: [] },
//           {
//             id: 'A01',
//             code: 'A01',
//             name: 'Typhoid and paratyphoid fevers',
//             children: [],
//           },
//           {
//             id: 'A02',
//             code: 'A02',
//             name: 'Other salmonella infections',
//             children: [],
//           },
//           { id: 'A03', code: 'A03', name: 'Shigellosis', children: [] },
//           {
//             id: 'A04',
//             code: 'A04',
//             name: 'Other bacterial intestinal infections',
//             children: [],
//           },
//         ],
//       },
//       {
//         id: 'A15-A19',
//         code: 'A15-A19',
//         name: 'Tuberculosis',
//         children: [
//           {
//             id: 'A15',
//             code: 'A15',
//             name: 'Respiratory tuberculosis',
//             children: [],
//           },
//           {
//             id: 'A16',
//             code: 'A16',
//             name: 'Tuberculosis of lung',
//             children: [],
//           },
//           {
//             id: 'A17',
//             code: 'A17',
//             name: 'Tuberculosis of nervous system',
//             children: [],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 'C00-D49',
//     code: 'C00-D49',
//     name: 'Neoplasms',
//     children: [
//       {
//         id: 'C00-C14',
//         code: 'C00-C14',
//         name: 'Malignant neoplasms of lip, oral cavity and pharynx',
//         children: [
//           {
//             id: 'C00',
//             code: 'C00',
//             name: 'Malignant neoplasm of lip',
//             children: [],
//           },
//           {
//             id: 'C01',
//             code: 'C01',
//             name: 'Malignant neoplasm of base of tongue',
//             children: [],
//           },
//           {
//             id: '',
//             code: 'C02',
//             name: 'Malignant neoplasm of other parts of tongue',
//             children: [],
//           },
//         ],
//       },
//       {
//         id: 'C15-C26',
//         code: 'C15-C26',
//         name: 'Malignant neoplasms of digestive organs',
//         children: [
//           {
//             id: 'C15',
//             code: 'C15',
//             name: 'Malignant neoplasm of esophagus',
//             children: [],
//           },
//           {
//             id: 'C16',
//             code: 'C16',
//             name: 'Malignant neoplasm of stomach',
//             children: [],
//           },
//           {
//             id: 'C17',
//             code: 'C17',
//             name: 'Malignant neoplasm of small intestine',
//             children: [],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 'E00-E89',
//     code: 'E00-E89',
//     name: 'Endocrine, nutritional and metabolic diseases',
//     children: [
//       {
//         id: 'E00-E07',
//         code: 'E00-E07',
//         name: 'Disorders of thyroid gland',
//         children: [
//           {
//             id: 'E00',
//             code: 'E00',
//             name: 'Congenital iodine-deficiency syndrome',
//             children: [],
//           },
//           {
//             id: 'E01',
//             code: 'E01',
//             name: 'Iodine-deficiency-related thyroid disorders',
//             children: [],
//           },
//           {
//             id: 'E02',
//             code: 'E02',
//             name: 'Subclinical iodine-deficiency hypothyroidism',
//             children: [],
//           },
//         ],
//       },
//       {
//         id: 'E08-E13',
//         code: 'E08-E13',
//         name: 'Diabetes mellitus',
//         children: [
//           {
//             id: 'E08',
//             code: 'E08',
//             name: 'Diabetes mellitus due to underlying condition',
//             children: [],
//           },
//           {
//             id: 'E09',
//             code: 'E09',
//             name: 'Drug or chemical induced diabetes mellitus',
//             children: [],
//           },
//           {
//             id: 'E10',
//             code: 'E10',
//             name: 'Type 1 diabetes mellitus',
//             children: [],
//           },
//           {
//             id: 'E11',
//             code: 'E11',
//             name: 'Type 2 diabetes mellitus',
//             children: [],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 'F01-F99',
//     code: 'F01-F99',
//     name: 'Mental, Behavioral and Neurodevelopmental disorders',
//     children: [
//       {
//         id: 'F01-F09',
//         code: 'F01-F09',
//         name: 'Mental disorders due to known physiological conditions',
//         children: [
//           { id: 'F01', code: 'F01', name: 'Vascular dementia', children: [] },
//           {
//             id: 'F02',
//             code: 'F02',
//             name: 'Dementia in other diseases classified elsewhere',
//             children: [],
//           },
//           {
//             id: 'F03',
//             code: 'F03',
//             name: 'Unspecified dementia',
//             children: [],
//           },
//         ],
//       },
//       {
//         id: 'F10-F19',
//         code: 'F10-F19',
//         name: 'Mental and behavioral disorders due to psychoactive substance use',
//         children: [
//           {
//             id: 'F10',
//             code: 'F10',
//             name: 'Alcohol related disorders',
//             children: [],
//           },
//           {
//             id: 'F11',
//             code: 'F11',
//             name: 'Opioid related disorders',
//             children: [],
//           },
//           {
//             id: 'F12',
//             code: 'F12',
//             name: 'Cannabis related disorders',
//             children: [],
//           },
//         ],
//       },
//     ],
//   },
// ];

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
  label = 'Diagnosis (ICD-10)',
  placeholder = 'Select ICD-10 diagnosis code...',
  error,
  disabled = false,
  required = false,
  className,
  diagnosesTree,
}: DiagnosisTreeSelectorProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedDiagnosis, setSelectedDiagnosis] =
    useState<GetDiagnosesTreeDto | null>(null);
  const [filteredData, setFilteredData] =
    useState<GetDiagnosesTreeDto[]>(diagnosesTree);

  // Handle search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(diagnosesTree);
      return;
    }

    const query = searchQuery.toLowerCase();

    // Helper function to search through the tree
    const searchTree = (
      nodes: GetDiagnosesTreeDto[]
    ): GetDiagnosesTreeDto[] => {
      return nodes
        .map((node) => {
          // Check if current node matches
          const nodeMatches =
            node.code.toLowerCase().includes(query) ||
            node.name.toLowerCase().includes(query);

          // Search through children
          const matchingChildren = searchTree(node.children);

          // If this node matches or has matching children, include it
          if (nodeMatches || matchingChildren.length > 0) {
            // If node matches, expand it automatically
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
  }, [searchQuery]);

  // Toggle node expansion
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

  // Find diagnosis by ID in the tree
  const findDiagnosisById = (
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
  };

  // Render tree node
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
          // Set selected diagnosis when field value changes
          useEffect(() => {
            if (field.value && !selectedDiagnosis) {
              const diagnosis = findDiagnosisById(field.value);
              if (diagnosis) {
                setSelectedDiagnosis(diagnosis);
              }
            }
          }, [field.value]);

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
                        : placeholder}
                    </span>
                    <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-hidden flex flex-col">
                  <DialogHeader>
                    <DialogTitle>Select ICD-10 Diagnosis</DialogTitle>
                    <div className="relative mt-2">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search by code or description..."
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
                        No diagnosis codes found matching your search
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-2 border-t">
                    <div className="text-sm">
                      {selectedDiagnosis ? (
                        <span className="font-medium">
                          Selected:{' '}
                          <span className="text-blue-600">
                            {selectedDiagnosis.code} - {selectedDiagnosis.name}
                          </span>
                        </span>
                      ) : (
                        <span className="text-gray-500">
                          No diagnosis selected
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
                        Cancel
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
                        Confirm Selection
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
