// src/components/integrations/CreateVehiculo.tsx
import { useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import VehiculoForm from '../../../vehiculos/forms/VehiculoForm'
import type { IVehiculo } from '../../../vehiculos/interfaces'
import { icons } from '../../../../shared'

interface Props {
  updateVehiculos: (vehiculo: IVehiculo) => void
}

export const CreateVehiculo = ({ updateVehiculos }: Props) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const toggleModal = () => setIsOpen(!isOpen)

  return (
    <>
      <Button onClick={toggleModal}>
        <icons.Plus /> Crear
      </Button>

      <Modal show={isOpen} onClose={toggleModal} size='5xl'>
        <Modal.Header>Agregar Vehículo</Modal.Header>
        <Modal.Body>
          <VehiculoForm
            vehiculo={null}
            updateVehiculos={updateVehiculos}
            onSuccess={toggleModal}     
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
