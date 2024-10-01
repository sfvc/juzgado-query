import { useQuery, useQueryClient, QueryKey } from '@tanstack/react-query'

interface Meta {
  current_page: number
  last_page: number
}

interface Response<T> {
  data: T[]
  meta: Meta
}

interface Pagination {
  currentPage: number
  lastPage: number
}


interface Options<T> {
  queryKey: QueryKey
  fetchData: (filter: string, page: number) => Promise<Response<T>>,
  filterKey: string
  page: number,
  setPage: (page: number) => void
}

export const usePagination = <T>({ queryKey, fetchData, filterKey, page, setPage }: Options<T>) => {
  const queryClient = useQueryClient()

  // Hook para obtener los datos paginados
  const { data: response, isLoading } = useQuery({
    queryKey: [...queryKey], 
    queryFn: () => fetchData(filterKey, page),  
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => {
      if (!previousData) return

      // Mantenemos los datos anteriores mientras se carga la nueva página
      return {
        ...previousData,
        meta: {
          ...previousData.meta,
          current_page: page
        }
      }
    },
  })

  // Manejar cambio de página
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }
 
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
    handlePageChange,
    refetchData
  }
}
