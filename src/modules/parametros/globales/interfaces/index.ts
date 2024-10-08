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
    nombre: string
}

export interface IUsuario {
    id: number
    nombre: string
    juzgado: IJuzgado
    dni: string
    username: string
    role: Role
}

export interface FormUsuario {
    nombre: string
    dni: string
    username: string
    password: string
    juzgado_id: string
    rol_id: string
}