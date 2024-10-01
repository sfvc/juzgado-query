import { apiJuzgado } from '../../../../api/config'
import { setUrlParams } from '../../../../shared/helpers/setUrlParams'
import { FormLocalidad } from '../interfaces/localizacion'

export const getLocalidades = async (filters: object) => {
  const params = setUrlParams(filters)
  
  const response = await apiJuzgado.get('/localidades', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getLocalidadById = async (id: number) => {
  const response = await apiJuzgado.get(`/localidades/${id}`)
  const { data } = response.data
  return data
}

export const createLocalidad = async (data: FormLocalidad) => {
  const response = await apiJuzgado.post('/localidades', data)
  const { data: localidad } = response.data
  return localidad
}

export const updateLocalidad = async (id: number, data: FormLocalidad) => {
  const response = await apiJuzgado.put(`/localidades/${id}`, data)
  const { data: localidad } = response.data
  return localidad
}

export const deleteLocalidad = async (id: number) => {
  const response = await apiJuzgado.delete(`/localidades/${id}`)
  const { data: localidad } = response.data
  return localidad
}

export const getLocalidadesByFilter = async (filter: string) => {
  const response = await apiJuzgado.get(`/localidades/buscar/${filter}`)
  const { data: localidades } = response.data
  return localidades
}