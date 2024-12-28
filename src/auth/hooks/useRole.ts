import { useContext } from 'react'
import { AuthContext } from '../../context/Auth/AuthContext'
import { UserRole } from '../constants'

export const useRole = () => {
  const { user } = useContext(AuthContext)

  const hasRole = (role: UserRole | UserRole[]) => {
    if (!user) return false
      
    if (Array.isArray(role)) {
      return role.includes(user.role.name)
    }

    return user.role.name === role
  }

  return { hasRole }
}
