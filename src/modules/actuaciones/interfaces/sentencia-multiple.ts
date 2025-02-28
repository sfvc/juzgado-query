/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfraccionesCometida } from '.'

export interface AcumuladasResponse {
    data: Data;
}

export interface Data {
    tipo_actuacion:      string
    actas:               Acta[]
    infractores:         Infractor[]
    vehiculos:           Vehiculo[]
    comercios:           any[]
    unidad_multa_actual: string
}

export interface Acta {
    id:                 number
    numero_acta:        string
    tipo_acta:          string
    numero_causa:       string
    hora:               string
    lugar:              null
    observaciones:      string
    fecha:              Date
    fecha_prescripcion: Date
    articulos:          Articulo[]
    unidad_multa:       string
}

export interface Articulo extends InfraccionesCometida  {
    uuid:                         string
    precio_unidad_articulo?:      number
    numero_acta_articulo?:        string
}

export interface Infractor {
    id:           number
    nombre:       string
    apellido:     string
    documento:    null
    cuit:         string
    responsable:  null
    antecedentes: null
    domicilio:    Domicilio | null
}

export interface Domicilio {
    id:              number
    calle:           string
    numero:          number
    barrio_id:       null
    provincia_id:    number
    departamento_id: number
    localidad_id:    null
}

export interface Vehiculo {
    id:                number
    dominio:           string
    marca:             Color
    modelo:            string
    tipo:              Color
    color:             Color
    numero_chasis:     null
    numero_motor:      null
    numero_taxi_remis: null | string
}

export interface Color {
    id:         number
    nombre:     string
    created_at: Date | null
    updated_at: Date | null
    deleted_at: null
}
