import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useFilter, usePagination, validateErrors } from '../../../shared'
import { inhabilitadoActions } from '..'
import { FormInhabilitado, IInhabilitado } from '../interfaces'

interface FilterParams {
  query: string
  page: number
}

const initialValues = {
  query: '',
  page: 1
}

export const useInhabilitado = () => {
  const queryClient = useQueryClient()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: inhabilitados, pagination, isFetching } = usePagination<IInhabilitado, FilterParams>({
    queryKey: ['inhabilitados', filterParams],
    fetchData: () => inhabilitadoActions.getInhabilitados(filterParams),
    filterParams
  })

  /* Mutations */
  const createInhabilitado = useMutation({
    mutationFn: inhabilitadoActions.createInhabilitado,
    onSuccess: () => {
      toast.success('Inhabilitado creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      validateErrors(error, 'Error al crear el registro')
      console.log(error)
    }
  })

  const updateInhabilitado = useMutation({
    mutationFn: ({ id, inhabilitado }: { id: number, inhabilitado: FormInhabilitado }) => inhabilitadoActions.updateInhabilitado(id, inhabilitado),
    onSuccess: () => {
      toast.success('Inhabilitado actualizado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      validateErrors(error, 'Error al actualizar registro')
      console.log(error)
    }
  })

  const deleteInhabilitado = useMutation({
    mutationFn: (id: number) => inhabilitadoActions.deleteInhabilitado(id),
    onSuccess: () => {
      toast.success('Inhabilitado eliminado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar registro')
      console.log(error)
    }
  })

  return {
    inhabilitados,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createInhabilitado,
    updateInhabilitado,
    deleteInhabilitado
  }
}
