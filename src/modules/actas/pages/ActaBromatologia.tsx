import React from 'react'
import { useParams } from 'react-router-dom'
import { useActaById } from '../hooks/useActaById'
import { LoadingOverlay } from '../../../layout'

export const ActaBromatologia = () => {
  const { id } = useParams()
  const { acta, isLoading } = useActaById(id)

  if(isLoading) return <LoadingOverlay />

  return (
    <React.Fragment>
      <div>BromatologiaForm</div>
    </React.Fragment>
  )
}
