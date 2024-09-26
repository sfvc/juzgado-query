import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { provinciaActions } from '..'
import type { IProvincia, FormProvincia } from '../interfaces/localizacion'

export const useProvincia = () => {
  const queryClient = useQueryClient()

  const [page, setPage] = useState<number>(1)
  const [filterKey, setFilterKey] = useState<string>('')

  const { data: provincias, pagination,  handlePageChange, isLoading } = usePagination<IProvincia>({
    queryKey: ['provincias', { filterKey, page }],
    fetchData: () => provinciaActions.getProvincias(filterKey, page),
    filterKey,
    page,
    setPage
  })

  /* Mutations */
  const createProvincia = useMutation({
    mutationFn: provinciaActions.createProvincia,
    onSuccess: () => {
      toast.success('Provincia creada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear la provincia')
      console.log(error)
    }
  })

  const updateProvincia = useMutation({
    mutationFn: ({ id, provincia }: { id: number, provincia: FormProvincia }) => provinciaActions.updateProvincia(id, provincia),
    onSuccess: () => {
      toast.success('Provincia actualizada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al actualizar la provincia')
      console.log(error)
    }
  })

  const deleteProvincia = useMutation({
    mutationFn: (id: number) => provinciaActions.deleteProvincia(id),
    onSuccess: () => {
      toast.success('Provincia eliminada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar la provincia')
      console.log(error)
    }
  })

  return {
    provincias,
    pagination,
    isLoading,
    filterKey,
    setFilterKey,
    handlePageChange,

    // Mutations
    createProvincia,
    updateProvincia,
    deleteProvincia
  }
}
