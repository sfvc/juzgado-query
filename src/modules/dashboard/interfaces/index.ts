export interface IDashboard {
    actas: Actas;
    estados: Estados;
    sesiones: Sesiones;
    facturacion: Facturacion;
}

export interface Actas {
    actas_hoy: number;
    actas_juzgado_1: number;
    actas_juzgado_2: number;
    total: number;
}

export interface Estados {
    cambios_por_estado: CambioEstado[];
    total_cambios: number;
}

export interface Sesiones {
    users: User[];
    total: number;
}

export interface User {
    username: string;
    nombre: string;
    juzgado: string;
    created_at: string;
}

export interface CambioEstado {
    estado_id: number;
    estado_nombre: string;
    cantidad: number;
}

export interface Facturacion {
    [key: string]: Juzgado | Fecha ;
    juzgado_1: Juzgado;
    juzgado_2: Juzgado;
    total: Juzgado;
    fecha_consulta: Fecha;
}

export interface Juzgado {
    facturacion_diaria: number;
    facturacion_mensual: number;
}

export interface Fecha {
    dia: string;
    mes: number;
    anio: number;
    facturacion_diaria: number;
    facturacion_mensual: number;
}
