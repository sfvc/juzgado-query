import { Column } from '../../../shared/interfaces'

export enum PATH {
  ACTA = '/actas',
  NOTIFICATION = '/notificaciones',
}

export const initialValues = { page: 1 }

export const ActaColums: Column[] = [
  { key: 'numero_acta', label: 'Nro. Acta' },
  { key: 'numero_causa', label: 'Nro. Causa' },
  { key: 'fecha', label: 'fecha' },
  { key: 'tipo_acta', label: 'Tipo' },
  { key: 'estado', label: 'Estado' },
  { key: 'prioridad', label: 'Prioridad' },
  { key: 'nombre', label: 'Nombre y Apellido' },
  { key: 'numero_documento', label: 'Nro. Documento' },
  { key: 'acciones', label: 'Acciones' },
]
  
export const NotificacionColums: Column[] = [
  { key: 'selected', label: ' ' },
  { key: 'numero_acta', label: 'Nro. Acta' },
  { key: 'numero_causa', label: 'Nro. Causa' },
  { key: 'fecha', label: 'fecha' },
  { key: 'tipo_acta', label: 'Tipo' },
  { key: 'estado', label: 'Estado' },
  { key: 'prioridad', label: 'Prioridad' },
  { key: 'nombre', label: 'Nombre y Apellido' },
  { key: 'numero_documento', label: 'Nro. Documento' },
  { key: 'notificado', label: 'Fue Notificado?' },
]