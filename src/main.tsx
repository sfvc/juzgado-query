import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Route.tsx'
import './index.css'
import TanStackProvider from './plugins/TanStackProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanStackProvider>
      <RouterProvider router={router} />
    </TanStackProvider>
  </StrictMode>,
)
