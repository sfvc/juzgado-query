import { useState } from 'react'
import { Button, Modal, Table } from 'flowbite-react'
import { Column } from '../../../shared/interfaces'
import { useEstadoActa } from '../hooks/useEstadoActa'
import { useNavigate, useParams } from 'react-router-dom'
import type { IEstadoActa } from '../interfaces'
import { Loading } from '../../../shared'
import EstadoForm from '../forms/EstadoForm'

const colums: Column[] = [
  { key: 'estado', label: 'Id' },
  { key: 'color', label: 'color' },
  { key: 'fecha_desde', label: 'fecha_desde' },
  { key: 'fecha_hasta', label: 'fecha_hasta' },
  { key: 'observaciones', label: 'observaciones' },
]
  
export const EstadoActa = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const actaId = parseInt(id!)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const { estados, isFetching, isError } = useEstadoActa(actaId)

  /* Modal cambiar estado */
  const onCloseModal = () => setOpenModal(false)

  if (isFetching) return <Loading />

  if (!isFetching && isError) navigate('/actas')

  return (
    <>
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white'>Administración de Estados</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <Button type='button' color="gray" onClick={() => setOpenModal(true)} >Crear</Button>
          </div>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <Table>
          <Table.Head>
            {
              colums.map((column: Column) => (
                <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
              ))
            }
          </Table.Head>
          <Table.Body className='divide-y'>
            {
              estados?.length > 0
                ? estados.map((estado: IEstadoActa) => (
                  <Table.Row key={estado.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='text-center dark:text-white'>{estado.nombre}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>
                      <span className='mx-auto block rounded-xl w-10 h-6' style={{ backgroundColor: estado.color || '#000000' }} />
                    </Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{estado.pivot.fecha_desde}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>
                      { !estado.pivot.fecha_hasta ? '-' : estado.pivot.fecha_hasta }
                    </Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{estado.pivot.observaciones || '-'}</Table.Cell>
                  </Table.Row>
                ))
                : <tr><td colSpan={10} className='text-center py-2 dark:bg-gray-800'>No se encontraron resultados</td></tr>
            }
          </Table.Body>
        </Table>
      </div>

      {/* Modal cambiar estado */} 
      <Modal show={openModal} onClose={onCloseModal} size='4xl'>
        <Modal.Header>Modificar estado</Modal.Header>
        <Modal.Body>
          <EstadoForm 
            actaId={actaId}
            onSucces={onCloseModal}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
