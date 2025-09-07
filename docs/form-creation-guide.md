# Rousheta Frontend Form Creation Guide

## Overview

This guide provides a comprehensive approach to creating new forms in the Rousheta Frontend project. It covers form setup, field types, validation, and best practices for consistent user experience.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Form Setup](#form-setup)
4. [Field Types](#field-types)
5. [Validation](#validation)
6. [Form Patterns](#form-patterns)
7. [Best Practices](#best-practices)
8. [Examples](#examples)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js and npm installed
- Access to the Rousheta-FE repository
- Understanding of React, TypeScript, and React Hook Form
- Knowledge of Zod validation library

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── form/
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   └── DatePicker.tsx
│   │   └── Button.tsx
│   └── [module]/
│       └── [EntityForm].tsx
├── lib/
│   └── api/
│       ├── types/
│       └── hooks/
└── utils/
    └── validation.ts
```

## Form Setup

### Step 1: Basic Form Structure

Create a new form component following this structure:

```typescript
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/common/Button';
import { Input, Select, Textarea } from '@/components/common/form';
import Modal from '@/components/common/Modal';

// 1. Define the validation schema
const schema = z.object({
  // Field definitions will go here
});

// 2. Infer TypeScript type from schema
type FormData = z.infer<typeof schema>;

// 3. Define component props
interface EntityFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CreateUpdateEntityDto;
  onSubmit: (data: CreateUpdateEntityDto) => Promise<void>;
}

// 4. Main component
export default function EntityForm({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}: EntityFormProps) {
  // Form logic will go here
}
```

### Step 2: Form Configuration

```typescript
export default function EntityForm({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}: EntityFormProps) {
  // 1. Define default values
  const defaultValues = useMemo(
    () => ({
      id: '',
      nameL: '',
      nameF: '',
      email: '',
      isActive: true,
      // ... other fields
    }),
    []
  );

  // 2. Initialize form
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // 3. Extract form methods
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
    setValue,
    watch,
  } = form;

  // 4. Handle form reset when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Edit mode - populate with existing data
        reset({
          id: initialData.id,
          nameL: initialData.nameL || '',
          nameF: initialData.nameF || '',
          email: initialData.email || '',
          isActive: initialData.isActive ?? true,
          // ... other fields
        });
      } else {
        // Create mode - use default values
        reset(defaultValues);
      }
    }
  }, [initialData, isOpen, reset, defaultValues]);

  // 5. Handle form submission
  const onSubmitHandler: SubmitHandler<FormData> = async (data) => {
    const submitData = {
      ...data,
      id: initialData?.id || undefined,
    };

    await onSubmit(submitData);
    reset(defaultValues);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Entity' : 'Add New Entity'}
      maxWidth="2xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="button"
            isLoading={isSubmitting}
            onClick={handleSubmit(onSubmitHandler)}
          >
            {initialData ? 'Update' : 'Add'} Entity
          </Button>
        </div>
      }
    >
      <form className="space-y-4">{/* Form fields will go here */}</form>
    </Modal>
  );
}
```

## Field Types

### 1. Text Input

```typescript
// Basic text input
<Input
  label="Name (Arabic)"
  {...register('nameL')}
  error={errors.nameL?.message}
  placeholder="Enter name in Arabic"
/>

// Email input
<Input
  label="Email"
  type="email"
  {...register('email')}
  error={errors.email?.message}
  placeholder="Enter email address"
/>

// Password input
<Input
  label="Password"
  type="password"
  {...register('password')}
  error={errors.password?.message}
  placeholder="Enter password"
/>

// Number input
<Input
  label="Age"
  type="number"
  {...register('age', { valueAsNumber: true })}
  error={errors.age?.message}
  min={0}
  max={120}
/>
```

### 2. Select Dropdown

```typescript
// Basic select
<Select
  label="Category"
  {...register('categoryId')}
  error={errors.categoryId?.message}
  options={[
    { value: '', label: 'Select a category' },
    { value: '1', label: 'Category 1' },
    { value: '2', label: 'Category 2' },
  ]}
/>

// Select with dynamic options from API
const { data: categories } = useCategoryDropdown();

