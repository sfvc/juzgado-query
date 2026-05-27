import { Button, } from 'flowbite-react'
import { useLoading } from '../../../shared'
import { LoadingOverlay } from '../../../layout'
import type { ILibreDeuda } from '../interfaces'
import { useLibreDeuda } from '../hooks/useLibreDeuda'

interface Props {
  libreDeuda: ILibreDeuda | null,
  onCloseModal: () => void
}

export const ConfirmLibreDeuda = ({ libreDeuda, onCloseModal }: Props) => {
  const { confirmLibreDeuda } = useLibreDeuda()
  const useAction = useLoading()

  const onCheckLibreDeuda = async () => {
    if (!libreDeuda) return

    const dataToMutation = {
      id: libreDeuda.id,
      libre_deuda_id: libreDeuda.libre_deuda_id || 0,
      cuit: libreDeuda.cuit || '',
      fuente: libreDeuda.fuente || '',
      persona_id: libreDeuda.persona_id || 0,
      vehiculo_id: libreDeuda.vehiculo_id || 0,
    }

    const path = await confirmLibreDeuda.mutateAsync(dataToMutation)

    if (path) onCloseModal()
  }

  return (
    <div>
      <footer className='flex flex-col'>
        <div className='flex justify-end gap-4 mt-4'>
          <Button color='red' type='button' className='px-4' onClick={onCloseModal}>Cerrar</Button>

          <Button
            type='button'
            className='px-4'
            onClick={onCheckLibreDeuda}
            disabled={confirmLibreDeuda.isPending || !libreDeuda}
            isProcessing={confirmLibreDeuda.isPending}
          >
            Guardar
          </Button>
        </div>
      </footer>

      { useAction.loading && <LoadingOverlay /> }
    </div>
  )
}
