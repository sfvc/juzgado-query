import { ActaFilter } from '../../actas/components/ActaFilter'
import { ActuacionProvider } from '../../../context/Actuacion/ActuacionProvider'

export const Notificacion = () => {
  return (
    <ActuacionProvider>
      <ActaFilter />
    </ActuacionProvider>
  )
}
