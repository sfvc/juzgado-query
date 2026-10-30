// Datos minimos que necesita carbone de una actuacion o notificacion para generar su documento
export interface PlantillaItem {
  id: number
  plantilla?: { path?: string } | null
}

export interface ActaRef {
  numero_acta: string
}

// Cuerpo que se envia al servidor de carbone
export interface CarboneRequest {
  convertTo: string
  data: unknown
  template: string
  reportName?: string
}
