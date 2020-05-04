import React from 'react'
import AppRoot from './src/AppRoot'
import googleFontLink from './src/gatsby/googleFontLink'

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([(<link rel="stylesheet" href={googleFontLink}></link>)])
}

export const wrapRootElement = AppRoot