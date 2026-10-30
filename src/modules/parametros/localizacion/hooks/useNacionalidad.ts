import { useCrudMutations } from '../../../../shared/hooks/useCrudMutations'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { nacionalidadActions } from '..'
import { useFilter } from '../../../../shared/hooks/useFilter'
import type { INacionalidad } from '../interfaces/localizacion'

interface FilterParams {
  query: string, 
  page: number
}

const initialValues = {
  query: '', 
  page: 1
}

export const useNacionalidad = () => {
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: nacionalidades, pagination, isFetching } = usePagination<INacionalidad, FilterParams>({
    queryKey: ['nacionalidades', filterParams],
    fetchData: () => nacionalidadActions.getNacionalidades(filterParams),
    filterParams
  })

  /* Mutations */
  const {
    create: createNacionalidad,
    update: updateNacionalidad,
    remove: deleteNacionalidad
  } = useCrudMutations({
    actions: { create: nacionalidadActions.createNacionalidad, update: nacionalidadActions.updateNacionalidad, remove: nacionalidadActions.deleteNacionalidad },
    group: 'localizacion',
    entity: 'nacionalidad',
    label: 'Nacionalidad',
    feminine: true
  })

  return {
    nacionalidades,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createNacionalidad,
    updateNacionalidad,
    deleteNacionalidad
  }
}
