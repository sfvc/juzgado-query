import { IPropiedad } from '../../parametros/actas/interfaces'
import { IPersona } from '../../personas/interfaces'
import { IPlantilla } from '../../plantillas/interfaces'

// Interfaces de filtro
export interface ActaFilterForm {
    infractor_id?: string
    numero_acta?: string
    fecha_desde?: string
    fecha_hasta?: string
    estado_id?: string
    tipo_acta_id?: string
    numero_causa?: string
    prioridad_id?: string
    vehiculo_id?: string
    infraccion_id?: string
    page: number
}

export interface EstadoActa {
    id: number
    nombre: string
    color: string
}

export interface Prioridad {
    id: number
    nombre: string
}

export interface DataFilters {
    estadosActa: EstadoActa[]
    prioridades: Prioridad[]
    tiposActa: string[]
}

// Interfaces de acta
export interface IActa {
    id:                     number
    numero_acta:            string
    tipo_acta:              string
    numero_causa:           string
    hora:                   string
    fecha:                  string
    fecha_prescripcion:     string
    estado_acta_id:         number
    retencion_vehiculo:     number
    retencion_licencia:     number
    notificacion:           Notificacion[]
    infractores:            Infractor[]
    calle:                  string
    observaciones:          string
    infracciones_cometidas: InfraccionesCometida[]
    prioridad:              Prioridad
    vehiculo:               Vehiculo
    comercio:               null
    propiedades:            IPropiedad[]
    preventiva:             string
    estados:                Estado[]
}

export interface Notificacion {
    id: number
    tipo_actuacion: string
    created_at: string
    plantilla: IPlantilla | null
}

export interface Estado {
    id:         number
    nombre:     string
    color:      string
    created_at: Date
    updated_at: Date
    deleted_at: null
    pivot:      EstadoPivot
}

export interface EstadoPivot {
    acta_id:         number
    estado_actas_id: number
    fecha_desde:     Date
    fecha_hasta:     Date
    observaciones:   null
    user_id:         number
    created_at:      null
}

export interface InfraccionesCometida {
    id:              number
    numero:          string
    detalle:         string
    inciso:          null
    norma_legal:     string
    tipo_acta:       string
    tipo_infraccion: string
    descuento:       number
    valor_desde:     number
    valor_hasta:     number
    created_at:      null
    updated_at:      null
    deleted_at:      null
    pivot:           InfraccionesCometidaPivot
}

export interface InfraccionesCometidaPivot {
    acta_id:     number
    articulo_id: number
}

export interface Infractor {
    id:           number
    nombre:       string
    apellido:     string
    documento:    number
    cuit:         null
    responsable:  number
    antecedentes: number
}

export interface Prioridad {
    id:     number
    nombre: string
}

export interface Vehiculo {
    id:      number
    dominio: string
    modelo:  string
    marca:   string
    tipo:    string
    color:   string
    titular: IPersona | null
}
