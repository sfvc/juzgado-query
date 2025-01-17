import { Card, Table } from 'flowbite-react'
import { CambioEstado, IDashboard, User } from '../interfaces'
import { useQuery } from '@tanstack/react-query'
import { dashboardActions } from '..'
import { Loading } from '../../../shared'

export const Dashboard = () => {
  const { data, isLoading } = useQuery<IDashboard>({
    queryKey: ['dashboard'],
    queryFn: dashboardActions.getDataDashboard,
    staleTime: 1000 * 60,
  })

  if (isLoading) return <Loading />

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <div className="bg-blue-600 rounded-md py-4 text-center mb-6">
        <h3 className="text-2xl font-semibold text-white">Dashboard</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-lg border rounded-lg bg-gradient-to-r from-red-500 to-red-700">
          <h5 className="text-lg font-semibold text-white border-b pb-2">Usuarios</h5>
          <p className="mt-4 text-5xl font-bold text-white">
            {data?.sesiones.total || 0}
          </p>
          <p className="mt-2 text-sm text-blue-100">Sesiones iniciadas</p>
        </Card>

        <Card className="p-6 shadow-lg border rounded-lg bg-gradient-to-r from-green-500 to-green-700">
          <h5 className="text-lg font-semibold text-white border-b pb-2">Estados de Actas</h5>
          <p className="mt-4 text-5xl font-bold text-white">
            {data?.estados.total_cambios || 0}
          </p>
          <p className="mt-2 text-sm text-green-100">Cambios de estado</p>
        </Card>

        <Card className="p-6 shadow-lg border rounded-lg bg-gradient-to-r from-purple-500 to-purple-700">
          <h5 className="text-lg font-semibold text-white border-b pb-2">Actas</h5>
          <ul className="mt-4 space-y-2 text-md text-purple-100">
            <li>Actas creadas hoy: <span className="font-bold text-white">{data?.actas.actas_hoy || 0}</span></li>
            <li>Juzgado 1: <span className="font-bold text-white">{data?.actas.actas_juzgado_1 || 0}</span></li>
            <li>Juzgado 2: <span className="font-bold text-white">{data?.actas.actas_juzgado_2 || 0}</span></li>
            <li>Total del mes: <span className="font-bold text-white">{data?.actas.total || 0}</span></li>
          </ul>
        </Card>
      </div>

      <section className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Sesiones Iniciadas</h3>
        <div className="overflow-x-auto overflow-y-auto h-72">
          <Table hoverable className="border">
            <Table.Head>
              <Table.HeadCell>Usuario</Table.HeadCell>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Juzgado</Table.HeadCell>
              <Table.HeadCell>Fecha y Hora</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data?.sesiones?.users?.length ? (
                data.sesiones.users.map((login: User) => (
                  <Table.Row key={login.username} className="dark:bg-gray-800">
                    <Table.Cell>{login.username}</Table.Cell>
                    <Table.Cell>{login.nombre}</Table.Cell>
                    <Table.Cell>{login.juzgado}</Table.Cell>
                    <Table.Cell>{login.created_at}</Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 dark:bg-gray-800">
                    No se encontraron resultados
                  </td>
                </tr>
              )}
            </Table.Body>
          </Table>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Cambios de Estados</h3>
        <div className="overflow-x-auto overflow-y-auto h-72">
          <Table className="border">
            <Table.Head>
              <Table.HeadCell>Estado</Table.HeadCell>
              <Table.HeadCell>Cantidad de actas</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data?.estados?.cambios_por_estado.length ? (
                data.estados.cambios_por_estado.map((estado: CambioEstado) => (
                  <Table.Row className="bg-white dark:bg-gray-800">
                    <Table.Cell>{estado.estado_nombre}</Table.Cell>
                    <Table.Cell>{estado.cantidad}</Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 dark:bg-gray-800">
                    No se encontraron resultados
                  </td>
                </tr>
              )}
            </Table.Body>
          </Table>
        </div>
      </section>
    </div>
  )
}
