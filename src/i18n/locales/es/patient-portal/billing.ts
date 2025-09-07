export const billing = {
  list: {
    title: 'Facturación y Pagos',
    description: 'Ver y gestionar sus facturas médicas y pagos',
    filters: {
      search: 'Buscar',
      searchPlaceholder: 'Buscar por número de factura...',
      description:
        'Puede filtrar facturas por estado, fecha o buscar por número de factura',
      status: 'Estado de Factura',
      statusAll: 'Todos los Estados',
      filter: 'Filtrar Resultados',
      reset: 'Restablecer Filtros',
    },
    stats: {
      totalInvoices: 'Total de Facturas',
      totalAmount: 'Monto Total',
      totalPaid: 'Pagado',
      totalUnpaid: 'Pendiente',
    },
    card: {
      invoiceNumber: 'Factura #',
      invoiceDate: 'Fecha de Factura:',
      dueDate: 'Fecha de Vencimiento:',
      totalAmount: 'Monto Total:',
      paidAmount: 'Pagado:',
      remainingAmount: 'Pendiente:',
      lastPayment: 'Último Pago:',
      servicesCount: 'Cantidad de Servicios:',
      noPayment: 'Ninguno',
      viewDetails: 'Ver Detalles',
      downloadPDF: 'Descargar PDF',
    },
    empty: {
      title: 'No se Encontraron Facturas',
      description:
        'No se encontraron facturas que coincidan con sus criterios de búsqueda',
    },
    error: {
      title: 'Error al Cargar Facturas',
      description:
        'Ocurrió un error al cargar las facturas. Por favor, inténtelo de nuevo.',
      retry: 'Reintentar',
    },
    loading: 'Cargando facturas...',
  },
  details: {
    title: 'Detalles de Factura',
    subtitle: 'Detalles de factura y pagos',
    backToList: 'Volver a Facturas',
    sections: {
      invoiceSummary: 'Resumen de Factura',
      serviceDetails: 'Detalles de Servicios',
      paymentHistory: 'Historial de Pagos',
      financialSummary: 'Resumen Financiero',
      patientDoctorInfo: 'Información del Paciente y Doctor',
    },
    invoiceInfo: {
      invoiceDate: 'Fecha de Factura',
      dueDate: 'Fecha de Vencimiento',
      status: 'Estado',
      invoiceNumber: 'Número de Factura',
    },
    serviceDetails: {
      quantity: 'Cantidad:',
    },
    paymentHistory: {
      referenceNumber: 'Referencia #:',
    },
    financialSummary: {
      totalAmount: 'Monto Total:',
      paidAmount: 'Pagado:',
      remainingAmount: 'Pendiente:',
    },
    patientInfo: {
      patient: 'Paciente',
      doctor: 'Doctor',
      clinic: 'Clínica',
    },
    error: {
      title: 'Error al Cargar Detalles de Factura',
      description: 'Ocurrió un error al cargar los detalles de la factura.',
      backToList: 'Volver a Facturas',
    },
    loading: 'Cargando detalles de factura...',
  },
};
