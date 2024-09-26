import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { ILocalidad, FormLocalidad } from '../interfaces/localizacion'
import { localidadActions } from '..'

export const useLocalidad = () => {
  const queryClient = useQueryClient()

  const [page, setPage] = useState<number>(1)
  const [filterKey, setFilterKey] = useState<string>('')

  const { data: localidades, pagination,  handlePageChange, isLoading } = usePagination<ILocalidad>({
    queryKey: ['localidades', { filterKey, page }],
    fetchData: () => localidadActions.getLocalidades(filterKey, page),
    filterKey,
    page,
    setPage
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
    isLoading,
    filterKey,
    setFilterKey,
    handlePageChange,

    // Mutations
    createLocalidad,
    updateLocalidad,
    deleteLocalidad
  }
}
