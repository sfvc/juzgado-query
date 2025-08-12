import { apiJuzgado } from '../../../api/config'

export const getAntecedentes = async (id: number) => {
  if (!id) return []

  const response = await apiJuzgado.get(`actas/filtrar?persona_id=${id}`)
  const { data: antecedentes } = response.data
  return antecedentes
}


