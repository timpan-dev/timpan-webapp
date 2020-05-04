import { createGlobalStyle } from 'styled-components'
import {
  pageWidth,
  contentWidth,
  linesRem,
  primaryColor,
  secondaryColor
} from '~/utils/styling'

export default createGlobalStyle`

  .fixed-width-page {
    max-width: ${pageWidth}px;
    margin: auto;
  }

  .fixed-width-main {
    max-width: ${contentWidth}px;
    margin: auto;
  }

  .mb-1 {
    margin-bottom: ${linesRem(0.5)};
  }

  .mb-2 {
    margin-bottom: ${linesRem(1)};
  }

  .mb-3 {
    margin-bottom: ${linesRem(1.5)};
  }

  .mb-4 {
    margin-bottom: ${linesRem(2)};
  }

  .mb-5 {
    margin-bottom: ${linesRem(2.5)};
  }

  .mt-1 {
    margin-top: ${linesRem(1)};
  }

  .primary-color {
    color: ${primaryColor}
  }

  .secondary-color {
    color: ${secondaryColor}
  }
`