import { apiJuzgado } from '../../../../api/config'
import type { FormPais } from '../interfaces/localizacion'
// import { Pais } from '../interfaces/localizacion'

export const getPaises = async (filterKey: string, page: number = 1) => {
  const params = new URLSearchParams()
  if (filterKey !== '') params.append('query', filterKey)
  if (page) params.append('page', page.toString())

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