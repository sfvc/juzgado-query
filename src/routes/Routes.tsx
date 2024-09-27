import { useContext } from 'react'
import { useRoutes } from 'react-router-dom'
import { AuthContext, Status } from '../context/AuthContext'
import { PrivateRoute, PublicRoute} from '.'
import { LoadingOverlay } from '../layout/components/LoadingOverlayer'

export const Routes = () => {
  const { isAuthenticated } = useContext(AuthContext)

  const routes = useRoutes(isAuthenticated === Status.AUTHENTICATED ? PrivateRoute : PublicRoute)

  return (
    <>
      { isAuthenticated === Status.CHECKING ? <LoadingOverlay /> : routes }
    </>
  )
}