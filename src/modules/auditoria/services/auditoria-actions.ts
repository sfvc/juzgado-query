import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared'
import { IAuditoria } from '../interfaces'

export const getAuditoriaFiltrada = async (filters: object) => {
  try {
    const params = setUrlParams(filters)

    const response = await apiJuzgado.get('/auditoria/filter', { params })
    const { data, meta } = response.data

    return { data, meta }
  } catch (error) {
    console.error('Error fetching auditoria:', error)
    return {
      data: [] as IAuditoria[],
      meta: {
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 10
      }
    }
  }
}
