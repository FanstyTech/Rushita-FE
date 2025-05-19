export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  education: string[];
  languages: string[];
  availability: {
    days: string[];
    hours: {
      start: string;
      end: string;
    };
  };
  rating: number;
  avatar?: string;
}

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. John Smith',
    specialization: 'Cardiology',
    experience: 15,
    education: ['MD - Harvard Medical School', 'PhD - Cardiology'],
    languages: ['English', 'Spanish'],
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      hours: {
        start: '09:00',
        end: '17:00'
      }
    },
    rating: 4.8,
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    specialization: 'Pediatrics',
    experience: 10,
    education: ['MD - Stanford Medical School', 'Pediatric Specialization'],
    languages: ['English', 'French'],
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      hours: {
        start: '10:00',
        end: '18:00'
      }
    },
    rating: 4.9,
    avatar: 'https://i.pravatar.cc/150?img=5'
  }
]; 