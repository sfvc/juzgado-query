import { useQuery } from '@tanstack/react-query'
import { actaActions } from '..'

export const usePrioridad = () => {
  const { data: prioridades , isLoading } = useQuery({
    queryKey: ['prioridades'],
    queryFn: actaActions.getPrioridades,
    staleTime: 1000 * 60 * 5
  })
      
  return {
    prioridades,
    isLoading
  }
}
