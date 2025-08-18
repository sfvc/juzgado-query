export interface NotificationActa {
    id:                 number
    numero_acta:        string
    tipo_acta:          string
    numero_causa:       string
    hora:               string
    fecha:              string
    fecha_prescripcion: string
    calle:              string
    inspector:          null
    estados:            Estado[]
    infractores:        Infractor[]
    notificaciones:     Notificacion[]
}

export interface Estado {
    id:         number
    nombre:     string
    color:      string
    created_at: string
    updated_at: string
    deleted_at: null
    pivot:      Pivot
}

export interface Pivot {
    acta_id:         number
    estado_actas_id: number
    fecha_desde:     string
    fecha_hasta:     null
    observaciones:   string
    user_id:         number
    created_at:      string
}

export interface Infractor {
    cuota_alimentaria: boolean
    id:           number
    nombre:       string
    apellido:     string
    documento:    number
    cuit:         null
    responsable:  number
    antecedentes: number
}

export interface Notificacion {
    id:             number
    tipo_actuacion: string
    fecha:          string
    plantilla:      Plantilla | null
    url:            string | null
    usuario:        string
}

export interface Plantilla {
    id:             number
    denominacion:   string
    path:           string
    tipo_actuacion: string
    juzgado:        Juzgado
}

export interface Juzgado {
    id:         number
    nombre:     string
    juez:       string
    secretario: string
    direccion:  string
    telefono:   string
    created_at: null
    updated_at: null
    deleted_at: null
}
