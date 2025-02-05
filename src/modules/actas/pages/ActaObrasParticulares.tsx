import React from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useActaById } from '../hooks/useActaById'
import { LoadingOverlay } from '../../../layout'
import { ObrasParticularesForm } from '../forms'

export const ActaObrasParticulares = () => {
  const { id } = useParams()
  const { acta, isLoading } = useActaById(id)

  if(isLoading) return <LoadingOverlay />

  return (
    <React.Fragment>
      <ObrasParticularesForm acta={acta} />

      <ToastContainer containerId="custom" className="custom-toast-container" />
    </React.Fragment>
  )
}
