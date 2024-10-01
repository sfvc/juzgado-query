import { apiJuzgado } from '../../../../api/config'
import { setUrlParams } from '../../../../shared/helpers/setUrlParams'
import { FormProvincia } from '../interfaces/localizacion'

export const getProvincias = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/provincias', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getProvinciaById = async (id: number) => {
  const response = await apiJuzgado.get(`/provincias/${id}`)
  const { data } = response.data
  return data
}

export const createProvincia = async (data: FormProvincia) => {
  const response = await apiJuzgado.post('/provincias', data)
  const { data: provincia } = response.data
  return provincia
}

export const updateProvincia = async (id: number, data: FormProvincia) => {
  const response = await apiJuzgado.put(`/provincias/${id}`, data)
  const { data: provincia } = response.data
  return provincia
}

export const deleteProvincia = async (id: number) => {
  const response = await apiJuzgado.delete(`/provincias/${id}`)
  const { data: provincia } = response.data
  return provincia
}

export const getAllProvincias = async () => {
  const response = await apiJuzgado.get('provincias/select')
  const { data: provincias } = response.data
  return provincias
}