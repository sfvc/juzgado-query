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
    periodo_inhabilitacion_dias: number
    tiempo_transcurrido_dias: number | null
}

export interface FormInhabilitado {
    persona_id: number
    juzgado_id: number
    fecha_desde: string
    fecha_hasta: string
    acta_id: number
    instrumento: string
    causa: string
}