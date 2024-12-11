import { IJuzgado } from '../../parametros/globales/interfaces'
import { IPersona } from '../../personas/interfaces'

export interface IInhabilitado {
    id: number
    fecha_desde: string
    fecha_hasta: string
    persona: IPersona
    juzgado: IJuzgado
    instrumento: string
    causa: string
}

export interface FormInhabilitado {
    persona_id: number
    juzgado_id: number
    fecha_desde: string
    fecha_hasta: string
    instrumento: string
    causa: string
}