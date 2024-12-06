export const TIPO_ACTAS: string[] = ['TRANSITO', 'INSPECCION', 'BROMATOLOGIA', 'OBRAS PARTICULARES']

export const TIPO_ACTUACION: string[] = ['DECRETO', 'SENTENCIA', 'OFICIO', 'NOTIFICACION']

export enum ACTAS {
  TRANSITO = 'TRANSITO', 
  INSPECCION = 'INSPECCION', 
  BROMATOLOGIA = 'BROMATOLOGIA', 
  OBRAS_PARTICULARES = 'OBRAS PARTICULARES'
}

export enum ACTUACION {
  DECRETO = 'DECRETO', 
  SENTENCIA = 'SENTENCIA', 
  OFICIO = 'OFICIO', 
  NOTIFICACION = 'NOTIFICACION'
}

export enum RESPONSABLE {
  SI = 1, 
  NO = 0, 
}

// Medidas preventivas
export const PRIORIDAD_URGENTE = '1'

export const INSPECCION_PREVENTIVAS = [
  { value: 'SECUESTRO', label: 'SECUESTRO' },
  { value: 'CLAUSULA', label: 'CLAUSULA' }
]

export const OBRAS_PREVENTIVAS = [
  { value: 'PARALIZACIÓN DE OBRAS', label: 'PARALIZACIÓN DE OBRAS' }
]

export const DEFAULT_COLOR = '#808080'