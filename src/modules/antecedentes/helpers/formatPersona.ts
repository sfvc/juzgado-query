import { clearNames } from '../../../shared'
import { IAntecedente } from '../interfaces'
import { User } from '../../../auth/interfaces/auth'

export const formatPersona = (
  antecedentes: IAntecedente[] | undefined,
  user: User | null
) => {
  if (!antecedentes) throw new Error('Error al renderizar reporte de antecedentes')

  const persona = antecedentes.map((antecedente) => {
    const infractor = antecedente.infractores?.[0]
    const fecha = new Date()
    const fechaFormateada = `${String(fecha.getDate()).padStart(2, '0')}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${fecha.getFullYear()}`

    return {
      nombreApellido: clearNames(infractor?.apellido, infractor?.nombre),
      documento: infractor?.documento || infractor?.cuit || '',
      tipoActa: antecedente?.tipo_acta || '',
      dominio: antecedente.vehiculo?.dominio || '',
      juzgadoUsuarioNumero: user?.juzgado?.id || '',
      juzgadoUsuario: user?.nombre || '',
      juzgadoFecha: fechaFormateada || ''
    }
  })

  return persona
}
