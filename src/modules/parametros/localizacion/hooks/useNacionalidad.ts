import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { nacionalidadActions } from '..'
import { useFilter } from '../../../../shared/hooks/useFilter'
import type { FormNacionalidad, INacionalidad } from '../interfaces/localizacion'

interface FilterParams {
  query: string, 
  page: number
}

const initialValues = {
  query: '', 
  page: 1
}

export const useNacionalidad = () => {
  const queryClient = useQueryClient()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: nacionalidades, pagination, isFetching } = usePagination<INacionalidad, FilterParams>({
    queryKey: ['nacionalidades', filterParams],
    fetchData: () => nacionalidadActions.getNacionalidades(filterParams),
    filterParams
  })

  /* Mutations */
  const createNacionalidad = useMutation({
    mutationFn: nacionalidadActions.createNacionalidad,
    onSuccess: () => {
      toast.success('Pais creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el pais')
      console.log(error)
    }
  })

  const updateNacionalidad = useMutation({
    mutationFn: ({ id, nacionalidad }: { id: number, nacionalidad: FormNacionalidad }) => nacionalidadActions.updateNacionalidad(id, nacionalidad),
    onSuccess: () => {
      toast.success('Pais editado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al editar el pais')
      console.log(error)
    }
  })

  const deleteNacionalidad = useMutation({
    mutationFn: (id: number) => nacionalidadActions.deleteNacionalidad(id),
    onSuccess: () => {
      toast.success('Pais eliminado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al elimar el pais')
      console.log(error)
    }
  })

  return {
    nacionalidades,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createNacionalidad,
    updateNacionalidad,
    deleteNacionalidad
  }
}
