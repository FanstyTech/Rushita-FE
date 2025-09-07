export const financial = {
  expenses: {
    title: 'Gastos',
    description: 'Gestionar gastos de la clínica e informes financieros',

    summary: {
      cards: {
        totalExpenses: 'Gastos Totales',
        thisMonth: 'Este Mes',
        averageExpenses: 'Gastos Promedio',
        totalTransactions: 'Transacciones Totales',
      },
    },

    table: {
      columns: {
        expenseType: 'Tipo de Gasto',
        amount: 'Cantidad',
        date: 'Fecha',
        description: 'Descripción',
        actions: 'Acciones',
      },
    },

    filters: {
      searchPlaceholder: 'Buscar gastos...',
      expenseType: 'Tipo de Gasto',
      allTypes: 'Todos los Tipos',
    },

    actions: {
      add: 'Agregar Nuevo Gasto',
      edit: 'Editar',
      delete: 'Eliminar',
      cancel: 'Cancelar',
      save: 'Guardar',
      addExpense: 'Agregar Gasto',
      updateExpense: 'Actualizar Gasto',
    },

    form: {
      title: {
        add: 'Agregar Nuevo Gasto',
        edit: 'Editar Gasto',
      },
      labels: {
        expenseType: 'Tipo de Gasto',
        amount: 'Cantidad',
        date: 'Fecha',
        description: 'Descripción',
      },
      placeholders: {
        description: 'Ingrese descripción del gasto...',
      },
    },

    expenseTypes: {
      rent: 'Alquiler',
      utilities: 'Servicios Públicos',
      salaries: 'Salarios',
      supplies: 'Suministros',
      equipment: 'Equipos',
      maintenance: 'Mantenimiento',
      insurance: 'Seguro',
      marketing: 'Marketing',
      other: 'Otro',
    },

    validation: {
      expenseTypeRequired: 'El tipo de gasto es requerido',
      expenseTypeInvalid: 'Tipo de gasto inválido',
      amountRequired: 'La cantidad es requerida',
      amountMinimum: 'La cantidad debe ser mayor que 0',
      dateRequired: 'La fecha es requerida',
    },

    deleteModal: {
      title: 'Eliminar Gasto',
      message: '¿Está seguro de que desea eliminar este registro de gasto?',
      secondaryMessage: 'Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
    },

    emptyStates: {
      noExpenses: {
        title: 'No se encontraron gastos',
        description:
          'No hay gastos que coincidan con los filtros seleccionados',
      },
    },

    loading: {
      loadingExpenses: 'Cargando gastos...',
      savingExpense: 'Guardando gasto...',
      deletingExpense: 'Eliminando gasto...',
    },

    messages: {
      success: {
        expenseAdded: 'Gasto agregado exitosamente',
        expenseUpdated: 'Gasto actualizado exitosamente',
        expenseDeleted: 'Gasto eliminado exitosamente',
      },
      error: {
        addExpenseFailed: 'Error al agregar gasto',
        updateExpenseFailed: 'Error al actualizar gasto',
        deleteExpenseFailed: 'Error al eliminar gasto',
        loadingFailed: 'Error al cargar datos',
      },
    },
  },

  revenues: {
    title: 'Ingresos',
    description: 'Gestionar ingresos de la clínica e informes financieros',

    summary: {
      cards: {
        totalRevenue: 'Ingresos Totales',
        thisMonth: 'Este Mes',
        averageRevenue: 'Ingresos Promedio',
        totalTransactions: 'Transacciones Totales',
      },
    },

    table: {
      columns: {
        revenueType: 'Tipo de Ingreso',
        amount: 'Cantidad',
        date: 'Fecha',
        description: 'Descripción',
        actions: 'Acciones',
      },
    },

    filters: {
      searchPlaceholder: 'Buscar ingresos...',
      revenueType: 'Tipo de Ingreso',
      allTypes: 'Todos los Tipos',
    },

    actions: {
      add: 'Agregar Nuevo Ingreso',
      edit: 'Editar',
      delete: 'Eliminar',
      cancel: 'Cancelar',
      save: 'Guardar',
      addRevenue: 'Agregar Ingreso',
      updateRevenue: 'Actualizar Ingreso',
    },

    form: {
      title: {
        add: 'Agregar Nuevo Ingreso',
        edit: 'Editar Ingreso',
      },
      labels: {
        revenueType: 'Tipo de Ingreso',
        amount: 'Cantidad',
        date: 'Fecha',
        description: 'Descripción',
      },
      placeholders: {
        description: 'Ingrese descripción del ingreso...',
      },
    },

    revenueTypes: {
      visit: 'Visita',
      donations: 'Donaciones',
      governmentSupport: 'Apoyo Gubernamental',
      other: 'Otro',
    },

    validation: {
      revenueTypeRequired: 'El tipo de ingreso es requerido',
      revenueTypeInvalid: 'Tipo de ingreso inválido',
      amountRequired: 'La cantidad es requerida',
      amountMinimum: 'La cantidad debe ser mayor que 0',
      dateRequired: 'La fecha es requerida',
    },

    deleteModal: {
      title: 'Eliminar Ingreso',
      message: '¿Está seguro de que desea eliminar este registro de ingreso?',
      secondaryMessage: 'Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
    },

    emptyStates: {
      noRevenues: {
        title: 'No se encontraron ingresos',
        description:
          'No hay ingresos que coincidan con los filtros seleccionados',
      },
    },

    loading: {
      loadingRevenues: 'Cargando ingresos...',
      savingRevenue: 'Guardando ingreso...',
      deletingRevenue: 'Eliminando ingreso...',
    },

    messages: {
      success: {
        revenueAdded: 'Ingreso agregado exitosamente',
        revenueUpdated: 'Ingreso actualizado exitosamente',
        revenueDeleted: 'Ingreso eliminado exitosamente',
      },
      error: {
        addRevenueFailed: 'Error al agregar ingreso',
        updateRevenueFailed: 'Error al actualizar ingreso',
        deleteRevenueFailed: 'Error al eliminar ingreso',
        loadingFailed: 'Error al cargar datos',
      },
    },
  },

  salaries: {
    title: 'Salarios',
    description: 'Gestionar salarios del personal e informes financieros',

    summary: {
      cards: {
        totalSalaries: 'Salarios Totales',
        totalAmount: 'Cantidad Total',
        totalPaid: 'Total Pagado',
        pendingSalaries: 'Salarios Pendientes',
        pending: 'pendiente',
      },
    },

    table: {
      columns: {
        staffName: 'Nombre del Personal',
        amount: 'Cantidad',
        salaryMonth: 'Mes de Salario',
        status: 'Estado',
        paidDate: 'Fecha de Pago',
        notes: 'Notas',
        actions: 'Acciones',
      },
    },

    filters: {
      searchPlaceholder: 'Buscar salarios...',
      status: 'Estado',
      allStatuses: 'Todos los Estados',
    },

    actions: {
      add: 'Agregar Nuevo Salario',
      edit: 'Editar',
      delete: 'Eliminar',
      cancel: 'Cancelar',
      save: 'Guardar',
      addSalary: 'Agregar Salario',
      updateSalary: 'Actualizar Salario',
    },

    form: {
      title: {
        add: 'Agregar Nuevo Salario',
        edit: 'Editar Salario',
      },
      labels: {
        staffMember: 'Miembro del Personal',
        amount: 'Cantidad',
        salaryMonth: 'Mes de Salario',
        status: 'Estado',
        paidDate: 'Fecha de Pago',
        notes: 'Notas',
      },
      placeholders: {
        notes: 'Ingrese notas...',
      },
    },

    statuses: {
      pending: 'Pendiente',
      paid: 'Pagado',
      cancelled: 'Cancelado',
      overdue: 'Vencido',
    },

    validation: {
      staffIdRequired: 'El miembro del personal es requerido',
      amountRequired: 'La cantidad es requerida',
      amountMinimum: 'La cantidad debe ser mayor que 0',
      salaryMonthRequired: 'El mes de salario es requerido',
      statusRequired: 'El estado es requerido',
      statusInvalid: 'Estado inválido',
    },

    deleteModal: {
      title: 'Eliminar Salario',
      message: '¿Está seguro de que desea eliminar este registro de salario?',
      secondaryMessage: 'Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
    },

    emptyStates: {
      noSalaries: {
        title: 'No se encontraron salarios',
        description:
          'No hay salarios que coincidan con los filtros seleccionados',
      },
    },

    loading: {
      loadingSalaries: 'Cargando salarios...',
      savingSalary: 'Guardando salario...',
      deletingSalary: 'Eliminando salario...',
    },

    messages: {
      success: {
        salaryAdded: 'Salario agregado exitosamente',
        salaryUpdated: 'Salario actualizado exitosamente',
        salaryDeleted: 'Salario eliminado exitosamente',
      },
      error: {
        addSalaryFailed: 'Error al agregar salario',
        updateSalaryFailed: 'Error al actualizar salario',
        deleteSalaryFailed: 'Error al eliminar salario',
        loadingFailed: 'Error al cargar datos',
      },
    },
  },

  invoices: {
    title: 'Facturas',
    description: 'Gestionar facturas de pacientes y pagos',

    summary: {
      cards: {
        totalInvoices: 'Facturas Totales',
        totalAmount: 'Cantidad Total',
        totalPaid: 'Total Pagado',
        overdueInvoices: 'Facturas Vencidas',
        unpaid: 'sin pagar',
      },
    },

    table: {
      columns: {
        invoiceNumber: 'Factura #',
        patientName: 'Paciente',
        doctorName: 'Doctor',
        totalAmount: 'Cantidad Total',
        paidUnpaid: 'Pagado/Sin Pagar',
        status: 'Estado',
        dueDate: 'Fecha de Vencimiento',
        actions: 'Acciones',
        paid: 'Pagado',
        unpaid: 'Sin Pagar',
      },
    },

    filters: {
      searchPlaceholder: 'Buscar facturas...',
      status: 'Estado',
      allStatuses: 'Todos los Estados',
    },

    actions: {
      view: 'Ver',
      addPayment: 'Agregar Pago',
      delete: 'Eliminar',
      close: 'Cerrar',
      cancel: 'Cancelar',
    },

    statuses: {
      draft: 'Borrador',
      sent: 'Enviado',
      paid: 'Pagado',
      overdue: 'Vencido',
      cancelled: 'Cancelado',
      partial: 'Parcial',
    },

    paymentMethods: {
      cash: 'Efectivo',
      card: 'Tarjeta',
      bankTransfer: 'Transferencia Bancaria',
      insurance: 'Seguro',
      check: 'Cheque',
    },

    serviceTypes: {
      consultation: 'Consulta',
      procedure: 'Procedimiento',
      medication: 'Medicamento',
      laboratory: 'Laboratorio',
      radiology: 'Radiología',
      surgery: 'Cirugía',
      therapy: 'Terapia',
      other: 'Otro',
    },

    modals: {
      payment: {
        title: 'Agregar Pago',
        labels: {
          amount: 'Cantidad',
          paymentDate: 'Fecha de Pago',
          paymentMethod: 'Método de Pago',
          referenceNumber: 'Número de Referencia',
          notes: 'Notas',
        },
        buttons: {
          addPayment: 'Agregar Pago',
          cancel: 'Cancelar',
        },
      },
      view: {
        title: 'Detalles de Factura - {{invoiceNumber}}',
        sections: {
          invoiceInformation: 'Información de Factura',
          patientDoctor: 'Paciente y Doctor',
          invoiceItems: 'Elementos de Factura',
          paymentSummary: 'Resumen de Pago',
          paymentHistory: 'Historial de Pagos',
          notes: 'Notas',
        },
        labels: {
          invoiceNumber: 'Número de Factura:',
          invoiceDate: 'Fecha de Factura:',
          dueDate: 'Fecha de Vencimiento:',
          status: 'Estado:',
          patient: 'Paciente:',
          doctor: 'Doctor:',
          totalAmount: 'Cantidad Total',
          paidAmount: 'Cantidad Pagada',
          unpaidAmount: 'Cantidad Sin Pagar',
          payment: 'Pago #{{number}}',
        },
        buttons: {
          close: 'Cerrar',
          addPayment: 'Agregar Pago',
        },
        messages: {
          noNotes: 'No hay notas adicionales para esta factura.',
        },
      },
      delete: {
        title: 'Eliminar Factura',
        message: '¿Está seguro de que desea eliminar esta factura?',
        secondaryMessage: 'Esta acción no se puede deshacer.',
        confirmText: 'Eliminar',
      },
    },

    validation: {
      amountRequired: 'La cantidad es requerida',
      amountMinimum: 'La cantidad debe ser mayor que 0',
      paymentDateRequired: 'La fecha de pago es requerida',
      paymentMethodRequired: 'El método de pago es requerido',
      paymentMethodInvalid: 'Método de pago inválido',
    },

    loading: {
      loadingInvoices: 'Cargando facturas...',
      savingPayment: 'Guardando pago...',
      deletingInvoice: 'Eliminando factura...',
    },

    messages: {
      success: {
        paymentAdded: 'Pago agregado exitosamente',
        invoiceDeleted: 'Factura eliminada exitosamente',
      },
      error: {
        addPaymentFailed: 'Error al agregar pago',
        deleteInvoiceFailed: 'Error al eliminar factura',
        loadingFailed: 'Error al cargar datos',
      },
    },

    emptyStates: {
      noInvoices: 'No se encontraron facturas',
      noInvoicesDescription:
        'No hay facturas que coincidan con los filtros seleccionados',
    },
  },

  transactions: {
    title: 'Transacciones',
    description: 'Ver todas las transacciones financieras de la clínica',

    summary: {
      cards: {
        totalInflow: 'Entrada Total',
        totalOutflow: 'Salida Total',
        netAmount: 'Cantidad Neta',
        totalTransactions: 'Transacciones Totales',
        thisMonth: 'este mes',
      },
    },

    table: {
      columns: {
        type: 'Tipo',
        amount: 'Cantidad',
        date: 'Fecha',
        description: 'Descripción',
        referenceType: 'Tipo de Referencia',
        referenceId: 'ID de Referencia',
      },
    },

    filters: {
      searchPlaceholder: 'Buscar transacciones...',
      transactionType: 'Tipo de Transacción',
      referenceType: 'Tipo de Referencia',
      allTypes: 'Todos los Tipos',
    },

    transactionTypes: {
      inflow: 'Entrada',
      outflow: 'Salida',
    },

    referenceTypes: {
      revenue: 'Ingreso',
      expense: 'Gasto',
      salary: 'Salario',
      invoice: 'Factura',
    },

    emptyStates: {
      noTransactions: {
        title: 'No se encontraron transacciones',
        description:
          'No hay transacciones que coincidan con los filtros seleccionados',
      },
    },

    loading: {
      loadingTransactions: 'Cargando transacciones...',
    },

    messages: {
      error: {
        loadingFailed: 'Error al cargar datos',
      },
    },
  },

  servicePrices: {
    title: 'Precios de Servicios',
    description: 'Gestionar precios de servicios médicos para la clínica',

    serviceTypes: {
      visit: 'Visita',
      prescription: 'Prescripción',
      labTest: 'Prueba de Laboratorio',
      radiology: 'Radiología',
      dental: 'Dental',
    },

    summary: {
      cards: {
        count: 'Cantidad',
        avgPrice: 'Precio Promedio',
      },
    },

    table: {
      columns: {
        serviceType: 'Tipo de Servicio',
        service: 'Servicio',
        price: 'Precio',
        clinic: 'Clínica',
        doctor: 'Doctor',
        status: 'Estado',
        actions: 'Acciones',
      },
    },

    filters: {
      searchPlaceholder: 'Buscar precios de servicios...',
      doctor: 'Doctor',
      allDoctors: 'Todos los Doctores',
    },

    actions: {
      add: 'Agregar Nuevo Precio de Servicio',
      edit: 'Editar',
      delete: 'Eliminar',
      cancel: 'Cancelar',
      save: 'Guardar',
      saveChanges: 'Guardar Cambios',
      addServicePrice: 'Agregar Precio de Servicio',
    },

    form: {
      title: {
        add: 'Agregar Nuevo Precio de Servicio',
        edit: 'Editar Precio de Servicio',
      },
      labels: {
        serviceType: 'Tipo de Servicio',
        service: 'Servicio',
        price: 'Precio',
        doctor: 'Doctor',
        notes: 'Notas',
        status: 'Estado',
      },
      placeholders: {
        selectDoctor: 'Seleccionar Doctor',
        generalAllServices: 'General (Todos los Servicios)',
      },
    },

    status: {
      active: 'Activo',
      inactive: 'Inactivo',
    },

    validation: {
      serviceTypeRequired: 'El tipo de servicio es requerido',
      serviceTypeInvalid: 'Tipo de servicio inválido',
      priceRequired: 'El precio es requerido',
      priceMinimum: 'El precio debe ser al menos 1',
      priceInvalid: 'El precio debe ser un número',
      clinicRequired: 'La clínica es requerida',
      notesMaxLength: 'Las notas no deben exceder 500 caracteres',
      statusRequired: 'El estado es requerido',
      statusInvalid: 'El estado debe ser activo o inactivo',
    },

    deleteModal: {
      title: 'Eliminar Precio de Servicio',
      message: '¿Está seguro de que desea eliminar este precio de servicio?',
      secondaryMessage: 'Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
    },

    emptyStates: {
      noServicePrices: {
        title: 'No se encontraron precios de servicios',
        description:
          'No hay precios de servicios que coincidan con los filtros seleccionados',
      },
    },

    loading: {
      loadingServicePrices: 'Cargando precios de servicios...',
      loadingDetails: 'Cargando detalles...',
      savingServicePrice: 'Guardando precio de servicio...',
      deletingServicePrice: 'Eliminando precio de servicio...',
    },

    messages: {
      success: {
        servicePriceAdded: 'Precio de servicio agregado exitosamente',
        servicePriceUpdated: 'Precio de servicio actualizado exitosamente',
        servicePriceDeleted: 'Precio de servicio eliminado exitosamente',
      },
      error: {
        addServicePriceFailed: 'Error al agregar precio de servicio',
        updateServicePriceFailed: 'Error al actualizar precio de servicio',
        deleteServicePriceFailed: 'Error al eliminar precio de servicio',
        loadingFailed: 'Error al cargar datos',
      },
    },
  },

  dashboard: {
    title: 'Panel Financiero',
    subtitle: 'Visión integral del rendimiento financiero de la clínica',
    status: {
      liveConnection: 'Conexión en Vivo',
      lastUpdate: 'Última Actualización',
    },
    actions: {
      refreshData: 'Actualizar Datos',
    },
    periods: {
      week: 'Semana',
      month: 'Mes',
      year: 'Año',
    },
    kpiCards: {
      totalRevenue: {
        title: 'Ingresos Totales',
        description: 'Comparado con el período anterior',
        trend: '+12.5%',
      },
      totalExpenses: {
        title: 'Gastos Totales',
        description: 'Disminución en gastos',
        trend: '-3.2%',
      },
      netProfit: {
        title: 'Ganancia Neta',
        description: 'Crecimiento continuo en ganancias',
        trend: '+8.1%',
      },
      totalInvoices: {
        title: 'Facturas Totales',
        description: 'Gestión de facturas',
        paidLabel: 'Pagadas',
      },
    },
    charts: {
      revenueVsExpenses: {
        title: 'Ingresos vs Gastos',
        revenueLabel: 'Ingresos',
        expensesLabel: 'Gastos',
      },
      invoiceStatus: {
        title: 'Estado de Facturas',
        paid: 'Pagadas',
        pending: 'Pendientes',
        overdue: 'Vencidas',
      },
    },
    recentTransactions: {
      title: 'Transacciones Recientes',
      subtitle: 'Últimas operaciones financieras',
      viewAll: 'Ver Todas',
      sampleTransactions: {
        visitInvoice: 'Factura de Consulta',
        medicalSupplies: 'Compra de Suministros Médicos',
        clinicRent: 'Pago de Alquiler de Clínica',
      },
      status: {
        completed: 'Completado',
        pending: 'Pendiente',
      },
    },
    keyMetrics: {
      profitMargin: {
        title: 'Margen de Ganancia',
      },
      averageVisit: {
        title: 'Consulta Promedio',
        trend: '+15.3%',
      },
      collectionRate: {
        title: 'Tasa de Cobro',
      },
    },
    emptyStates: {
      noData: 'No hay datos disponibles',
    },
  },
};
