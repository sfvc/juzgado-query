import { useContext, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Button, FileInput, Label, Modal, Spinner, Table, Tooltip } from 'flowbite-react'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { icons } from '../../../shared'
import { notificacionActions } from '..'
import { usePdf } from '../../carbone'
import { LoadingOverlay } from '../../../layout'
import { useNotification } from '../hooks/useNotification'
import { useUploadFile } from '../../carbone/hooks/useUploadFile'
import { RoleGuard, UserRole } from '../../../auth'
import type { Column } from '../../../shared/interfaces'
import type { Notificacion, NotificationActa } from '../interfaces'
import type { INotificationHistory } from '../interfaces/notificacion-history'

const colums: Column[] = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'fecha', label: 'Fecha' },
  { key: 'hora', label: 'Hora' },
  { key: 'usuario', label: 'Usuario' },
  { key: 'acciones', label: 'Acciones' }
]

interface Props {
    acta: NotificationActa,
    notificacion: Notificacion,
    onCloseModal: () => void
}

export const NotificationHistory = ({ acta, notificacion, onCloseModal }: Props) => {
  const { deleteNotificationHistory } = useNotification()
  const { uploadFile, downloadWord } = useUploadFile()
  const { convertToPDF, downloadWordS3, useAction } = usePdf()
  const { user } = useContext(AuthContext)
  const refFile = useRef<HTMLInputElement | null>(null)
  
  const [ openDeleteModal, setOpenDeleteModal ] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<INotificationHistory | null>(null)

  // Obtener el historial de cambios de la notificacion
  const { data: history = [], isLoading } = useQuery<INotificationHistory[]>({
    queryKey: ['history', {id: notificacion.id}],
    queryFn: () => notificacionActions.getHistoryByNotificacion(notificacion.id),
    staleTime: 1000 * 60 * 5
  })


  const onOpenModalHistory = (notificacion: INotificationHistory) => {
    setActiveItem(notificacion)
    setOpenDeleteModal(true)
  }

  const onCloseModalHistory = () => {
    setOpenDeleteModal(false)
    setActiveItem(null)
  }

  const onUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if (!file) return

    uploadFile.mutate({ file, item: { ...notificacion, numero_acta: acta.numero_acta }, property: 'notificacion_id', queryKey: ['acta-actuacion',{id: acta.id}] })
  }

  const onDownloadWord = async () => {
    downloadWord.mutate({ item: notificacion, acta, user: user! })
  }

  const onDeleteNotificacion = async () => {
    if (!activeItem) return
    
    const response = await deleteNotificationHistory.mutateAsync({id: activeItem.id, queryKey: ['history', {id: notificacion.id}]})
    if (response.status === 200) onCloseModalHistory()
  }

  const cleanInputFile = () => {
    if (refFile.current) 
      refFile.current.value = ''
  }

  const handleconvertToPDF = async (url: string) => {
    useAction.actionFn( async () => {
      await convertToPDF(url)
    })
  }
    
  return (
    <div>
      <div className='mb-4 relative'>
        <div className='mb-2 block'>
          <Label className='text-sm font-medium' htmlFor='file'>Subir Archivo</Label>
        </div>
        <div className='flex'>
          <div className='relative w-full'>
            <FileInput
              name='file'
              placeholder='Seleccionar el archivo'
              onChange={(e) => onUploadFile(e)}
              onFocus={cleanInputFile}
              accept='.doc,.docx'
              ref={refFile}
            />
          </div>
        </div>
      </div>

      {
        isLoading
          ? <div className='flex justify-center items-center'><Spinner size='xl' /></div>
          : 
          <Table className='shadow-md'>
            <Table.Head>
              {colums.map((column: Column) => (
                <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className='divide-y'>
              {
                history?.length
                  ? history.map((notificacion: INotificationHistory) => (
                    <Table.Row key={notificacion.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='text-center dark:text-white'>{notificacion.nombre}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{notificacion?.fecha || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white px-2'>{notificacion?.hora || '-'} hs</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{notificacion?.usuario || '-'}</Table.Cell>
                      <Table.Cell className='flex gap-2 text-center items-center justify-center'>

                        <Tooltip content='PDF' placement='top'>
                          <Button color='warning' onClick={() => handleconvertToPDF(notificacion.url)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.Print />
                          </Button>
                        </Tooltip>

                        <Tooltip content='Descargar' placement='top'>
                          <Button color='success' onClick={() => downloadWordS3(notificacion.url)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.Dowloand />
                          </Button>
                        </Tooltip>

                        <RoleGuard roles={[UserRole.ADMIN, UserRole.JEFE, UserRole.JUEZ, UserRole.SECRETARIO]}>
                          <Tooltip content='Eliminar' placement='top'>
                            <Button color='failure' onClick={() => onOpenModalHistory(notificacion)} className='w-8 h-8 flex items-center justify-center'>
                              <icons.Trash />
                            </Button>
                          </Tooltip>
                        </RoleGuard>
                      </Table.Cell>
                    </Table.Row>
                  ))
                  : <tr><td colSpan={colums.length} className='text-center py-4 dark:bg-gray-800'>No se encontraron resultados</td></tr>
              }
            </Table.Body>
          </Table>
      }

      <footer className='flex flex-col'>
        <Alert color='failure' className='mt-4' icon={icons.Warning}>
          <span>
            <span className='mr-1 text-blue-700 font-bold'>Instrucciones de uso: </span>   
            <span className='text-blue-600'>Descargue el archivo, modifique el contenido y luego seleccione el archivo actualizado para guardarlo.</span>
            <br />
            <span className='mr-1 text-blue-700 font-bold'>¡Importante!</span>   
            <span className='text-blue-600'>El tamaño maximo del archivo tiene que ser menor a 2MB.</span>
          </span>
        </Alert>

        <div className='flex justify-end gap-4 mt-4'>
          {
            !history?.length && 
            <Button color='gray' type='button' className='px-4' onClick={onDownloadWord}>
              <icons.Dowloand size={18}/> 
              &#160; Descargar Notificación
            </Button>
          }
        
          <Button color='red' type='button' className='px-4' onClick={() => onCloseModal()}>Cerrar</Button>
        </div>
      </footer>

      { (uploadFile.isPending || downloadWord.isPending || useAction.loading) && <LoadingOverlay /> }

      {/* Modal para eliminar notificación del historial */}
      { activeItem && 
        <Modal show={openDeleteModal} onClose={onCloseModalHistory}>
          <Modal.Header>Eliminar notificación</Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <icons.Warning />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estás seguro de que deseas eliminar la notificacion del historial?
              </h3>
          
              <div className="flex justify-center gap-4">
                <Button color="gray" onClick={onCloseModalHistory}>Cancelar</Button>
                <Button 
                  color="failure" 
                  onClick={onDeleteNotificacion} 
                  isProcessing={deleteNotificationHistory.isPending}
                  disabled={deleteNotificationHistory.isPending}
                > 
                  Sí, eliminar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      }
    </div>
  )
}
