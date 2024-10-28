import { InfraccionActa, InfractorActa } from '.'
import { IPropiedad } from '../../parametros/actas/interfaces'

// Formulario de Transito
export interface ITransitoForm {
    // Acta Data
    numero_acta: string
    numero_causa?: string
    fecha: string
    fecha_prescripcion: string
    hora: string
    retencion_vehiculo: number
    retencion_licencia: number
    notificado: number
    prioridad_id: number
    preventiva?: string
    tipo_acta: string

    // Secciones del acta
    infractores: InfractorActa[]
    infracciones_cometidas: InfraccionActa[]
    vehiculo_id?: number | null
    propiedades?: IPropiedad[]

    // Infracción Data
    calle: string
    observaciones: string
}