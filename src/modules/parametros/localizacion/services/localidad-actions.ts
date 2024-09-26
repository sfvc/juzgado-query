import { apiJuzgado } from '../../../../api/config'
import { FormLocalidad } from '../interfaces/localizacion'

export const getLocalidades = async (filterKey: string, page: number = 1) => {
  const params = new URLSearchParams()
  if (filterKey !== '') params.append('query', filterKey)
  if (page) params.append('page', page.toString())

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