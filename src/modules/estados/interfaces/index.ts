export interface IEstadoActa {
  id: number
  nombre: string
  color: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  pivot: {
    acta_id: number
    estado_actas_id: number
    fecha_desde: string
    fecha_hasta: string
    observaciones: string | null
    user_id: number
    created_at: string | null
  }
}

export interface EstadoActaForm {
  estado_id: number
  observaciones?: string
}