import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { useFilter } from '../../../../shared/hooks/useFilter'
import { FormUnidad, IUnidad } from '../interfaces'
import { unidadActions } from '..'

interface FilterParams {
  search: string
  page: number
}

const initialValues = {
  search: '',
  page: 1
}

export const useUnidad = () => {
  const queryClient = useQueryClient()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: unidades, pagination, isFetching } = usePagination<IUnidad, FilterParams>({
    queryKey: ['unidades', filterParams],
    fetchData: () => unidadActions.getUnidades(filterParams),
    filterParams
  })

  /* Mutations */
  const createUnidad = useMutation({
    mutationFn: unidadActions.createUnidad,
    onSuccess: () => {
      toast.success('Unidad creada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear la unidad')
      console.log(error)
    }
  })

  const updateUnidad = useMutation({
    mutationFn: ({ id, unidad }: { id: number, unidad: FormUnidad }) => unidadActions.updateUnidad(id, unidad),
    onSuccess: () => {
      toast.success('Unidad actualizado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al actualizar la unidad')
      console.log(error)
    }
  })

  const deleteUnidad = useMutation({
    mutationFn: (id: number) => unidadActions.deleteUnidad(id),
    onSuccess: () => {
      toast.success('Unidad eliminada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar la unidad')
      console.log(error)
    }
  })

  return {
    unidades,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createUnidad,
    updateUnidad,
    deleteUnidad
  }
}
