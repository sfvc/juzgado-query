import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { NotificacionTable } from '../components'
import { NotificationActa } from '../interfaces'
import { notificacionActions } from '..'
import { DetalleActa, Loading } from '../../../shared'

export const NotificacionActa = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const actaId = parseInt(id!)

  const { data: acta, isLoading, isError } = useQuery<NotificationActa>({
    queryKey: ['acta-notificacion', {id}],
    queryFn: () => notificacionActions.getNotificationsByActa(actaId),
    staleTime: 1000 * 60 * 5
  })

  if (isLoading) return <Loading />

  if (!isLoading && isError) navigate('/')

  return (
    <React.Fragment>
      <DetalleActa acta={ acta! } title='Listado de Notificaciones'/>
      <NotificacionTable acta={ acta! }/>
    </React.Fragment>
  )
}
