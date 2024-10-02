import { apiJuzgado } from '../../../../api/config'
import { setUrlParams } from '../../../../shared/helpers/setUrlParams'
import { FormPropiedad } from '../interfaces'

export const getPropiedades = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/propiedades', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getPropiedadById = async (id: number) => {
  const response = await apiJuzgado.get(`/propiedades/${id}`)
  const { data } = response.data
  return data
}

export const createPropiedad = async (data: FormPropiedad) => {
  const response = await apiJuzgado.post('/propiedades', data)
  const { data: propiedades } = response.data
  return propiedades
}

export const updatePropiedad = async (id: number, data: FormPropiedad) => {
  const response = await apiJuzgado.put(`/propiedades/${id}`, data)
  const { data: propiedades } = response.data
  return propiedades
}

export const deletePropiedad = async (id: number) => {
  const response = await apiJuzgado.delete(`/propiedades/${id}`)
  const { data: propiedades } = response.data
  return propiedades
}
