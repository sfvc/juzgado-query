import { Card, Table } from 'flowbite-react'
import { CambioEstado, IDashboard, User } from '../interfaces'
import { useQuery } from '@tanstack/react-query'
import { dashboardActions } from '..'
import { Loading } from '../../../shared'

export const Dashboard = () => {

  const { data, isLoading } = useQuery<IDashboard>({
    queryKey: ['dashboard'],
    queryFn: dashboardActions.getDataDashboard,
    staleTime: 1000 * 60
  })

  if (isLoading) return <Loading />

  return (
    <>
      <div className='titulos rounded-md py-2 text-center mb-2'>
        <h3 className='text-xl font-semibold text-white'>Dashboard</h3>
      </div>
        
      <div className='flex justify-between gap-4 mt-4'>
        <div className='flex flex-col justify-between gap-4 w-2/3'>
          <Card className='h-full' horizontal>
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Usuarios</h5>
            </div>

            <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-md font-medium text-gray-900 dark:text-white">Sesiones Iniciadas</p>
                      <p className="truncate text-4xl text-gray-500 dark:text-gray-400">{data?.sesiones.total}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </Card>

          <Card className='h-full' horizontal>
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Estados de actas</h5>
            </div>

            <div className="flow-root w-full">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-md font-medium text-gray-900 dark:text-white">Camios de Estado</p>
                      <p className="truncate text-4xl text-gray-500 dark:text-gray-400">{data?.estados.total_cambios}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </Card>  
        </div>

        <Card className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Actas</h5>
          </div>

          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-md font-medium text-gray-900 dark:text-white">Creadas Hoy</p>
                    <p className="truncate text-lg text-gray-500 dark:text-gray-400">{data?.actas.actas_hoy}</p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-md font-medium text-gray-900 dark:text-white">Juzgado 1</p>
                    <p className="truncate text-lg text-gray-500 dark:text-gray-400">{data?.actas.actas_juzgado_1}</p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-md font-medium text-gray-900 dark:text-white">Juzgado 2</p>
                    <p className="truncate text-lg text-gray-500 dark:text-gray-400">{data?.actas.actas_juzgado_2}</p>
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-md font-medium text-gray-900 dark:text-white">Total del Mes</p>
                    <p className="truncate text-lg text-gray-500 dark:text-gray-400">{data?.actas.total}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Card> 
      </div>

      <div className='md:flex md:justify-between my-4'>
        <h3 className='text-xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Sesiones Iniciadas</h3>
      </div>
      <div className="overflow-x-auto mt-4">
        <Table>
          <Table.Head>
            <Table.HeadCell>Usuario</Table.HeadCell>
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Juzgado</Table.HeadCell>
            <Table.HeadCell>Fecha y Hora</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {
              data?.sesiones?.users?.map((login: User) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{login.username}</Table.Cell>
                  <Table.Cell>{login.nombre}</Table.Cell>
                  <Table.Cell>{login.juzgado}</Table.Cell>
                  <Table.Cell>{login.created_at}</Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>

      <div className='md:flex md:justify-between my-4'>
        <h3 className='text-xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Cambios de Estados</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Id</Table.HeadCell>
            <Table.HeadCell>Estado</Table.HeadCell>
            <Table.HeadCell>Cantidad de actas</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {
              data?.estados?.cambios_por_estado?.map((estado: CambioEstado) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{estado.estado_id}</Table.Cell>
                  <Table.Cell>{estado.estado_nombre}</Table.Cell>
                  <Table.Cell>{estado.cantidad}</Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>

    </>
  )
}
