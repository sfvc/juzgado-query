export interface ActuacionActa {
    id:                     number
    numero_acta:            string
    tipo_acta:              string
    numero_causa:           string
    hora:                   string
    observaciones:          string
    vehiculo:               Vehiculo
    fecha:                  string
    fecha_prescripcion:     string
    inspector:              null
    infracciones_cometidas: InfraccionesCometida[]
    estados:                Estado[]
    actas_infractores:      ActasInfractor[]
    infractores:            Infractor[]
    actuaciones:            Actuacion[]
    unidadMulta:            string
}

export interface ActasInfractor {
    id:                 number
    numero_acta:        string
    numero_causa:       string
    tipo_acta:          string
    hora:               string
    fecha:              string
    estado_actas_id:    number
    fecha_prescripcion: string
    retencion_vehiculo: number
    retencion_licencia: number
    notificado:         number
    calle:              string
    observaciones:      string
    prioridad_id:       number
    vehiculo_id:        number | null
    comercios_id:       null
    preventiva:         null | string
    created_at:         null
    updated_at:         null
    deleted_at:         null
    pivot:              ActasInfractorePivot
}

export interface ActasInfractorePivot {
    persona_id: number
    acta_id:    number
}

export interface Actuacion {
    id:            number
    tipo:          string
    observaciones: null
    total:         null | number
    fecha:         string
    plantilla:     Plantilla | null
    url:           string | null
    usuario:       string
    estado_pago:   boolean
}

export interface Plantilla {
    id:             number
    denominacion:   string
    path:           string
    tipo_actuacion: string
    juzgado_id:     number
    created_at:     string
    updated_at:     string
    deleted_at:     null
}

export interface Estado {
    id:         number
    nombre:     string
    color:      string
    created_at: string
    updated_at: string
    deleted_at: null
    pivot:      EstadoPivot
}

export interface EstadoPivot {
    acta_id:         number
    estado_actas_id: number
    fecha_desde:     string
    fecha_hasta:     null
    observaciones:   string
    user_id:         number
    created_at:      string
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
    importe?:         number
    unidad?:          number
    created_at?:      null
    updated_at?:      null
    deleted_at?:      null
    pivot?:           InfraccionesCometidaPivot
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
    domicilio:    Domicilio | null
}

export interface Domicilio {
    id:              number
    calle:           string
    numero:          null
    manzana_piso:    null
    lote_dpto:       null
    barrio_id:       null
    pais_id:         number
    provincia_id:    number
    departamento_id: null
    localidad_id:    null
    deleted_at:      null
}

export interface Vehiculo {
    id:                number
    dominio:           string
    marca:             string
    tipo:              string
    color:             string
    titular:           Titular
    numero_chasis:     null
    numero_motor:      null
    numero_taxi_remis: null
}

export interface Titular {
    id:                 number
    nombre:             string
    apellido:           string
    razon_social:       string
    tipo_persona:       string
    fecha_nacimiento:   string
    tipo_documento:     string
    numero_documento:   number
    estado_civil:       string
    sexo:               string
    cuil:               string
    email:              string
    nacionalidad_id:    number
    domicilio_id:       number
    tipo_sociedad_id:   number
    fecha_creacion:     string
    numero_inscripcion: string
    cuit:               null
    deleted_at:         null
    telefono:           string
}

export interface IActuacionForm {
    actas: number[]
    plantilla_id: number | null
    tipo_actuacion: string
    user_id: number
}