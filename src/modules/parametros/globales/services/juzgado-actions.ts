import { apiJuzgado } from '../../../../api/config'
import { setUrlParams } from '../../../../shared/helpers/setUrlParams'
import { FormJuzgado } from '../interfaces'

export const getJuzgados = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/juzgados', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getJuzgadoById = async (id: number) => {
  const response = await apiJuzgado.get(`/juzgados/${id}`)
  const { data } = response.data
  return data
}

export const createJuzgado = async (data: FormJuzgado) => {
  const response = await apiJuzgado.post('/juzgados', data)
  const { data: juzgado } = response.data
  return juzgado
}

export const updateJuzgado = async (id: number, data: FormJuzgado) => {
  const response = await apiJuzgado.put(`/juzgados/${id}`, data)
  const { data: juzgado } = response.data
  return juzgado
}

export const deleteJuzgado = async (id: number) => {
  const response = await apiJuzgado.delete(`/juzgados/${id}`)
  const { data: juzgado } = response.data
  return juzgado
}
