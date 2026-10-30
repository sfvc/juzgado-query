import { Button, Modal } from 'flowbite-react'
import { icons } from '../../../shared'
import { useActuacion } from '../hooks/useActuacion'
import type { Actuacion, Cuota } from '../interfaces'

interface Props {
  show: boolean
  /** Cierra el modal y descarta la cuota elegida */
  onClose: () => void
  actuacion: Actuacion
  /** Cuota elegida desde el plan de pago. Sin cuota se opera sobre toda la actuacion */
  cuota: Cuota | null
}

// Confirmacion para enviar a la bandeja de cobro (caja) o retirar de ella
export const ComprobanteModal = ({ show, onClose, actuacion, cuota }: Props) => {
  const { generateComprobante, deleteComprobante } = useActuacion()

  const enCaja = cuota ? !!cuota.caja : !!actuacion.caja

  const title = cuota
    ? (enCaja ? `Confirma para retirar la cuota N°${cuota.cuota} de caja` : `Confirma para enviar la cuota N°${cuota.cuota} a caja`)
    : (enCaja ? '¿Confirma retirar de la bandeja de cobro?' : '¿Confirma enviar a la bandeja de cobro?')

  const handleConfirm = async () => {
    if (enCaja) await deleteComprobante.mutateAsync(actuacion.id)
    else await generateComprobante.mutateAsync(actuacion.id)

    onClose()
  }

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Bandeja de Cobro</Modal.Header>
      <Modal.Body>
        <div className='text-center'>
          <icons.Warning />
          <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>{title}</h3>

          <div className='flex justify-center gap-4'>
            <Button color='gray' onClick={onClose}>Cancelar</Button>

            <Button
              onClick={handleConfirm}
              isProcessing={generateComprobante.isPending || deleteComprobante.isPending}
              color={enCaja ? 'failure' : 'success'}
            >
              {enCaja ? 'Sí, retirar' : 'Sí, enviar'}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
