/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useAuth } from '../../auth'
import { AuthContext } from './AuthContext'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const AuthProvider = ({ children }: Props) => {
  const {
    user,
    isAuthenticated,
    loginUser,
    checkToken,
    logoutUser
  } = useAuth()

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginUser, checkToken, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}
