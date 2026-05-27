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
    cantidadPagados: estadisticas?.comprobantes_pagados?.cantidad?.toString() || '',
    montoTotalAbonado: formatMonto(estadisticas?.comprobantes_pagados?.monto_total_abonado || '') || '',
    montoMultas: formatMonto(estadisticas?.comprobantes_pagados?.monto_multas || '') || '',
    montoConceptos: formatMonto(estadisticas?.comprobantes_pagados?.monto_conceptos || '') || '',
  }
}
