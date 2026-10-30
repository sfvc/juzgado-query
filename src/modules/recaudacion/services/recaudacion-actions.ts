import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared'

interface RecaudacionFilters {
  fecha?: string
  [key: string]: unknown
}

export const getRecaudacionDiaria = async (filters: RecaudacionFilters) => {
  try {
    const fecha = filters?.fecha || new Date().toISOString().split('T')[0]
    const params = setUrlParams(filters)

    const response = await apiJuzgado.get(`/comprobantes/resumen-diario?fecha=${fecha}`, { params })
    const { data, meta, estadisticas } = response.data

    return { data, meta, estadisticas }
  } catch (error) {
    console.error('Error fetching recaudación:', error)
    return { data: [], meta: null, estadisticas: null }
  }
}

export const getRecaudacionFiltrada = async (filters: RecaudacionFilters) => {
  try {
    const fecha = filters?.fecha || new Date().toISOString().split('T')[0]
    const params = setUrlParams(filters)

    const response = await apiJuzgado.get(
      `/comprobantes/resumen-periodo?fecha_desde=${fecha}&fecha_hasta=${fecha}`,
      { params }
    )

    const { data, meta, estadisticas } = response.data

    return { data, meta, estadisticas }
  } catch (error) {
    console.error('Error fetching recaudación filtrada:', error)
    return { data: [], meta: null, estadisticas: null }
  }
}

