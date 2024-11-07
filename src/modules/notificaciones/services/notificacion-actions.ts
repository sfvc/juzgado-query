import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared'

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
  