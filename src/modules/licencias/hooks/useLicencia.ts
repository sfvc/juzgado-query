import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useFilter, usePagination } from '../../../shared'
import { licenciaActions } from '..'
import type { FormLicencia, ILicencia } from '../interfaces'

interface FilterParams {
  query: string
  page: number
}

const initialValues = {
  query: '',
  page: 1
}

export const useLicencia = () => {
  const queryClient = useQueryClient()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: licencias, pagination, isFetching } = usePagination<ILicencia, FilterParams>({
    queryKey: ['licencias', filterParams],
    fetchData: () => licenciaActions.getLicencias(filterParams),
    filterParams
  })

  /* Mutations */
  const createLicencia = useMutation({
    mutationFn: licenciaActions.createLicencia,
    onSuccess: () => {
      toast.success('Licencia agregada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al agregar licencia')
      console.log(error)
    }
  })

  const updateLicencia = useMutation({
    mutationFn: ({ id, licencia }: { id: number, licencia: FormLicencia }) => licenciaActions.updateLicencia(id, licencia),
    onSuccess: () => {
      toast.success('Licencia actualizada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al actualizar licencia')
      console.log(error)
    }
  })

  const handLicencia = useMutation({
    mutationFn: ({ id, data }: { id: number, data: { user_id: number } }) => licenciaActions.handLicencia(id, data),
    onSuccess: () => {
      toast.success('Licencia entregada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al entregar licencia')
      console.log(error)
    }
  })

  const deleteLicencia = useMutation({
    mutationFn: (id: number) => licenciaActions.deleteLicencia(id),
    onSuccess: () => {
      toast.success('Licencia eliminada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar registro')
      console.log(error)
    }
  })

  return {
    licencias,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createLicencia,
    updateLicencia,
    handLicencia,
    deleteLicencia
  }
}
