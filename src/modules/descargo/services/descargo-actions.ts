import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared/helpers/setUrlParams'

export const getDescargo = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/descargos', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getDescargoById = async (id: number) => {
  const response = await apiJuzgado.get(`/descargos/${id}`)
  const { data } = response.data
  return data
}

export const confirmDescargo = async (id: number) => {
  const response = await apiJuzgado.put(
    `/descargos/${id}/estado`,
    {
      estado: 'APROBADO'
    }
  )

  return response.data
}

export const rechazarDescargo = async (id: number) => {
  const response = await apiJuzgado.put(
    `/descargos/${id}/estado`,
    {
      estado: 'RECHAZADO'
    }
  )

  return response.data
}
