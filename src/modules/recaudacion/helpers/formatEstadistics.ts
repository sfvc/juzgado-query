import { Estadisticas } from '../interfaces'

export const formatEstadisticas = (estadisticas: Estadisticas | undefined) => {

  return {
    // fechaGeneracion: estadisticas.fecha_generacion || '',
    // totalComprobantes: estadisticas.totales_generales?.total_comprobantes?.toString() || '0',
    // montoTotalProcesado: estadisticas.totales_generales?.monto_total_procesado?.toString() || '0',
    cantidadPagados: estadisticas?.comprobantes_pagados?.cantidad?.toString() || '0',
    montoTotalAbonado: estadisticas?.comprobantes_pagados?.monto_total_abonado?.toString() || '0',
    montoMultas: estadisticas?.comprobantes_pagados?.monto_multas?.toString() || '0',
    montoConceptos: estadisticas?.comprobantes_pagados?.monto_conceptos?.toString() || '0',
    // cantidadAnulados: estadisticas.comprobantes_anulados?.cantidad?.toString() || '0',
    // montoTotalAnulado: estadisticas.comprobantes_anulados?.monto_total_anulado?.toString() || '0',
    // montoMultasAnuladas: estadisticas.comprobantes_anulados?.monto_multas_anuladas?.toString() || '0',
    // montoConceptosAnulados: estadisticas.comprobantes_anulados?.monto_conceptos_anulados?.toString() || '0',
    // fechaDesde: estadisticas.periodo?.desde || '',
    // fechaHasta: estadisticas.periodo?.hasta || '',
  }
}
