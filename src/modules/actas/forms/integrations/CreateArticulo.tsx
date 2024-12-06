import { useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import { icons } from '../../../../shared'
import ArticuloForm from '../../../parametros/actas/forms/ArticuloForm'

export const CreateArticulo = () => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const toggleModal = () => setIsOpen(!isOpen)

  return (
    <>
      <Button onClick={toggleModal} ><icons.Plus />Crear</Button>

      <Modal show={isOpen} onClose={toggleModal} size='5xl'>
        <Modal.Header>Agregar Articulo</Modal.Header>
        <Modal.Body>
          <ArticuloForm articulo={null} onSucces={toggleModal} />
        </Modal.Body>
      </Modal>
    </>
  )
}
