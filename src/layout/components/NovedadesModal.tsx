import { Badge, Modal } from 'flowbite-react'
import { NOVEDADES, type TipoNovedad } from '../data/novedades'

const TIPOS: Record<TipoNovedad, { label: string, color: string }> = {
  nuevo: { label: 'Novedad', color: 'success' },
  mejora: { label: 'Mejora', color: 'info' },
  correccion: { label: 'Corrección', color: 'warning' }
}

// Se arma la fecha a mano para evitar que la zona horaria la corra un día
const formatFecha = (fecha: string) => {
  const [anio, mes, dia] = fecha.split('-').map(Number)
  return new Date(anio, mes - 1, dia).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
}

interface Props {
  show: boolean
  onClose: () => void
}

export const NovedadesModal = ({ show, onClose }: Props) => {
  return (
    <Modal show={show} onClose={onClose} size='2xl'>
      <Modal.Header>Novedades del sistema</Modal.Header>

      <Modal.Body>
        <p className='mb-4 text-sm text-gray-500 dark:text-gray-400'>
          Acá encontrás los últimos cambios y mejoras que se hicieron en el sistema, de lo más nuevo a lo más antiguo.
        </p>

        <ol className='relative border-s border-gray-200 dark:border-gray-700'>
          {NOVEDADES.map((novedad) => (
            <li key={`${novedad.fecha}-${novedad.titulo}`} className='mb-6 ms-4 last:mb-0'>
              <span className='absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-blue-600 dark:border-gray-800' />

              <div className='flex flex-wrap items-center gap-2'>
                <time className='text-sm text-gray-500 dark:text-gray-400'>{formatFecha(novedad.fecha)}</time>
                <Badge color={TIPOS[novedad.tipo].color}>{TIPOS[novedad.tipo].label}</Badge>
              </div>

              <h3 className='mt-1 text-base font-semibold text-gray-900 dark:text-white'>{novedad.titulo}</h3>
              <p className='text-sm text-gray-600 dark:text-gray-300'>{novedad.descripcion}</p>
            </li>
          ))}
        </ol>
      </Modal.Body>
    </Modal>
  )
}
