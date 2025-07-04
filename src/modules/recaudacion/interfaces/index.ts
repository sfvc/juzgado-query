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
  juzgado?: Juzgado
}

export interface Estadisticas {
  fecha_generacion?: string;

  totales_generales?: {
    total_comprobantes?: string;
    monto_total_procesado?: string;
  };

  comprobantes_pagados?: {
    cantidad?: string;
    monto_total_abonado?: string;
    monto_multas?: string;
    monto_conceptos?: string;
  };

  comprobantes_anulados?: {
    cantidad?: string;
    monto_total_anulado?: string;
    monto_multas_anuladas?: string;
    monto_conceptos_anulados?: string;
  };

  periodo?: {
    desde?: string;
    hasta?: string;
  };
}

export interface Juzgado {
  id?: string;
  nombre?: string
}

