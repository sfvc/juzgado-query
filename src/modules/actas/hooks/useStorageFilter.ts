import { useState } from 'react'
import { useQueryParams } from '../../../shared'

export const useStorageFilter = () => {
  const { filters } = useQueryParams()
    
  const [infraccionStorage, setInfraccionStorage] = useState<string>(() => {
    const infraccion = filters?.articulo_id && localStorage.getItem('infraccion')
    if (infraccion) {
      return infraccion
    } else {
      localStorage.removeItem('infraccion')
      return ''
    }
  })

  const [vehiculoStorage, setVehiculoStorage] = useState<string>(() => {
    const vehiculo = filters?.vehiculo_id && localStorage.getItem('vehiculo')
    if (vehiculo) {
      return vehiculo
    } else {
      localStorage.removeItem('vehiculo')
      return ''
    }
  })

  const [personaStorage, setPersonaStorage] = useState<string>(() => {
    const infractor = filters?.persona_id && localStorage.getItem('infractor')
    if (infractor) {
      return infractor
    } else {
      localStorage.removeItem('infractor')
      return ''
    }
  })  

  return {
    infraccionStorage, 
    setInfraccionStorage,
    personaStorage, 
    setPersonaStorage,
    vehiculoStorage, 
    setVehiculoStorage
  }
}
