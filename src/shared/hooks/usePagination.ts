import { useQuery, useQueryClient, QueryKey } from '@tanstack/react-query'
import { Pagination } from '../interfaces'

// TODO: Crear interfaces globales 
interface Meta {
  current_page: number
  last_page: number
}

interface Response<T> {
  data: T[]
  meta: Meta
}

interface Page { 
  page: number
}

interface Options<T, K extends Page> {
  queryKey: QueryKey
  fetchData: (filterParams: K) => Promise<Response<T>>,
  filterParams: K
}

export const usePagination = <T, K extends Page>({ queryKey, fetchData, filterParams }: Options<T, K>) => {
  const queryClient = useQueryClient()

  // Hook para obtener los datos paginados
  const { data: response, isLoading, isFetching } = useQuery({
    queryKey: [...queryKey], 
    queryFn: () => fetchData(filterParams),  
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => {
      if (!previousData) return

      // Mantenemos los datos anteriores mientras se carga la nueva página
      return {
        ...previousData,
        meta: {
          ...previousData.meta,
          current_page: filterParams.page
        }
      }
    },
  })

  // Función para refrescar la data
  const refetchData = () => {
    queryClient.invalidateQueries({ queryKey: [...queryKey] })
  }

  const data = response?.data || []

  const pagination: Pagination = {
    currentPage:  response?.meta.current_page || 1,
    lastPage: response?.meta.last_page || 1
  } 

  return {
    data,
    pagination,
    isLoading,
    isFetching,
    refetchData
  }
}
