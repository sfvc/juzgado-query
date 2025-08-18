import { IBarrio, ILocalidad } from '../../parametros/localizacion/interfaces/localizacion'

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
    pais_id: number | null
    provincia_id: number | null
    departamento_id: number | null
    localidad_id: number | null
    localidad: ILocalidad | null
    barrio_id: number | null
    barrio: IBarrio | null
    deleted_at?: string | null
}

export interface IPersona {
    id: number
    nombre: string
    apellido: string
    email: string
    telefono: string
    razon_social: string
    tipo_persona: string
    tipo_sociedad_id: number
    tipo_documento: string
    fecha_creacion: string | null
    fecha_nacimiento: string | null
    numero_inscripcion: string
    cuota_alimentaria: string
    cuit: string
    sexo: string
    cuil: number
    estado_civil: string
    numero_documento: number
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
    nombre: string
    apellido: string
    tipo_documento: string
    numero_documento: number
    estado_civil?: string
    fecha_nacimiento?: string
    cuil: number
    sexo: string
    nacionalidad_id: number | null
    email: string
    telefono: string
    cuota_alimentaria: string
}

export interface PersonaJuridica {
    razon_social: string
    nombre: string,
    tipo_documento: string,
    email: string,
    telefono: string,
    cuit: number
    numero_inscripcion?: string
    cuota_alimentaria: string,
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

