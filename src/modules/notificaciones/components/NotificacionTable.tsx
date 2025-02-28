import React, { useContext, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Modal, Table, Tooltip } from 'flowbite-react'
import { icons } from '../../../shared'
import { LoadingOverlay } from '../../../layout'
import { carboneActions, usePdf } from '../../carbone'
import { NotificationHistory } from './NotificationHistory'
import { useNotification } from '../hooks/useNotification'
import { AuthContext } from '../../../context/Auth/AuthContext'
import type { Notificacion, NotificationActa } from '../interfaces'
import type { Column } from '../../../shared/interfaces'

const colums: Column[] = [
  { key: 'id', label: 'id' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'tipo_acta', label: 'Tipo Acta' },
  { key: 'fecha', label: 'Fecha' },
  { key: 'plantilla', label: 'Plantilla' },
  { key: 'usuario', label: 'Usuario' },
  { key: 'acciones', label: 'Acciones' },
]

export const NotificacionTable = ({ acta }: { acta: NotificationActa }) => {
  const queryClient = useQueryClient()
  const { user } = useContext(AuthContext)

  // const { useAction, convertToPDF, generarPDFGotenberg } = usePdf(acta)
  const { useAction, convertToPDF, generarPDFGotenberg } = usePdf()
  const { deleteNotification } = useNotification()
  const notificaciones: Notificacion[] = acta?.notificaciones || []

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<Notificacion | null>(null)

  const onEditModal= async (notificacion?: Notificacion) => {
    if (!notificacion) {
      setIsOpen(false)
      setActiveItem(null)
    } else {
      setIsOpen(true)
      setActiveItem(notificacion)
    }
  }

  const onDeleteModal= async (notificacion?: Notificacion) => {
    if (!notificacion) {
      setActiveItem(null)
      setOpenDeleteModal(false)
    } else {
      setActiveItem(notificacion)
      setOpenDeleteModal(true)
    }
  }

  const deleteNotificacion = async () => {
    if (!activeItem) return
    
    const response = await deleteNotification.mutateAsync({id: activeItem.id, queryKey: ['acta-notificacion', {id: activeItem.id}]})
    if (response.status === 200) onDeleteModal()
  }

  const onGeneratePDF = async (notificacion: Notificacion) => {
    await useAction.actionFn( async () => {
      const file =  await generarPDFGotenberg(notificacion.plantilla?.path, notificacion.id)
      if (!file) return
  
      const url = await carboneActions.uploadFilePDF( file, { ...notificacion , numero_acta: acta.numero_acta }, 'notificacion_id', user!.id )
      if (url) convertToPDF(url)
  
    })

    queryClient.invalidateQueries({ queryKey: ['acta-actuacion', {id: String(acta.id)}] })
    queryClient.invalidateQueries({ queryKey: ['history', {id: notificacion.id}] })
  }

  const handleconvertToPDF = async (url: string) => {
    useAction.actionFn( async () => {
      await convertToPDF(url)
    })
  }

  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center mb-6'>
        <h3 className='text-xl font-semibold text-white'>Notificaciones</h3>
      </div>

      <div className='overflow-x-auto'>
        <Table>
          <Table.Head>
            {colums.map((colum: Column) => (
              <Table.HeadCell key={colum.key} className='text-center bg-gray-300'>{colum.label}</Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className='divide-y'>
            {
              (notificaciones.length > 0)
                ? notificaciones.map((notificacion: Notificacion) => (
                  <Table.Row key={notificacion.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='text-center dark:text-white'>{notificacion.id}</Table.Cell>
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>{notificacion.tipo_actuacion}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{acta.tipo_acta}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{notificacion.fecha}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{notificacion.plantilla?.denominacion || '-'}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{notificacion.usuario || '-'}</Table.Cell>
                    <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                      <Tooltip content='Ver notificación'>
                        <Button color='warning' 
                          className='w-8 h-8 flex items-center justify-center'
                          onClick={() => {
                            if(notificacion?.url)
                              handleconvertToPDF(notificacion.url)
                            else 
                              onGeneratePDF(notificacion)
                          }} 
                          disabled={!notificacion?.url && !notificacion?.plantilla?.path}
                        >
                          <icons.Print /> 
                        </Button>
                      </Tooltip>

                      <Tooltip content='Editar'>
                        <Button color='success' onClick={() => onEditModal(notificacion)} className='w-8 h-8 flex items-center justify-center'>
                          <icons.Pencil />
                        </Button>
                      </Tooltip>

                      <Tooltip content='Eliminar'>
                        <Button color='failure' onClick={() => onDeleteModal(notificacion)} className='w-8 h-8 flex items-center justify-center'>
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

      {/* Modal para actualizar notificacion */}
      <Modal size='4xl' show={isOpen} onClose={() => onEditModal()}>
        <Modal.Header>Editar Notificación</Modal.Header>
        <Modal.Body>
          { activeItem && <NotificationHistory acta={acta} notificacion={activeItem} onCloseModal={onEditModal} /> }
        </Modal.Body>
      </Modal>

      {/* Modal para eliminar notificacion */}
      { activeItem && 
        <Modal show={openDeleteModal} onClose={onDeleteModal}>
          <Modal.Header>Eliminar actuación</Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <icons.Warning />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estás seguro de que deseas eliminar la actuación del historial?
              </h3>
          
              <div className="flex justify-center gap-4">
                <Button color="gray" onClick={() => onDeleteModal()}>Cancelar</Button>
                <Button 
                  color="failure" 
                  onClick={deleteNotificacion} 
                  isProcessing={deleteNotification.isPending}
                  disabled={deleteNotification.isPending}
                > 
                  Sí, eliminar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      }

      { useAction.loading && <LoadingOverlay /> }
    </React.Fragment>
  )
}
