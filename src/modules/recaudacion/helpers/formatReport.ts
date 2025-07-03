import { IRecaudacion } from '../interfaces'

export const formatReport = (
  recaudaciones: IRecaudacion[] | undefined
) => {
  if (!recaudaciones) throw new Error('Error al renderizar reporte de recaudacion')

  const data = recaudaciones.map((recaudacion) => ({
    numero_juzgado: recaudacion.numero_juzgado,
    numero_acta: recaudacion.numero_acta,
    fecha_pago: recaudacion.fecha_pago,
    nro_comprobante_rentas: recaudacion.nro_comprobante_rentas,
    monto_multa_original: recaudacion.monto_multa_original,
    juzgado: recaudacion?.juzgado?.id,
    // monto_multas: pagos.monto_multas?.toString() || '',
    // monto_conceptos_original: recaudacion.monto_conceptos_original || '',
    // monto_conceptos: pagos.monto_conceptos?.toString() || '',
    monto_total_original: recaudacion.monto_total_original || '',
    // monto_total_abonado: pagos.monto_total_abonado?.toString() || ''
    // monto_juzgado_uno: recaudacion.monto_juzgado || '',
    // monto_juzgado_dos: recaudacion.monto_juzgado || ''
  }))

  return data
}
