import { apiJuzgado } from '../../../../api/config'
import { setUrlParams } from '../../../../shared/helpers/setUrlParams'
import { FormUnidad } from '../interfaces'

export const getUnidades = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/unidades', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const createUnidad =  async (data: FormUnidad) => {
  const response = await apiJuzgado.post('/unidades', data)
  const { data: unidad } = response.data
  return unidad
}

export const updateUnidad =  async (id: number, data: FormUnidad) => {
  const response = await apiJuzgado.put(`/unidades/${id}`, data)
  const { data: unidad } = response.data
  return unidad
}

export const deleteUnidad =  async (id: number) => {
  const response = await apiJuzgado.delete(`/unidades/${id}`)
  const { data: unidad } = response.data
  return unidad
}
