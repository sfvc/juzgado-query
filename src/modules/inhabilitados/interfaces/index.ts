import { IJuzgado } from '../../parametros/globales/interfaces'
import { IPersona } from '../../personas/interfaces'

export interface IInhabilitado {
    id: number
    fecha_desde: string
    fecha_hasta: string
    persona: IPersona
    juzgado: IJuzgado
    entidad: string
    instrumento: string
    causa: string
    retencion_licencia: boolean
    periodo_inhabilitacion_dias: number
    tiempo_transcurrido_dias: number | null
    acta: Acta
}

export interface FormInhabilitado {
    persona_id: number
    juzgado_id: number
    entidad: string
    fecha_desde: string
    fecha_hasta: string
    numero_acta: string
    instrumento?: string
    causa: string
    retencion_licencia: boolean
}

interface Acta {
    numero_acta: string
    retencion_licencia: number
    articulos: number[]
}
