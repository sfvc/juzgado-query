import { useState, useContext } from 'react'
import { Button, Modal, Spinner, Table, Select, Pagination } from 'flowbite-react'
import type { Column } from '../../../shared/interfaces'
import { clearNames, useLoading, icons } from '../../../shared'
import { carboneActions } from '../../carbone'
import { formatReport } from '../helpers/formatReport'
import { formatPersona } from '../helpers/formatPersona'
import { IActa } from '../../actas/interfaces'
import { personaActions } from '../../personas'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { getAntecedentesByPersonaPrint } from '../../personas/services/personas-actions'

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
  const [currentPage, setCurrentPage] = useState(1)
  const [tipoFiltro, setTipoFiltro] = useState<string>('')

  const { data: response, isLoading } = useQuery({
    queryKey: ['antecedentes', id, currentPage, tipoFiltro],
    queryFn: () =>
      personaActions.getAntecedentesByPersona(
        id!,
        currentPage,
        tipoFiltro || undefined
      ),
    staleTime: 1000 * 60 * 5,
    enabled: !!id
  })

  const antecedentes = response?.data ?? []
  const meta = response?.meta

  const ANTECEDENTE_TEMPLATE: string = 'antecedentes.docx'
  const ANTECEDENTE_TEMPLATE_AREA: string = 'antecedentesAreas.docx'

  const renderAntecedente = async () => {
    useAction.actionFn(async () => {
      const allAntecedentes = await getAntecedentesByPersonaPrint(
        id!,
        tipoFiltro || undefined
      )

      const antecedentesParaImprimir = tipoFiltro
        ? allAntecedentes.filter(
          (a: IActa) => a.tipo_acta === tipoFiltro
        )
        : allAntecedentes

      if (!antecedentesParaImprimir.length) return

      const form = formatReport(antecedentesParaImprimir)
      const persona = formatPersona(antecedentesParaImprimir, user)

      const nombre = clearNames(
        antecedentesParaImprimir[0]?.infractores?.[0]?.apellido,
        antecedentesParaImprimir[0]?.infractores?.[0]?.nombre
      )

      const template = antecedentesParaImprimir.some(
        (a: IActa) => a.tipo_acta === 'TRANSITO'
      )
        ? ANTECEDENTE_TEMPLATE
        : ANTECEDENTE_TEMPLATE_AREA

      const data = {
        convertTo: 'pdf',
        reportName: `ANTECEDENTES ${nombre}.pdf`,
        data: {
          data: form,
          persona
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
                onChange={(e) => {
                  setCurrentPage(1)
                  setTipoFiltro(e.target.value)
                }}
              >
                <option value=''>Todos los tipos</option>
                <option value='TRANSITO'>TRANSITO</option>
                <option value='BROMATOLOGIA'>BROMATOLOGIA</option>
                <option value='INSPECCION'>INSPECCION</option>
                <option value='OBRAS PARTICULARES'>OBRAS PARTICULARES</option>
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
                {antecedentes.length ? (
                  antecedentes.map((antecedente: IActa) => (
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

            {meta && meta.last_page > 1 && (
              <div className='flex flex-col gap-2 mt-4'>
                <div className='text-sm text-gray-700 dark:text-gray-300'>
                  Mostrando {meta.from} a {meta.to} de {meta.total} registros
                </div>

                <div className='flex overflow-x-auto sm:justify-center'>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={meta.last_page}
                    onPageChange={(page: number) => setCurrentPage(page)}
                    previousLabel='Anterior'
                    nextLabel='Siguiente'
                    showIcons
                  />
                </div>
              </div>
            )}
          </>
        )}

        <div className='flex justify-end mt-4 gap-2'>
          <h3 className='mt-2 gap-4'>(Se van a imprimir los antecedentes de hasta 18 meses atras)</h3>
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
