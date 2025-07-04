import { IRecaudacion } from '../interfaces'

export const formatDatos = (
  recaudaciones: IRecaudacion[] | undefined
) => {
  if (!recaudaciones) throw new Error('Error al renderizar reporte de recaudacion')

  const data = recaudaciones.map((recaudacion) => {
    const fecha = new Date(recaudacion?.fecha_pago)
    const fechaFormateada = `${String(fecha.getDate()).padStart(2, '0')}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${fecha.getFullYear()}`

    return {
      fechaComprobante: fechaFormateada || '',
      numeroJuzgado: recaudacion?.juzgado?.id,
      nombreJuez: recaudacion?.juzgado?.juez,
      nombreSecretario: recaudacion?.juzgado?.secretario,
    }
  })

  return data
}
