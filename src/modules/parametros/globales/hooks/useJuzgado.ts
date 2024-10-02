import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { useFilter } from '../../../../shared/hooks/useFilter'
import { juzgadoActions } from '..'
import { FormJuzgado, IJuzgado } from '../interfaces'

interface FilterParams {
  page: number
}

const initialValues = {
  page: 1
}

export const useJuzgado = () => {
  const queryClient = useQueryClient()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: juzgados, pagination, isLoading } = usePagination<IJuzgado, FilterParams>({
    queryKey: ['juzgados', filterParams],
    fetchData: () => juzgadoActions.getJuzgados(filterParams),
    filterParams
  })

  /* Mutations */
  const createJuzgado = useMutation({
    mutationFn: juzgadoActions.createJuzgado,
    onSuccess: () => {
      toast.success('Juzgado creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el juzgado')
      console.log(error)
    }
  })

  const updateJuzgado = useMutation({
    mutationFn: ({ id, juzgado }: { id: number, juzgado: FormJuzgado }) => juzgadoActions.updateJuzgado(id, juzgado),
    onSuccess: () => {
      toast.success('Juzgado creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el juzgado')
      console.log(error)
    }
  })

  const deleteJuzgado = useMutation({
    mutationFn: (id: number) => juzgadoActions.deleteJuzgado(id),
    onSuccess: () => {
      toast.success('Juzgado creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el juzgado')
      console.log(error)
    }
  })

  return {
    juzgados,
    pagination,
    isLoading,
    filterParams,
    updateFilter,

    // Mutations
    createJuzgado,
    updateJuzgado,
    deleteJuzgado
  }
}
