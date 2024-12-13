import { apiJuzgado } from '../../../api/config'
import { IActuacionForm } from '../interfaces'
import { ISentenciaForm } from '../interfaces/sentencia'

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

export const deleteActuacion = async (actaId: number, actuacionId: number) => {
  const response = await apiJuzgado.delete(`/actuaciones/${actaId}/${actuacionId}`)
  const { data } = response.data
  return data
}

// Crear multiples actuaciones (Decretos u Oficios) a la vez
export const createActuacion = async (form: IActuacionForm) => {
  const response = await apiJuzgado.post('/actuaciones', form)
  console.log(response)
}

export const createSentencia = async (form: ISentenciaForm) => {
  const response = await apiJuzgado.post('/actuaciones', form)
  console.log(response)
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