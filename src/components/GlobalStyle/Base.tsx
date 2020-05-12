import { createGlobalStyle } from 'styled-components'
import {
  baseFontSize,
  baseLineHeight,
  bodyColor,
  bodyFontFamily,
  bodyWeight,
} from '~/utils/styling'

export default createGlobalStyle`
  html {
    font: ${(baseFontSize / 16) * 100}% / ${baseLineHeight} ${bodyFontFamily};
    box-sizing: border-box;
    overflow-y: "scroll";
    padding: 0;
    margin: 0;
    min-height: 100%;
    z-index: -100;
  }

  body {
    position: relative;
    z-index: -99;
    color: ${bodyColor};
    font-family: ${bodyFontFamily};
    font-weight: ${bodyWeight};
    word-wrap: break-word;
    font-kerning: normal;
    font-feature-settings: "kern", "liga", "clig", "calt";
    padding: 0;
    margin: 0;
    min-height: 100%;
    min-width: 320px;
    background: #852020;
  }

  * {
    box-sizing: inherit;
  }

  *:before {
    box-sizing: inherit;
  }

  *:after {
    box-sizing: inherit;
  }
  
  *:focus {
    outline: none;
  }
`
