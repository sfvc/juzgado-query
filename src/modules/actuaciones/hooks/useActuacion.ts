/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { actuacionActions } from '..'
import { useContext } from 'react'
import { ActuacionContext } from '../../../context/Actuacion/ActuacionContext'

export const useActuacion= () => {
  const { resetProvider } = useContext(ActuacionContext)
  const queryClient = useQueryClient()
  const { id } = useParams()

  /* Mutations */
  const createActuacion = useMutation({
    mutationFn: actuacionActions.createActuacion,
    onSuccess: () => {
      toast.success('Actuación creada exitosamente')
      queryClient.invalidateQueries({ queryKey: ['acta-actuacion', {id}] })
      resetProvider()
    },
    onError: (error) => {
      toast.error('Error al crear actuación')
      console.log(error)
    }
  })

  const deleteActuacion = useMutation({
    mutationFn: ({ actaId, actuacionId }: { actaId: number, actuacionId: number }) => actuacionActions.deleteActuacion(actaId, actuacionId),
    onSuccess: () => {
      toast.success('Actuación eliminada exitosamente')
      queryClient.invalidateQueries({ queryKey: ['acta-actuacion', {id}] })
    },
    onError: (error) => {
      toast.error('Error al eliminar la actuación')
      console.log(error)
    }
  })

  // Elimnar notificación del historial de notificaciones
  const deleteActuacionHistory = useMutation({
    mutationFn: ({ id }: {id: number, queryKey?: any[]}) => actuacionActions.deleteActuacionHistory(id),
    onSuccess: (_, __, context: any) => {
      toast.success('Registro eliminado del historial')

      queryClient.invalidateQueries({ queryKey: context?.queryKey })
      queryClient.invalidateQueries({ queryKey: ['acta-actuacion', {id}] })
    },
    onError: (error) => {
      toast.error('Error al eliminar registro')
      console.log(error)
    }
  }) 
  
  return { 
    createActuacion,
    deleteActuacion,
    deleteActuacionHistory
  }
}
