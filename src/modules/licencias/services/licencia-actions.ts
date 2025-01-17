import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared'
import type { FormLicencia } from '../interfaces'


export const getLicencias = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/licencias', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const createLicencia =  async (data: FormLicencia) => {
  const response = await apiJuzgado.post('/licencias', data)
  const { data: licencia } = response.data
  return licencia
}

export const updateLicencia =  async (id: number, data: FormLicencia) => {
  const response = await apiJuzgado.put(`/licencias/${id}`, data)
  const { data: licencia } = response.data
  return licencia
}

export const handLicencia =  async (id: number, data: { user_id: number }) => {
  const response = await apiJuzgado.put(`/licencias/entregar/${id}`, data)
  const { data: licencia } = response.data
  return licencia
}

export const deleteLicencia =  async (id: number) => {
  await apiJuzgado.delete(`/licencias/${id}`)
}

