import React, { useState } from 'react'
import { ActuacionContext } from './ActuacionContext'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const ActuacionProvider = ({children}: Props) => {
  // Almacena los ids de las actas seleccionadas para notificar
  const [selectedActas, setSelectedActas] = useState<number[]>([])
  const [plantillaId, setPlantillaId] = useState<number | null>(null)
  const [tipoActuacion, setTipoActuacion] = useState<string>('')
  
  const checkingActa = (event: React.ChangeEvent<HTMLInputElement>, actaId: number) => {
    const { checked } = event.target
      
    const existe = selectedActas.find((acta) => acta === actaId)
    if (checked && !existe) setSelectedActas((prev) => [...prev, actaId])
    else setSelectedActas((prev) => prev.filter((acta) => acta !== actaId))
  }

  const setDefalutSeleted = (actaId: number) => {
    setSelectedActas([actaId])
  }

  const resetProvider = () => {
    setSelectedActas((prev) => [ prev[0] ]) // Al resetear dejamos solo la primera que es el acta por default
    setPlantillaId(null)
  }

  const clearSelectedActas = () => setSelectedActas([])
    
  return (
    <ActuacionContext.Provider 
      value={{ 
        selectedActas, 
        clearSelectedActas,
        checkingActa, 
        resetProvider, 
        plantillaId, 
        setPlantillaId, 
        tipoActuacion, 
        setTipoActuacion, 
        setDefalutSeleted 
      }}>
      {children}
    </ActuacionContext.Provider>
  )
}
