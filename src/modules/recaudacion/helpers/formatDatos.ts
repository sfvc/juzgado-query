import { IRecaudacion } from '../interfaces'
import { User } from '../../../auth/interfaces/auth'

export const formatDatos = (
  recaudaciones: IRecaudacion[] | undefined,
  user: User | null
) => {
  if (!recaudaciones) throw new Error('Error al renderizar reporte de recaudacion')

  const data = recaudaciones.map((recaudacion) => {
    const fecha = new Date(recaudacion?.fecha_pago)
    const fechaFormateada = `${String(fecha.getDate()).padStart(2, '0')}/${String(fecha.getMonth() + 1).padStart(2, '0')}/${fecha.getFullYear()}`

    return {
      fechaComprobante: fechaFormateada || '',
      numeroJuzgado: recaudacion?.juzgado?.id,
      nombreJuez: recaudacion?.juzgado?.juez,
      nombreSecretario: recaudacion?.juzgado?.secretario,
      usuario: user?.nombre,
      rol: user?.role?.name,
    }
  })

  return data
}
