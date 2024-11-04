import React, { useState } from 'react'
import { Button, Table, Tooltip } from 'flowbite-react'
import { useFormContext } from 'react-hook-form'
import { SearchInput } from '../../../../shared'
import { icons } from '../../../../shared'
import { vehiculoActions } from '../../../vehiculos'
import type { IVehiculo } from '../../../vehiculos/interfaces'
import type { VehiculoActa } from '../../interfaces'
import { formatVehiculo } from '../../helpers/formatVehiculo'
import { IActaForm } from '../../interfaces/form-interfaces'

interface Props {
  data: VehiculoActa | null
}

export const VehiculoData = ({ data }: Props) => {
  const { setValue } = useFormContext<IActaForm>() 
  const [vehiculo, setVehiculo] = useState<VehiculoActa | null>(data)
  
  // Agregar vehiculo al listado de vehiculos
  const addVehiculo = (vehiculo: IVehiculo) => {
    if(!vehiculo) return
    const newVehiculo = formatVehiculo(vehiculo)

    setVehiculo(newVehiculo)
    setValue('vehiculo_id', newVehiculo?.id) // Actualizar estado del formulario
  }

  const removeVehiculo = () => {
    setVehiculo(null)
    setValue('vehiculo_id', null)
  }

  // Buscardor de vehiculos
  const handleSearch = async (query: string) => vehiculoActions.getVehiculosByFilter(query)
  const handleSelect = (vehiculo: IVehiculo) => addVehiculo(vehiculo)
  
  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center'>
        <h3 className='text-xl font-semibold text-white'>Datos del vehiculo</h3>
      </div>

      <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
        <SearchInput<IVehiculo>
          label="Vehiculos"
          placeholder="Buscar por patente"
          onSearch={handleSearch}
          onSelect={handleSelect}
          renderItem={(item) => (
            <div><strong>{item.dominio}</strong> - {item.titular?.apellido || 'SIN TITULAR'}</div>
          )}
          renderInput={(item) => { return `${item.dominio} - ${item.titular?.apellido || 'SIN TITULAR'}`} }
        />
      </div>

      {/* Tabla de vehiculo */}
      {vehiculo && (
        <div className='overflow-x-auto'>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className='text-center bg-gray-300'>Titular</Table.HeadCell>
              <Table.HeadCell className='text-center bg-gray-300'>Dominio</Table.HeadCell>
              <Table.HeadCell className='text-center bg-gray-300'>Marca</Table.HeadCell>
              <Table.HeadCell className='text-center bg-gray-300'>Modelo</Table.HeadCell>
              <Table.HeadCell className='text-center bg-gray-300'>Tipo</Table.HeadCell>
              <Table.HeadCell className='text-center bg-gray-300'>Color</Table.HeadCell>
              <Table.HeadCell className='text-center bg-gray-300'>Numero de Chasis</Table.HeadCell>
              <Table.HeadCell className='text-center bg-gray-300'>Numero de Motor</Table.HeadCell>
              <Table.HeadCell className='text-center bg-gray-300'>Numero de Taxi</Table.HeadCell>
              <Table.HeadCell className='text-center bg-gray-300'>Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {
                <Table.Row key={vehiculo.id} className='bg-white dark:border-gray-700 dark:bg-gray-800 max-h-5'>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo?.titular?.apellido || 'SIN TITULAR'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.dominio}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.marca}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.modelo}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.tipo}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.color}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.numero_chasis}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.numero_motor}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.numero_taxi_remis}</Table.Cell>
                  <Table.Cell className='text-center flex items-center justify-center'>
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
    </React.Fragment>
  )
}
