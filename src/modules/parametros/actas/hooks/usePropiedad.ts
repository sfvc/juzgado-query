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

  const { data: propiedades, pagination, isLoading } = usePagination<IPropiedad, FilterParams>({
    queryKey: ['propiedades', filterParams],
    fetchData: () => propiedadActions.getPropiedades(filterParams),
    filterParams
  })

  /* Mutations */
  const createPropiedad = useMutation({
    mutationFn: propiedadActions.createPropiedad,
    onSuccess: () => {
      toast.success('Propiedad creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el propiedad')
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
      toast.error('Error al actualizar el propiedad')
      console.log(error)
    }
  })

  const deletePropiedad = useMutation({
    mutationFn: (id: number) => propiedadActions.deletePropiedad(id),
    onSuccess: () => {
      toast.success('Propiedad eliminado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar el propiedad')
      console.log(error)
    }
  })

  return {
    propiedades,
    pagination,
    isLoading,
    filterParams,
    updateFilter,

    // Mutations
    createPropiedad,
    updatePropiedad,
    deletePropiedad
  }
}
