import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { useFilter } from '../../../../shared/hooks/useFilter'
import { FormEstado, IEstado } from '../interfaces'
import { estadoActions } from '..'

interface FilterParams {
  query: string, 
  page: number
}

const initialValues = {
  query: '', 
  page: 1
}

export const useEstado = () => {
  const queryClient = useQueryClient()

  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: estados, pagination, isFetching } = usePagination<IEstado, FilterParams>({
    queryKey: ['estados', filterParams],
    fetchData: () => estadoActions.getEstados(filterParams),
    filterParams
  })

  /* Mutations */
  const createEstado = useMutation({
    mutationFn: estadoActions.createEstado,
    onSuccess: () => {
      toast.success('Estado creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el estado')
      console.log(error)
    }
  })

  const updateEstado = useMutation({
    mutationFn: ({ id, estado }: { id: number, estado: FormEstado }) => estadoActions.updateEstado(id, estado),
    onSuccess: () => {
      toast.success('Estado actualizado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al actualizar el estado')
      console.log(error)
    }
  })

  const deleteEstado = useMutation({
    mutationFn: (id: number) => estadoActions.deleteEstado(id),
    onSuccess: () => {
      toast.success('Estado eliminado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar el estado')
      console.log(error)
    }
  })

  return {
    estados,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createEstado,
    updateEstado,
    deleteEstado
  }
}
