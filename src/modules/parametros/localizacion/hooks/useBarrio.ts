import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { FormBarrio, IBarrio } from '../interfaces/localizacion'
import { barrioActions } from '..'
import { useFilter } from '../../../../shared/hooks/useFilter'

interface FilterParams {
  query: string, 
  page: number
}

const initialValues = {
  query: '', 
  page: 1
}

export const useBarrio = () => {
  const queryClient = useQueryClient()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: barrios, pagination, isFetching } = usePagination<IBarrio, FilterParams>({
    queryKey: ['barrios', filterParams],
    fetchData: () => barrioActions.getBarrios(filterParams),
    filterParams
  })

  /* Mutations */
  const createBarrio = useMutation({
    mutationFn: barrioActions.createBarrio,
    onSuccess: () => {
      toast.success('Barrio creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear la barrio')
      console.log(error)
    }
  })

  const updateBarrio = useMutation({
    mutationFn: ({ id, barrio }: { id: number, barrio: FormBarrio }) => barrioActions.updateBarrio(id, barrio),
    onSuccess: () => {
      toast.success('Barrio actualizado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al actualizar el barrio')
      console.log(error)
    }
  })

  const deleteBarrio = useMutation({
    mutationFn: (id: number) => barrioActions.deleteBarrio(id),
    onSuccess: () => {
      toast.success('Barrio eliminado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar la barrio')
      console.log(error)
    }
  })

  return {
    barrios,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createBarrio,
    updateBarrio,
    deleteBarrio
  }
}
