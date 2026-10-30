import { IRecaudacion } from '../interfaces'
import { formatDateDMY } from '../../../shared/helpers/formatDate'
import { User } from '../../../auth/interfaces/auth'

export const formatDatos = (
  recaudaciones: IRecaudacion[] | undefined,
  user: User | null
) => {
  if (!recaudaciones) throw new Error('Error al renderizar reporte de recaudacion')

  const data = recaudaciones.map((recaudacion) => {
    return {
      fechaComprobante: formatDateDMY(recaudacion.fecha_pago),
      numeroJuzgado: recaudacion?.juzgado?.id,
      nombreJuez: recaudacion?.juzgado?.juez,
      nombreSecretario: recaudacion?.juzgado?.secretario,
      usuario: user?.nombre,
      rol: user?.role?.name,
    }
  })

  return data
}
