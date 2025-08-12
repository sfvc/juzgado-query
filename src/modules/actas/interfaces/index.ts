import { IPropiedad, IRubro } from '../../parametros/actas/interfaces'
import { IPlantilla } from '../../plantillas/interfaces'
import { IVehiculo, Titular } from '../../vehiculos/interfaces'

//** Interfaces de filtro */
export interface ActaFilterForm {
    persona_id?: string
    numero_acta?: string
    fecha_desde?: string
    fecha_hasta?: string
    estado_id?: string
    tipo_acta_id?: string
    numero_causa?: string
    prioridad_id?: string
    vehiculo_id?: string
    articulo_id?: string
    page: number
    juzgado?: number
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

//** Interfaces de acta */
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
    notificado:             number
    notificacion:           Notificacion[]
    infractores:            InfractorActa[]
    calle:                  string
    observaciones:          string
    infracciones_cometidas: InfraccionActa[]
    grado_alcohol?:          string
    prioridad?:             Prioridad
    prioridad_id:           number
    vehiculo:               IVehiculo
    comercio:               Comercio
    propiedades:            IPropiedad[]
    preventiva:             string
    estados:                Estado[]
    acumulable:             boolean
}

export interface Comercio {
    id:                  number
    nombre_fantasia:     string
    rubros:              IRubro[]
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

export interface InfraccionActa {
    id:              number
    numero:          number
    detalle:         string
    inciso?:          null
    norma_legal?:     string
    grado_alcohol?:   string
    tipo_acta?:       string
    tipo_infraccion?: string
    descuento?:       number
    valor_desde:     number
    valor_hasta?:     number
    created_at?:      null
    updated_at?:      null
    deleted_at?:      null
    pivot?:           InfraccionesCometidaPivot
}

export interface InfraccionesCometidaPivot {
    acta_id:     number
    articulo_id: number
}

export interface InfractorActa {
    id:           number
    nombre:       string
    apellido:     string
    razon_social: string
    documento:    string
    cuit:         string
    cuil:         string
    email:        string
    telefono:     string
    responsable:  number
    antecedentes: number
    tipo_persona: string
}

export interface Prioridad {
    id:     number
    nombre: string
}

export interface VehiculoActa {
    id:      number
    dominio: string
    modelo:  string
    marca:   string
    tipo:    string
    color:   string
    titular: Titular | null
    numero_chasis: string;
    numero_motor: string;
    numero_taxi_remis: string;
    deleted_at?:      null
}
