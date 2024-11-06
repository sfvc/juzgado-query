import { useQuery } from '@tanstack/react-query'
import { estadoActaActions } from '..'
import { IEstadoActa } from '../interfaces'

export const useEstadoActa = (id: number | undefined) => {
  
  const { data: estados, isFetching, isError } = useQuery<IEstadoActa[]>({
    queryKey: ['estados-acta', { id }],
    queryFn: () => estadoActaActions.getEstadosActa(id!),
    initialData: [],
    refetchOnWindowFocus: false
  })

  return {
    estados,
    isFetching,
    isError
  }
}
