import { useSearchParams } from 'react-router-dom'
import { ActaFilterForm } from '../../modules/actas/interfaces'
import { useContext } from 'react'
import { AuthContext, UserContext } from '../../context/Auth/AuthContext'

export const useQueryParams = () => {
  const [paramsObj] = useSearchParams()
  const { user } = useContext<UserContext>(AuthContext)
  const params = Object.fromEntries(paramsObj.entries())

  const filters: ActaFilterForm = {
    ...params,
    page: +params.page || 1,
    juzgado: params.juzgado && params.juzgado !== ''
      ? params.juzgado
      : user!.juzgado.id
  }

  return { filters, firstLoad: Object.keys(params).length === 0 }
}
