export interface IDescargo {
  id: number
  numero_descargo: string
  texto: string
  fecha_registro: string
  estado: string

  infractor: {
    dni: number
    cuit: string
    apellido: string
    nombre: string
    email: string
    telefono: string | null
  }

  archivos: string[]

  acta: {
    id: number
    numero_acta: string
    estado: string
  }
}

export interface IVehiculo {
  id: number
  dominio?: string
  marca?: IMarca
  tipo?: ITipo
  color_id?: number
  titular_id?: number
  modelo?: string
  numero_chasis?: string | null
  numero_motor?: string | null
  numero_taxi_remis?: string | null
  path_foto_cedula_frente?: string | null
  path_foto_cedula_dorso?: string | null
  path_foto_marbete?: string | null
  deleted_at?: string | null
}

export interface ITipo {
  id?: number
  nombre?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
}

export interface IMarca {
  id?: number
  nombre?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
}