<Select
  label="Category"
  {...register('categoryId')}
  error={errors.categoryId?.message}
  options={[
    { value: '', label: 'Select a category' },
    ...(categories?.map((category) => ({
      value: category.value,
      label: category.label,
    })) || []),
  ]}
/>

// Select with enum values
<Select
  label="Status"
  {...register('status', { valueAsNumber: true })}
  error={errors.status?.message}
  options={Object.entries(StatusEnum)
    .filter(([, value]) => typeof value === 'number')
    .map(([key, value]) => ({
      label: key,
      value: value.toString(),
    }))}
/>
```

### 3. Textarea

```typescript
<Textarea
  label="Description"
  {...register('description')}
  error={errors.description?.message}
  placeholder="Enter description"
  rows={4}
/>
```

### 4. Date Input

```typescript
<Input
  label="Birth Date"
  type="date"
  {...register('birthDate')}
  error={errors.birthDate?.message}
/>;

// With date conversion
const onSubmitHandler: SubmitHandler<FormData> = async (data) => {
  const submitData = {
    ...data,
    birthDate: new Date(data.birthDate).toISOString(),
  };
  await onSubmit(submitData);
};
```

### 5. Checkbox

```typescript
<Checkbox
  label="Active"
  {...register('isActive')}
  error={errors.isActive?.message}
/>
```

### 6. Radio Buttons

```typescript
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">Gender</label>
  <div className="space-y-2">
    <label className="flex items-center">
      <input
        type="radio"
        value="male"
        {...register('gender')}
        className="mr-2"
      />
      Male
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        value="female"
        {...register('gender')}
        className="mr-2"
      />
      Female
    </label>
  </div>
  {errors.gender && (
    <p className="text-sm text-red-600">{errors.gender.message}</p>
  )}
</div>
```

### 7. File Upload

```typescript
<Input
  label="Profile Picture"
  type="file"
  accept="image/*"
  {...register('profilePicture')}
  error={errors.profilePicture?.message}
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('profilePicture', file);
    }
  }}
/>
```

## Validation

### 1. Basic Validation Schema

```typescript
const schema = z.object({
  // Required text field
  nameL: z.string().min(1, 'Name in Arabic is required'),

  // Optional text field
  description: z.string().optional(),

  // Email validation
  email: z.string().email('Invalid email address'),

  // Number validation
  age: z
    .number()
    .min(0, 'Age must be positive')
    .max(120, 'Age must be less than 120'),

  // Date validation
  birthDate: z.string().min(1, 'Birth date is required'),

  // Select validation
  categoryId: z.string().min(1, 'Category is required'),

  // Boolean validation
  isActive: z.boolean(),

  // Conditional validation
  password: z
    .string()
    .optional()
    .refine((val) => {
      if (!initialData && !val) return false; // Required for new users
      if (val && val.length < 6) return false; // Min length if provided
      return true;
    }, 'Password must be at least 6 characters'),
});
```

### 2. Advanced Validation

```typescript
const schema = z.object({
  // Custom validation
  phoneNumber: z
    .string()
    .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits'),

  // Conditional validation based on other fields
  confirmPassword: z
    .string()
    .optional()
    .refine((val) => {
      const password = watch('password');
      return !password || val === password;
    }, 'Passwords do not match'),

  // Array validation
  tags: z.array(z.string()).min(1, 'At least one tag is required'),

  // Object validation
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
  }),
});
```

### 3. Multilingual Form Validation

For forms that need to support multiple languages, validation messages should be dynamically translated using the `useTranslation` hook. This ensures that validation errors appear in the user's selected language.

#### Step 1: Create Translation Keys

First, add validation message translations to your locale files:

```typescript
// src/i18n/locales/en/clinic/financial.ts
export const financial = {
  expenses: {
    validation: {
      expenseTypeRequired: 'Expense type is required',
      expenseTypeInvalid: 'Invalid expense type',
      amountRequired: 'Amount is required',
      amountMinimum: 'Amount must be greater than 0',
      dateRequired: 'Date is required',
    },
  },
};

