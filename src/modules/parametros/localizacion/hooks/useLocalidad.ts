import { useCrudMutations } from '../../../../shared/hooks/useCrudMutations'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { ILocalidad } from '../interfaces/localizacion'
import { localidadActions } from '..'
import { useFilter } from '../../../../shared/hooks/useFilter'

interface FilterParams {
  query: string, 
  page: number
}

const initialValues = {
  query: '', 
  page: 1
}

export const useLocalidad = () => {
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: localidades, pagination, isFetching } = usePagination<ILocalidad, FilterParams>({
    queryKey: ['localidades', filterParams],
    fetchData: () => localidadActions.getLocalidades(filterParams),
    filterParams
  })

  /* Mutations */
  const {
    create: createLocalidad,
    update: updateLocalidad,
    remove: deleteLocalidad
  } = useCrudMutations({
    actions: { create: localidadActions.createLocalidad, update: localidadActions.updateLocalidad, remove: localidadActions.deleteLocalidad },
    group: 'localizacion',
    entity: 'localidad',
    label: 'Localidad',
    feminine: true
  })

  return {
    localidades,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createLocalidad,
    updateLocalidad,
    deleteLocalidad
  }
}
