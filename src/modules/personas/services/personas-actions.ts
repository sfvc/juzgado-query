import { apiJuzgado } from '../../../api/config'
import { setKeyParams } from '../../../shared/helpers/setKeyParams'
import { setUrlParams } from '../../../shared/helpers/setUrlParams'
import { PersonaFisica, PersonaJuridica } from '../interfaces'

export const getPersonas = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/personas', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getPersonaById = async (id: number) => {
  const response = await apiJuzgado.get(`/personas/${id}`)
  const { data } = response.data
  return data
}

export const createPersona = async (form: PersonaFisica | PersonaJuridica) => {
  const data = setKeyParams(form)
  const response = await apiJuzgado.post('/personas', data)
  const { data: persona } = response.data
  return persona
}

export const updatePersona = async (id: number, data: PersonaFisica | PersonaJuridica) => {
  const response = await apiJuzgado.put(`/personas/${id}`, data)
  const { data: persona } = response.data
  return persona
}

export const deletePersona = async (id: number) => {
  const response = await apiJuzgado.delete(`/personas/${id}`)
  const { data: persona } = response.data
  return persona
}

export const getPersonasByFilter = async (query: string) => {
  const response = await apiJuzgado.get(`/personas/buscar/${query}`)
  const { data: personas } = response.data
  return personas
}

export const getDataPersona = async () => {
  const response = await apiJuzgado.get('personas-data')
  return response.data
}

export const getAntecedentesByPersona = async (id: number, page: number = 1) => {
  if (!id) return { data: [], meta: null }

  const response = await apiJuzgado.get('actas/filtrar', {
    params: {
      persona_id: id,
      per_page: 50,
      page
    }
  })

  return response.data
}

export const getAntecedentesByPersonaPrint = async (id: number) => {
  if (!id) return []

  const response = await apiJuzgado.get('actas/filtrar', {
    params: {
      persona_id: id,
      per_page: 9999,
      page: 1
    }
  })

  return response.data.data
}
