export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    resetPassword: '/auth/reset-password',
    forgotPassword: '/auth/forgot-password',
  },
  doctors: {
    list: '/doctors',
    details: (id: string) => `/doctors/${id}`,
    create: '/doctors',
    update: (id: string) => `/doctors/${id}`,
    delete: (id: string) => `/doctors/${id}`,
  },
  specialty: {
    LIST: '/specialty/getAll',
    CREATE_OR_UPDATE: '/specialty/CreateOrUpdate',
    DELETE: '/specialty/Delete',
    GET_ONE: '/specialty/:id',
  },
  country: {
    LIST: '/country/getAll',
    CREATE_OR_UPDATE: '/country/CreateOrUpdate',
    DELETE: '/country/Delete',
    GET_ONE: '/country/:id',
  },
  CLINICS: {
    LIST: '/clinics',
    CREATE: '/clinics',
    UPDATE: '/clinics/:id',
    DELETE: '/clinics/:id',
    GET_ONE: '/clinics/:id',
  },
  PATIENTS: {
    LIST: '/patients',
    CREATE: '/patients',
    UPDATE: '/patients/:id',
    DELETE: '/patients/:id',
    GET_ONE: '/patients/:id',
  },
  // Add more endpoints as needed
} as const;
