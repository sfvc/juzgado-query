import { IPersona } from '../../personas/interfaces'
import { InfractorActa } from '../interfaces'

export const formatPersona = (persona: IPersona, responsable: number): InfractorActa => {
  return {
    id: persona.id,
    documento: persona.numero_documento,
    cuit: persona.cuit || '',
    cuil: persona.cuil || '',
    nombre: persona.nombre,
    apellido: persona.apellido,
    telefono: persona.telefono,
    email: persona.email,
    antecedentes: 0,
    responsable: responsable,
    cuota_alimentaria: persona.cuota_alimentaria,
    razon_social: persona.razon_social || '',
    tipo_persona: persona.tipo_persona
  }
}
