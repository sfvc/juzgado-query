/* eslint-disable @typescript-eslint/no-explicit-any */
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
  meta?: Meta
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

  // Hook para obtener los datos paginados
  const { data: response, isLoading, isFetching } = useQuery({
    queryKey: [...queryKey],
    queryFn: () => fetchData(filterParams),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => {
      if (!previousData || !previousData.meta) return previousData

      return {
        ...previousData,
        meta: {
          ...previousData.meta,
          current_page: filterParams.page
        }
      }
    },
  })

  const data = response?.data || []

  const pagination: Pagination = response?.meta
    ? {
      currentPage: response.meta.current_page,
      lastPage: response.meta.last_page,
      total: response.meta.total
    }
    : {
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
    refetchData: () => queryClient.invalidateQueries({ queryKey: [...queryKey] }),
    estadisticas
  }
}
