import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useFilter, usePagination } from '../../../shared'
import { IDescargo } from '../interfaces'
import { descargoActions } from '..'

interface FilterParams {
  query: string
  page: number
}

const initialValues = {
  query: '',
  page: 1
}

export const useDescargo = () => {
  const queryClient = useQueryClient()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: descargo, pagination, isFetching } = usePagination<IDescargo, FilterParams>({
    queryKey: ['descargo', filterParams],
    fetchData: () => descargoActions.getDescargo(filterParams),
    filterParams
  })

  const confirmDescargo = useMutation({
    mutationFn: (id: number) =>
      descargoActions.confirmDescargo(id),
    onSuccess: () => {
      toast.success('Descargo aprobado con éxito')

      queryClient.invalidateQueries({
        queryKey: ['descargo']
      })
    }
  })

  const rechazarDescargo = useMutation({
    mutationFn: (id: number) =>
      descargoActions.rechazarDescargo(id),
    onSuccess: () => {
      toast.success('Descargo rechazado correctamente')

      queryClient.invalidateQueries({
        queryKey: ['descargo']
      })
    }
  })

  return {
    descargo,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    confirmDescargo,
    rechazarDescargo
  }
}
