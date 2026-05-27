import { Link, useLocation } from 'react-router-dom'

interface NavItemProps {
  to: string
  children: React.ReactNode
}

export const NavItem = ({ to, children }: NavItemProps) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`p-2 transition-colors ${
        isActive ? 'text-blue-700 dark:text-blue-400 font-bold' : 'dark:text-white hover:text-blue-700 dark:hover:text-blue-400'
      }`}
    >
      {children}
    </Link>
  )
}
