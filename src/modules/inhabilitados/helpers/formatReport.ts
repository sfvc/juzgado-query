import { clearNames } from '../../../shared'
import { formatDateDMY } from '../../../shared/helpers/formatDate'
import { IInhabilitado } from '../interfaces'

export const formatReport = (inhabilitaciones: IInhabilitado[] | undefined) => {

  if (!inhabilitaciones) throw new Error('Error al renderizar reporte de inhabilitados')

  const data = inhabilitaciones?.map((inhabilitacion: IInhabilitado) => {
    return {
      fecha_desde: formatDateDMY(inhabilitacion.fecha_desde),
      fecha_hasta: formatDateDMY(inhabilitacion.fecha_hasta),
      causa: inhabilitacion.causa,
      instrumento: inhabilitacion.instrumento,
      juzgado: inhabilitacion.juzgado.nombre,
      persona: clearNames(inhabilitacion.persona.apellido, inhabilitacion.persona.nombre)
    }
  })
        
  return data
}
