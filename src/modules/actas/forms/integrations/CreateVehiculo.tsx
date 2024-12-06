import { useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import VehiculoForm from '../../../vehiculos/forms/VehiculoForm'
import { icons } from '../../../../shared'

export const CreateVehiculo = () => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const toggleModal = () => setIsOpen(!isOpen)

  return (
    <>
      <Button onClick={toggleModal}><icons.Plus />Crear</Button>

      <Modal show={isOpen} onClose={toggleModal} size='5xl'>
        <Modal.Header>Agregar Vehículo</Modal.Header>
        <Modal.Body>
          <VehiculoForm vehiculo={null} onSucces={toggleModal} />
        </Modal.Body>
      </Modal>
    </>
  )
}
