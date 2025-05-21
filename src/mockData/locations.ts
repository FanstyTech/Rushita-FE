export interface State {
  id: string;
  name: string;
  cities: City[];
}

export interface City {
  id: string;
  name: string;
}

export const states: State[] = [
  {
    id: '1',
    name: 'California',
    cities: [
      { id: '1', name: 'Los Angeles' },
      { id: '2', name: 'San Francisco' },
      { id: '3', name: 'San Diego' },
      { id: '4', name: 'Sacramento' },
    ],
  },
  {
    id: '2',
    name: 'New York',
    cities: [
      { id: '5', name: 'New York City' },
      { id: '6', name: 'Buffalo' },
      { id: '7', name: 'Albany' },
      { id: '8', name: 'Rochester' },
    ],
  },
  {
    id: '3',
    name: 'Texas',
    cities: [
      { id: '9', name: 'Houston' },
      { id: '10', name: 'Austin' },
      { id: '11', name: 'Dallas' },
      { id: '12', name: 'San Antonio' },
    ],
  },
  {
    id: '4',
    name: 'Florida',
    cities: [
      { id: '13', name: 'Miami' },
      { id: '14', name: 'Orlando' },
      { id: '15', name: 'Tampa' },
      { id: '16', name: 'Jacksonville' },
    ],
  },
];
