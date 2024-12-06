import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { ILocalidad, FormLocalidad } from '../interfaces/localizacion'
import { localidadActions } from '..'
import { useFilter } from '../../../../shared/hooks/useFilter'

interface FilterParams {
  query: string, 
  page: number
}

const initialValues = {
  query: '', 
  page: 1
}

export const useLocalidad = () => {
  const queryClient = useQueryClient()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: localidades, pagination, isFetching } = usePagination<ILocalidad, FilterParams>({
    queryKey: ['localidades', filterParams],
    fetchData: () => localidadActions.getLocalidades(filterParams),
    filterParams
  })

  /* Mutations */
  const createLocalidad = useMutation({
    mutationFn: localidadActions.createLocalidad,
    onSuccess: () => {
      toast.success('Localidad creada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear la localidad')
      console.log(error)
    }
  })

  const updateLocalidad = useMutation({
    mutationFn: ({ id, localidad }: { id: number, localidad: FormLocalidad }) => localidadActions.updateLocalidad(id, localidad),
    onSuccess: () => {
      toast.success('Localidad actualizada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al actualizar la localidad')
      console.log(error)
    }
  })

  const deleteLocalidad = useMutation({
    mutationFn: (id: number) => localidadActions.deleteLocalidad(id),
    onSuccess: () => {
      toast.success('Localidad eliminada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar localidad')
      console.log(error)
    }
  })

  return {
    localidades,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createLocalidad,
    updateLocalidad,
    deleteLocalidad
  }
}
