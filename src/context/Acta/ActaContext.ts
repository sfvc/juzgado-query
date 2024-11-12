import { createContext } from 'react'

interface ActaContext {
    selectedActas: number[],
    plantillaId: number | null
    setPlantillaId: (plantillaId: number) => void
    checkingActa: (event: React.ChangeEvent<HTMLInputElement>, actaId: number) => void
}

const initialState: ActaContext = {
  selectedActas: [],
  plantillaId: null,
  setPlantillaId: () => {},
  checkingActa: () => {}
}

export const ActaContext = createContext<ActaContext>(initialState)