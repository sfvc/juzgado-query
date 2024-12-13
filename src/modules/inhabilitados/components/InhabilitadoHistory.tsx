import { Button, Modal, Spinner, Table } from 'flowbite-react'
import { useQuery } from '@tanstack/react-query'
import { Column } from '../../../shared/interfaces'
import { inhabilitadoActions } from '..'
import { icons } from '../../../shared'
import type { IInhabilitado } from '../interfaces'

const colums: Column[] = [
  { key: 'id', label: 'Id' },
  { key: 'persona', label: 'Persona' },
  { key: 'fecha_inhabilitacion', label: 'Fecha de inhabilitación' },
  { key: 'fecha_vencimiento', label: 'Fecha de vencimiento' },
  { key: 'causa', label: 'Causa' },
  { key: 'organismo', label: 'organismo' }
]
interface Props {
  dni: string | undefined
  isOpen: boolean
  closeModal: () => void
}

export const InhabilitadoHistory = ({dni, isOpen, closeModal}: Props) => {

  // Obtener el historial de inhabilitaciones de una persona
  const { data: inhabilitaciones, isLoading } = useQuery<IInhabilitado[]>({
    queryKey: ['inhabilitado-history', {dni}],
    queryFn: () => inhabilitadoActions.getInhabilitadosHistory({dni}),
    staleTime: 1000 * 60 * 5
  })

  if (isLoading) return <div className='flex justify-center'><Spinner size='lg'/></div>

  return (
    <Modal size='5xl' show={isOpen} onClose={() => closeModal()}>
      <Modal.Header>Historial de Inhabilitaciones</Modal.Header>
      <Modal.Body>
        {
          isLoading
            ? <div className='flex justify-center items-center'><Spinner size='xl' /></div>
            : 
            <Table hoverable className='text-center'>
              <Table.Head>
                {colums.map((column: Column) => (
                  <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
                ))}
              </Table.Head>
              <Table.Body className='divide-y'>
                {
                  inhabilitaciones?.length
                    ? inhabilitaciones.map((inhabilitado: IInhabilitado) => (
                      <Table.Row key={inhabilitado.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell className='text-center dark:text-white'>{inhabilitado.id}</Table.Cell>
                        <Table.Cell className='text-center dark:text-white'>{inhabilitado?.persona?.apellido}</Table.Cell>
                        <Table.Cell className='text-center dark:text-white'>{inhabilitado.fecha_desde}</Table.Cell>
                        <Table.Cell className='text-center dark:text-white'>{inhabilitado.fecha_hasta}</Table.Cell>
                        <Table.Cell className='text-center dark:text-white'>{inhabilitado.causa}</Table.Cell>
                        <Table.Cell className='text-center dark:text-white'>{inhabilitado?.juzgado?.nombre}</Table.Cell>
                      </Table.Row>
                    ))
                    : <tr><td colSpan={colums.length} className='text-center py-4 dark:bg-gray-800'>No se encontraron resultados</td></tr>
                }
              </Table.Body>
            </Table> 
        }

        <div className='flex justify-end gap-4 mt-4'>
          <Button onClick={() => console.log('imprimir')} className='px-2' color='warning'><icons.Print/>&#160; Imprimir</Button>
          <Button onClick={closeModal} className='px-2' color='gray'>Cerrar</Button>
        </div>
      </Modal.Body>
    </Modal>

  )
}
