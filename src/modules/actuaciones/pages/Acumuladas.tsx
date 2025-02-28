import { ActuacionProvider } from '../../../context/Actuacion/ActuacionProvider'
import { ActaFilter } from '../../actas/components/ActaFilter'

export const Acumuladas = () => {
  return (
    <ActuacionProvider>
      <ActaFilter />
    </ActuacionProvider>
  )
}
