import { apiJuzgado } from '../../../../api/config'
import { setUrlParams } from '../../../../shared/helpers/setUrlParams'
import { FormBarrio } from '../interfaces/localizacion'

export const getBarrios = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/barrios', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getBarrioById = async (id: number) => {
  const response = await apiJuzgado.get(`/barrios/${id}`)
  const { data } = response.data
  return data
}

export const createBarrio = async (data: FormBarrio) => {
  const response = await apiJuzgado.post('/barrios', data)
  const { data: barrio } = response.data
  return barrio
}

export const updateBarrio = async (id: number, data: FormBarrio) => {
  const response = await apiJuzgado.put(`/barrios/${id}`, data)
  const { data: barrio } = response.data
  return barrio
}

export const deleteBarrio = async (id: number) => {
  const response = await apiJuzgado.delete(`/barrios/${id}`)
  const { data: barrio } = response.data
  return barrio
}

export const getBarriosByLocalidades = async (id: number) => {
  const response = await apiJuzgado.get(`/localidades/${id}/barrios`)
  const { data: { barrios } } = response.data
  return barrios
}