// src/i18n/locales/ar/clinic/financial.ts
export const financial = {
  expenses: {
    validation: {
      expenseTypeRequired: 'نوع المصروف مطلوب',
      expenseTypeInvalid: 'نوع المصروف غير صحيح',
      amountRequired: 'المبلغ مطلوب',
      amountMinimum: 'يجب أن يكون المبلغ أكبر من 0',
      dateRequired: 'التاريخ مطلوب',
    },
  },
};

// src/i18n/locales/es/clinic/financial.ts
export const financial = {
  expenses: {
    validation: {
      expenseTypeRequired: 'El tipo de gasto es requerido',
      expenseTypeInvalid: 'Tipo de gasto inválido',
      amountRequired: 'La cantidad es requerida',
      amountMinimum: 'La cantidad debe ser mayor que 0',
      dateRequired: 'La fecha es requerida',
    },
  },
};
```

#### Step 2: Create Dynamic Validation Schema

Create a function that generates the validation schema using the translation function:

```typescript
// validation.ts
import { z } from 'zod';
import { TFunction } from 'i18next';
import { ExpenseType } from '@/lib/api/types/expense';

export const createExpenseSchema = (t: TFunction) =>
  z.object({
    expenseType: z.coerce
      .number({
        required_error: t(
          'clinic.financial.expenses.validation.expenseTypeRequired'
        ),
        invalid_type_error: t(
          'clinic.financial.expenses.validation.expenseTypeInvalid'
        ),
      })
      .refine(
        (val) => Object.values(ExpenseType).includes(val as ExpenseType),
        {
          message: t('clinic.financial.expenses.validation.expenseTypeInvalid'),
        }
      ),
    amount: z
      .number()
      .min(0.01, t('clinic.financial.expenses.validation.amountMinimum')),
    expenseDate: z
      .string()
      .min(1, t('clinic.financial.expenses.validation.dateRequired')),
    description: z.string().optional(),
  });

