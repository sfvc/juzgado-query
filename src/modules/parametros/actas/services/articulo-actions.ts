import { apiJuzgado } from '../../../../api/config'
import { setUrlParams } from '../../../../shared/helpers/setUrlParams'
import { FormArticulo } from '../interfaces'

export const getArticulos = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/articulos', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getArticuloById = async (id: number) => {
  const response = await apiJuzgado.get(`/articulos/${id}`)
  const { data } = response.data
  return data
}

export const createArticulo = async (data: FormArticulo) => {
  const response = await apiJuzgado.post('/articulos', data)
  const { data: articulos } = response.data
  return articulos
}

export const updateArticulo = async (id: number, data: FormArticulo) => {
  const response = await apiJuzgado.put(`/articulos/${id}`, data)
  const { data: articulos } = response.data
  return articulos
}

export const deleteArticulo = async (id: number) => {
  const response = await apiJuzgado.delete(`/articulos/${id}`)
  const { data: articulos } = response.data
  return articulos
}

export const getArticulosByFilter = async (query: string) => {
  const response = await apiJuzgado.get(`/articulos/buscar/${query}`)
  const { data: articulos } = response.data
  return articulos
}