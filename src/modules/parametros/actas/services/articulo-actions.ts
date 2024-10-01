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

/* export const getAllArticulos = async () => {
  const response = await apiJuzgado.get('articulos/select')
  const { data: articulos } = response.data
  return articulos
} */

//TODO: Crear estos actions en un servicio global para reutilizarlos
export const getAllTipoActas = async () => {
  const response = await apiJuzgado.get('tipoacta')
  const tipoActas = response.data
  return tipoActas
}

export const getAllTipoInfracciones = async () => {
  const response = await apiJuzgado.get('tipoinfraccion')
  const tipoInfracciones = response.data
  return tipoInfracciones
}