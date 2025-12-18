import { IAntecedente } from '../interfaces'

export const formatReport = (
  antecedentes: IAntecedente[] | undefined
) => {
  if (!antecedentes) throw new Error('Error al renderizar reporte de antecedentes')

  return antecedentes.map((antecedente) => ({
    numeroActa: antecedente?.numero_acta || '',
    nroComprobanteRentas: antecedente?.nro_comprobante || '',
    numeroCausa: antecedente?.numero_causa || '',
    fecha: antecedente?.fecha || '',
    estados: antecedente?.estados?.[0]?.nombre || '',
    juzgado: antecedente?.juzgado_id || ''
  }))
}

