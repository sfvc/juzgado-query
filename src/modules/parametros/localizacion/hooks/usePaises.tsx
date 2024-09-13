import { useQuery } from '@tanstack/react-query'
import { paisActions } from '..'

interface Options {
    filterKey?: string
}

export const usePaises = ({ filterKey }: Options) => {
  const { isLoading,isError, error, data: paises, isFetching } = useQuery({
    queryKey: ['paises', {filterKey}],
    queryFn: () => paisActions.getPaises({ filterKey }),
    staleTime: 1000 * 60 * 60
  })

  return {
    error,
    isError,
    isLoading,
    isFetching,
    paises
  }
}
