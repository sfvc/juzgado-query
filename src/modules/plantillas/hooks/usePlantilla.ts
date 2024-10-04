import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useFilter, usePagination } from '../../../shared'
import { IPlantilla, FormPlantilla } from '../interfaces'
import { plantillaActions } from '..'

interface FilterParams {
  query: string
  page: number
}

const initialValues = {
  query: '',
  page: 1
}

export const usePlantilla = () => {
  const queryClient = useQueryClient()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: plantillas, pagination, isLoading } = usePagination<IPlantilla, FilterParams>({
    queryKey: ['plantillas', filterParams],
    fetchData: () => plantillaActions.getPlantillas(filterParams),
    filterParams
  })

  /* Mutations */
  const createPlantilla = useMutation({
    mutationFn: plantillaActions.createPlantilla,
    onSuccess: () => {
      toast.success('Plantilla creada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear la plantilla')
      console.log(error)
    }
  })

  const updatePlantilla = useMutation({
    mutationFn: ({ id, plantilla }: { id: number, plantilla: FormPlantilla }) => plantillaActions.updatePlantilla(id, plantilla),
    onSuccess: () => {
      toast.success('Plantilla actualizada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al actualizar la plantilla')
      console.log(error)
    }
  })

  const deletePlantilla = useMutation({
    mutationFn: (id: number) => plantillaActions.deletePlantilla(id),
    onSuccess: () => {
      toast.success('Plantilla eliminada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar la plantilla')
      console.log(error)
    }
  })

  return {
    plantillas,
    pagination,
    isLoading,
    filterParams,
    updateFilter,

    // Mutations
    createPlantilla,
    updatePlantilla,
    deletePlantilla
  }
}
