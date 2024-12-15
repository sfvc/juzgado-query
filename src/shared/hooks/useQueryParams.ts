import { useSearchParams } from 'react-router-dom'

export const useQueryParams = () => {
  const [searchParams] = useSearchParams()

  const params = Object.fromEntries(searchParams.entries())
  const filters = {...params, page: +params?.page || 1}
      
  return {filters}
}
