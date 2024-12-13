import { useNavigate } from 'react-router-dom'

export const useNavigateActa = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return { goBack }
}
