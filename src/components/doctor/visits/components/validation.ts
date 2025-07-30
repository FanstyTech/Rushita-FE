import z from 'zod';

// Validation Schemas
const medicationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Medication name is required'),
  dosage: z.string().min(1, 'Dosage is required'),
  frequency: z.coerce.number().min(1, 'Frequency is required'),
  duration: z.coerce.number().min(1, 'Duration is required'),
  notes: z.string().optional(),
});

const labTestSchema = z.object({
  id: z.string().min(1, 'Lab test name is required'),
  name: z.string().optional(),
  notes: z.string().optional(),
});

const rayTestSchema = z.object({
  id: z.string().min(1, 'Ray test name is required'),
  name: z.string().optional(),
  notes: z.string().optional(),
});

const dentalProcedureSchema = z.object({
  teeth: z.array(z.number()),
  type: z.string().min(1, 'Dental procedure type is required'),
  notes: z.string().optional(),
});

export const treatmentFormSchema = z.object({
  patientId: z.string().min(1, 'Patient selection is required'),
  visitType: z.coerce.number().min(1, 'Visit Type is required'),

  symptoms: z.string().min(1, 'Symptoms are required'),
  diagnosis: z.string().min(1, 'Diagnosis is required'),
  medications: z.array(medicationSchema),
  labTests: z.array(labTestSchema),
  rays: z.array(rayTestSchema),
  notes: z.string().optional(),
  selectedTeeth: z.array(z.number()).optional(),
  dentalProcedures: z.array(dentalProcedureSchema).optional(),
  attachments: z.array(z.any()).optional(),
});

export type TreatmentFormData = z.infer<typeof treatmentFormSchema>;
