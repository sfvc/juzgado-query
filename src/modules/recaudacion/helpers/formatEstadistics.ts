import { Estadisticas } from '../interfaces'

export const formatEstadisticas = (estadisticas: Estadisticas | undefined) => {
  const formatMonto = (valor: string | number | null | undefined) => {
    const numero = Number(valor)
    if (isNaN(numero)) return ''
    return numero.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  return {
    // fechaGeneracion: estadisticas?.fecha_generacion || '',
    // totalComprobantes: estadisticas?.totales_generales?.total_comprobantes?.toString() || '0',
    // montoTotalProcesado: formatMonto(estadisticas?.totales_generales?.monto_total_procesado),
    cantidadPagados: estadisticas?.comprobantes_pagados?.cantidad?.toString() || '',
    montoTotalAbonado: formatMonto(estadisticas?.comprobantes_pagados?.monto_total_abonado),
    montoMultas: formatMonto(estadisticas?.comprobantes_pagados?.monto_multas),
    montoConceptos: formatMonto(estadisticas?.comprobantes_pagados?.monto_conceptos),
    // cantidadAnulados: estadisticas?.comprobantes_anulados?.cantidad?.toString() || '0',
    // montoTotalAnulado: formatMonto(estadisticas?.comprobantes_anulados?.monto_total_anulado),
    // montoMultasAnuladas: formatMonto(estadisticas?.comprobantes_anulados?.monto_multas_anuladas),
    // montoConceptosAnulados: formatMonto(estadisticas?.comprobantes_anulados?.monto_conceptos_anulados),
    // fechaDesde: estadisticas?.periodo?.desde || '',
    // fechaHasta: estadisticas?.periodo?.hasta || '',
  }
}
