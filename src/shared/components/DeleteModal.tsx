import { Button, Modal } from 'flowbite-react'
import { icons } from '../index'

interface DeleteModalProps {
  openModal: boolean;
  item: number; // El elemento a eliminar
  onDelete: (id: number) => Promise<void>; // Función de eliminación que recibe el ID
  onClose: () => void; // Función para cerrar el modal
  isLoading: boolean;
}

export const DeleteModal = ({
  openModal,
  item,
  onDelete,
  onClose,
  isLoading
}: DeleteModalProps ) => {    

  const handleDelete = async () => {
    await onDelete(item)
    onClose()
  }

  return (
    <Modal show={openModal} size="md" popup={true} onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <icons.Warning />
          
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            ¿Estás seguro de que deseas eliminar el registro?
          </h3>
          
          <div className="flex justify-center gap-4">
            <Button color="gray" onClick={onClose}>Cancelar</Button>
            <Button 
              color="failure" 
              onClick={handleDelete}
              disabled={isLoading}
              isProcessing={isLoading}
            >
              Sí, eliminar
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
