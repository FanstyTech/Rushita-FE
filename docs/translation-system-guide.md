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
    │       └── dashboard.ts  # ترجمات صفحة لوحة التحكم
    ├── en/                   # الترجمات الإنجليزية
    │   ├── index.ts
    │   └── clinic/
    │       ├── index.ts
    │       └── dashboard.ts
    └── es/                   # الترجمات الإسبانية
        ├── index.ts
        └── clinic/
            ├── index.ts
            └── dashboard.ts
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

   export const clinic = {
     dashboard: clinicDashboard,
     settings: clinicSettings, // جديد
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

اتبع هذا الدليل عند إضافة ترجمات جديدة لضمان الاتساق والجودة في المشروع.
