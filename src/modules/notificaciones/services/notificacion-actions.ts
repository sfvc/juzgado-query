import axios from 'axios'
import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared'

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

    // Subir el archivo a s3
  })

  await Promise.all(notificationsPromise)
}