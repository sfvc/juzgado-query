import React from 'react'
import logoJuzgado from '../../assets/images/logo-juzgado.png'

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
  return (
    <div style={overlayStyles}>
      <img src={logoJuzgado} alt="Loading..." style={imageStyles} />
    </div>
  )
}
