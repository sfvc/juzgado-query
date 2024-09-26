import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { IDepartamento, FormDepartamento } from '../interfaces/localizacion'
import { departamentoActions } from '..'

export const useDepartamento = () => {
  const queryClient = useQueryClient()

  const [page, setPage] = useState<number>(1)
  const [filterKey, setFilterKey] = useState<string>('')

  const { data: departamentos, pagination,  handlePageChange, isLoading } = usePagination<IDepartamento>({
    queryKey: ['departamentos', { filterKey, page }],
    fetchData: () => departamentoActions.getDepartamentos(filterKey, page),
    filterKey,
    page,
    setPage
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
    isLoading,
    filterKey,
    setFilterKey,
    handlePageChange,

    // Mutations
    createDepartamento,
    updateDepartamento,
    deleteDepartamento
  }
}
