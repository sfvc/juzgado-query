import React from 'react'
import { Button, Table, Tooltip } from 'flowbite-react'
import { Notificacion, NotificationActa } from '../interfaces'
import { icons } from '../../../shared'
import { Column } from '../../../shared/interfaces'
import { LoadingOverlay } from '../../../layout'
import { usePdf } from '../../carbone'

const colums: Column[] = [
  { key: 'tipo', label: 'Tipo' },
  { key: 'tipo_acta', label: 'Tipo Acta' },
  { key: 'fecha', label: 'Fecha' },
  { key: 'plantilla', label: 'Plantilla' },
  { key: 'acciones', label: 'Acciones' },
]

export const NotificacionTable = ({ acta }: { acta: NotificationActa }) => {
  const { useAction, showPDFCarbone, showPDFGotenberg } = usePdf(acta)
  const notificaciones: Notificacion[] = acta.notificaciones

  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center mb-6'>
        <h3 className='text-xl font-semibold text-white'>Notificaciones</h3>
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
              (notificaciones.length > 0)
                ? notificaciones.map((notificacion: Notificacion) => (
                  <Table.Row key={notificacion.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>{notificacion.tipo_actuacion}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{acta.tipo_acta}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{notificacion.created_at}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{notificacion.plantilla?.denominacion || '-'}</Table.Cell>
                    <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                      <Tooltip content='Ver notificación'>
                        <Button color='warning' 
                          className='w-8 h-8 flex items-center justify-center'
                          onClick={() => {
                            if(notificacion?.url)
                              showPDFGotenberg(notificacion.url)
                            else 
                              showPDFCarbone(notificacion?.plantilla?.path, notificacion.id)
                          }} 
                          disabled={!notificacion?.url && !notificacion?.plantilla?.path}
                        >
                          <icons.Print /> 
                        </Button>
                      </Tooltip>

                      <Tooltip content='Ver notificación'>
                        <Button color='success' className='w-8 h-8 flex items-center justify-center'>
                          <icons.Pencil />
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
    </React.Fragment>
  )
}
