import { apiJuzgado } from '../../../../api/config'
import { setUrlParams } from '../../../../shared/helpers/setUrlParams'
import { FormRubro } from '../interfaces'

export const getRubros = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/tipo-rubros', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getRubroById = async (id: number) => {
  const response = await apiJuzgado.get(`/tipo-rubros/${id}`)
  const { data } = response.data
  return data
}

export const createRubro =  async (data: FormRubro) => {
  const response = await apiJuzgado.post('/tipo-rubros', data)
  const { data: rubros } = response.data
  return rubros
}

export const updateRubro =  async (id: number, data: FormRubro) => {
  const response = await apiJuzgado.put(`/tipo-rubros/${id}`, data)
  const { data: rubros } = response.data
  return rubros
}

export const deleteRubro =  async (id: number) => {
  const response = await apiJuzgado.delete(`/tipo-rubros/${id}`)
  const { data: rubros } = response.data
  return rubros
}
