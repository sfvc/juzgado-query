import { useQuery } from '@tanstack/react-query'
import { apiJuzgado } from '../../../api/config'

type DescargoItem = {
  verificado: boolean
}

export const useDescargoPendientes = () => {
  return useQuery({
    queryKey: ['descargoPendiente'],
    queryFn: async () => {
      const { data } = await apiJuzgado.get('/descargos')

      const pendientes = data.data.filter(
        (item: DescargoItem) => item.verificado === false
      ).length

      return pendientes
    },
    refetchInterval: 30000
  })
}
