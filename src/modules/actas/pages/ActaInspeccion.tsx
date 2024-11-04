import React from 'react'
import { useParams } from 'react-router-dom'
import { useActaById } from '../hooks/useActaById'
import { LoadingOverlay } from '../../../layout'
import { InspeccionForm } from '../forms'

export const ActaInspeccion = () => {
  const { id } = useParams()
  const { acta, isLoading } = useActaById(id)

  if(isLoading) return <LoadingOverlay />

  return (
    <React.Fragment>
      <InspeccionForm acta={acta}/> 
    </React.Fragment>
  )
}
