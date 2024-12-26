import { useSearchParams } from 'react-router-dom'
import { ActaFilterForm } from '../../modules/actas/interfaces'

export const useQueryParams = () => {
  const [searchParams] = useSearchParams()

  const params = Object.fromEntries(searchParams.entries())
  const filters: ActaFilterForm = {...params, page: +params?.page || 1}
      
  return {filters}
}
