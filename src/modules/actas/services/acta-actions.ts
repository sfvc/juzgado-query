import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared'
import { IActa } from '../interfaces'
import { IActaForm } from '../interfaces/form-interfaces'

export const getDataFilter = async () => {
  const response = await apiJuzgado.get('actas-data')
  return response.data
}

export const getAllTipoInfracciones = async () => {
  const response = await apiJuzgado.get('tipoinfraccion')
  return response.data
}

export const getActasFilter = async (filters: object) => {
  const params = setUrlParams(filters)
  
  const response = await apiJuzgado.get('/actas/filtrar', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getActaById = async (id: string): Promise<IActa> => {
  const response = await apiJuzgado.get(`/actas/${id}`)
  const { data } = response.data
  return data
}

export const createActa = async (form: IActaForm) => {  
  const response = await apiJuzgado.post('/actas', form)
  const { data } = response.data
  return data
}

export const updateActa = async (id: number, form: IActaForm) => {  
  const response = await apiJuzgado.put(`/actas/${id}`, form)
  const { data } = response.data
  return data
}

export const deleteActa = async (id: number) => {  
  await apiJuzgado.delete(`/actas/${id}`)
}

// Parametros de formularios de actas
export const getPrioridades = async () => {
  const response = await apiJuzgado.get('/prioridades')
  const { data } = response.data
  return data
}