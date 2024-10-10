import { apiJuzgado } from '../../../../api/config'
import { setUrlParams } from '../../../../shared/helpers/setUrlParams'
import { FormDepartamento } from '../interfaces/localizacion'

export const getDepartamentos = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/departamentos', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getDepartamentoById = async (id: number) => {
  const response = await apiJuzgado.get(`/departamentos/${id}`)
  const { data } = response.data
  return data
}

export const createDepartamento = async (data: FormDepartamento) => {
  const response = await apiJuzgado.post('/departamentos', data)
  const { data: departamento } = response.data
  return departamento
}

export const updateDepartamento = async (id: number, data: FormDepartamento) => {
  const response = await apiJuzgado.put(`/departamentos/${id}`, data)
  const { data: departamento } = response.data
  return departamento
}

export const deleteDepartamento = async (id: number) => {
  const response = await apiJuzgado.delete(`/departamentos/${id}`)
  const { data: departamento } = response.data
  return departamento
}

export const getAllDepartamentos = async () => {
  const response = await apiJuzgado.get('departamentos/select')
  const { data: departamentos } = response.data
  return departamentos
}

export const getDepartamentosByProvincia = async (id: number) => {
  try {
    const response = await apiJuzgado.get(`/provincias/${id}/departamentos`)
    const { data: { departamentos } } = response.data
    return departamentos
  } catch (error) {
    console.log(error)
  }
}
