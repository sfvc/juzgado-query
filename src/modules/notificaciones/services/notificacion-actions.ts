import axios from 'axios'
import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared'
import { formatData } from '../../carbone/helpers/formatData'

const CARBONE_URL = import.meta.env.VITE_CARBONE_URL

export const getNotifications = async (filters: object) => {
  const params = setUrlParams(filters)
  
  const response = await apiJuzgado.get('/vehiculos', { params })
  const { data, meta } = response.data
  return { data, meta }
}
  
export const getNotificationsByActa = async (id: number) => {
  const response = await apiJuzgado.get(`/actas/${id}/notificacion`)
  const { data } = response.data
  return data
}
  
export const createNotification = async (selectedActas: number[], plantillaId: number | null) => {
  if (selectedActas.length === 0 || !plantillaId) throw new Error('No hay actas o plantilla seleccionada')

  const notificationsPromise = selectedActas.map((actaId: number) => {
    return apiJuzgado.post('/notificaciones', {
      acta_id: actaId,
      plantilla_id: plantillaId,
      tipo_actuacion: 'NOTIFICACION'
    })

    // TODO: Subir el archivo a s3
  })

  await Promise.all(notificationsPromise)
}

// Eliminar notificacion relacionada al acta 
export const deleteNotification = async (id: number) => {
  const response = await apiJuzgado.delete(`notificaciones/${id}`)
  return response
}

// Trae el historial de una notificación
export const getHistoryByNotificacion = async (notificacionId: number) => {
  const response = await apiJuzgado.get(`notificacion-detalle/${notificacionId}`) 
  const { data } = response.data
  return data
}

// Eliminar notificacion del historial 
export const deleteNotificationHistory = async (notificacionId: number) => {
  const response = await apiJuzgado.delete(`notificacion-detalle/${notificacionId}`) 
  return response
}