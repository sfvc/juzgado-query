import { IAntecedente } from '../interfaces'

export const formatReport = (
  antecedentes: IAntecedente[] | undefined
) => {
  if (!antecedentes) throw new Error('Error al renderizar reporte de antecedentes')

  const hoy = new Date()
  const limite = new Date()
  limite.setMonth(hoy.getMonth() - 18)

  const parseFecha = (fechaStr: string): Date => {
    const [dia, mes, anio] = fechaStr.split('-')
    return new Date(+anio, +mes - 1, +dia)
  }

  const data = antecedentes
    .filter((antecedente) => {
      const fechaStr = antecedente?.fecha || ''
      const fecha = parseFecha(fechaStr)
      return fecha >= limite && fecha <= hoy
    })
    .map((antecedente) => ({
      numeroActa: antecedente?.numero_acta || '',
      nroComprobanteRentas: antecedente?.nro_comprobante || '',
      numeroCausa: antecedente?.numero_causa || '',
      fecha: antecedente?.fecha || '',
      estados: antecedente?.estados?.[0]?.nombre || '',
      juzgado: antecedente?.juzgado_id || ''
    }))

  return data
}
