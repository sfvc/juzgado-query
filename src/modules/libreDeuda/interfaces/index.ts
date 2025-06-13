export interface ILibreDeuda {
    id: number
    persona_nombre?: string
    persona_apellido?: string
    persona_numero_documento?: string
    vehiculo_dominio?: string
    vehiculo_cedula_frente?: string
    vehiculo_cedula_dorso?: string
    vehiculo_marbete?: string
    fecha?: string,
    verificado?: boolean
    titular?: string
    numero_libre_deuda?: string
    libre_deuda_id?: number
    persona_id?: number
    vehiculo_id?: number
    path_file?: string
    vehiculo?: IVehiculo
}

export interface IVehiculo {
  id: number
  dominio: string
  marca: string
  marca_id: number
  tipo: string
  tipo_id: number
  color_id: number
  titular_id: number
  modelo: string
  numero_chasis: string | null
  numero_motor: string | null
  numero_taxi_remis: string | null
  path_foto_cedula_frente: string | null
  path_foto_cedula_dorso: string | null
  path_foto_marbete: string | null
  deleted_at: string | null
}
