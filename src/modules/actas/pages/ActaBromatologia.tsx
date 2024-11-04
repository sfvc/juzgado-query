import React from 'react'
import { useParams } from 'react-router-dom'
import { useActaById } from '../hooks/useActaById'
import { LoadingOverlay } from '../../../layout'
import { BromatologiaForm } from '../forms'

export const ActaBromatologia = () => {
  const { id } = useParams()
  const { acta, isLoading } = useActaById(id)

  if(isLoading) return <LoadingOverlay />

  return (
    <React.Fragment>
      <BromatologiaForm acta={acta} />
    </React.Fragment>
  )
}
