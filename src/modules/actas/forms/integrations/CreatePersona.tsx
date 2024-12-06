import { useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import { PersonaForm } from '../../../personas/forms/PersonaForm'
import { icons } from '../../../../shared'

export const CreatePersona = () => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const toggleModal = () => setIsOpen(!isOpen)

  return (
    <>
      <Button onClick={toggleModal}><icons.Plus /> Crear</Button>

      <Modal show={isOpen} onClose={toggleModal} size='5xl'>
        <Modal.Header>Agregar Persona</Modal.Header>
        <Modal.Body>
          <PersonaForm persona={null} onSucces={toggleModal} />
        </Modal.Body>
      </Modal>
    </>
  )
}
