export interface IJuzgado {
    id: number
    nombre: string
    juez: string
    secretario: string
    direccion: string
    telefono: string
}

export interface FormJuzgado {
    nombre: string
    juez: string
    secretario: string
    direccion: string
    telefono?: string
}

export interface Role {
    id: number
    name: string
}

export interface IUsuario {
    id: number
    nombre: string
    juzgado: IJuzgado
    dni: string
    username: string
    password: string
    role: Role
}

export interface FormUsuario {
    nombre: string
    dni: string
    username: string
    juzgado_id: string
    role: number | null
}

export interface IUnidad {
    id: number
    valor: string
    fecha_desde: string
    fecha_hasta: string
}

export interface FormUnidad {
    valor: string
    fecha_desde: string
    fecha_hasta: string
}

export interface FormPassword {
    password: string
}