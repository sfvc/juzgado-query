import { IRecaudacion } from '../interfaces'

export const formatReport = (
  recaudaciones: IRecaudacion[] | undefined
) => {
  if (!recaudaciones) throw new Error('Error al renderizar reporte de recaudacion')

  const formatMonto = (valor: string | number | null | undefined) => {
    const numero = Number(valor)
    if (isNaN(numero)) return ''
    return numero.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const data = recaudaciones.map((recaudacion) => {
    return {
      numeroActa: recaudacion.numero_acta || '',
      nroComprobanteRentas: recaudacion.nro_comprobante_rentas || '',
      montoMulta: formatMonto(recaudacion.monto_multa_original),
      montoAbonado: formatMonto(recaudacion.monto_total_original),
      montoConceptos: formatMonto(recaudacion.monto_conceptos_original),
    }
  })

  return data
}
