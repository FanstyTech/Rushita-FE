export interface LabTest {
  id: string;
  name: string;
  category: string;
  description?: string;
}

export const labTests: LabTest[] = [
  {
    id: 'lab1',
    name: 'Complete Blood Count (CBC)',
    category: 'Hematology',
    description: 'Measures different components of blood including red cells, white cells, and platelets'
  },
  {
    id: 'lab2',
    name: 'Basic Metabolic Panel',
    category: 'Chemistry',
    description: 'Tests kidney function, blood sugar, and electrolyte levels'
  },
  {
    id: 'lab3',
    name: 'Lipid Panel',
    category: 'Chemistry',
    description: 'Measures cholesterol and triglycerides'
  },
  {
    id: 'lab4',
    name: 'Thyroid Function Tests',
    category: 'Endocrinology',
    description: 'Measures thyroid hormones'
  },
  {
    id: 'lab5',
    name: 'Liver Function Tests',
    category: 'Chemistry',
    description: 'Assesses liver health and function'
  },
  {
    id: 'lab6',
    name: 'Urinalysis',
    category: 'Urology',
    description: 'Analyzes urine content and characteristics'
  }
];
