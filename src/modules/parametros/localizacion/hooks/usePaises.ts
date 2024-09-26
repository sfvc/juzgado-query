import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { paisActions } from '..'
import type { IPais, FormPais } from '../interfaces/localizacion'

export const usePaises = () => {
  const queryClient = useQueryClient()

  const [page, setPage] = useState<number>(1)
  const [filterKey, setFilterKey] = useState<string>('')

  const { data: paises, pagination,  handlePageChange, isLoading } = usePagination<IPais>({
    queryKey: ['paises', { filterKey, page }],
    fetchData: () => paisActions.getPaises(filterKey, page),
    filterKey,
    page,
    setPage
  })

  /* Mutations */
  const createPais = useMutation({
    mutationFn: paisActions.createPais,
    onSuccess: () => {
      toast.success('Pais creado con exito')
      // queryClient.invalidateQueries({ queryKey: ['paises', { filterKey, page }] })
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el pais')
      console.log(error)
    }
  })

  const updatePais = useMutation({
    mutationFn: ({ id, pais }: { id: number, pais: FormPais }) => paisActions.updatePais(id, pais),
    onSuccess: () => {
      toast.success('Pais creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el pais')
      console.log(error)
    }
  })

  const deletePais = useMutation({
    mutationFn: (id: number) => paisActions.deletePais(id),
    onSuccess: () => {
      toast.success('Pais creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el pais')
      console.log(error)
    }
  })

  return {
    paises,
    pagination,
    isLoading,
    filterKey,
    setFilterKey,
    handlePageChange,

    // Mutations
    createPais,
    updatePais,
    deletePais
  }
}
