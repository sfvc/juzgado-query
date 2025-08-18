import { useState, useContext } from 'react'
import { Button, Modal, Spinner, Table, Select } from 'flowbite-react'
import type { Column } from '../../../shared/interfaces'
import { clearNames, useLoading, icons } from '../../../shared'
import { carboneActions } from '../../carbone'
import { formatReport } from '../helpers/formatReport'
import { formatPersona } from '../helpers/formatPersona'
import { IActa } from '../../actas/interfaces'
import { personaActions } from '../../personas'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../../context/Auth/AuthContext'

const colums: Column[] = [
  { label: 'Nro. Acta', key: 'numero_acta' },
  { label: 'Nro. Causa', key: 'numero_causa' },
  { label: 'Nombre y Apellido', key: 'nombre_apellido' },
  { label: 'Fecha', key: 'fecha' },
  { label: 'Tipo', key: 'tipo_acta' },
  { label: 'Estado', key: 'estado' },
]

interface Props {
  id?: number | null
  isOpen: boolean
  toggleModal: () => void
}

export const Antecedentes = ({ id, isOpen, toggleModal }: Props) => {
  const useAction = useLoading()
  const { user } = useContext(AuthContext)
  const { data: antecedentes, isLoading } = useQuery<IActa[]>({
    queryKey: ['antecedentes', { id }],
    queryFn: () => personaActions.getAntecedentesByPersona(id!),
    staleTime: 1000 * 60 * 5,
    enabled: !!id
  })

  const [tipoFiltro, setTipoFiltro] = useState<string>('')
  const ANTECEDENTE_TEMPLATE: string = 'antecedentes.docx'
  const ANTECEDENTE_TEMPLATE_AREA: string = 'antecedentesAreas.docx'

  const tiposDisponibles = [...new Set(antecedentes?.map(a => a.tipo_acta) ?? [])]

  const antecedentesFiltrados = tipoFiltro
    ? antecedentes?.filter(a => a.tipo_acta === tipoFiltro)
    : antecedentes

  const renderAntecedente = async () => {
    useAction.actionFn(async () => {
      const form = formatReport(antecedentesFiltrados)
      const persona = formatPersona(antecedentesFiltrados, user)
      const nombre = clearNames(
        antecedentesFiltrados?.[0]?.infractores?.[0]?.apellido,
        antecedentesFiltrados?.[0]?.infractores?.[0]?.nombre
      )

      const template = antecedentesFiltrados?.some(a => a.tipo_acta === 'TRANSITO')
        ? ANTECEDENTE_TEMPLATE
        : ANTECEDENTE_TEMPLATE_AREA

      const data = {
        convertTo: 'pdf',
        reportName: `ANTECEDENTES ${nombre}.pdf`,
        data: {
          data: form,
          persona: persona
        },
        template
      }

      await carboneActions.showFilePDF(data)
    })
  }

  return (
    <Modal size='5xl' show={isOpen} onClose={() => toggleModal()}>
      <Modal.Header>Antecedentes de la Persona</Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className='flex justify-center items-center'>
            <Spinner size='xl' />
          </div>
        ) : (
          <>
            <div className='mb-4'>
              <Select
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
                className="w-full"
              >
                <option value=''>Todos los tipos</option>
                {tiposDisponibles.map(tipo => (
                  <option key={tipo} value={tipo} className="w-full">
                    {tipo}
                  </option>
                ))}
              </Select>
            </div>

            <Table hoverable className='text-center'>
              <Table.Head>
                {colums.map((column: Column) => (
                  <Table.HeadCell key={column.key} className='text-center bg-gray-300'>
                    {column.label}
                  </Table.HeadCell>
                ))}
              </Table.Head>
              <Table.Body className='divide-y'>
                {antecedentesFiltrados?.length ? (
                  antecedentesFiltrados.map((antecedente: IActa) => (
                    <Table.Row
                      key={antecedente.id}
                      className='bg-white dark:border-gray-700 dark:bg-gray-800'
                    >
                      <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>
                        {antecedente.numero_acta}
                      </Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>
                        {antecedente.numero_causa}
                      </Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>
                        {clearNames(
                          antecedente.infractores[0]?.apellido,
                          antecedente.infractores[0]?.nombre
                        )}
                      </Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>
                        {antecedente.fecha}
                      </Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>
                        {antecedente.tipo_acta}
                      </Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>
                        {antecedente.estados[antecedente.estados.length - 1].nombre}
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={colums.length}
                      className='text-center py-4 dark:bg-gray-800'
                    >
                      No se encontraron resultados
                    </td>
                  </tr>
                )}
              </Table.Body>
            </Table>
          </>
        )}

        <div className='flex justify-end mt-4 gap-2'>
          <Button
            color='warning'
            onClick={renderAntecedente}
            isProcessing={useAction.loading}
            disabled={useAction.loading}
          >
            <icons.Print />&#160; Imprimir
          </Button>
          <Button
            onClick={() => toggleModal()}
            className='px-2'
            color='gray'
          >
            Cerrar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
