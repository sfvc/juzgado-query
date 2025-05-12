import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared/helpers/setUrlParams'

export const getLibreDeuda = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/libre-deuda', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getLibreDeudaById = async (id: number) => {
  const response = await apiJuzgado.get(`/libre-deuda/${id}`)
  const { data } = response.data
  return data
}

export const deleteLibreDeuda = async (id: number) => {
  const response = await apiJuzgado.delete(`/libre-deuda/${id}`)
  const { data: libreDeuda } = response.data
  return libreDeuda
}

export const confirmLibreDeuda = async (id: number ) => {
  const response = await apiJuzgado.post(`/libre-deuda/${id}`)
  const { data: plantilla } = response.data
  return plantilla
}
