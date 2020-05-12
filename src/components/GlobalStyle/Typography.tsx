import { createGlobalStyle } from 'styled-components'
import {
  headerFontFamily,
  headerWeight,
  lineHeightForFontRem,
  bodyWeight,
  baseLineHeight,
  bodyFontFamily,
  linesRem,
  bodyColor,
  boldWeight,
  linkColor,
  h1Size,
  h2Size,
  h3Size,
  h4Size,
  h5Size,
  h6Size,
} from '~/utils/styling'

export default createGlobalStyle`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 ${linesRem(1)};
    color: inherit;
    font-family: ${headerFontFamily};
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
    font-family: ${bodyFontFamily};
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
    font-family: ${bodyFontFamily};
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

  a {
    color: ${linkColor.link};
    text-decoration: none;

    &:visited {
      color: ${linkColor.visited};
    }

    &:active {
      color: ${linkColor.active};
    }

    &:hover {
      color: ${linkColor.hover};
    } 
  }

  
`