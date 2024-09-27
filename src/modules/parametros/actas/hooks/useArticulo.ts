import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { articuloActions } from '..'
import { FormArticulo, IArticulo } from '../interfaces'

export const useArticulo = () => {
  const queryClient = useQueryClient()

  const [page, setPage] = useState<number>(1)
  const [filterKey, setFilterKey] = useState<string>('')
  const [type, setType] = useState<string>('')

  const { data: articulos, pagination,  handlePageChange, isLoading } = usePagination<IArticulo>({
    queryKey: ['articulos', { type, filterKey, page }],
    fetchData: () => articuloActions.getArticulos(type, filterKey, page),
    filterKey,
    page,
    setPage
  })

  /* Mutations */
  const createArticulo = useMutation({
    mutationFn: articuloActions.createArticulo,
    onSuccess: () => {
      toast.success('Articulo creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el articulo')
      console.log(error)
    }
  })

  const updateArticulo = useMutation({
    mutationFn: ({ id, articulo }: { id: number, articulo: FormArticulo }) => articuloActions.updateArticulo(id, articulo),
    onSuccess: () => {
      toast.success('Articulo actualizado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al actualizar el articulo')
      console.log(error)
    }
  })

  const deleteArticulo = useMutation({
    mutationFn: (id: number) => articuloActions.deleteArticulo(id),
    onSuccess: () => {
      toast.success('Articulo eliminado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar el articulo')
      console.log(error)
    }
  })

  return {
    articulos,
    pagination,
    isLoading,
    filterKey,
    setFilterKey,
    type,
    setType,
    handlePageChange,

    // Mutations
    createArticulo,
    updateArticulo,
    deleteArticulo
  }
}
