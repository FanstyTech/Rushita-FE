# دليل نظام الترجمة المعياري - Rushita Frontend

## نظرة عامة

هذا الدليل يشرح كيفية استخدام وإضافة الترجمات في نظام Rushita Frontend باستخدام النهج المعياري (Modular Approach) الذي يجعل إدارة الترجمات أكثر تنظيماً وسهولة في الصيانة.

## هيكل نظام الترجمة

```
src/i18n/
├── config.ts                 # إعدادات i18n الرئيسية
└── locales/
    ├── ar/                   # الترجمات العربية
    │   ├── index.ts          # ملف الفهرس الرئيسي
    │   └── clinic/           # مجلد ترجمات العيادة
    │       ├── index.ts      # فهرس ترجمات العيادة
    │       ├── dashboard.ts  # ترجمات صفحة لوحة التحكم
    │       └── financial.ts  # ترجمات النظام المالي
    ├── en/                   # الترجمات الإنجليزية
    │   ├── index.ts
    │   └── clinic/
    │       ├── index.ts
    │       ├── dashboard.ts
    │       └── financial.ts
    └── es/                   # الترجمات الإسبانية
        ├── index.ts
        └── clinic/
            ├── index.ts
            ├── dashboard.ts
            └── financial.ts
```

## خطوات إضافة ترجمة لصفحة جديدة

### الخطوة 1: إنشاء ملفات الترجمة

لإضافة ترجمة لصفحة جديدة (مثل `patients/list`)، قم بإنشاء الملفات التالية:

#### 1.1 إنشاء ملف الترجمة العربية

```typescript
// src/i18n/locales/ar/patients/list.ts
export const patientsList = {
  // عنوان الصفحة
  pageTitle: 'قائمة المرضى',

  // أزرار العمليات
  actions: {
    addNew: 'إضافة مريض جديد',
    edit: 'تعديل',
    delete: 'حذف',
    view: 'عرض',
  },

  // أعمدة الجدول
  table: {
    patientName: 'اسم المريض',
    phoneNumber: 'رقم الهاتف',
    lastVisit: 'آخر زيارة',
    status: 'الحالة',
  },

  // رسائل الحالة
  messages: {
    noPatients: 'لا يوجد مرضى',
    loading: 'جاري التحميل...',
    error: 'حدث خطأ في تحميل البيانات',
  },
};
```

#### 1.2 إنشاء ملف الترجمة الإنجليزية

```typescript
// src/i18n/locales/en/patients/list.ts
export const patientsList = {
  // Page title
  pageTitle: 'Patients List',

  // Action buttons
  actions: {
    addNew: 'Add New Patient',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
  },

  // Table columns
  table: {
    patientName: 'Patient Name',
    phoneNumber: 'Phone Number',
    lastVisit: 'Last Visit',
    status: 'Status',
  },

  // Status messages
  messages: {
    noPatients: 'No patients found',
    loading: 'Loading...',
    error: 'Error loading data',
  },
};
```

#### 1.3 إنشاء ملف الترجمة الإسبانية

```typescript
// src/i18n/locales/es/patients/list.ts
export const patientsList = {
  // Título de la página
  pageTitle: 'Lista de Pacientes',

  // Botones de acción
  actions: {
    addNew: 'Agregar Nuevo Paciente',
    edit: 'Editar',
    delete: 'Eliminar',
    view: 'Ver',
  },

  // Columnas de la tabla
  table: {
    patientName: 'Nombre del Paciente',
    phoneNumber: 'Número de Teléfono',
    lastVisit: 'Última Visita',
    status: 'Estado',
  },

  // Mensajes de estado
  messages: {
    noPatients: 'No se encontraron pacientes',
    loading: 'Cargando...',
    error: 'Error al cargar datos',
  },
};
```

### الخطوة 2: إنشاء ملفات الفهرس

#### 2.1 إنشاء فهرس المجلد الجديد

```typescript
// src/i18n/locales/ar/patients/index.ts
import { patientsList } from './list';

export const patients = {
  list: patientsList,
};
```

```typescript
// src/i18n/locales/en/patients/index.ts
import { patientsList } from './list';

export const patients = {
  list: patientsList,
};
```

```typescript
// src/i18n/locales/es/patients/index.ts
import { patientsList } from './list';

export const patients = {
  list: patientsList,
};
```

#### 2.2 تحديث الفهرس الرئيسي لكل لغة

```typescript
// src/i18n/locales/ar/index.ts
import { clinic } from './clinic';
import { patients } from './patients'; // إضافة الاستيراد الجديد

export const ar = {
  clinic,
  patients, // إضافة الترجمات الجديدة
};
```

