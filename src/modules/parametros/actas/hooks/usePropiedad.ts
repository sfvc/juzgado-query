import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { useFilter } from '../../../../shared/hooks/useFilter'
import { FormPropiedad, IPropiedad } from '../interfaces'
import { propiedadActions } from '..'

interface FilterParams {
  query: string, 
  page: number
}

const initialValues = {
  query: '', 
  page: 1
}

export const usePropiedad = () => {
  const queryClient = useQueryClient()

  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: propiedades, pagination, isFetching } = usePagination<IPropiedad, FilterParams>({
    queryKey: ['propiedades', filterParams],
    fetchData: () => propiedadActions.getPropiedades(filterParams),
    filterParams
  })

  /* Mutations */
  const createPropiedad = useMutation({
    mutationFn: propiedadActions.createPropiedad,
    onSuccess: () => {
      toast.success('Propiedad creada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear propiedad')
      console.log(error)
    }
  })

  const updatePropiedad = useMutation({
    mutationFn: ({ id, propiedad }: { id: number, propiedad: FormPropiedad }) => propiedadActions.updatePropiedad(id, propiedad),
    onSuccess: () => {
      toast.success('Propiedad actualizado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al actualizar propiedad')
      console.log(error)
    }
  })

  const deletePropiedad = useMutation({
    mutationFn: (id: number) => propiedadActions.deletePropiedad(id),
    onSuccess: () => {
      toast.success('Propiedad eliminada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar propiedad')
      console.log(error)
    }
  })

  return {
    propiedades,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createPropiedad,
    updatePropiedad,
    deletePropiedad
  }
}