// Legacy export for backward compatibility (optional)
export const expenseSchema = z.object({
  expenseType: z.coerce
    .number({
      required_error: 'Expense type is required',
      invalid_type_error: 'Expense type must be a number',
    })
    .refine((val) => Object.values(ExpenseType).includes(val as ExpenseType), {
      message: 'Invalid expense type',
    }),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  expenseDate: z.string().min(1, 'Date is required'),
  description: z.string().optional(),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
```

#### Step 3: Use Dynamic Schema in Form Component

Use the dynamic schema function in your form component:

```typescript
// ExpenseForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { createExpenseSchema, ExpenseFormData } from './validation';

export default function ExpenseForm() {
  const { t } = useTranslation();

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(createExpenseSchema(t)), // Pass translation function
    defaultValues: {
      expenseType: ExpenseType.Rent,
      amount: 0,
      expenseDate: '',
      description: '',
    },
  });

  // Rest of component...
}
```

#### Step 4: Best Practices for Multilingual Validation

1. **Consistent Translation Keys**: Use a consistent naming pattern for validation keys:

   ```typescript
   // Pattern: [module].[submodule].[form].validation.[fieldName][ValidationRule]
   'clinic.financial.expenses.validation.expenseTypeRequired';
   'clinic.financial.expenses.validation.amountMinimum';
   'clinic.patients.allergies.validation.nameRequired';
   ```

2. **Function-based Schema Creation**: Always create schemas using functions that accept the translation function:

   ```typescript
   // ✅ Good - Dynamic translation
   export const createSchema = (t: TFunction) =>
     z.object({
       name: z.string().min(1, t('validation.nameRequired')),
     });

   // ❌ Bad - Static translation keys
   export const schema = z.object({
     name: z.string().min(1, 'validation.nameRequired'),
   });
   ```

3. **Validation Message Structure**: Organize validation messages in a clear hierarchy:

   ```typescript
   export const module = {
     submodule: {
       validation: {
         fieldNameRequired: 'Field name is required',
         fieldNameMinLength: 'Field name must be at least {min} characters',
         fieldNameMaxLength: 'Field name must be at most {max} characters',
         fieldNameInvalid: 'Invalid field name format',
       },
     },
   };
   ```

4. **Parameterized Messages**: For validation messages that need dynamic values:

   ```typescript
   // In translation files
   validation: {
     minLength: 'Must be at least {{min}} characters',
     maxLength: 'Must be at most {{max}} characters',
     between: 'Must be between {{min}} and {{max}}',
   }

   // In validation schema
   export const createSchema = (t: TFunction) => z.object({
     name: z.string()
       .min(3, t('validation.minLength', { min: 3 }))
       .max(50, t('validation.maxLength', { max: 50 })),
     age: z.number()
       .min(18, t('validation.between', { min: 18, max: 120 }))
       .max(120, t('validation.between', { min: 18, max: 120 })),
   });
   ```

5. **Error Display**: Ensure error messages are properly displayed in forms:

   ```typescript
   // Form component
   const {
     register,
     formState: { errors },
   } = useForm({
     resolver: zodResolver(createSchema(t)),
   });

   return (
     <Input
       label={t('form.labels.name')}
       {...register('name')}
       error={errors.name?.message} // This will show translated error
     />
   );
   ```

6. **Testing Multilingual Validation**: Test validation in all supported languages:
   ```typescript
   // Test example
   describe('Expense Form Validation', () => {
     it('should show Arabic validation messages', () => {
       // Change language to Arabic
       i18n.changeLanguage('ar');

       // Test validation
       const schema = createExpenseSchema(i18n.t);
       const result = schema.safeParse({ amount: 0 });

       expect(result.error?.issues[0].message).toBe(
         'يجب أن يكون المبلغ أكبر من 0'
       );
     });
   });
   ```

#### Common Pitfalls to Avoid

1. **Using Static Translation Keys**: Don't use translation keys directly in Zod schemas
2. **Forgetting to Pass Translation Function**: Always pass `t` to schema creation functions
3. **Inconsistent Key Naming**: Use consistent patterns for translation keys
4. **Missing Translations**: Ensure all validation messages are translated in all supported languages
5. **Not Testing Different Languages**: Test validation in all supported languages

### 4. Multi-language Validation (Legacy Pattern)

```typescript
const schema = z.object({
  // Arabic name (required)
  nameL: z.string().min(1, 'الاسم بالعربية مطلوب'),

  // English name (required)
  nameF: z.string().min(1, 'Name in English is required'),

  // Description (optional in both languages)
  descriptionL: z.string().optional(),
  descriptionF: z.string().optional(),
});
```

## Form Patterns

### 1. Create/Edit Form Pattern

```typescript
interface EntityFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CreateUpdateEntityDto; // undefined for create, defined for edit
  onSubmit: (data: CreateUpdateEntityDto) => Promise<void>;
}

export default function EntityForm({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}: EntityFormProps) {
  const isEditMode = !!initialData;

  // Conditional field rendering
  return (
    <Modal
      title={isEditMode ? 'Edit Entity' : 'Add New Entity'}
      // ...
    >
      <form className="space-y-4">
        {/* Always show these fields */}
        <Input label="Name" {...register('name')} />

        {/* Only show password for new users */}
        {!isEditMode && (
          <Input label="Password" type="password" {...register('password')} />
        )}

        {/* Show different button text */}
        <Button type="submit">{isEditMode ? 'Update' : 'Create'}</Button>
      </form>
    </Modal>
  );
}
```

### 2. Multi-step Form Pattern

```typescript
const [currentStep, setCurrentStep] = useState(1);
const totalSteps = 3;

const nextStep = () => {
  if (currentStep < totalSteps) {
    setCurrentStep(currentStep + 1);
  }
};

const prevStep = () => {
  if (currentStep > 1) {
    setCurrentStep(currentStep - 1);
  }
};

