import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { useFilter } from '../../../../shared/hooks/useFilter'
import { FormRubro, IRubro } from '../interfaces'
import { rubroActions } from '..'

interface FilterParams {
  query: string, 
  page: number
}

const initialValues = {
  query: '', 
  page: 1
}

export const useRubro = () => {
  const queryClient = useQueryClient()

  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: rubros, pagination, isFetching } = usePagination<IRubro, FilterParams>({
    queryKey: ['rubros', filterParams],
    fetchData: () => rubroActions.getRubros(filterParams),
    filterParams
  })

  /* Mutations */
  const createRubro = useMutation({
    mutationFn: rubroActions.createRubro,
    onSuccess: () => {
      toast.success('Rubro creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el rubro')
      console.log(error)
    }
  })

  const updateRubro = useMutation({
    mutationFn: ({ id, rubro }: { id: number, rubro: FormRubro }) => rubroActions.updateRubro(id, rubro),
    onSuccess: () => {
      toast.success('Rubro actualizado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al actualizar el rubro')
      console.log(error)
    }
  })

  const deleteRubro = useMutation({
    mutationFn: (id: number) => rubroActions.deleteRubro(id),
    onSuccess: () => {
      toast.success('Rubro eliminado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar el rubro')
      console.log(error)
    }
  })

  return {
    rubros,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createRubro,
    updateRubro,
    deleteRubro
  }
}
