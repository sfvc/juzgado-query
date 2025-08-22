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
  const { id } = useParams() // Id de acta

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

  // Generar comprobante de actuación
  const generateComprobante = useMutation({
    mutationFn: (id: number) => actuacionActions.generateComprobante(id), // Recibe el Id de actuacion
    onSuccess: () => {
      toast.success('Enviado a bandeja correctamente')
      queryClient.invalidateQueries({ queryKey: ['acta-actuacion', {id}] })
    },
    onError: (error) => {
      toast.error('Error al enviar')
      console.log(error)
    }
  })

  // Eliminar comprobante de actuación
  const deleteComprobante = useMutation({
    mutationFn: (id: number) => actuacionActions.deleteComprobante(id), // Recibe el Id de actuacion
    onSuccess: () => {
      toast.success('Eliminado de la bandeja correctamente')
      queryClient.invalidateQueries({ queryKey: ['acta-actuacion', {id}] })
    },
    onError: (error) => {
      toast.error('Error al eliminar')
      console.log(error)
    }
  })

  // Crear las cuotas de la actuación
  const createCuota = useMutation({
    mutationFn: ({ actuacionId, entrega, cuotas }: { actuacionId: number, entrega: string, cuotas: number }) =>
      actuacionActions.createCuota(actuacionId, entrega, cuotas),
    onSuccess: () => {
      toast.success('Cuotas generadas correctamente')
      queryClient.invalidateQueries({ queryKey: ['acta-actuacion', { id }] })
    },
    onError: (error) => {
      toast.error('Error al generar cuotas')
      console.log(error)
    }
  })

  return {
    createActuacion,
    deleteActuacion,
    deleteActuacionHistory,
    generateComprobante,
    deleteComprobante,
    createCuota
  }
}