return (
  <div>
    {/* Step indicator */}
    <div className="flex justify-between mb-6">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            i + 1 <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {i + 1}
        </div>
      ))}
    </div>

    {/* Step content */}
    {currentStep === 1 && (
      <div className="space-y-4">
        <Input label="Name" {...register('name')} />
        <Input label="Email" {...register('email')} />
      </div>
    )}

    {currentStep === 2 && (
      <div className="space-y-4">
        <Input label="Phone" {...register('phone')} />
        <Input label="Address" {...register('address')} />
      </div>
    )}

    {currentStep === 3 && (
      <div className="space-y-4">
        <Textarea label="Notes" {...register('notes')} />
      </div>
    )}

    {/* Navigation buttons */}
    <div className="flex justify-between mt-6">
      <Button
        variant="secondary"
        onClick={prevStep}
        disabled={currentStep === 1}
      >
        Previous
      </Button>

      {currentStep < totalSteps ? (
        <Button onClick={nextStep}>Next</Button>
      ) : (
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      )}
    </div>
  </div>
);
```

### 3. Dynamic Form Fields Pattern

```typescript
const [dynamicFields, setDynamicFields] = useState<
  Array<{ id: string; type: string }>
>([]);

const addField = () => {
  setDynamicFields([
    ...dynamicFields,
    { id: Date.now().toString(), type: 'text' },
  ]);
};

const removeField = (id: string) => {
  setDynamicFields(dynamicFields.filter((field) => field.id !== id));
};

return (
  <div className="space-y-4">
    {/* Static fields */}
    <Input label="Name" {...register('name')} />

    {/* Dynamic fields */}
    {dynamicFields.map((field) => (
      <div key={field.id} className="flex gap-2">
        <Input
          label={`Field ${field.id}`}
          {...register(`dynamicFields.${field.id}`)}
        />
        <Button variant="secondary" onClick={() => removeField(field.id)}>
          Remove
        </Button>
      </div>
    ))}

    <Button variant="secondary" onClick={addField}>
      Add Field
    </Button>
  </div>
);
```

## Best Practices

### 1. Form Organization

```typescript
// Group related fields
<div className="space-y-6">
  {/* Personal Information */}
  <div className="space-y-4">
    <h3 className="text-lg font-medium">Personal Information</h3>
    <div className="grid grid-cols-2 gap-4">
      <Input label="First Name" {...register('firstName')} />
      <Input label="Last Name" {...register('lastName')} />
    </div>
    <Input label="Email" {...register('email')} />
  </div>

  {/* Contact Information */}
  <div className="space-y-4">
    <h3 className="text-lg font-medium">Contact Information</h3>
    <Input label="Phone" {...register('phone')} />
    <Textarea label="Address" {...register('address')} />
  </div>
</div>
```

### 2. Error Handling

```typescript
// Consistent error display
const ErrorMessage = ({ error }: { error?: string }) => {
  if (!error) return null;
  return <p className="text-sm text-red-600 mt-1">{error}</p>;
};

// Usage
<Input label="Name" {...register('name')} error={errors.name?.message} />;
```

### 3. Loading States

```typescript
// Disable form during submission
<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
  <Input label="Name" {...register('name')} disabled={isSubmitting} />

  <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
    Submit
  </Button>
</form>
```

### 4. Accessibility

```typescript
// Proper labels and ARIA attributes
<Input
  label="Email Address"
  type="email"
  {...register('email')}
  error={errors.email?.message}
  aria-describedby={errors.email ? 'email-error' : undefined}
  required
/>;

{
  errors.email && (
    <p id="email-error" className="text-sm text-red-600">
      {errors.email.message}
    </p>
  );
}
```

## Examples

### Complete Form Example

```typescript
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useMemo } from 'react';
import Button from '@/components/common/Button';
import { Input, Select, Textarea } from '@/components/common/form';
import Modal from '@/components/common/Modal';
import { useCategoryDropdown } from '@/lib/api/hooks/useCategory';

