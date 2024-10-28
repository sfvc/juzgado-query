import React from 'react'
import { useParams } from 'react-router-dom'
import { TransitoForm } from '../forms'
import { LoadingOverlay } from '../../../layout'
import { useActaById } from '../hooks/useActaById'

export const ActaTransito = () => {
  const { id } = useParams()
  const { acta, isLoading } = useActaById(id)

  // TODO: Sacar en un custom hook
  /* const { data: acta, isLoading } = useQuery<IActa | null>({
    queryKey: ['acta', id],
    queryFn: () => actaActions.getActaById(id!),
    enabled: !!id,
  }) */

  if(isLoading) return <LoadingOverlay />

  return (
    <React.Fragment>
      <TransitoForm acta={acta}/> 
    </React.Fragment>
  )
}
