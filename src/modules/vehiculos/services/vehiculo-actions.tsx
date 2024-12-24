import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared/helpers/setUrlParams'
import { FormVehiculo } from '../interfaces'

export const getVehiculos = async (filters: object) => {
  const params = setUrlParams(filters)
  
  const response = await apiJuzgado.get('/vehiculos', { params })
  const { data, meta } = response.data
  return { data, meta }
}
  
export const getVehiculoById = async (id: number) => {
  const response = await apiJuzgado.get(`/vehiculos/${id}`)
  const { data } = response.data
  return data
}
  
export const createVehiculo = async (data: FormVehiculo) => {
  const response = await apiJuzgado.post('/vehiculos', data)
  const { data: vehiculo } = response.data
  return vehiculo
}
  
export const updateVehiculo = async (id: number, data: FormVehiculo) => {
  const response = await apiJuzgado.put(`/vehiculos/${id}`, data)
  const { data: vehiculo } = response.data
  return vehiculo
}
  
export const deleteVehiculo = async (id: number) => {
  const response = await apiJuzgado.delete(`/vehiculos/${id}`)
  const { data: vehiculo } = response.data
  return vehiculo
}

export const getDataVehiculo = async () => {
  const response = await apiJuzgado.get('vehiculos-data')
  return response.data
}

export const getVehiculosByFilter = async (query: string) => {
  const response = await apiJuzgado.get(`/vehiculos/buscar/${query}`)
  const { data: vehiculos } = response.data
  return vehiculos
}
  
// TODO: Cambiar por query params
export const getMarcas = async (query: string) => {
  const response = await apiJuzgado.get(`marcas/buscar/${query}`)
  const { data } = response.data
  return data
}