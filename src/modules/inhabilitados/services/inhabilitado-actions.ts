import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared'
import { FormInhabilitado } from '../interfaces'

export const getInhabilitados = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/inhabilitados', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const createInhabilitado =  async (data: FormInhabilitado) => {
  const response = await apiJuzgado.post('/inhabilitados', data)
  const { data: inhabilitado } = response.data
  return inhabilitado
}

export const updateInhabilitado =  async (id: number, data: FormInhabilitado) => {
  const response = await apiJuzgado.put(`/inhabilitados/${id}`, data)
  const { data: inhabilitado } = response.data
  return inhabilitado
}

export const deleteInhabilitado =  async (id: number) => {
  const response = await apiJuzgado.delete(`/inhabilitados/${id}`)
  const { data: inhabilitado } = response.data
  return inhabilitado
}

export const getInhabilitadosHistory = async (query: object) => {
  const params = setUrlParams(query) // { query(dni): 999999 }

  const response = await apiJuzgado.get('/inhabilitados', { params })
  const { data } = response.data
  return data
}
