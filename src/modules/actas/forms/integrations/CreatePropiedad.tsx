import { useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import { icons } from '../../../../shared'
import PropiedadForm from '../../../parametros/actas/forms/PropiedadForm'

export const CreatePropiedad = () => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const toggleModal = () => setIsOpen(!isOpen)

  return (
    <>
      <Button onClick={toggleModal}><icons.Plus />Crear</Button>

      <Modal show={isOpen} onClose={toggleModal} >
        <Modal.Header>Agregar Propiedad</Modal.Header>
        <Modal.Body>
          <PropiedadForm propiedad={null} onSucces={toggleModal} />
        </Modal.Body>
      </Modal>
    </>
  )
}
