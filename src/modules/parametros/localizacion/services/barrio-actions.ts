import { apiJuzgado } from '../../../../api/config'
import { FormBarrio } from '../interfaces/localizacion'

export const getBarrios = async (filterKey: string, page: number = 1) => {
  const params = new URLSearchParams()
  if (filterKey !== '') params.append('query', filterKey)
  if (page) params.append('page', page.toString())

  const response = await apiJuzgado.get('/barrios', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getBarrioById = async (id: number) => {
  const response = await apiJuzgado.get(`/barrios/${id}`)
  const { data } = response.data
  return data
}

export const createBarrio = async (data: FormBarrio) => {
  const response = await apiJuzgado.post('/barrios', data)
  const { data: barrio } = response.data
  return barrio
}

export const updateBarrio = async (id: number, data: FormBarrio) => {
  const response = await apiJuzgado.put(`/barrios/${id}`, data)
  const { data: barrio } = response.data
  return barrio
}

export const deleteBarrio = async (id: number) => {
  const response = await apiJuzgado.delete(`/barrios/${id}`)
  const { data: barrio } = response.data
  return barrio
}

/* export const getBarriosByLocalidades = async (id: number) => {
  const response = await apiJuzgado.get(`/localidades/${id}/barrios`)
  const { data: barrios } = response.data
  console.log(barrios)
  return barrios
} */