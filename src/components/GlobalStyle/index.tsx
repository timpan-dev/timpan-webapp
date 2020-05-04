import React from 'react'
import Base from './Base'
import Typography from './Typography'
import App from './App'

const GlobalStyle: React.FC = () => {
  return (
    <React.Fragment>
      <Base />
      <Typography />
      <App />
    </React.Fragment>
  )
}

export default GlobalStyle 