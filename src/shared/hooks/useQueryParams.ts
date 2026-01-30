import { useSearchParams } from 'react-router-dom'
import { ActaFilterForm } from '../../modules/actas/interfaces'
import { useContext } from 'react'
import { AuthContext, UserContext } from '../../context/Auth/AuthContext'

export const useQueryParams = () => {
  const [paramsObj] = useSearchParams()
  const { user } = useContext<UserContext>(AuthContext)

  const params = Object.fromEntries(paramsObj.entries())
  const firstLoad = Object.keys(params).length === 0
  const hasJuzgadoInParams = 'juzgado' in params && params.juzgado !== ''

  const filters: ActaFilterForm = {
    ...params,
    page: +params.page || 1,
    juzgado: firstLoad
      ? user!.juzgado.id
      : (hasJuzgadoInParams ? params.juzgado : '')
  }

  return { filters, firstLoad }
}
