export interface Ray {
  id: string;
  name: string;
  type: 'X-Ray' | 'CT' | 'MRI' | 'Ultrasound' | 'Dental';
  description?: string;
}

export const rays: Ray[] = [
  {
    id: 'ray1',
    name: 'Chest X-Ray',
    type: 'X-Ray',
    description: 'Standard chest radiograph'
  },
  {
    id: 'ray2',
    name: 'Dental Panoramic',
    type: 'Dental',
    description: 'Full mouth panoramic X-ray'
  },
  {
    id: 'ray3',
    name: 'Dental Periapical',
    type: 'Dental',
    description: 'Detailed view of specific teeth and surrounding bone'
  },
  {
    id: 'ray4',
    name: 'Head CT',
    type: 'CT',
    description: 'Computed tomography of the head'
  },
  {
    id: 'ray5',
    name: 'Brain MRI',
    type: 'MRI',
    description: 'Magnetic resonance imaging of the brain'
  },
  {
    id: 'ray6',
    name: 'Abdominal Ultrasound',
    type: 'Ultrasound',
    description: 'Ultrasound examination of the abdomen'
  }
];
