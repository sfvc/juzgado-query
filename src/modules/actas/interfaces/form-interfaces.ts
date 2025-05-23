import { InfraccionActa, InfractorActa } from '.'
import { IPropiedad, IRubro } from '../../parametros/actas/interfaces'

// Formulario de Acta
export interface IActaForm {
    // Acta Data
    numero_acta: string
    numero_causa?: string
    fecha: string
    fecha_prescripcion: string
    hora: string
    grado_alcohol?: string
    retencion_vehiculo: number
    retencion_licencia: number
    notificado: number
    prioridad_id: number
    preventiva?: string
    nombre_fantasia?: string
    tipo_acta: string

    // Secciones del acta
    infractores: InfractorActa[]
    infracciones_cometidas?: InfraccionActa[]
    vehiculo_id?: number | null
    propiedades?: IPropiedad[]
    tipo_rubros?: IRubro[]

    // Infracción Data
    calle: string
    observaciones: string
}