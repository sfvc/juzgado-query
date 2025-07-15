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

  const confirmLibreDeuda = useMutation({
    mutationFn: (data: {
    libre_deuda_id: number
    id: number,
    cuit: string
    fuente: string,
    persona_id: number
    vehiculo_id: number
  }) => libreDeudaActions.confirmLibreDeuda(data),
    onSuccess: () => {
      toast.success('Titular confirmada con éxito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al confirmar al titular')
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
    confirmLibreDeuda
  }
}
