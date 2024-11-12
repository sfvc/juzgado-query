import React, { useState } from 'react'
import { ActaContext } from './ActaContext'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const ActaProvider = ({children}: Props) => {
  // Almacena los ids de las actas seleccionadas para notificar
  const [selectedActas, setSelectedActas] = useState<number[]>([])
  const [plantillaId, setPlantillaId] = useState<number | null>(null)
  
  const checkingActa = (event: React.ChangeEvent<HTMLInputElement>, actaId: number) => {
    const { checked } = event.target
      
    const existe = selectedActas.find((acta) => acta === actaId)
    if (checked && !existe) setSelectedActas((prev) => [...prev, actaId])
    else setSelectedActas((prev) => prev.filter((acta) => acta !== actaId))
  }
    
  return (
    <ActaContext.Provider value={{ selectedActas, checkingActa, plantillaId, setPlantillaId }}>
      {children}
    </ActaContext.Provider>
  )
}
