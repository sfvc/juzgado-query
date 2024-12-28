import { ReactNode } from 'react'
import { UserRole } from '../constants'
import { useRole } from '../hooks/useRole'

interface RoleGuardProps {
  roles: UserRole[];
  children: ReactNode;
}

export const RoleGuard = ({ roles, children }: RoleGuardProps) => {
  const { hasRole } = useRole()

  return hasRole(roles) ? <>{children}</> : null
}

