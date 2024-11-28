import type { InfraccionesCometida } from '.'

export interface IUnidadMulta {
  unidad: number
}

export interface ITotal {
    sub_total: number,
    total: number,
    descuento: number,
    recargo: number,
    observaciones: string
}
  
export interface ISentenciaForm extends ITotal{
    actas: [{ id: number }], // TODO: Cambiar por array de ids de actas [ 1230 ]
    plantilla_id: number,
    tipo_actuacion: string,
    infracciones: InfraccionesCometida[],
}