export interface Medication {
  id: number;
  name: string;
  category: string;
  dosageForm: string;
  strength?: string;
  manufacturer?: string;
}

export const medications: Medication[] = [
  {
    id: 1,
    name: 'Amoxicillin',
    category: 'Antibiotic',
    dosageForm: 'Tablet',
    strength: '500mg',
    manufacturer: 'Pfizer'
  },
  {
    id: 2,
    name: 'Paracetamol',
    category: 'Pain Relief',
    dosageForm: 'Tablet',
    strength: '500mg',
    manufacturer: 'GSK'
  },
  {
    id: 3,
    name: 'Ibuprofen',
    category: 'Anti-inflammatory',
    dosageForm: 'Tablet',
    strength: '400mg',
    manufacturer: 'Novartis'
  },
  {
    id: 4,
    name: 'Omeprazole',
    category: 'Antacid',
    dosageForm: 'Capsule',
    strength: '20mg',
    manufacturer: 'AstraZeneca'
  },
  {
    id: 5,
    name: 'Metformin',
    category: 'Diabetes',
    dosageForm: 'Tablet',
    strength: '850mg',
    manufacturer: 'Merck'
  }
];

export const searchMedications = (query: string): Medication[] => {
  const lowercaseQuery = query.toLowerCase();
  return medications.filter(med => 
    med.name.toLowerCase().includes(lowercaseQuery) ||
    med.category.toLowerCase().includes(lowercaseQuery) ||
    med.manufacturer?.toLowerCase().includes(lowercaseQuery)
  );
};
