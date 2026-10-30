
import { useState } from 'react'
import { Card, Table, Button } from 'flowbite-react'
import { CambioEstado, IDashboard } from '../interfaces'
import { useQuery } from '@tanstack/react-query'
import { dashboardActions } from '..'
import { TableSkeleton } from '../../../shared/components/TableSkeleton'

interface Login {
  username: string
  nombre: string
  juzgado: string
  created_at: string
}

type UsuarioAgrupado = Login & {
  horarios: string[]
}

type SesionesPorJuzgado = Record<
  string,
  Record<string, UsuarioAgrupado>
>

// Barra animada que ocupa el lugar de un dato mientras llega la respuesta del servidor
const Placeholder = ({ className }: { className: string }) => (
  <span className={`block animate-pulse rounded-md bg-white/30 ${className}`} />
)

export const Dashboard = () => {
  const { data, isLoading } = useQuery<IDashboard>({
    queryKey: ['dashboard'],
    queryFn: dashboardActions.getDataDashboard,
    staleTime: 1000 * 60,
  })

  const [activeSection, setActiveSection] = useState<string | null>('Sesiones Iniciadas')

  const toggleSection = (section: string) => {
    setActiveSection(prev => (prev === section ? null : section))
  }

  const sesionesPorJuzgado: SesionesPorJuzgado =
  data?.sesiones?.users?.reduce<SesionesPorJuzgado>((acc, login) => {
    if (!acc[login.juzgado]) {
      acc[login.juzgado] = {}
    }

    if (!acc[login.juzgado][login.username]) {
      acc[login.juzgado][login.username] = {
        ...login,
        horarios: [],
      }
    }

    acc[login.juzgado][login.username].horarios.push(login.created_at)

    return acc
  }, {} as SesionesPorJuzgado) ?? {}

  return (
    <div className="dark:bg-gray-800 min-h-screen">

      {/* Cards de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <Card className="p-6 shadow-xl rounded-2xl bg-gradient-to-r from-red-500 to-red-700">
          <h5 className="text-lg font-semibold text-white">Uso</h5>
          <p className="mt-4 text-5xl font-bold text-white">
            {isLoading ? <Placeholder className="h-12 w-24" /> : data?.sesiones.total || 0}
          </p>
          <p className="mt-2 text-sm text-red-200">Sesiones iniciadas</p>
        </Card>

        <Card className="p-6 shadow-xl rounded-2xl bg-gradient-to-r from-green-500 to-green-700">
          <h5 className="text-lg font-semibold text-white">Estados de Actas</h5>
          <p className="mt-4 text-5xl font-bold text-white">
            {isLoading ? <Placeholder className="h-12 w-24" /> : data?.estados.total_cambios || 0}
          </p>
          <p className="mt-2 text-sm text-green-200">Cambios de estado</p>
        </Card>

        <Card className="p-6 shadow-xl rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700">
          <h5 className="text-lg font-semibold text-white">Actas</h5>
          {isLoading
            ? (
              <div className="mt-4 space-y-2">
                {[0, 1, 2, 3].map((i) => <Placeholder key={i} className="h-5 w-full" />)}
              </div>
            )
            : (
              <ul className="mt-4 text-md text-purple-200 space-y-1">
                <li>Actas creadas hoy: <span className="font-bold text-white">{data?.actas.actas_hoy || 0}</span></li>
                <li>Juzgado 1: <span className="font-bold text-white">{data?.actas.actas_juzgado_1 || 0}</span></li>
                <li>Juzgado 2: <span className="font-bold text-white">{data?.actas.actas_juzgado_2 || 0}</span></li>
                <li>Total del mes: <span className="font-bold text-white">{data?.actas.total || 0}</span></li>
              </ul>
            )}
        </Card>
      </div>

      {/* Botones de Secciones */}
      <div className="flex flex-wrap justify-center gap-4 mb-4 mt-4 sm:items-center">
        {['Sesiones Iniciadas', 'Cambios de Estado'].map((section) => (
          <Button
            key={section}
            onClick={() => toggleSection(section)}
            className={`min-w-[150px] px-6 py-2 font-semibold rounded-lg shadow-md text-center ${
              activeSection === section
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 dark:bg-gray-700 dark:text-white text-black hover:text-white'
            }`}
          >
            {section}
          </Button>
        ))}
      </div>

      {/* Sección de Sesiones Iniciadas */}
      {activeSection === 'Sesiones Iniciadas' && (
        <section className="mt-4">
          <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
            Sesiones Iniciadas ({isLoading
              ? '...'
              : Object.values(sesionesPorJuzgado).reduce((total, usuarios) => total + Object.keys(usuarios).length, 0)})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[26rem] overflow-y-auto">
            {isLoading && [0, 1].map((i) => (
              <div key={i}>
                <div className="h-10 animate-pulse rounded-md bg-blue-600/60 mb-3" />
                <Table className="border rounded-lg shadow-lg">
                  <Table.Body className="divide-y dark:bg-gray-800">
                    <TableSkeleton colums={3} />
                  </Table.Body>
                </Table>
              </div>
            ))}

            {!isLoading && sesionesPorJuzgado &&
              Object.entries(sesionesPorJuzgado).map(([juzgado, usuarios]) => (
                <div key={juzgado}>
                  <h4 className="text-lg font-semibold text-gray-200 bg-blue-600 rounded-md py-2 text-center mb-3">
                    {juzgado} <span className='text-green-300'>({Object.keys(usuarios).length})</span>
                  </h4>
                  <Table hoverable className="border rounded-lg shadow-lg">
                    <Table.Head>
                      <Table.HeadCell>Usuario</Table.HeadCell>
                      <Table.HeadCell>Nombre</Table.HeadCell>
                      <Table.HeadCell>Horarios</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y dark:bg-gray-800">
                      {Object.values(usuarios).map((usuario: UsuarioAgrupado) => (
                        <Table.Row key={usuario.username}>
                          <Table.Cell>{usuario.username}</Table.Cell>
                          <Table.Cell>{usuario.nombre}</Table.Cell>
                          <Table.Cell>
                            {usuario.horarios.map((hora: string, idx: number) => (
                              <div key={idx}>{hora}</div>
                            ))}
                          </Table.Cell>
                        </Table.Row>
                      ))}
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
          <h3 className="text-2xl font-semibold text-black dark:text-white mb-4 max-h-[26rem] overflow-y-auto">
            Cambios de Estados
          </h3>
          <Table hoverable className="border rounded-lg shadow-lg">
            <Table.Head>
              <Table.HeadCell>Estado</Table.HeadCell>
              <Table.HeadCell>Cantidad de actas</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y dark:bg-gray-800">
              {isLoading ? (
                <TableSkeleton colums={2} />
              ) : data?.estados?.cambios_por_estado.length ? (
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
