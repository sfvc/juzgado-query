import { useSearchParams } from 'react-router-dom'
import { ActaFilterForm } from '../../modules/actas/interfaces'
import { useContext } from 'react'
import { AuthContext, UserContext } from '../../context/Auth/AuthContext'

export const useQueryParams = () => {
  const [searchParams] = useSearchParams()
  const { user } = useContext<UserContext>(AuthContext)

  const params = Object.fromEntries(searchParams.entries())
  const filters: ActaFilterForm = { ...params, page: +params?.page || 1, juzgado: user!.juzgado.id }
      
  return {filters}
}
