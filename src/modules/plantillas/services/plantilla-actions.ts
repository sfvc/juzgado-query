import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared/helpers/setUrlParams'
import { FormPlantilla } from '../interfaces'

export const getPlantillas = async (filters: object) => {
  const params = setUrlParams(filters)
  
  const response = await apiJuzgado.get('/plantillas', { params })
  const { data, meta } = response.data
  return { data, meta }
}
  
export const getPlantillaById = async (id: number) => {
  const response = await apiJuzgado.get(`/plantillas/${id}`)
  const { data } = response.data
  return data
}
  
export const createPlantilla = async (data: FormPlantilla) => {
  const response = await apiJuzgado.post('/plantillas', data)
  const { data: plantilla } = response.data
  return plantilla
}
  
export const updatePlantilla = async (id: number, data: FormPlantilla) => {
  const response = await apiJuzgado.put(`/plantillas/${id}`, data)
  const { data: plantilla } = response.data
  return plantilla
}
  
export const deletePlantilla = async (id: number) => {
  const response = await apiJuzgado.delete(`/plantillas/${id}`)
  const { data: plantilla } = response.data
  return plantilla
}