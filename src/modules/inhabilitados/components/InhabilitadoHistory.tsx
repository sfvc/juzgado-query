import { Button, Modal, Spinner, Table } from 'flowbite-react'
import { clearNames, icons, useLoading } from '../../../shared'
import { useHistoryInhabilitado } from '../hooks/useHistoryInhabilitado'
import { carboneActions } from '../../carbone'
import { formatReport } from '../helpers/formatReport'
import type { Column } from '../../../shared/interfaces'
import type { IInhabilitado } from '../interfaces'
import { formatDate } from '../../../shared/helpers/formatDate'

const colums: Column[] = [
  { key: 'persona', label: 'Persona' },
  { key: 'numero_acta', label: 'Número de Acta' },
  { key: 'fecha_inhabilitacion', label: 'Fecha de inhabilitación' },
  { key: 'fecha_vencimiento', label: 'Fecha de vencimiento' },
  { key: 'causa', label: 'Causa' },
  { key: 'organismo', label: 'organismo' }
]
interface Props {
  dni: number | undefined
  isOpen: boolean
  closeModal: () => void
}

const INHABILITADO_TEMPLATE: string = 'reporte-inhabilitados.docx'

export const InhabilitadoHistory = ({dni, isOpen, closeModal}: Props) => {
  const { inhabilitaciones, isLoading } = useHistoryInhabilitado(dni)
  const useAction = useLoading()

  const renderHistoryPDF = async () => {
    useAction.actionFn(async () => {
      const form = formatReport(inhabilitaciones)
  
      const data = {
        convertTo: 'pdf',
        data: form,
        template: INHABILITADO_TEMPLATE
      }
  
      await carboneActions.showFilePDF(data)
    })
  }

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
                        <Table.Cell className='text-center dark:text-white'>{clearNames(inhabilitado?.persona?.apellido, inhabilitado?.persona?.nombre)}</Table.Cell>
                        <Table.Cell className='text-center dark:text-white'>{inhabilitado?.acta?.numero_acta || '-'}</Table.Cell>
                        <Table.Cell className='text-center dark:text-white'>{formatDate(inhabilitado.fecha_desde)}</Table.Cell>
                        <Table.Cell className='text-center dark:text-white'>{formatDate(inhabilitado.fecha_hasta)}</Table.Cell>
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
          <Button color='warning' onClick={renderHistoryPDF} isProcessing={useAction.loading} disabled={useAction.loading}>
            <icons.Print/>&#160; Imprimir
          </Button>

          <Button onClick={closeModal} className='px-2' color='failure'>Cerrar</Button>
        </div>
      </Modal.Body>
    </Modal>

  )
}
