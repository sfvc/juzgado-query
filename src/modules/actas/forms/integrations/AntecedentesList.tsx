import { Button, Modal, Spinner, Table } from 'flowbite-react'
import { useQuery } from '@tanstack/react-query'
import { personaActions } from '../../../personas'
import type { Column } from '../../../../shared/interfaces'
import type { IActa } from '../../interfaces'
import { clearNames } from '../../../../shared'

const colums: Column[] = [
  { label: 'Nro. Acta', key: 'numero_acta' },
  { label: 'Nro. Causa', key: 'numero_causa' },
  { label: 'Fecha', key: 'fecha' },
  { label: 'Tipo', key: 'tipo_acta' },
  { label: 'Nombre y Apellido', key: 'nombre_apellido' },
  { label: 'Estado', key: 'estado' },
]

interface Props {
  id?: number | null
  isOpen: boolean
  toggleModal: () => void
}

export const AntecedentesList = ({id, isOpen, toggleModal}: Props) => {
  
  const { data: antecedentes, isLoading } = useQuery<IActa[]>({
    queryKey: ['antecedentes', {id}],
    queryFn: () => personaActions.getAntecedentesByPersona(id!),
    staleTime: 1000 * 60 * 5,
    enabled: !!id
  })

  return (
    <Modal size='5xl' show={isOpen} onClose={() => toggleModal()}>
      <Modal.Header>Antecedentes de la Persona</Modal.Header>
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
                  antecedentes?.length
                    ? antecedentes.map((antecedente: IActa) => (
                      <Table.Row key={antecedente.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>
                          {antecedente.numero_acta}
                        </Table.Cell>
                        <Table.Cell className='text-center dark:text-white'>{antecedente.numero_causa}</Table.Cell>
                        <Table.Cell className='text-center dark:text-white'>{antecedente.fecha}</Table.Cell>
                        <Table.Cell className='text-center dark:text-white'>{antecedente.tipo_acta}</Table.Cell>
                        <Table.Cell className='text-center dark:text-white'>{clearNames(antecedente.infractores[0]?.apellido, antecedente.infractores[0]?.nombre)}</Table.Cell>
                        <Table.Cell className='text-center dark:text-white'>{antecedente.estados[antecedente.estados.length - 1].nombre}</Table.Cell>
                      </Table.Row>
                    ))
                    : <tr><td colSpan={colums.length} className='text-center py-4 dark:bg-gray-800'>No se encontraron resultados</td></tr>
                }
              </Table.Body>
            </Table> 
        }

        <div className='flex justify-end mt-4'>
          <Button onClick={() => toggleModal()} className='px-2' color='gray'>Cerrar</Button>
        </div>
      </Modal.Body>
    </Modal>

  )
}
