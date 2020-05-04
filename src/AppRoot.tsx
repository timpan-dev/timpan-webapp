import React from 'react'
import AppProvider from '~/providers/AppProvider'
import { MDXProvider } from '@mdx-js/react'

const components = {}

const AppRoot: React.FC<{ element: React.Component }> = ({ element }) => {
  return (
    <AppProvider>
      <MDXProvider components={components}>{element}</MDXProvider>
    </AppProvider>
  )
}

export default AppRoot