import { useState } from 'react'
import { Card, Table, Button } from 'flowbite-react'
import { CambioEstado, IDashboard, User } from '../interfaces'
import { useQuery } from '@tanstack/react-query'
import { dashboardActions } from '..'
import { Loading } from '../../../shared'
import { formatDate } from '../../../shared/helpers/formatDate'

export const Dashboard = () => {
  const { data, isLoading } = useQuery<IDashboard>({
    queryKey: ['dashboard'],
    queryFn: dashboardActions.getDataDashboard,
    staleTime: 1000 * 60,
  })

  const [activeSection, setActiveSection] = useState<string>('Recaudacion')
  const formatNumber = (num: number): string => {
    return num.toLocaleString('es-AR')
  }
  
  const toggleSection = (section: string) => {
    setActiveSection(prev => (prev === section ? null : section))
  }

  if (isLoading) return <Loading />

  return (
    <div className="dark:bg-gray-800 min-h-screen">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 py-3 rounded-lg shadow-md">
          Dashboard
        </h3>
      </div>

      {/* Cards de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-xl rounded-2xl bg-gradient-to-r from-red-500 to-red-700">
          <h5 className="text-lg font-semibold text-white">Uso</h5>
          <p className="mt-4 text-5xl font-bold text-white">
            {data?.sesiones.total || 0}
          </p>
          <p className="mt-2 text-sm text-red-200">Sesiones iniciadas</p>
        </Card>

        <Card className="p-6 shadow-xl rounded-2xl bg-gradient-to-r from-green-500 to-green-700">
          <h5 className="text-lg font-semibold text-white">Estados de Actas</h5>
          <p className="mt-4 text-5xl font-bold text-white">
            {data?.estados.total_cambios || 0}
          </p>
          <p className="mt-2 text-sm text-green-200">Cambios de estado</p>
        </Card>

        <Card className="p-6 shadow-xl rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700">
          <h5 className="text-lg font-semibold text-white">Actas</h5>
          <ul className="mt-4 text-md text-purple-200 space-y-1">
            <li>Actas creadas hoy: <span className="font-bold text-white">{data?.actas.actas_hoy || 0}</span></li>
            <li>Juzgado 1: <span className="font-bold text-white">{data?.actas.actas_juzgado_1 || 0}</span></li>
            <li>Juzgado 2: <span className="font-bold text-white">{data?.actas.actas_juzgado_2 || 0}</span></li>
            <li>Total del mes: <span className="font-bold text-white">{data?.actas.total || 0}</span></li>
          </ul>
        </Card>
      </div>

      {/* Botones de Secciones */}
      <div className="flex justify-center gap-4 mb-4 mt-4">
        {['Recaudacion', 'Sesiones Iniciadas', 'Cambios de Estado'].map((section) => (
          <Button
            key={section}
            onClick={() => toggleSection(section)}
            className={`px-6 py-2 font-semibold rounded-lg shadow-md ${
              activeSection === section
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 dark:bg-gray-700 dark:text-white text-black hover:text-white'
            }`}
          >
            {section}
          </Button>
        ))}
      </div>

      {/* Sección de Recaudación */}
      {activeSection === 'Recaudacion' && (
        <section className="mt-4">
          <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">Recaudación</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { nombre: 'Juzgado de Faltas N° 1', key: 'juzgado_1' },
              { nombre: 'Juzgado de Faltas N° 2', key: 'juzgado_2' },
            ].map((juzgado, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold text-gray-200 bg-blue-800 rounded-md py-2 text-center mb-3">
                  {juzgado.nombre}
                </h4>
                <Table hoverable className="border rounded-lg shadow-lg">
                  <Table.Head>
                    <Table.HeadCell>Recaudación Diaria</Table.HeadCell>
                    <Table.HeadCell>Recaudación Mensual</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y dark:bg-gray-800">
                    {data?.facturacion ? (
                      <Table.Row>
                        <Table.Cell>$ {formatNumber(data.facturacion[juzgado?.key]?.facturacion_diaria)}</Table.Cell>
                        <Table.Cell>$ {formatNumber(data.facturacion[juzgado?.key]?.facturacion_mensual)}</Table.Cell>
                      </Table.Row>
                    ) : (
                      <tr>
                        <td colSpan={2} className="text-center py-4">No se encontraron datos</td>
                      </tr>
                    )}
                  </Table.Body>
                </Table>
              </div>
            ))}
          </div>

          {/* Recaudación Total */}
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-200 bg-green-600 rounded-md py-2 text-center mb-3">
              Recaudación Total
            </h4>
            <Table hoverable className="border rounded-lg shadow-lg">
              <Table.Head>
                <Table.HeadCell>Recaudación Diaria</Table.HeadCell>
                <Table.HeadCell>Recaudación Mensual</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y dark:bg-gray-800">
                {data?.facturacion ? (
                  <Table.Row>
                    <Table.Cell>$ {formatNumber(data?.facturacion?.total?.facturacion_diaria)}</Table.Cell>
                    <Table.Cell>$ {formatNumber(data?.facturacion?.total?.facturacion_mensual)}</Table.Cell>
                  </Table.Row>
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center py-4">No se encontraron datos</td>
                  </tr>
                )}
              </Table.Body>
            </Table>
          </div>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Datos actualizados el día {data?.facturacion?.fecha_consulta?.dia ? formatDate(data.facturacion.fecha_consulta.dia) : 'Fecha no disponible'}
          </p>
        </section>
      )}

      {/* Sección de Sesiones Iniciadas */}
      {activeSection === 'Sesiones Iniciadas' && (
        <section className="mt-4">
          <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">Sesiones Iniciadas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[26rem] overflow-y-auto">
            {['Juzgado de Faltas N° 1', 'Juzgado de Faltas N° 2'].map((juzgado, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold text-gray-200 bg-blue-600 rounded-md py-2 text-center mb-3">
                  {juzgado}
                </h4>
                <Table hoverable className="border rounded-lg shadow-lg">
                  <Table.Head>
                    <Table.HeadCell>Usuario</Table.HeadCell>
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell>Fecha y Hora</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y dark:bg-gray-800">
                    {data?.sesiones?.users?.length ? (
                      data.sesiones.users
                        .filter((login: User) => login.juzgado === juzgado)
                        .map((login: User) => (
                          <Table.Row key={login.username}>
                            <Table.Cell>{login.username}</Table.Cell>
                            <Table.Cell>{login.nombre}</Table.Cell>
                            <Table.Cell>{login.created_at}</Table.Cell>
                          </Table.Row>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center py-4">No se encontraron resultados</td>
                      </tr>
                    )}
                  </Table.Body>
                </Table>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sección de Cambios de Estado */}
      {activeSection === 'Cambios de Estado' && (
        <section className="mt-6">
          <h3 className="text-2xl font-semibold text-black dark:text-white mb-4 max-h-[26rem] overflow-y-auto">Cambios de Estados</h3>
          <Table hoverable className="border rounded-lg shadow-lg">
            <Table.Head>
              <Table.HeadCell>Estado</Table.HeadCell>
              <Table.HeadCell>Cantidad de actas</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y dark:bg-gray-800">
              {data?.estados?.cambios_por_estado.length ? (
                data.estados.cambios_por_estado.map((estado: CambioEstado) => (
                  <Table.Row key={estado.estado_nombre}>
                    <Table.Cell>{estado.estado_nombre}</Table.Cell>
                    <Table.Cell>{estado.cantidad}</Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center py-4">No se encontraron resultados</td>
                </tr>
              )}
            </Table.Body>
          </Table>
        </section>
      )}
    </div>
  )
}
