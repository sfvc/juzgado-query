import { ILocalidad } from '../../parametros/localizacion/interfaces/localizacion'

export interface INacionalidad {
    id: number
    nombre: string
    deleted_at: string | null
}

export interface ITipoSociedad {
    id: number
    nombre: string
    deleted_at: string | null
}

export interface IDomicilio {
    id: number
    calle: string
    numero: number | null
    manzana_piso: string | null
    lote_dpto: string | null
    barrio_id: number | null
    pais_id: number | null
    provincia_id: number | null
    departamento_id: number | null
    localidad_id: number | null
    localidad: ILocalidad | null
    deleted_at?: string | null
}
 
export interface IPersona {
    id: number
    nombre: string
    apellido: string
    email: string
    razon_social: string
    tipo_persona: string
    tipo_sociedad_id: number
    tipo_documento: string
    fecha_creacion: string | null
    fecha_nacimiento: string | null
    numero_inscripcion: string
    cuit: string
    sexo: string
    cuil: string
    estado_civil: string
    numero_documento: string
    domicilio: IDomicilio | null
    nacionalidad: INacionalidad | null
}

export interface DataPersona {
    estadoCivil: string[]
    nacionalidades: INacionalidad[]
    tipoDocumento: string[]
    sexo: string[]
    tipoSociedad: ITipoSociedad[]
}

// types.ts
export interface PersonaFisica {
    apellido: string
    numero_documento: string
    estado_civil?: string
    fecha_nacimiento?: string
    cuil: string
    sexo: string
    nacionalidad_id: number | null
}
  
export interface PersonaJuridica {
    razon_social: string
    cuit: string
    numero_inscripcion?: string
    tipo_sociedad_id?: number | null
}
  
export interface Domicilio {
    calle: string
    numero: number | null
    manzana_piso: string | null
    lote_dpto: string | null
    barrio_id: number | null
    pais_id: number | null
    provincia_id: number | null
    departamento_id: number | null
    localidad_id: number | null
}
  
export type FormValues = {
    tipo_persona: string
    nombre: string
    tipo_documento: string
    email?: string
} & (PersonaFisica | PersonaJuridica) & Domicilio

   