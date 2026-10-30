import { useCrudMutations } from '../../../../shared/hooks/useCrudMutations'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { useFilter } from '../../../../shared/hooks/useFilter'
import { IPropiedad } from '../interfaces'
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

  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: propiedades, pagination, isFetching } = usePagination<IPropiedad, FilterParams>({
    queryKey: ['propiedades', filterParams],
    fetchData: () => propiedadActions.getPropiedades(filterParams),
    filterParams
  })

  /* Mutations */
  const {
    create: createPropiedad,
    update: updatePropiedad,
    remove: deletePropiedad
  } = useCrudMutations({
    actions: { create: propiedadActions.createPropiedad, update: propiedadActions.updatePropiedad, remove: propiedadActions.deletePropiedad },
    group: 'propiedades',
    entity: 'propiedad',
    label: 'Propiedad',
    feminine: true
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