// Validation schema
const schema = z.object({
  id: z.string().optional(),
  nameL: z.string().min(1, 'الاسم بالعربية مطلوب'),
  nameF: z.string().min(1, 'Name in English is required'),
  email: z.string().email('Invalid email address'),
  categoryId: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  isActive: z.boolean(),
  password: z
    .string()
    .optional()
    .refine((val) => {
      if (!initialData && !val) return false;
      if (val && val.length < 6) return false;
      return true;
    }, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CreateUpdateProductDto;
  onSubmit: (data: CreateUpdateProductDto) => Promise<void>;
}

export default function ProductForm({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}: ProductFormProps) {
  const { data: categories } = useCategoryDropdown();

  const defaultValues = useMemo(
    () => ({
      id: '',
      nameL: '',
      nameF: '',
      email: '',
      categoryId: '',
      description: '',
      isActive: true,
      password: '',
    }),
    []
  );

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = form;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          id: initialData.id,
          nameL: initialData.nameL || '',
          nameF: initialData.nameF || '',
          email: initialData.email || '',
          categoryId: initialData.categoryId || '',
          description: initialData.description || '',
          isActive: initialData.isActive ?? true,
          password: '',
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [initialData, isOpen, reset, defaultValues]);

  const onSubmitHandler: SubmitHandler<FormData> = async (data) => {
    const submitData = {
      ...data,
      id: initialData?.id || undefined,
    };

    await onSubmit(submitData);
    reset(defaultValues);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Product' : 'Add New Product'}
      maxWidth="2xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="button"
            isLoading={isSubmitting}
            onClick={handleSubmit(onSubmitHandler)}
          >
            {initialData ? 'Update' : 'Add'} Product
          </Button>
        </div>
      }
    >
      <form className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Name (Arabic)"
              {...register('nameL')}
              error={errors.nameL?.message}
              placeholder="أدخل الاسم بالعربية"
            />
            <Input
              label="Name (English)"
              {...register('nameF')}
              error={errors.nameF?.message}
              placeholder="Enter name in English"
            />
          </div>
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            placeholder="Enter email address"
          />
        </div>

        {/* Category and Description */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Details</h3>
          <Select
            label="Category"
            {...register('categoryId')}
            error={errors.categoryId?.message}
            options={[
              { value: '', label: 'Select a category' },
              ...(categories?.map((category) => ({
                value: category.value,
                label: category.label,
              })) || []),
            ]}
          />
          <Textarea
            label="Description"
            {...register('description')}
            error={errors.description?.message}
            placeholder="Enter description"
            rows={4}
          />
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Settings</h3>
          <div className="flex items-center">
            <input type="checkbox" {...register('isActive')} className="mr-2" />
            <label className="text-sm font-medium">Active</label>
          </div>
        </div>

        {/* Password (only for new users) */}
        {!initialData && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Security</h3>
            <Input
              label="Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              placeholder="Enter password"
            />
          </div>
        )}
      </form>
    </Modal>
  );
}
```

## Troubleshooting

### Common Issues

1. **Form not resetting properly**

   ```typescript
   // Ensure defaultValues is memoized
   const defaultValues = useMemo(() => ({ ... }), []);

   // Reset in useEffect
   useEffect(() => {
     if (isOpen) {
       reset(initialData || defaultValues);
     }
   }, [isOpen, initialData, reset, defaultValues]);
   ```

2. **Validation not working**

   ```typescript
   // Check schema definition
   const schema = z.object({
     field: z.string().min(1, 'Field is required'),
   });

   // Ensure resolver is set
   const form = useForm<FormData>({
     resolver: zodResolver(schema),
     defaultValues,
   });
   ```

3. **Select field not updating**

   ```typescript
   // Use valueAsNumber for numeric values
   <Select
     {...register('status', { valueAsNumber: true })}
     options={[...]}
   />
   ```

4. **Date field issues**
   ```typescript
   // Convert date for submission
   const onSubmitHandler: SubmitHandler<FormData> = async (data) => {
     const submitData = {
       ...data,
       birthDate: new Date(data.birthDate).toISOString(),
     };
     await onSubmit(submitData);
   };
   ```

### Debug Tips

1. **Check form state**

   ```typescript
   console.log('Form values:', watch());
   console.log('Form errors:', errors);
   ```

2. **Validate schema manually**

   ```typescript
   try {
     schema.parse(formData);
   } catch (error) {
     console.error('Validation error:', error);
   }
   ```

3. **Check field registration**
   ```typescript
   // Ensure field is properly registered
   <Input {...register('fieldName')} />
   ```

## Conclusion

This guide provides a comprehensive approach to creating forms in the Rousheta Frontend project. Follow these patterns consistently to maintain code quality and ensure a smooth user experience.

For additional help, refer to:

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [React Documentation](https://react.dev/)
