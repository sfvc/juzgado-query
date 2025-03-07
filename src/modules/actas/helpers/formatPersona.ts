import { IPersona } from '../../personas/interfaces'
import { InfractorActa } from '../interfaces'

export const formatPersona = (persona: IPersona, responsable: number): InfractorActa => {
  return {
    id: persona.id,
    documento: persona.numero_documento,
    cuit: persona.cuit || '',
    nombre: persona.nombre,
    apellido: persona.apellido,
    antecedentes: 0,
    responsable: responsable
  }
}