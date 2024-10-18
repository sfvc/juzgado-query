import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared'

export const getDataFilter = async () => {
  const response = await apiJuzgado.get('actas-data')
  return response.data
}

export const getAllTipoInfracciones = async () => {
  const response = await apiJuzgado.get('tipoinfraccion')
  return response.data
}

export const getActas = async (filters: object) => {
  const params = setUrlParams(filters)
  
  const response = await apiJuzgado.get('/actas', { params })
  const { data, meta } = response.data
  return { data, meta }
}