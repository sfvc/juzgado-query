import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared/helpers/setUrlParams'

export const getLibreDeuda = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/libre-deuda', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getLibreDeudaById = async (id: number) => {
  const response = await apiJuzgado.get(`/libre-deuda/${id}`)
  const { data } = response.data
  return data
}

export const confirmLibreDeuda = async (data: {
  libre_deuda_id: number
  persona_id: number
  vehiculo_id: number
}) => {
  const response = await apiJuzgado.post('/libre-deuda/verificar', {
    ...data,
    verificado: true,
  })
  return response.data.data
}
