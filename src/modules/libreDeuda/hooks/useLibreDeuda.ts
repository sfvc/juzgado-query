import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useFilter, usePagination } from '../../../shared'
import { ILibreDeuda } from '../interfaces'
import { libreDeudaActions } from '..'

interface FilterParams {
  query: string
  page: number
}

const initialValues = {
  query: '',
  page: 1
}

export const useLibreDeuda = () => {
  const queryClient = useQueryClient()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: libreDeuda, pagination, isFetching } = usePagination<ILibreDeuda, FilterParams>({
    queryKey: ['libreDeuda', filterParams],
    fetchData: () => libreDeudaActions.getLibreDeuda(filterParams),
    filterParams
  })

  const deleteLibreDeuda = useMutation({
    mutationFn: (id: number) => libreDeudaActions.deleteLibreDeuda(id),
    onSuccess: () => {
      toast.success('Titular eliminado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar al titular')
      console.log(error)
    }
  })

  const confirmLibreDeuda = useMutation({
    mutationFn: (id: number) => libreDeudaActions.confirmLibreDeuda(id),
    onSuccess: () => {
      toast.success('Titular editada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al editar al titular')
      console.log(error)
    }
  })

  return {
    libreDeuda,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    deleteLibreDeuda,
    confirmLibreDeuda
  }
}
