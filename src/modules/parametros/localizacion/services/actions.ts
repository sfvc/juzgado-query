import { apiJuzgado } from '../../../../api/config'
import { Pais } from '../interfaces/localizacion'

interface GetPaisesOptions {
    filterKey?: string
}

export const getPaises = async ({ filterKey }: GetPaisesOptions) => {
  const response = await apiJuzgado.get('/paises')
  const { data } = response.data
  return data
}

export const getPaisById = async (id: number) => {
  const response = await apiJuzgado.get(`/paises/${id}`)
  const { data } = response.data
  return data
}

export const createPais = async (data: Pais) => {
  const response = await apiJuzgado.post('/paises', data)
  const { data: pais } = response.data
  return pais
}

export const updatePais = async (id: number, data: Pais) => {
  const response = await apiJuzgado.post(`/paises/${id}`, data)
  const { data: pais } = response.data
  return pais
}

export const deletePais = async (id: number) => {
  const response = await apiJuzgado.delete(`/paises/${id}`)
  const { data: pais } = response.data
  return pais
}
