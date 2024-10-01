import { apiJuzgado } from '../../../../api/config'
import { setUrlParams } from '../../../../shared/helpers/setUrlParams'
import type { FormPais } from '../interfaces/localizacion'

export const getPaises = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/paises', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getPaisById = async (id: number) => {
  const response = await apiJuzgado.get(`/paises/${id}`)
  const { data } = response.data
  return data
}

export const createPais = async (data: FormPais) => {
  const response = await apiJuzgado.post('/paises', data)
  const { data: pais } = response.data
  return pais
}

export const updatePais = async (id: number, data: FormPais) => {
  const response = await apiJuzgado.put(`/paises/${id}`, data)
  const { data: pais } = response.data
  return pais
}

export const deletePais = async (id: number) => {
  const response = await apiJuzgado.delete(`/paises/${id}`)
  const { data: pais } = response.data
  return pais
}


export const getAllPaises = async () => {
  const response = await apiJuzgado.get('paises/select')
  const { data: paises } = response.data
  return paises
}