export interface Marca {
    id: number
    nombre: string
    created_at: string
    updated_at: string
    deleted_at: string | null
}

export interface Tipo {
    id: number
    nombre: string
    created_at: string
    updated_at: string
    deleted_at: string | null
}

export interface Color {
    id: number
    nombre: string
    created_at: string
    updated_at: string
    deleted_at: string | null
}

export interface Titular {
    id: number
    nombre: string
    apellido: string
    razon_social: string
    tipo_persona: string
    fecha_nacimiento: string
    tipo_documento: string
    numero_documento: number
    estado_civil: string
    sexo: string
    cuil: string
    email: string
    nacionalidad_id: number | null
    domicilio_id: number | null
    tipo_sociedad_id: number | null
    fecha_creacion: string
    numero_inscripcion: string
    cuit: string | null
    deleted_at: null
    telefono: string
}

export interface IVehiculo {
    id: number
    dominio: string
    numero_motor: string
    numero_chasis: string
    deleted_at: null
    titular: Titular | null
    marca: Marca
    tipo: Tipo 
    color: Color
    modelo: string
    numero_taxi_remis: string
}

export interface FormVehiculo {
    titular_id?: number | null,
    color_id?: number | null,
    marca_id?: number | null,
    tipo_id?: number | null,
    modelo?: string,
    dominio: string,
    numero_motor?: string,
    numero_chasis?: string,
}