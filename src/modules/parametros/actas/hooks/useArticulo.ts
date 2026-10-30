import { useCrudMutations } from '../../../../shared/hooks/useCrudMutations'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { articuloActions } from '..'
import { IArticulo } from '../interfaces'
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

  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: articulos, pagination, isFetching } = usePagination<IArticulo, FilterParams>({
    queryKey: ['articulos', filterParams],
    fetchData: () => articuloActions.getArticulos(filterParams),
    filterParams
  })

  /* Mutations */
  const {
    create: createArticulo,
    update: updateArticulo,
    remove: deleteArticulo
  } = useCrudMutations({
    actions: { create: articuloActions.createArticulo, update: articuloActions.updateArticulo, remove: articuloActions.deleteArticulo },
    group: 'articulos',
    entity: 'articulo',
    label: 'Articulo'
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
