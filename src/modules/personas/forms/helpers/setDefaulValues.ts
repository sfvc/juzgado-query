import { IPersona } from '../../interfaces'
import { TipoPersona } from './personaEnum'

interface DefaultValues {
    nombre: string;
    tipo_documento: string;
    email: string;
    tipo_persona: string;
  
    pais_id: number | null;
    provincia_id: number | null;
    departamento_id: number | null;
    localidad_id: number | null;
    barrio_id: number | null;
    calle: string;
    numero: number | null;
    lote_dpto: string | null;
    manzana_piso: string | null;
  
    // Campos para Persona Física
    apellido?: string;
    numero_documento?: string;
    estado_civil?: string;
    fecha_nacimiento?: string;
    cuil?: string;
    sexo?: string;
    nacionalidad_id?: number | null;
  
    // Campos para Persona Jurídica
    razon_social?: string;
    cuit?: string;
    numero_inscripcion?: string;
    tipo_sociedad_id?: number | null;
}

export const setDefaulValues = (persona: IPersona | null, tipoPersona: string) => {
  let defaultValues: DefaultValues = {
    nombre: persona?.nombre || '',
    tipo_documento: persona?.tipo_documento || '',
    email: persona?.email || '',
    tipo_persona: persona?.tipo_persona || tipoPersona,

    // Domicilio
    pais_id: persona?.domicilio?.pais_id || null,
    provincia_id: persona?.domicilio?.provincia_id || null,
    departamento_id: persona?.domicilio?.departamento_id || null,
    localidad_id: persona?.domicilio?.localidad?.id || null,
    barrio_id: persona?.domicilio?.barrio?.id || null,
    // barrio_id: persona?.domicilio?.barrio_id || null,
    calle: persona?.domicilio?.calle || '',
    numero: persona?.domicilio?.numero || null,
    lote_dpto: persona?.domicilio?.lote_dpto || null,
    manzana_piso: persona?.domicilio?.manzana_piso || null,
  }

  if (tipoPersona === TipoPersona.FISICA) {
    defaultValues = {
      ...defaultValues,
      apellido: persona?.apellido || '',
      numero_documento: persona?.numero_documento.toString() || '',
      estado_civil: persona?.estado_civil || '',
      fecha_nacimiento: persona?.fecha_nacimiento || '',
      cuil: persona?.cuil.toString() || '',
      sexo: persona?.sexo || '',
      nacionalidad_id: persona?.nacionalidad?.id || null,
    }
  } else {
    defaultValues = {
      ...defaultValues,
      razon_social: persona?.razon_social || '',
      cuit: persona?.cuit.toString() || '',
      numero_inscripcion: persona?.numero_inscripcion || '',
      tipo_sociedad_id: persona?.tipo_sociedad_id || null,
    }
  }

  return defaultValues
}
