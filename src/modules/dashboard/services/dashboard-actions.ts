import { apiJuzgado } from '../../../api/config'

export const getDataDashboard = async () => {
  const response = await apiJuzgado.get('/dashboard')
  return response.data
}