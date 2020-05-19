import React from 'react'
import Base from './Base'
import Typography from './Typography'
import App from './App'
import IconFonts from './IconFonts'

const GlobalStyle: React.FC = () => {
  return (
    <React.Fragment>
      <Base />
      <Typography />
      <App />
      <IconFonts />
    </React.Fragment>
  )
}

export default GlobalStyle 