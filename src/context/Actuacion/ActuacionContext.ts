import { createContext } from 'react'

export interface IActuacionContext {
    selectedActas: number[],
    clearSelectedActas: () => void
    plantillaId: number | null,
    tipoActuacion: string,
    setTipoActuacion: (tipoActuacion: string) => void
    setPlantillaId: (plantillaId: number | null) => void
    checkingActa: (event: React.ChangeEvent<HTMLInputElement>, actaId: number) => void
    resetProvider: () => void,
    setDefalutSeleted: (actaId: number) => void
}

const initialState: IActuacionContext = {
  selectedActas: [],
  clearSelectedActas: () => {},
  plantillaId: null,
  setPlantillaId: () => {},
  tipoActuacion: '',
  setTipoActuacion: () => {},
  checkingActa: () => {},
  resetProvider: () => {},
  setDefalutSeleted: () => {}
}

export const ActuacionContext = createContext<IActuacionContext>(initialState)