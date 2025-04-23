import React, { useState } from 'react'
import { Button, Modal, Table, Tooltip } from 'flowbite-react'
import { useFormContext } from 'react-hook-form'
import { SearchInput } from '../../../../shared'
import { icons } from '../../../../shared'
import { vehiculoActions } from '../../../vehiculos'
import { formatVehiculo } from '../../helpers/formatVehiculo'
import { CreateVehiculo } from '../integrations/CreateVehiculo'
import { clearNames } from '../../../../shared'
import type { IActaForm } from '../../interfaces/form-interfaces'
import type { VehiculoActa } from '../../interfaces'
import type { IVehiculo } from '../../../vehiculos/interfaces'
import type { Column } from '../../../../shared/interfaces'
import VehiculoForm from '../../../vehiculos/forms/VehiculoForm'

const columns: Column[] = [
  { key: 'titular', label: 'Titular' },
  { key: 'dominio', label: 'Dominio' },
  { key: 'marca', label: 'Marca' },
  { key: 'modelo', label: 'Modelo' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'color', label: 'Color' },
  { key: 'numero_chasis', label: 'Numero de Chasis' },
  { key: 'numero_motor', label: 'Numero de Motor' },
  { key: 'numero_taxi', label: 'Numero de Taxi' },
  { key: 'acciones', label: 'Acciones' }
]

interface Props {
  data: VehiculoActa | null
}

export const VehiculoData = ({ data }: Props) => {
  const { setValue } = useFormContext<IActaForm>()
  const [vehiculo, setVehiculo] = useState<VehiculoActa | null>(data)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [editVehiculo, SetEditVehiculo] = useState<IVehiculo | null>(null)

  const handleSearch = async (query: string) => vehiculoActions.getVehiculosByFilter(query)
  const handleSelect = (vehiculo: IVehiculo) => addVehiculo(vehiculo)

  const addVehiculo = (vehiculo: IVehiculo) => {
    if (!vehiculo) return
    const newVehiculo = formatVehiculo(vehiculo)

    setVehiculo(newVehiculo)
    setValue('vehiculo_id', newVehiculo?.id)
    setOpenModal(false)
  }

  const removeVehiculo = () => {
    setVehiculo(null)
    setValue('vehiculo_id', null)
  }

  const updateVehiculos = (vehiculoActualizado: IVehiculo) => {
    const nuevoVehiculo = formatVehiculo(vehiculoActualizado)
    setVehiculo(nuevoVehiculo)
    setValue('vehiculo_id', nuevoVehiculo?.id)
    setOpenModal(false)
    SetEditVehiculo(null)
  }

  const onOpenModal = async (vehiculoId: number) => {
    try {
      const vehiculo: IVehiculo = await vehiculoActions.getVehiculoById(vehiculoId)
      SetEditVehiculo(vehiculo)
      setOpenModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  const onCloseModal = async () => {
    SetEditVehiculo(null)
    setOpenModal(false)
  }
  
  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center'>
        <h3 className='text-xl font-semibold text-white'>Datos del Vehículo</h3>
      </div>

      <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
        <SearchInput<IVehiculo>
          label="Vehículo"
          placeholder="Buscar por patente"
          onSearch={handleSearch}
          onSelect={handleSelect}
          renderItem={(item) => (
            <div><strong>{item.dominio}</strong> - {clearNames(item.titular?.apellido, item.titular?.nombre) || 'SIN TITULAR'}</div>
          )}
          renderInput={(item) => { return `${item.dominio} - ${clearNames(item.titular?.apellido, item.titular?.nombre) || 'SIN TITULAR'}` }}
        />

        <div className='flex items-end mb-4'><CreateVehiculo /></div>
      </div>

      {/* Tabla de vehiculo */}
      {vehiculo && (
        <div className='overflow-x-auto'>
          <Table hoverable>
            <Table.Head>
              {columns.map((colum: Column) => (
                <Table.HeadCell key={colum.key} className='text-center bg-gray-300'>{colum.label}</Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className='divide-y'>
              {
                <Table.Row key={vehiculo.id} className='bg-white dark:border-gray-700 dark:bg-gray-800 max-h-5'>
                  <Table.Cell className='text-center dark:text-white'>{clearNames(vehiculo?.titular?.apellido, vehiculo?.titular?.nombre) || 'SIN TITULAR'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.dominio}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.marca}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.modelo}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.tipo}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.color}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.numero_chasis}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.numero_motor}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.numero_taxi_remis}</Table.Cell>
                  <Table.Cell className='text-center flex items-center gap-2 justify-center'>
                    <Tooltip content='Editar'>
                      <Button color='success' onClick={() => onOpenModal(vehiculo.id)} className='w-8 h-8 flex items-center justify-center'>
                        <icons.Pencil />
                      </Button>
                    </Tooltip>

                    <Tooltip content='Eliminar'>
                      <Button color='failure' onClick={removeVehiculo} className='w-8 h-8 flex items-center justify-center'>
                        <icons.Trash />
                      </Button>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              }
            </Table.Body>
          </Table>
        </div>
      )}

      {
        editVehiculo &&
        <Modal show={openModal} onClose={onCloseModal} size='5xl'>
          <Modal.Header>Editar Vehículo</Modal.Header>
          <Modal.Body>
            <VehiculoForm
              updateVehiculos={(vehiculo: IVehiculo) => updateVehiculos(vehiculo)}
              vehiculo={editVehiculo}
              onSucces={onCloseModal}
            />
          </Modal.Body>
        </Modal>
      }
    </React.Fragment>
  )
}
