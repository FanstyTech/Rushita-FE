export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Manager' | 'Analyst';
  status: 'Active' | 'Inactive' | 'Suspended' | 'Seated' | 'Unseated';
  organizationalUnit?: string;
  userSource?: string;
  updatedAt: string;
  permissions?: string[];
  avatar?: string;
}

const organizationalUnits = [
  '../Finance/AccountsReceivable',
  '../Finance/AccountsPayable',
  '../HR/Recruitment',
  '../HR/EmployeeRelations',
  '../IT/Infrastructure',
  '../IT/SupportServices',
  '../Marketing/ContentCreation',
  '../Marketing/DigitalAdvertising',
  '../Sales/CorporateClients',
  '../Sales/SMBClients',
  '../Operations/SupplyChain',
  '../Operations/Management',
  '../Legal/Compliance',
];

const userSources = ['Local', 'Azure AD', 'Google Workspace', 'Okta'];
const roles = ['Admin', 'User', 'Manager', 'Analyst'] as const;
const statuses = [
  'Active',
  'Inactive',
  'Suspended',
  'Seated',
  'Unseated',
] as const;

const generateMockUser = (id: number): User => {
  const getRandomItem = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];
  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '/');
  };

  // Generate a random date within the last 30 days
  const getRecentDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    return formatDate(date);
  };

  return {
    id,
    name: getRandomItem([
      'John Smith',
      'Emma Wilson',
      'Michael Brown',
      'Sarah Davis',
      'James Johnson',
      'Lisa Anderson',
      'David Miller',
      'Jennifer Taylor',
      'Robert White',
      'Patricia Martinez',
      'Joseph Thompson',
      'Elizabeth Garcia',
      'Charles Rodriguez',
      'Margaret Lee',
      'Thomas Moore',
    ]),
    email: `user${id}@example.com`,
    role: getRandomItem(roles),
    status: getRandomItem(statuses),
    organizationalUnit: getRandomItem(organizationalUnits),
    userSource: getRandomItem(userSources),
    updatedAt: getRecentDate(),
    permissions: [],
  };
};

export const generateMockUsers = (count: number = 50): User[] => {
  return Array.from({ length: count }, (_, index) =>
    generateMockUser(index + 1)
  );
};

// Generate 100 mock users instead of 50
export const mockUsers = generateMockUsers(20);
