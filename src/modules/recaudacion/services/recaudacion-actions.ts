import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared'

export const getRecaudacionDiaria = async (filters: object) => {
  try {
    const today = new Date().toISOString().split('T')[0]
    const params = setUrlParams(filters)

    const response = await apiJuzgado.get(`/comprobantes/resumen-diario?fecha=${today}`, { params })
    const { data, meta } = response.data
    return { data, meta }
  } catch (error) {
    console.error('Error fetching recaudación:', error)
    return []
  }
}

export const getRecaudacionFiltrada = async (filters: any) => {
  try {
    const { 'fecha_desde': desde, 'fecha_hasta': hasta, ...rest } = filters
    const params = setUrlParams(rest)

    const response = await apiJuzgado.get(`/comprobantes/resumen-periodo?fecha_desde=${desde}&fecha_hasta=${hasta}`, { params })
    const { data, meta } = response.data
    return { data, meta }
  } catch (error) {
    console.error('Error fetching recaudación filtrada:', error)
    return []
  }
}

