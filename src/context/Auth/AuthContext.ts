import { createContext } from 'react'
import { AuthForm, User } from '../../auth/interfaces/auth'

export enum Status {
    CHECKING = 'CHECKING',
    AUTHENTICATED = 'AUTHENTICATED',
    NOT_AUTHENTICATED = 'NOT_AUTHENTICATED'
}

export interface UserContext {
    user: User | null,
    isAuthenticated: Status,
    loginUser: (user: AuthForm) => Promise<void>,
    checkToken: () => void,
    logoutUser: () => void
}

const initialState: UserContext = {
  user: null,
  isAuthenticated: Status.NOT_AUTHENTICATED,
  loginUser: async () => {},
  checkToken: () => {},
  logoutUser: () => {}
}

export const AuthContext = createContext<UserContext>(initialState)