```typescript
// src/i18n/locales/en/index.ts
import { clinic } from './clinic';
import { patients } from './patients'; // إضافة الاستيراد الجديد

export const en = {
  clinic,
  patients, // إضافة الترجمات الجديدة
};
```

```typescript
// src/i18n/locales/es/index.ts
import { clinic } from './clinic';
import { patients } from './patients'; // إضافة الاستيراد الجديد

export const es = {
  clinic,
  patients, // إضافة الترجمات الجديدة
};
```

### الخطوة 3: تحديث إعدادات i18n

```typescript
// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ar } from './locales/ar';
import { en } from './locales/en';
import { es } from './locales/es';

const resources = {
  ar: {
    translation: {
      ...ar, // يتضمن clinic و patients والمجلدات الأخرى
    },
  },
  en: {
    translation: {
      ...en,
    },
  },
  es: {
    translation: {
      ...es,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ar',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
```

### الخطوة 4: استخدام الترجمات في المكون

```tsx
// src/app/patients/list/page.tsx
'use client';

import { useTranslation } from 'react-i18next';

export default function PatientsList() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('patients.list.pageTitle')}</h1>

      <button>{t('patients.list.actions.addNew')}</button>

      <table>
        <thead>
          <tr>
            <th>{t('patients.list.table.patientName')}</th>
            <th>{t('patients.list.table.phoneNumber')}</th>
            <th>{t('patients.list.table.lastVisit')}</th>
            <th>{t('patients.list.table.status')}</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan={4}>{t('patients.list.messages.noPatients')}</td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.phone}</td>
                <td>{patient.lastVisit}</td>
                <td>{patient.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
```

## ترجمة رسائل التحقق من صحة النماذج (Form Validation)

### نظرة عامة

ترجمة رسائل التحقق من صحة النماذج تتطلب نهجاً خاصاً لأن مكتبة Zod تحتاج إلى رسائل مترجمة ديناميكياً وليس مفاتيح ثابتة.

### الخطوة 1: إنشاء ترجمات رسائل التحقق

#### 1.1 الترجمة العربية

```typescript
// src/i18n/locales/ar/clinic/financial.ts
export const financial = {
  expenses: {
    title: 'المصروفات',
    description: 'إدارة مصروفات العيادة والتقارير المالية',

    // Form fields
    form: {
      labels: {
        expenseType: 'نوع المصروف',
        amount: 'المبلغ',
        date: 'التاريخ',
        description: 'الوصف',
      },
    },

    // Validation messages
    validation: {
      expenseTypeRequired: 'نوع المصروف مطلوب',
      expenseTypeInvalid: 'نوع المصروف غير صحيح',
      amountRequired: 'المبلغ مطلوب',
      amountMinimum: 'يجب أن يكون المبلغ أكبر من 0',
      dateRequired: 'التاريخ مطلوب',
    },

    // Expense types
    expenseTypes: {
      rent: 'إيجار',
      utilities: 'مرافق',
      salaries: 'رواتب',
      supplies: 'مستلزمات',
      equipment: 'معدات',
      maintenance: 'صيانة',
      insurance: 'تأمين',
      marketing: 'تسويق',
      other: 'أخرى',
    },
  },
};
```

#### 1.2 الترجمة الإنجليزية

```typescript
// src/i18n/locales/en/clinic/financial.ts
export const financial = {
  expenses: {
    title: 'Expenses',
    description: 'Manage clinic expenses and financial reports',

    // Form fields
    form: {
      labels: {
        expenseType: 'Expense Type',
        amount: 'Amount',
        date: 'Date',
        description: 'Description',
      },
    },

    // Validation messages
    validation: {
      expenseTypeRequired: 'Expense type is required',
      expenseTypeInvalid: 'Invalid expense type',
      amountRequired: 'Amount is required',
      amountMinimum: 'Amount must be greater than 0',
      dateRequired: 'Date is required',
    },

    // Expense types
    expenseTypes: {
      rent: 'Rent',
      utilities: 'Utilities',
      salaries: 'Salaries',
      supplies: 'Supplies',
      equipment: 'Equipment',
      maintenance: 'Maintenance',
      insurance: 'Insurance',
      marketing: 'Marketing',
      other: 'Other',
    },
  },
};
```

#### 1.3 الترجمة الإسبانية

```typescript
// src/i18n/locales/es/clinic/financial.ts
export const financial = {
  expenses: {
    title: 'Gastos',
    description: 'Gestionar gastos de la clínica e informes financieros',

    // Form fields
    form: {
      labels: {
        expenseType: 'Tipo de Gasto',
        amount: 'Cantidad',
        date: 'Fecha',
        description: 'Descripción',
      },
    },

    // Validation messages
    validation: {
      expenseTypeRequired: 'El tipo de gasto es requerido',
      expenseTypeInvalid: 'Tipo de gasto inválido',
      amountRequired: 'La cantidad es requerida',
      amountMinimum: 'La cantidad debe ser mayor que 0',
      dateRequired: 'La fecha es requerida',
    },

    // Expense types
    expenseTypes: {
      rent: 'Alquiler',
      utilities: 'Servicios Públicos',
      salaries: 'Salarios',
      supplies: 'Suministros',
      equipment: 'Equipos',
      maintenance: 'Mantenimiento',
      insurance: 'Seguro',
      marketing: 'Marketing',
      other: 'Otros',
    },
  },
};
```

