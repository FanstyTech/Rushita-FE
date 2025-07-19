export const VISIT_ENDPOINTS = {
  LIST: '/visit/getAll',
  GET_BY_ID: '/visit/:id',
  CREATE: '/visit/create',
  UPDATE: '/visit/:id',
  DELETE: '/visit/:id',
  UPDATE_STATUS: '/visit/:id/status',
  GET_STATUS_HISTORY: '/visit/:id/statusHistory',
  GET_DIAGNOSES: '/visit/:id/diagnoses',
  GET_PRESCRIPTIONS: '/visit/:id/prescriptions',
  GET_LAB_TESTS: '/visit/:id/labTests',
  GET_RADIOLOGY_TESTS: '/visit/:id/radiologyTests',
  GET_DENTAL_PROCEDURES: '/visit/:id/dentalProcedures',
} as const;
