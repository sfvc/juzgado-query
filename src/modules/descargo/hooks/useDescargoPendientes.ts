import { useQuery } from '@tanstack/react-query'
import { apiJuzgado } from '../../../api/config'

type DescargoItem = {
  verificado: number
}

export const useDescargoPendientes = () => {
  return useQuery({
    queryKey: ['libreDeudaPendientes'],
    // queryKey: ['descargoPendiente'],
    queryFn: async () => {
      const { data } = await apiJuzgado.get('/libre-deuda')
      // const { data } = await apiJuzgado.get('/descargo')

      const pendientes = data.data.filter(
        (item: DescargoItem) => item.verificado === 0
      ).length

      return pendientes
    },
    refetchInterval: 30000
  })
}