### الخطوة 2: إنشاء مخطط التحقق الديناميكي

```typescript
// src/app/clinic/financial/expenses/validation.ts
import { z } from 'zod';
import { TFunction } from 'i18next';
import { ExpenseType } from '@/lib/api/types/expense';

// Dynamic schema function that accepts translation function
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

// Legacy static schema for backward compatibility
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

### الخطوة 3: استخدام المخطط الديناميكي في المكون

```tsx
// src/app/clinic/financial/expenses/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { createExpenseSchema, ExpenseFormData } from './validation';

export default function ExpensesPage() {
  const { t } = useTranslation();

  // Use dynamic schema with translation function
  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(createExpenseSchema(t)), // Pass translation function
    defaultValues: {
      expenseType: ExpenseType.Rent,
      amount: 0,
      expenseDate: '',
      description: '',
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>{t('clinic.financial.expenses.form.labels.expenseType')}</label>
        <select {...register('expenseType', { valueAsNumber: true })}>
          <option value={ExpenseType.Rent}>
            {t('clinic.financial.expenses.expenseTypes.rent')}
          </option>
          <option value={ExpenseType.Utilities}>
            {t('clinic.financial.expenses.expenseTypes.utilities')}
          </option>
          {/* More options... */}
        </select>
        {errors.expenseType && (
          <p className="error">{errors.expenseType.message}</p>
        )}
      </div>

      <div>
        <label>{t('clinic.financial.expenses.form.labels.amount')}</label>
        <input
          type="number"
          step="0.01"
          {...register('amount', { valueAsNumber: true })}
        />
        {errors.amount && <p className="error">{errors.amount.message}</p>}
      </div>

      <div>
        <label>{t('clinic.financial.expenses.form.labels.date')}</label>
        <input type="date" {...register('expenseDate')} />
        {errors.expenseDate && (
          <p className="error">{errors.expenseDate.message}</p>
        )}
      </div>

      <button type="submit">
        {t('clinic.financial.expenses.actions.save')}
      </button>
    </form>
  );
}
```

### أفضل الممارسات لترجمة التحقق من النماذج

#### 1. تسمية مفاتيح التحقق

```typescript
// نمط التسمية المتسق
validation: {
  fieldNameRequired: 'Field name is required',
  fieldNameMinLength: 'Field name must be at least {min} characters',
  fieldNameMaxLength: 'Field name must be at most {max} characters',
  fieldNameInvalid: 'Invalid field name format',
}
```

#### 2. استخدام الدوال بدلاً من المخططات الثابتة

```typescript
// ✅ جيد - ترجمة ديناميكية
export const createSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t('validation.nameRequired')),
  });

// ❌ سيء - مفاتيح ترجمة ثابتة
export const schema = z.object({
  name: z.string().min(1, 'validation.nameRequired'),
});
```

#### 3. رسائل مع معاملات ديناميكية

```typescript
// في ملفات الترجمة
validation: {
  minLength: 'Must be at least {{min}} characters',
  maxLength: 'Must be at most {{max}} characters',
  between: 'Must be between {{min}} and {{max}}',
}

// في مخطط التحقق
export const createSchema = (t: TFunction) => z.object({
  name: z.string()
    .min(3, t('validation.minLength', { min: 3 }))
    .max(50, t('validation.maxLength', { max: 50 })),
  age: z.number()
    .min(18, t('validation.between', { min: 18, max: 120 }))
    .max(120, t('validation.between', { min: 18, max: 120 })),
});
```

#### 4. تنظيم ترجمات التحقق

```typescript
export const module = {
  submodule: {
    // Form labels
    form: {
      labels: {
        fieldName: 'Field Name',
        // ...
      },
    },

    // Validation messages
    validation: {
      fieldNameRequired: 'Field name is required',
      fieldNameInvalid: 'Invalid field name',
      // ...
    },

    // Other translations
    actions: {
      save: 'Save',
      cancel: 'Cancel',
      // ...
    },
  },
};
```

#### 5. اختبار الترجمات متعددة اللغات

```typescript
// مثال على الاختبار
describe('Expense Form Validation', () => {
  it('should show Arabic validation messages', () => {
    // تغيير اللغة إلى العربية
    i18n.changeLanguage('ar');

    // اختبار التحقق
    const schema = createExpenseSchema(i18n.t);
    const result = schema.safeParse({ amount: 0 });

    expect(result.error?.issues[0].message).toBe(
      'يجب أن يكون المبلغ أكبر من 0'
    );
  });

  it('should show English validation messages', () => {
    i18n.changeLanguage('en');

    const schema = createExpenseSchema(i18n.t);
    const result = schema.safeParse({ amount: 0 });

    expect(result.error?.issues[0].message).toBe(
      'Amount must be greater than 0'
    );
  });
});
```

## أفضل الممارسات

### 1. تسمية المفاتيح

- استخدم أسماء وصفية وواضحة
- اتبع نمط التسمية المتسق: `camelCase`
- قم بتجميع المفاتيح المترابطة في كائنات فرعية

```typescript
// جيد ✅
stats: {
  totalPatients: 'إجمالي المرضى',
  todayAppointments: 'مواعيد اليوم',
}

