import { useQuery } from '@tanstack/react-query'
import { inhabilitadoActions } from '..'
import type { IInhabilitado } from '../interfaces'

export const useHistoryInhabilitado = (dni: number | undefined) => {
    
  // Obtener el historial de inhabilitaciones de una persona
  const { data: inhabilitaciones, isLoading } = useQuery<IInhabilitado[]>({
    queryKey: ['inhabilitado-history', {query: dni}],
    queryFn: () => inhabilitadoActions.getInhabilitadosHistory({query: dni}),
    staleTime: 1000 * 60 * 5,
    enabled: !!dni
  })
      
  return {
    inhabilitaciones,
    isLoading
  }
}
