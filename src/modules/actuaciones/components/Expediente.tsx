import { useState } from 'react'
import { Button, Modal, Table, Tooltip } from 'flowbite-react'
import { Column } from '../../../shared/interfaces'
import { Actuacion, ActuacionActa } from '../interfaces'
import { icons } from '../../../shared'
import { useActuacion } from '../hooks/useActuacion'
import { usePdf } from '../../carbone'
import { LoadingOverlay } from '../../../layout'

const colums: Column[] = [
  { key: 'tipo', label: 'Tipo' },
  { key: 'numero_causa', label: 'Nro. Causa' },
  { key: 'fecha_inicio', label: 'Fecha de inicio' },
  { key: 'numero_acta', label: 'Nro. de acta' },
  { key: 'monto', label: 'Importe' },
  { key: 'acciones', label: 'Acciones' },
]

export const Expediente = ({acta}: {acta: ActuacionActa}) => {
  const { useAction, showPDFCarbone, showPDFGotenberg } = usePdf(acta)
  const { deleteActuacion } = useActuacion()
  const [actuaciones, setActuaciones] = useState<Actuacion[]>(acta.actuaciones || [])

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<Actuacion | null>(null)

  const onOpenModal = async (actuacion: Actuacion) => {
    setActiveItem(actuacion)
    setOpenDeleteModal(true)
  }

  const onCloseModal = () => {
    setOpenDeleteModal(false)
    setActiveItem(null)
  }

  const handleDeleteActuacion = async () => {
    if(!activeItem) return
    const response = await deleteActuacion.mutateAsync({ actaId: acta.id, actuacionId: activeItem.id })
    
    if(!response) return
    setActuaciones((prevState) => prevState.filter(prev => prev.id !== activeItem.id))
    onCloseModal()
  }

  return (
    <>
      <div className='titulos rounded-md py-2 text-center mb-6'>
        <h3 className='text-xl font-semibold text-white'>Expedientes</h3>
      </div>

      <div className='overflow-x-auto'>
        <Table>
          <Table.Head>
            {
              colums.map((colum: Column) => (
                <Table.HeadCell key={colum.key} className='text-center bg-gray-300'>{colum.label}</Table.HeadCell>
              ))
            }
          </Table.Head>
          <Table.Body className='divide-y'>
            {
              actuaciones?.length
                ? actuaciones.map((actuacion, index) => (
                  <Table.Row key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>{actuacion.tipo}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{acta.numero_causa}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{actuacion?.fecha}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{acta.numero_acta}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{actuacion?.monto ? `$ ${actuacion.monto}` : '-'}</Table.Cell>
                    <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                      <Button color='warning' 
                        className='w-8 h-8 flex items-center justify-center'
                        onClick={() => {
                          if(actuacion?.url)
                            showPDFGotenberg(actuacion.url)
                          else 
                            showPDFCarbone(actuacion?.plantilla?.path, actuacion.id)
                        }} 
                        disabled={!actuacion?.url && !actuacion?.plantilla?.path}
                      >
                        <icons.Print /> 
                      </Button>
                      
                      <Tooltip content='Eliminar'>
                        <Button color='failure' onClick={() => onOpenModal(actuacion)} className='w-8 h-8 flex items-center justify-center'>
                          <icons.Trash />
                        </Button>
                      </Tooltip>
                    </Table.Cell>
                  </Table.Row>
                ))
                : <tr><td colSpan={colums.length} className='text-center py-4 dark:bg-gray-800'>No se encontraron resultados</td></tr>
            }
          </Table.Body>
        </Table>
      </div>

      { useAction.loading && <LoadingOverlay /> }

      {/* Modal para eliminar actuación de listado */}
      { activeItem && 
        <Modal show={openDeleteModal} onClose={onCloseModal}>
          <Modal.Header>Eliminar actuación</Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <icons.Warning />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estás seguro de que deseas eliminar la actuación del listado?
              </h3>
          
              <div className="flex justify-center gap-4">
                <Button color="gray" onClick={onCloseModal}>Cancelar</Button>
                <Button 
                  color="failure" 
                  onClick={handleDeleteActuacion} 
                  isProcessing={deleteActuacion.isPending}
                  disabled={deleteActuacion.isPending}
                > 
                  Sí, eliminar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      }
    </>
  )
}
