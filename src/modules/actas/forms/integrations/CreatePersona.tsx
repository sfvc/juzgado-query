import { useEffect, useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import { PersonaForm } from '../../../personas/forms/PersonaForm'
import { icons } from '../../../../shared'
import { personaActions } from '../../../personas'
import type { IPersona } from '../../../personas/interfaces'

interface Props {
  id?: number
}

export const CreatePersona = ({ id }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [persona, setPersona] = useState<IPersona | null>(null)

  const toggleModal = () => setIsOpen(!isOpen)

  useEffect(() => {
    if (id) {
      personaActions.getPersonaById(id).then((data) => {
        setPersona(data)
      }).catch(() => {
        setPersona(null)
      })
    } else {
      setPersona(null)
    }
  }, [id])

  return (
    <>
      <Button 
        onClick={toggleModal} 
        color={id ? 'purple' : 'cyan'}
      >
        {id ? <icons.Pencil /> : <icons.Plus />} {id ? 'Editar' : 'Crear'}
      </Button>

      <Modal show={isOpen} onClose={toggleModal} size='5xl'>
        <Modal.Header>{id ? 'Editar Persona' : 'Agregar Persona'}</Modal.Header>
        <Modal.Body>
          <PersonaForm persona={persona} onSucces={toggleModal} />
        </Modal.Body>
      </Modal>
    </>
  )
}
