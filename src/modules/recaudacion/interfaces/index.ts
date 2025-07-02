export interface IRecaudacion {
  id?: string;
  acta_id?: number;
  numero_juzgado?: string;
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
  estadisticas?: Estadisticas;
  juzgado?: Juzgado
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

export interface Juzgado {
  id?: string;
  nombre?: string
}

