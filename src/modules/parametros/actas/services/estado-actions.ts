import { apiJuzgado } from '../../../../api/config'
import { setUrlParams } from '../../../../shared/helpers/setUrlParams'
import { FormEstado } from '../interfaces'

export const getEstados = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/estados-actas', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getEstadoById = async (id: number) => {
  const response = await apiJuzgado.get(`/estados-actas/${id}`)
  const { data } = response.data
  return data
}

export const createEstado =  async (data: FormEstado) => {
  const response = await apiJuzgado.post('/estados-actas', data)
  const { data: estados } = response.data
  return estados
}

export const updateEstado =  async (id: number, data: FormEstado) => {
  const response = await apiJuzgado.put(`/estados-actas/${id}`, data)
  const { data: estados } = response.data
  return estados
}

export const deleteEstado =  async (id: number) => {
  const response = await apiJuzgado.delete(`/estados-actas/${id}`)
  const { data: estados } = response.data
  return estados
}

export const getAllEstadosActa = async () => {
  const response = await apiJuzgado.get('/estados-actas-select')
  const { data: estado } = response.data
  return estado
}
