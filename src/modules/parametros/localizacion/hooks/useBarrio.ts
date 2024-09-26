import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { FormBarrio, IBarrio } from '../interfaces/localizacion'
import { barrioActions } from '..'

export const useBarrio = () => {
  const queryClient = useQueryClient()

  const [page, setPage] = useState<number>(1)
  const [filterKey, setFilterKey] = useState<string>('')

  const { data: barrios, pagination,  handlePageChange, isLoading } = usePagination<IBarrio>({
    queryKey: ['barrios', { filterKey, page }],
    fetchData: () => barrioActions.getBarrios(filterKey, page),
    filterKey,
    page,
    setPage
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
    isLoading,
    filterKey,
    setFilterKey,
    handlePageChange,

    // Mutations
    createBarrio,
    updateBarrio,
    deleteBarrio
  }
}
