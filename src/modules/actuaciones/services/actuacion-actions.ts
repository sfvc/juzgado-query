import { apiJuzgado } from '../../../api/config'
import { setKeyParams } from '../../../shared/helpers/setKeyParams'
import type { IActuacionForm } from '../interfaces'
import type { ISentenciaForm } from '../interfaces/sentencia'

export const getActuacionesByActa = async (id: number) => {
  const response = await apiJuzgado.get(`/actas/${id}/actuacion`)
  const { data } = response.data
  return data
}

export const getPlantillasByActuacion = async (tipo: string, juzgadoId: number) => {
  const response = await apiJuzgado.get(`/plantillas/tipos?tipo_actuacion=${tipo}&juzgado=${juzgadoId}`)
  const { data } = response.data
  return data
}

// Buscador de plantillas para actuaciones
export const getPlantillasSearchableSelect = async (queryParams: { query?: string, tipo: string, juzgadoId: number }) => {
  const params = setKeyParams(queryParams)

  const response = await apiJuzgado.get('/plantillas/tipos', { params })
  const { data } = response.data
  return data
}

export const deleteActuacion = async (actaId: number, actuacionId: number) => {
  const response = await apiJuzgado.delete(`/actuaciones/${actaId}/${actuacionId}`)
  const { data } = response.data
  return data
}

// Crear multiples actuaciones (Decretos u Oficios) a la vez
export const createActuacion = async (form: IActuacionForm) => {
  await apiJuzgado.post('/actuaciones', form)
}

export const createSentencia = async (form: ISentenciaForm) => {
  await apiJuzgado.post('/actuaciones', form)
}

// Trae el historial de una actuacion
export const getHistoryByActuacion = async (actuacionId: number) => {
  const response = await apiJuzgado.get(`actuacion-detalle/${actuacionId}`) 
  const { data } = response.data
  return data
}

// Eliminar actuacion del historial 
export const deleteActuacionHistory = async (actuacionId: number) => {
  const response = await apiJuzgado.delete(`actuacion-detalle/${actuacionId}`) 
  return response
}