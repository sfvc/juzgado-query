import { apiJuzgado } from '../../../api/config'
import { EstadoActaForm } from '../interfaces'

export const getEstadosActa = async (id: number) => {
  const response = await apiJuzgado.get(`/actas/${id}/estados`)
  const { data: { estados } } = response.data
  return estados
}
  
export const createEstadoActa = async (id: number, data: EstadoActaForm) => {
  const response = await apiJuzgado.put(`/actas/${id}/estados/editar`, data)
  const { data: estado } = response.data
  return estado
}
  
export const updateEstadoActa = async (id: number, estadoActaId: number , data: EstadoActaForm) => {
  const response = await apiJuzgado.put(`/actas/${id}/estados/${estadoActaId}/observaciones`, data)
  const { data: estado } = response.data
  return estado
}