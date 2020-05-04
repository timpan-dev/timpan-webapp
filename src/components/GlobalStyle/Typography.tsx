import { createGlobalStyle } from 'styled-components'
import {
  headerFontFamilyString,
  headerWeight,
  scaleInRem,
  lineHeightForFontRem,
  bodyWeight,
  baseLineHeight,
  bodyFontFamilyString,
  linesRem,
  bodyColor,
  boldWeight,
  // linkColor,
  // visitedColor,
  // activeColor,
  // hoverColor,
  lineHeightForFontPix,
  appBarHeight,
  primaryColor
} from '~/utils/styling'

const h1Size = scaleInRem(5 / 5)
const h2Size = scaleInRem(3 / 5)
const h3Size = scaleInRem(2 / 5)
const h4Size = scaleInRem(0 / 5)
const h5Size = scaleInRem(-1 / 5)
const h6Size = scaleInRem(-1.5 / 5)

export default createGlobalStyle`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 ${linesRem(1)};
    color: inherit;
    font-family: ${headerFontFamilyString};
    font-weight: ${headerWeight};
    text-rendering: optimizeLegibility;
  }

  h1 {
    text-align: center;
    font-size: ${h1Size}rem;
    line-height: ${h1Size}rem;
  }

  h2 {
    font-size: ${h2Size}rem;
    line-height: ${lineHeightForFontRem(h2Size)}rem;
    margin-bottom: 0;
  }

  h3 {
    font-size: ${h3Size}rem;
    line-height: ${lineHeightForFontRem(h3Size)}rem;
    text-align: center;
    margin-top: ${linesRem(1)};
    margin-bottom: ${linesRem(0.5)};
    &:first-child {
      margin-top: 0;
    }
  }

  h4 {
    font-size: ${h4Size}rem;
    line-height: ${lineHeightForFontRem(h4Size)}rem;
  }

  h5 {
    font-size: ${h5Size}rem;
    line-height: ${lineHeightForFontRem(h5Size)}rem;
    margin-bottom: ${linesRem(0.5)};
  }

  h6 {
    font-family: ${bodyFontFamilyString};
    font-size: ${h6Size}rem;
    line-height: ${lineHeightForFontRem(h6Size)}rem;
    margin-bottom: ${linesRem(0.5)};
    font-style: italic;
    color: #777;
  }

  p {
    font-weight: ${bodyWeight};
    hyphens: auto;
    text-align: justify;
  }

  p *:last-child {
    margin-bottom: 0;
  }

  pre, .stih {
    line-height: ${baseLineHeight};
    font-family: ${bodyFontFamilyString};
    font-style: italic;
    text-align: center;
    @media (max-width: 460px) {
      font-size: 0.8rem;
    }
  }

  blockquote {
    border-left: 5px solid #ddd;
    padding-left: ${linesRem(0.75)};
    margin-block-start:0;
    margin-block-end: ${linesRem(1)};
    margin-inline-start: 0;
    margin-inline-end: 0;
    font-style: italic;
    color: #484848;
  }

  blockquote *:last-child {
    margin-bottom: 0;
  }

  hr {
    margin-bottom: calc(${linesRem(1)} - 1px);
    background: ${bodyColor};
    border: none;
    height: 1px;
  }

  b {
    font-weight: ${boldWeight};
  }

  small {
    font-size: .7em;
  }

  strong {
    font-weight: ${boldWeight};
  }

  footer p {
    color: rgba(255, 255, 255, 0.75);
    font-size: 11px;
    text-align: center;
    margin-bottom: 30px;
    font-style: italic;
  }
`

/**
  a {
    color: ${linkColor};
    text-decoration: none;
  }

  a:link {
    color: hsl(270, 88%, 64%);
    text-shadow: none;
  }

  a:visited {
    color: ${visitedColor};
    text-shadow: none;
  }

  a:active {
    color: ${activeColor};
    text-shadow: none;
  }

  a:hover {
    color: ${hoverColor};
    text-shadow: none;
  } 
 */