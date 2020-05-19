import { createGlobalStyle } from 'styled-components'
import socialFontEot from '~/assets/fonts/social.eot'
import socialFontWoff from '~/assets/fonts/social.woff'
import socialFontTtf from '~/assets/fonts/social.ttf'
import socialFontSvg from '~/assets/fonts/social.svg'

import playerFontEot from '~/assets/fonts/player.eot'
import playerFontWoff from '~/assets/fonts/player.woff'
import playerFontTtf from '~/assets/fonts/player.ttf'
import playerFontSvg from '~/assets/fonts/player.svg'

export default createGlobalStyle`
  @font-face {
    font-family: 'social';
    src:  url(${socialFontEot});
    src:  url(${socialFontEot}) format('embedded-opentype'),
      url(${socialFontTtf}) format('truetype'),
      url(${socialFontWoff}) format('woff'),
      url(${socialFontSvg}) format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: 'player';
    src:  url(${playerFontEot});
    src:  url(${playerFontEot}) format('embedded-opentype'),
      url(${playerFontTtf}) format('truetype'),
      url(${playerFontWoff}) format('woff'),
      url(${playerFontSvg}) format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

  [class^="icon-soc-"], [class*=" icon-soc-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'social' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-soc-facebook:before {
    content: "\f09a";
  }
  .icon-soc-facebook-f:before {
    content: "\f09a";
  }
  .icon-soc-youtube:before {
    content: "\f167";
  }
  .icon-soc-instagram:before {
    content: "\f16d";
  }
  .icon-soc-vk:before {
    content: "\f189";
  }

  [class^="icon-player-"], [class*=" icon-player-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'player' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-player-pause:before {
    content: "\\e902";
  }
  .icon-player-play:before {
    content: "\\e903";
  }
  .icon-player-prev:before {
    content: "\\e900";
  }
  .icon-player-next:before {
    content: "\\e901";
  }
`
