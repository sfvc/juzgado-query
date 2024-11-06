import React from 'react'
import { useParams } from 'react-router-dom'
import { TransitoForm } from '../forms'
import { LoadingOverlay } from '../../../layout'
import { useActaById } from '../hooks/useActaById'

export const ActaTransito = () => {
  const { id } = useParams()
  const { acta, isLoading } = useActaById(id)

  if(isLoading) return <LoadingOverlay />

  return (
    <React.Fragment>
      <TransitoForm acta={acta}/> 
    </React.Fragment>
  )
}
