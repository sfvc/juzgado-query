import React, { useContext } from 'react'
import logoDark from '../../assets/images/logo-capital-dark.webp'
import logoLight from '../../assets/images/logo-capital-light.webp'
import { ThemeContext } from '../../context/Theme/ThemeContext'

const overlayStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
}
  
const imageStyles: React.CSSProperties = {
  width: '10rem',
  animation: 'float 3s ease-in-out infinite',
}

const styles = document.createElement('style')
styles.innerHTML = `
  @keyframes float {
      0% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0); }
  }
`
document.getElementsByTagName('head')[0].appendChild(styles)

export const LoadingOverlay = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <div style={overlayStyles}>
      <img src={ theme === 'light' ? logoLight : logoDark}  alt="Loading..." style={imageStyles} />
    </div>
  )
}
