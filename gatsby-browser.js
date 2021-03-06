import AppRoot from './src/AppRoot'
import googleFontLink from './src/gatsby/googleFontLink'

export const onInitialClientRender = () => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = googleFontLink
  link.async = true
  document.head.appendChild(link)
}

export const wrapRootElement = AppRoot