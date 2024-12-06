import { useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import { icons } from '../../../../shared'
import RubroForm from '../../../parametros/actas/forms/RubroForm'

export const CreateRubro = () => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const toggleModal = () => setIsOpen(!isOpen)

  return (
    <>
      <Button onClick={toggleModal} ><icons.Plus />Crear</Button>

      <Modal show={isOpen} onClose={toggleModal} >
        <Modal.Header>Agregar Rubro</Modal.Header>
        <Modal.Body>
          <RubroForm rubro={null} onSucces={toggleModal} />
        </Modal.Body>
      </Modal>
    </>
  )
}