// سيء ❌
totalPatients: 'إجمالي المرضى',
todayAppts: 'مواعيد اليوم',
```

### 2. تنظيم الملفات

- ملف واحد لكل صفحة أو مكون رئيسي
- استخدم مجلدات لتجميع الصفحات المترابطة
- أنشئ ملف `index.ts` لكل مجلد

### 3. التعليقات

- أضف تعليقات لتوضيح أقسام الترجمة
- استخدم تعليقات باللغة الإنجليزية للاتساق

```typescript
export const dashboard = {
  // Error states
  errorLoading: 'خطأ في تحميل البيانات',

  // Navigation items
  navigation: {
    home: 'الرئيسية',
    patients: 'المرضى',
  },
};
```

### 4. الاتساق بين اللغات

- تأكد من وجود نفس المفاتيح في جميع ملفات اللغات
- احتفظ بنفس البنية والتنظيم
- استخدم نفس التعليقات

### 5. ترجمة التحقق من النماذج

- استخدم دوال إنشاء المخططات بدلاً من المخططات الثابتة
- مرر دالة الترجمة `t` إلى مخطط التحقق
- نظم رسائل التحقق في قسم منفصل `validation`
- اختبر الترجمات في جميع اللغات المدعومة

## استكشاف الأخطاء

### خطأ: مفتاح الترجمة غير موجود

```
Translation key 'patients.list.title' not found
```

**الحل:**

1. تأكد من إضافة المفتاح في جميع ملفات اللغات
2. تحقق من صحة مسار المفتاح
3. تأكد من تحديث ملفات الفهرس

### خطأ: الترجمة لا تظهر

**الحل:**

1. تأكد من استيراد `useTranslation` في المكون
2. تحقق من تحديث `config.ts`
3. تأكد من إعادة تشغيل الخادم بعد إضافة ملفات جديدة

### خطأ: رسائل التحقق لا تترجم

```
Validation messages showing translation keys instead of translated text
```

**الحل:**

1. تأكد من استخدام `createSchema(t)` بدلاً من `schema` الثابت
2. تحقق من تمرير دالة الترجمة `t` إلى مخطط التحقق
3. تأكد من وجود مفاتيح التحقق في جميع ملفات اللغات

## مثال كامل: إضافة صفحة جديدة

لنفترض أننا نريد إضافة صفحة "إعدادات العيادة":

1. **إنشاء ملفات الترجمة:**

   - `src/i18n/locales/ar/clinic/settings.ts`
   - `src/i18n/locales/en/clinic/settings.ts`
   - `src/i18n/locales/es/clinic/settings.ts`

2. **تحديث فهرس العيادة:**

   ```typescript
   // src/i18n/locales/ar/clinic/index.ts
   import { clinicDashboard } from './dashboard';
   import { clinicSettings } from './settings'; // جديد
   import { financial } from './financial';

   export const clinic = {
     dashboard: clinicDashboard,
     settings: clinicSettings, // جديد
     financial,
   };
   ```

3. **استخدام الترجمات:**

   ```tsx
   // src/app/clinic/settings/page.tsx
   const { t } = useTranslation();

   return <h1>{t('clinic.settings.pageTitle')}</h1>;
   ```

## الخلاصة

هذا النظام المعياري يوفر:

- **تنظيم أفضل:** كل صفحة لها ملف ترجمة منفصل
- **سهولة الصيانة:** تعديل ترجمات صفحة واحدة دون التأثير على الأخرى
- **قابلية التوسع:** إضافة صفحات جديدة بسهولة
- **وضوح الكود:** مفاتيح ترجمة واضحة ومنظمة
- **دعم ترجمة النماذج:** نظام متكامل لترجمة رسائل التحقق من صحة النماذج

اتبع هذا الدليل عند إضافة ترجمات جديدة لضمان الاتساق والجودة في المشروع.
