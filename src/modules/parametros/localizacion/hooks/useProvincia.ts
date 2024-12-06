import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { provinciaActions } from '..'
import type { IProvincia, FormProvincia } from '../interfaces/localizacion'
import { useFilter } from '../../../../shared/hooks/useFilter'

interface FilterParams {
  query: string, 
  page: number
}

const initialValues = {
  query: '', 
  page: 1
}

export const useProvincia = () => {
  const queryClient = useQueryClient()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: provincias, pagination, isFetching } = usePagination<IProvincia, FilterParams>({
    queryKey: ['provincias', filterParams],
    fetchData: () => provinciaActions.getProvincias(filterParams),
    filterParams
  })

  /* Mutations */
  const createProvincia = useMutation({
    mutationFn: provinciaActions.createProvincia,
    onSuccess: () => {
      toast.success('Provincia creada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear la provincia')
      console.log(error)
    }
  })

  const updateProvincia = useMutation({
    mutationFn: ({ id, provincia }: { id: number, provincia: FormProvincia }) => provinciaActions.updateProvincia(id, provincia),
    onSuccess: () => {
      toast.success('Provincia actualizada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al actualizar la provincia')
      console.log(error)
    }
  })

  const deleteProvincia = useMutation({
    mutationFn: (id: number) => provinciaActions.deleteProvincia(id),
    onSuccess: () => {
      toast.success('Provincia eliminada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar la provincia')
      console.log(error)
    }
  })

  return {
    provincias,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createProvincia,
    updateProvincia,
    deleteProvincia
  }
}
