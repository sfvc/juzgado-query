import { Actuacion } from '../interfaces'

export function ultimaSentencia(actuaciones: Actuacion[]): Actuacion | null {
  const sentencias = actuaciones?.filter(a => a.tipo === 'SENTENCIA')

  if (sentencias?.length === 0) return null

  const parseFecha = (fecha: string) => {
    const [dia, mes, anio] = fecha.split('-').map(Number)
    return new Date(anio, mes - 1, dia)
  }

  return sentencias.reduce((ultima, actual) => {
    const fechaUltima = parseFecha(ultima.fecha)
    const fechaActual = parseFecha(actual.fecha)

    if (fechaActual > fechaUltima) {
      return actual
    }

    // si la fecha es igual, quedarse con la que está más adelante en el array (la actual)
    if (fechaActual.getTime() === fechaUltima.getTime()) {
      return actual
    }

    return ultima
  })
}
