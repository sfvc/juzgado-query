import { useCrudMutations } from '../../../shared/hooks/useCrudMutations'
import { usePagination, useFilter } from '../../../shared'
import { vehiculoActions } from '..'
import type { IVehiculo } from '../interfaces'

interface FilterParams {
  query: string
  page: number
}

const initialValues = {
  query: '',
  page: 1
}

export const useVehiculo = () => {
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: vehiculos, pagination, isFetching } = usePagination<IVehiculo, FilterParams>({
    queryKey: ['vehiculos', filterParams],
    fetchData: () => vehiculoActions.getVehiculos(filterParams),
    filterParams
  })

  /* Mutations */
  const {
    create: createVehiculo,
    update: updateVehiculo,
    remove: deleteVehiculo
  } = useCrudMutations({
    actions: { create: vehiculoActions.createVehiculo, update: vehiculoActions.updateVehiculo, remove: vehiculoActions.deleteVehiculo },
    group: 'vehiculos',
    entity: 'vehiculo',
    label: 'Vehiculo',
    validate: true
  })

  return {
    vehiculos,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createVehiculo,
    updateVehiculo,
    deleteVehiculo
  }
}
