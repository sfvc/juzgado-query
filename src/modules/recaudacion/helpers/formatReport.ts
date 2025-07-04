import { IRecaudacion } from '../interfaces'

export const formatReport = (
  recaudaciones: IRecaudacion[] | undefined
) => {
  if (!recaudaciones) throw new Error('Error al renderizar reporte de recaudacion')

  const data = recaudaciones.map((recaudacion) => {
    const fecha = new Date(recaudacion?.fecha_pago)
    const fechaFormateada = `${String(fecha.getDate()).padStart(2, '0')}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${fecha.getFullYear()}`

    return {
      numeroActa: recaudacion.numero_acta || '',
      fechaComprobante: fechaFormateada || '',
      nroComprobanteRentas: recaudacion.nro_comprobante_rentas || '',
      montoMulta: recaudacion.monto_multa_original || '',
      montoAbonado: recaudacion.monto_total_original || '',
      montoConceptos: recaudacion.monto_conceptos_original || '',
      numeroJuzgado: recaudacion?.juzgado?.id,
    }
  })

  return data
}
