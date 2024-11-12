import { ActaFilter } from '../../actas/components/ActaFilter'
import { ActaProvider } from '../../../context/Acta/ActaProvider'

export const Notificacion = () => {
  return (
    <ActaProvider>
      <ActaFilter />
    </ActaProvider>
  )
}
