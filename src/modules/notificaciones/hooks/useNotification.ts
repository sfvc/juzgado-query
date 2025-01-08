/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { notificacionActions } from '..'
import { ActuacionContext } from '../../../context/Actuacion/ActuacionContext'
import { useQueryParams } from '../../../shared'

export const useNotification = () => {
  const queryClient = useQueryClient()
  const { resetProvider } = useContext(ActuacionContext)
  const { filters } = useQueryParams()
  const { id } = useParams()

  /* Mutations */
  const createNotification = useMutation({
    mutationFn: ({ selectedActas, plantillaId, userId }: { selectedActas: number[], plantillaId: number | null, userId: number }) => 
      notificacionActions.createNotification(selectedActas, plantillaId, userId),
    onSuccess: () => {
      toast.success('Notificación creada exitosamente')
      resetProvider()
      queryClient.invalidateQueries({ queryKey: ['actas',{...filters}] })
    },
    onError: (error) => {
      toast.error('Error al crear la notificación')
      console.log(error)
    }
  })

  // Elimnar notificación relacionada al acta
  const deleteNotification = useMutation({
    mutationFn: ({ id }: {id: number, queryKey?: any[]}) => notificacionActions.deleteNotification(id),
    onSuccess: (_, __, context: any) => {
      toast.success('Notificación eliminada exitosamente')
      queryClient.invalidateQueries({ queryKey: context?.queryKey })
    },
    onError: (error) => {
      toast.error('Error al eliminar la notificación')
      console.log(error)
    }
  })

  // Elimnar notificación del historial de notificaciones
  const deleteNotificationHistory = useMutation({
    mutationFn: ({ id }: {id: number, queryKey?: any[]}) => notificacionActions.deleteNotificationHistory(id),
    onSuccess: (_, __, context: any) => {
      toast.success('Notificación eliminada exitosamente')
      
      queryClient.invalidateQueries({ queryKey: context?.queryKey })
      queryClient.invalidateQueries({ queryKey: ['acta-actuacion', {id}] })
    },
    onError: (error) => {
      toast.error('Error al eliminar la notificación')
      console.log(error)
    }
  }) 
  
  return { createNotification, deleteNotification, deleteNotificationHistory }
}
