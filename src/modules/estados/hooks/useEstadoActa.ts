import { useQuery } from '@tanstack/react-query'
import { estadoActaActions } from '..'
import { IEstadoActa } from '../interfaces'

export const useEstadoActa = (id: number | undefined) => {
  
  // Sin initialData: con el staleTime global (5 min) un valor inicial se considera "fresco"
  // y la consulta nunca llegaba a pedirse al servidor.
  const { data: estados = [], isFetching, isError } = useQuery<IEstadoActa[]>({
    queryKey: ['estados-acta', { id }],
    queryFn: () => estadoActaActions.getEstadosActa(id!),
    // Los estados cambian seguido: se vuelven a pedir cada vez que se abre la pantalla
    staleTime: 0,
    refetchOnWindowFocus: false
  })

  return {
    estados,
    isFetching,
    isError
  }
}
