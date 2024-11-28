import { DetalleActa, Loading } from '../../../shared'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import type{ ActuacionActa } from '../interfaces'
import { actuacionActions } from '..'
import { Expediente } from '../components/Expediente'
import { RelatedActas } from '../components/RelatedActas'
import { ActuacionProvider } from '../../../context/Actuacion/ActuacionProvider'
import { GenerateActuacion } from '../components/GenerateActuacion'

export const Actuacion = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const actaId = parseInt(id!)

  const { data: acta, isLoading, isError } = useQuery<ActuacionActa>({
    queryKey: ['acta-actuacion', {id}],
    queryFn: () => actuacionActions.getActuacionesByActa(actaId),
    staleTime: 1000 * 60 * 5
  })

  if (isLoading) return <Loading />

  if (!isLoading && isError) navigate('/')

  // TODO: Recargar datos al crear actuaciones

  return (
    <ActuacionProvider>
      <DetalleActa acta={ acta! } title='Listado de Actuaciones'/>

      <GenerateActuacion acta={ acta! } />

      <Expediente acta={ acta! } />
      
      <RelatedActas acta={ acta! } />
    </ActuacionProvider>
  )
}
