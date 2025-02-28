import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TanStackProvider from './plugins/TanStackProvider.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <TanStackProvider>
    <App />
  </TanStackProvider>
  // </StrictMode>,
)
