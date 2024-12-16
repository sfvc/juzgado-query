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
    mutationFn: ({ selectedActas, plantillaId }: { selectedActas: number[], plantillaId: number | null }) => 
      notificacionActions.createNotification(selectedActas, plantillaId),
    onSuccess: () => {
      toast.success('Notificación creada exitosamente')
      resetProvider()
      queryClient.invalidateQueries({ queryKey: ['actas',{...filters}] })
    },
    onError: (error) => {
      toast.error('Error crear la notificación')
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
  
  return { createNotification, deleteNotificationHistory }
}
