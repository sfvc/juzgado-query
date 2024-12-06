import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { IDepartamento, FormDepartamento } from '../interfaces/localizacion'
import { departamentoActions } from '..'
import { useFilter } from '../../../../shared/hooks/useFilter'

interface FilterParams {
  query: string, 
  page: number
}

const initialValues = {
  query: '', 
  page: 1
}

export const useDepartamento = () => {
  const queryClient = useQueryClient()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: departamentos, pagination, isFetching } = usePagination<IDepartamento, FilterParams>({
    queryKey: ['departamentos', filterParams],
    fetchData: () => departamentoActions.getDepartamentos(filterParams),
    filterParams
  })

  /* Mutations */
  const createDepartamento = useMutation({
    mutationFn: departamentoActions.createDepartamento,
    onSuccess: () => {
      toast.success('Departamento creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear la departamento')
      console.log(error)
    }
  })

  const updateDepartamento = useMutation({
    mutationFn: ({ id, departamento }: { id: number, departamento: FormDepartamento }) => departamentoActions.updateDepartamento(id, departamento),
    onSuccess: () => {
      toast.success('Departamento actualizado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al actualizar el departamento')
      console.log(error)
    }
  })

  const deleteDepartamento = useMutation({
    mutationFn: (id: number) => departamentoActions.deleteDepartamento(id),
    onSuccess: () => {
      toast.success('Departamento eliminado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar la departamento')
      console.log(error)
    }
  })

  return {
    departamentos,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createDepartamento,
    updateDepartamento,
    deleteDepartamento
  }
}
