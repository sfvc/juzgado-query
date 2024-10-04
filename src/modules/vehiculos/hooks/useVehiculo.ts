import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination, useFilter } from '../../../shared'
import { vehiculoActions } from '..'
import { FormVehiculo, IVehiculo } from '../interfaces'

interface FilterParams {
  query: string
  page: number
}

const initialValues = {
  query: '',
  page: 1
}

export const useVehiculo = () => {
  const queryClient = useQueryClient()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: vehiculos, pagination, isLoading } = usePagination<IVehiculo, FilterParams>({
    queryKey: ['vehiculos', filterParams],
    fetchData: () => vehiculoActions.getVehiculos(filterParams),
    filterParams
  })

  /* Mutations */
  const createVehiculo = useMutation({
    mutationFn: vehiculoActions.createVehiculo,
    onSuccess: () => {
      toast.success('Vehiculo creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el Vehiculo')
      console.log(error)
    }
  })

  const updateVehiculo = useMutation({
    mutationFn: ({ id, vehiculo }: { id: number, vehiculo: FormVehiculo }) => vehiculoActions.updateVehiculo(id, vehiculo),
    onSuccess: () => {
      toast.success('Vehiculo actualizado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al actualizar el vehiculo')
      console.log(error)
    }
  })

  const deleteVehiculo = useMutation({
    mutationFn: (id: number) => vehiculoActions.deleteVehiculo(id),
    onSuccess: () => {
      toast.success('Vehiculo creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el vehiculo')
      console.log(error)
    }
  })

  return {
    vehiculos,
    pagination,
    isLoading,
    filterParams,
    updateFilter,

    // Mutations
    createVehiculo,
    updateVehiculo,
    deleteVehiculo
  }
}