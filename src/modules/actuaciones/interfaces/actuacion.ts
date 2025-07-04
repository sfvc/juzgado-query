import type { Titular } from '../../vehiculos/interfaces'

export interface ActuacionResponse {
    id: number
    tipo_actuacion: string
    fecha: string
    observaciones: string
    usuario: Usuario
    recaudacion: Recaudacion
    estadisticas: Estadisticas
    sub_total: string
    total: string
    descuento: string
    recargo: string
    conceptos: Concepto[]
    plantilla: Plantilla
    articulos: Articulo[]
    actas: Acta[]
    infractores: Infractor[]
    vehiculos: Vehiculo[]
    comercios: any[]
    notificaciones: any[]
}

export interface Acta {
    id: number
    numero_acta: string
    tipo_acta: string
    numero_causa: string
    hora: string
    lugar: null
    observaciones: string
    fecha: null
    fecha_prescripcion: Date
}

export interface Articulo {
    id: number
    numero: string
    detalle: string
    inciso: null
    norma_legal: string
    tipo_acta: string
    tipo_infraccion: string
    descuento: number
    valor_desde: number
    valor_hasta: number
    created_at: null
    updated_at: null
    deleted_at: null
    pivot: Pivot
}

export interface Pivot {
    acta_id: number
    articulo_id: number
}

export interface Concepto {
    id: number
    concepto: string
    monto: string
    actuacion_id: number
    created_at: Date
    updated_at: Date
}

export interface Infractor {
    id: number
    nombre: string
    apellido: string
    documento: null
    cuit: string
    responsable: null
    antecedentes: null
    domicilio: Domicilio
}

export interface Domicilio {
    id: number
    calle: string
    numero: number
    barrio: string
    provincia: string
    departamento: string
    localidad: string
}

export interface Plantilla {
    id: number
    denominacion: string
    path: string
    tipo_actuacion: string
    juzgado: Juzgado
}

export interface Juzgado {
    id: number
    nombre: string
    juez: string
    secretario: string
    direccion: string
    telefono: string
    created_at: null
    updated_at: null
    deleted_at: null
}

export interface Vehiculo {
    id: number
    dominio: string
    marca: {
        id: number,
        nombre: string
    },
    tipo: {
        id: number,
        nombre: string
    },
    color: {
        id: number,
        nombre: string
    },
    modelo: string
    titular: Titular
    numero_chasis: null
    numero_motor: null
    numero_taxi_remis: null
}

export interface Usuario {
    id: number,
    nombre: string,
    juzgado: {
        id: number,
        nombre: string,
        juez: string,
        secretario: string,
        direccion: string,
        telefono: string
    },
    juzgado_id: number,
    dni: string,
    username: string,
    role: {
        id: number,
        name: string
    }
}

export interface Recaudacion {
    id?: string;
    numero_juzgado?: string;
    acta_id?: number;
    actuacion_id?: number;
    estado?: string;
    nro_comprobante_rentas?: string;
    fecha_pago?: string;
    monto_abonado?: string;
    monto_multa_original?: string;
    monto_multas?: string;
    monto_conceptos_original?: string;
    multa_conceptos?: string;
    monto_total_original?: string;
    monto_total_abonado?: string;
    numero_acta?: string;
    tipo_acta?: string;
    es_acumulada?: boolean;
    cantidad_actas_acumuladas?: number;
    monto_juzgado?: string;
}

export interface Estadisticas {
    comprobantes_pagados: {
        id?: string;
        monto_multas?: string;
        monto_conceptos?: string;
        monto_total_abonado?: string;
        monto_juzgado?: string;
    }
}
