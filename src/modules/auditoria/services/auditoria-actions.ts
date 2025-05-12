import { apiJuzgado } from '../../../api/config'
import { setUrlParams } from '../../../shared'

export const getAuditoriaFiltrada = async (filters: object) => {
  try {
    const params = setUrlParams(filters)

    const response = await apiJuzgado.get('/auditoria/filter', { params })
    const { data, meta } = response.data
    return { data, meta }
  } catch (error) {
    console.error('Error fetching auditoria:', error)
    return []
  }
}

