import { IInhabilitado } from '../interfaces'

export const formatReport = (inhabilitaciones: IInhabilitado[] | undefined) => {

  if (!inhabilitaciones) throw new Error('Error al renderizar reporte de inhabilitados')

  const data = inhabilitaciones?.map((inhabilitacion: IInhabilitado) => {
    return {
      fecha_desde: inhabilitacion.fecha_desde,
      fecha_hasta: inhabilitacion.fecha_hasta,
      causa: inhabilitacion.causa,
      instrumento: inhabilitacion.instrumento,
      juzgado: inhabilitacion.juzgado.nombre,
      persona: `${inhabilitacion.persona.apellido} ${inhabilitacion.persona.nombre}`
    }
  })
        
  return data
}
