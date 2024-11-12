
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AuthForm, User } from '../interfaces/auth'
import { apiJuzgado } from '../../api/config'
import { Status } from '../../context/Auth/AuthContext'

export const useAuth = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<Status>(Status.CHECKING)

  // Manejar el login del usuario
  const loginUser = async (data: AuthForm) => {
    try {
      const response = await apiJuzgado.post('/login', data)
      const { user, token } = response.data

      // Guardar el token en localStorage
      localStorage.setItem('token', token)
      setUser(user)
      setIsAuthenticated(Status.AUTHENTICATED)
      navigate('/')
    } catch (error) {
      console.error('Error logging in:', error)
      setIsAuthenticated(Status.NOT_AUTHENTICATED)
    }
  }

  // Verificar si el usuario tiene un token válido
  const checkToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) return setIsAuthenticated(Status.NOT_AUTHENTICATED)

    try {
      const { data } = await apiJuzgado.post('/refresh-token')
      setUser(data.user)
      setIsAuthenticated(Status.AUTHENTICATED)
    } catch (error) {
      console.error('Error validating token:', error)
      logoutUser()
    }
  }

  // Cerrar sesión del usuario
  const logoutUser = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(Status.NOT_AUTHENTICATED)
    navigate('/')
  }

  return {
    user,
    isAuthenticated,
    loginUser,
    checkToken,
    logoutUser
  }
}
