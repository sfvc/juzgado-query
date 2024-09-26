export interface AuthForm {
    username: string
    password: string
}

export interface User {
    id: number
    username: string
    nombre: string
    dni: string
    juzgado: {
        id: number
        nombre: string
        secretario: string
        juez: string
        direccion: string
        telefono: string
    }
    role: {
        id: number
        name: string
    }
}

export interface AuthResponse {
    token: string
    user: User
}