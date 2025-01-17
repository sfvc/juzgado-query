import { apiJuzgado } from '../../../api/config'
import { IDashboard } from '../interfaces'

export const getDataDashboard = async (): Promise<IDashboard> => {
  const response = await apiJuzgado.get('/dashboard')
  return response.data
}