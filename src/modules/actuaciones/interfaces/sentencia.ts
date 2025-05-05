import type { InfraccionesCometida } from '.'

export interface IUnidadMulta {
  unidad: number
}

export interface ITotal {
    sub_total: number,
    total: number,
    descuento: number,
    recargo: number,
    sinValor: boolean,
    observaciones: string
    observacion: string,
}
  
export interface ISentenciaForm extends ITotal{
    actas: number[],
    plantilla_id: number,
    tipo_actuacion: string,
    infracciones?: InfraccionesCometida[],
    sub_total: number,
    total: number,
    descuento: number,
    recargo: number,
    sinValor: boolean,
    observaciones: string,
    observacion: string,
    user_id: number,
    sinValor: boolean,
    observacion: string,
    conceptos: Concepto[]
}

export interface Concepto {
  concepto: string
  monto: number
}