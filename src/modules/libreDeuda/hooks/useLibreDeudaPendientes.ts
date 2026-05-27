import { useQuery } from '@tanstack/react-query'
import { apiJuzgado } from '../../../api/config'

type LibreDeudaItem = {
  verificado: number
}

export const useLibreDeudaPendientes = () => {
  return useQuery({
    queryKey: ['libreDeudaPendientes'],
    queryFn: async () => {
      const { data } = await apiJuzgado.get('/libre-deuda')

      const pendientes = data.data.filter(
        (item: LibreDeudaItem) => item.verificado === 0
      ).length

      return pendientes
    },
    refetchInterval: 30000
  })
}
