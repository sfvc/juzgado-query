/* eslint-disable @typescript-eslint/no-unused-vars */
import { Actuacion } from '../interfaces'

export function ultimaSentencia(actuaciones: Actuacion[]): Actuacion | null {
  const sentencias = actuaciones?.filter(
    (a) => a.tipo === 'SENTENCIA' && a.fecha
  )

  if (!sentencias || sentencias.length === 0) return null

  const parseFecha = (fecha: string | null): Date | null => {
    if (!fecha || typeof fecha !== 'string') return null

    try {
      const [dia, mes, anio] = fecha.split('-').map(Number)
      return new Date(anio, mes - 1, dia)
    } catch (error) {
      return null
    }
  }

  return sentencias.reduce((ultima, actual) => {
    const fechaUltima = parseFecha(ultima.fecha)
    const fechaActual = parseFecha(actual.fecha)

    // Si alguna fecha es inválida, mantener la que tiene fecha válida
    if (!fechaUltima && fechaActual) return actual
    if (fechaUltima && !fechaActual) return ultima
    if (!fechaUltima && !fechaActual) return ultima // Si ambas son inválidas, mantener la primera

    // Si ambas fechas son válidas, comparar
    if (fechaActual && fechaUltima) {
      if (fechaActual > fechaUltima) {
        return actual
      }

      // Si la fecha es igual, quedarse con la que está más adelante en el array (la actual)
      if (fechaActual.getTime() === fechaUltima.getTime()) {
        return actual
      }
    }

    return ultima
  })
}
