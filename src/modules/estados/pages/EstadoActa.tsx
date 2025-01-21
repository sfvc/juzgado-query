import { useState } from 'react'
import { Button, Modal, Table, Tooltip } from 'flowbite-react'
import { useEstadoActa } from '../hooks/useEstadoActa'
import { useNavigate, useParams } from 'react-router-dom'
import EstadoForm from '../forms/EstadoForm'
import { icons, Loading } from '../../../shared'
import type { IEstadoActa } from '../interfaces'
import type { Column } from '../../../shared/interfaces'
import { formatDate } from '../../../shared/helpers/formatDate'

const colums: Column[] = [
  { key: 'estado', label: 'Estado' },
  { key: 'color', label: 'color' },
  { key: 'fecha_desde', label: 'fecha desde' },
  { key: 'fecha_hasta', label: 'fecha hasta' },
  { key: 'observaciones', label: 'observaciones' },
  { key: 'acciones', label: 'Acciones' }
]
  
export const EstadoActa = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const actaId = parseInt(id!)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<IEstadoActa | null>(null)
  const { estados, isFetching, isError } = useEstadoActa(actaId)

  /* Modal cambiar estado */
  const onCloseModal = () => {
    setOpenModal(false)
    if (activeItem) setActiveItem(null)
  }

  const onEditEstado = (estado: IEstadoActa) => {
    setActiveItem(estado)
    setOpenModal(true)
  }

  if (isFetching) return <Loading />

  if (!isFetching && isError) navigate('/actas')

  return (
    <>
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white'>Administración de Estados</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <Button type='button' onClick={() => setOpenModal(true)} >Agregar</Button>
          </div>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <Table>
          <Table.Head>
            {colums.map((column: Column) => (
              <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
            ))}
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
                    <Table.Cell className='text-center dark:text-white'>{formatDate(estado.pivot.fecha_desde)}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>
                      { !estado.pivot.fecha_hasta ? '-' : formatDate(estado.pivot.fecha_hasta) }
                    </Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{estado.pivot.observaciones || '-'}</Table.Cell>
                    <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                      <Tooltip content='Editar'>
                        <Button color='success' onClick={() => onEditEstado(estado)} className='w-8 h-8 flex items-center justify-center'>
                          <icons.Pencil />
                        </Button>
                      </Tooltip>
                    </Table.Cell>
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
            estado={activeItem}
            onSucces={onCloseModal}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
