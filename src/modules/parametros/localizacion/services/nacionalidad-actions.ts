import { apiJuzgado } from '../../../../api/config'
import { setUrlParams } from '../../../../shared/helpers/setUrlParams'
import type { FormNacionalidad } from '../interfaces/localizacion'

export const getNacionalidades = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/nacionalidades', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getNacionalidadById = async (id: number) => {
  const response = await apiJuzgado.get(`/nacionalidades/${id}`)
  const { data } = response.data
  return data
}

export const createNacionalidad = async (data: FormNacionalidad) => {
  const response = await apiJuzgado.post('/nacionalidades', data)
  const { data: nacionalidad } = response.data
  return nacionalidad
}

export const updateNacionalidad = async (id: number, data: FormNacionalidad) => {
  const response = await apiJuzgado.put(`/nacionalidades/${id}`, data)
  const { data: nacionalidad } = response.data
  return nacionalidad
}

export const deleteNacionalidad = async (id: number) => {
  const response = await apiJuzgado.delete(`/nacionalidades/${id}`)
  const { data: nacionalidad } = response.data
  return nacionalidad
}
