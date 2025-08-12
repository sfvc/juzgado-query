export interface IAntecedente {
  id?: string;
  numero_acta?: number;
  numero_causa?: string;
  nombre_apellido?: number;
  fecha?: string;
  estados?: Estado[]
  dni?: string;
  dominio?: string;
  nro_comprobante_rentas?: string;
  juzgado_id?: string
  infractores: InfractorActa[]
  vehiculo: IVehiculo[]
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

export interface Estado {
    id:         number
    nombre:     string
    color:      string
    created_at: Date
    updated_at: Date
    deleted_at: null
}

export interface IVehiculo {
    map(arg0: (vehiculo: { id: unknown }) => { id: unknown }): unknown
    id: number
    dominio: string
}
