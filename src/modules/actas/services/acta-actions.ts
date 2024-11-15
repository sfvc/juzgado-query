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

/* export const getActas = async (filters: object) => {
  const params = setUrlParams(filters)
  
  const response = await apiJuzgado.get('/actas', { params })
  const { data, meta } = response.data
  return { data, meta }
} */

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
  console.log(response)
}

export const updateActa = async (id: number, form: IActaForm) => {  
  const response = await apiJuzgado.put(`/actas/${id}`, form)
  console.log(response)
}

export const deleteActa = async (id: number) => {  
  const response = await apiJuzgado.delete(`/actas/${id}`)
  console.log(response)
}

// Parametros de formularios de actas
export const getPrioridades = async () => {
  const response = await apiJuzgado.get('/prioridades')
  const { data } = response.data
  return data
}