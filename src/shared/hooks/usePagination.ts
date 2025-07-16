import { useQuery, useQueryClient, QueryKey } from '@tanstack/react-query'
import { Pagination } from '../interfaces'

// TODO: Crear interfaces globales
interface Meta {
  current_page: number
  last_page: number
  total: number
}

interface Response<T> {
  data: T[]
  meta?: Meta // Hacer meta opcional ya que no siempre viene del backend

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  estadisticas?: any
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

  const { data: response, isLoading, isFetching } = useQuery({
    queryKey: [...queryKey],
    queryFn: () => fetchData(filterParams),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => {
      if (!previousData) return

      return {
        ...previousData,
        meta: previousData.meta ? {
          ...previousData.meta,
          current_page: filterParams.page
        } : undefined
      }
    },
  })

  const refetchData = () => {
    queryClient.invalidateQueries({ queryKey: [...queryKey] })
  }

  const data = response?.data || []
  const hasPagination = Boolean(response?.meta)

  // Si no hay paginación, crear valores por defecto
  const pagination: Pagination = hasPagination ? {
    currentPage: response!.meta!.current_page,
    lastPage: response!.meta!.last_page,
    total: response!.meta!.total
  } : {
    currentPage: 1,
    lastPage: 1,
    total: data.length
  }

  const estadisticas = response?.estadisticas || {}

  return {
    data,
    pagination,
    isLoading,
    isFetching,
    refetchData,
    estadisticas,
    hasPagination // Información adicional para saber si hay paginación
  }
}
