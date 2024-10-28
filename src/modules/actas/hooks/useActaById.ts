import { useQuery } from '@tanstack/react-query'
import { actaActions } from '..'
import { IActa } from '../interfaces'

export const useActaById = (id: string | undefined) => {
  const { data: acta, isLoading } = useQuery<IActa | null>({
    queryKey: ['acta', id],
    queryFn: () => actaActions.getActaById(id!),
    enabled: !!id,
  })

  return {
    acta,
    isLoading
  }
}
