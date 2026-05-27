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
    mutationFn: (data: {
    libre_deuda_id: number
    id: number,
    cuit: string
    fuente: string,
    persona_id: number
    vehiculo_id: number
  }) => descargoActions.confirmDescargo(data),
    onSuccess: () => {
      toast.success('Descargo confirmada con éxito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al confirmar el descargo')
      console.log(error)
    }
  })

  const rechazarDescargo = useMutation({
    mutationFn: (data: {
    libre_deuda_id: number
    id: number
    cuit: string
    fuente: string
    persona_id: number
    vehiculo_id: number
  }) => descargoActions.rechazarDescargo(data),
    onSuccess: () => {
      toast.success('Descargo rechazado correctamente')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al rechazar el descargo')
      console.log(error)
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
