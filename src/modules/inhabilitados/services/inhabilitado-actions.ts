import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared'
import { FormInhabilitado } from '../interfaces'

export const getInhabilitados = async (filters: object) => {
  const params = setUrlParams(filters)
  const response = await apiJuzgado.get('/inhabilitados', { params })

  if (response.data && response.data.inhabilitado === false) {
    return {
      data: [],
      meta: { current_page: 1, from: 1, last_page: 1, to: 0, total: 0 },
      personaNoInhabilitada: {
        nombre_completo: response.data.nombre_completo,
        dni: response.data.dni
      }
    }
  }

  const { data, meta } = response.data
  return { data, meta }
}

export const createInhabilitado =  async (data: FormInhabilitado) => {
  const response = await apiJuzgado.post('/inhabilitados', data)
  const { data: inhabilitado } = response.data
  return inhabilitado
}

export const updateInhabilitado =  async (id: number, data: FormInhabilitado) => {
  const response = await apiJuzgado.put(`/inhabilitados/${id}`, data)
  const { data: inhabilitado } = response.data
  return inhabilitado
}

export const deleteInhabilitado =  async (id: number) => {
  const response = await apiJuzgado.delete(`/inhabilitados/${id}`)
  const { data: inhabilitado } = response.data
  return inhabilitado
}

export const getInhabilitadosHistory = async (query: object) => {
  const params = setUrlParams(query)

  const response = await apiJuzgado.get('/inhabilitados', { params })
  const { data } = response.data
  return data
}
