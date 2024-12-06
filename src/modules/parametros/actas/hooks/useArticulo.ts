import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { articuloActions } from '..'
import { FormArticulo, IArticulo } from '../interfaces'
import { useFilter } from '../../../../shared/hooks/useFilter'

interface FilterParams {
  filter: string, 
  search: string, 
  page: number
}

const initialValues = {
  filter: '', 
  search: '', 
  page: 1
}

export const useArticulo = () => {
  const queryClient = useQueryClient()

  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: articulos, pagination, isFetching } = usePagination<IArticulo, FilterParams>({
    queryKey: ['articulos', filterParams],
    fetchData: () => articuloActions.getArticulos(filterParams),
    filterParams
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
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createArticulo,
    updateArticulo,
    deleteArticulo
  }
}
