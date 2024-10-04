export interface Juzgado {
    id: number
    nombre: string
    juez: string
    secretario: string
    direccion: string
    telefono: string
    created_at: string | null
    updated_at: string | null
    deleted_at: string | null
}

export interface IPlantilla {
    id: number
    denominacion: string
    path: string
    tipo_actuacion: string
    juzgado: Juzgado
}

export interface FormPlantilla {
    denominacion: string
    juzgado_id: number
    tipo_actuacion: string
    path?: string
}