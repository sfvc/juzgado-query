import { useState, useCallback } from 'react'

interface Props {
  executeFunction: () => Promise<void>;
}

export const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const actionFn = useCallback(async (executeFunction: Props['executeFunction']) => {
    setLoading(true)
    try {
      await executeFunction()
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, actionFn }
}
