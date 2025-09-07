import z from 'zod';

// Create a function to generate validation schemas with dynamic error messages
export const createTreatmentFormSchema = (t: (key: string) => string) => {
  // Validation Schemas
  const medicationSchema = z.object({
    id: z.string().optional(),
    medicineId: z
      .string()
      .min(1, t('clinic.visits.form.validation.medicationNameRequired')),
    name: z
      .string()
      .min(1, t('clinic.visits.form.validation.medicationNameRequired')),
    dosage: z.coerce
      .number()
      .min(1, t('clinic.visits.form.validation.dosageRequired')),
    frequency: z.coerce
      .number()
      .min(1, t('clinic.visits.form.validation.frequencyRequired')),
    duration: z.coerce
      .number()
      .min(1, t('clinic.visits.form.validation.durationRequired')),
    notes: z.string().optional(),
  });

  const labTestSchema = z.object({
    id: z.string().optional(),
    labTestId: z
      .string()
      .min(1, t('clinic.visits.form.validation.labTestRequired')),
    testName: z.string().optional(),
    notes: z.string().optional(),
  });

  const rayTestSchema = z.object({
    id: z.string().optional(),
    radiologyTestId: z
      .string()
      .min(1, t('clinic.visits.form.validation.rayTestRequired')),
    testName: z.string().optional(),
    notes: z.string().optional(),
  });

  const dentalProcedureSchema = z.object({
    teeth: z.array(z.number()),
    type: z
      .string()
      .min(1, t('clinic.visits.form.validation.dentalProcedureRequired')),
    notes: z.string().optional(),
  });

  return z.object({
    patientId: z
      .string()
      .min(1, t('clinic.visits.form.validation.patientRequired')),
    visitType: z.coerce
      .number()
      .min(1, t('clinic.visits.form.validation.visitTypeRequired')),

    symptoms: z
      .string()
      .min(1, t('clinic.visits.form.validation.symptomsRequired')),
    diagnosis: z
      .string()
      .min(1, t('clinic.visits.form.validation.diagnosisRequired')),
    medications: z.array(medicationSchema),
    labTests: z.array(labTestSchema),
    rays: z.array(rayTestSchema),
    notes: z.string().optional(),
    selectedTeeth: z.array(z.number()).optional(),
    dentalProcedures: z.array(dentalProcedureSchema).optional(),
    attachments: z.array(z.any()).optional(),
  });
};

// Keep the original schema for backward compatibility (using English messages)
const medicationSchema = z.object({
  id: z.string().optional(),
  medicineId: z.string().min(1, 'Medication ID is required'),
  name: z.string().min(1, 'Medication name is required'),
  dosage: z.coerce.number().min(1, 'Dosage is required'),
  frequency: z.coerce.number().min(1, 'Frequency is required'),
  duration: z.coerce.number().min(1, 'Duration is required'),
  notes: z.string().optional(),
});

const labTestSchema = z.object({
  id: z.string().optional(),
  labTestId: z.string().min(1, 'Lab test name is required'),
  testName: z.string().optional(),
  notes: z.string().optional(),
});

const rayTestSchema = z.object({
  id: z.string().optional(),
  radiologyTestId: z.string().min(1, 'Ray test name is required'),
  testName: z.string().optional(),
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
