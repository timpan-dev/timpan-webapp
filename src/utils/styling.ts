import config from "~/config"
import chroma from 'chroma-js'

import {
  TypographyScale,
  floatToMinimalSting,
  wrapFontFamily
} from "./typography"

const cfg = config.style
const ts = new TypographyScale(cfg)

export const primaryColor   = cfg.primaryColor
export const secondaryColor = cfg.secondaryColor
export const headerColor    = cfg.bodyColor
export const bodyColor      = cfg.headerColor

export const linkColor      = {
  link:    chroma(cfg.linkColor).hex(),
  hover:   chroma(cfg.linkColor).brighten(1).hex(),
  active:  chroma(cfg.linkColor).darken(1).hex(),
  visited: chroma(cfg.linkColor).desaturate(1).hex(),
}

/** METHODS */

export const pix2rem              = ts.rem.bind(ts)
export const getLinesHeightInRem  = ts.getLinesHeightInRem.bind(ts)
export const getLinesHeightInPix  = ts.getLinesHeightInPix.bind(ts)
export const scaleInRem           = ts.scaleInRem.bind(ts)
export const scaleInPix           = ts.scaleInPix.bind(ts)
export const lineHeightForFontRem = ts.lineHeightForFontRem.bind(ts)
export const lineHeightForFontPix = ts.lineHeightForFontPix.bind(ts)

export const rem = (n: number) => floatToMinimalSting(n) + 'rem'
export const pix = (n: number) => n + 'px'

export const linesRem = (n: number) => rem(getLinesHeightInRem(n))
export const linesPix = (n: number) => pix(getLinesHeightInPix(n))

export const brighten = (c: string, v: number = 1) => chroma(c).brighten(v).hex()
export const darken   = (c: string, v: number = 1) => chroma(c).darken(v).hex()

/** CONSTS */

export const baseFontSize      = ts.baseFontSize

export const baseLineHeight    = ts.lineHeightInPix / baseFontSize
export const lineHeightInRem   = ts.lineHeightInRem
export const lineHeightInPix   = ts.lineHeightInPix

export const headerWeight      = cfg.headerWeight.toString()
export const bodyWeight        = cfg.bodyWeight.toString()
export const boldWeight        = cfg.boldWeight.toString()

export const headerFontFamily  = cfg.headerFontFamily.map(wrapFontFamily).join(",")
export const bodyFontFamily    = cfg.bodyFontFamily.map(wrapFontFamily).join(",")

export const contentWidth      = cfg.contentWidth
export const sidebarWidth      = cfg.sidebarWidth
export const gapWidth          = cfg.gapWidth
export const pageWidth         = contentWidth + sidebarWidth + gapWidth
export const contentHeight16x9 = (contentWidth / 16) * 9
export const contentHeight4x3  = (contentWidth / 4) * 3
export const pageHeight16x9    = (pageWidth / 16) * 9
export const pageHeight4x3     = (pageWidth / 4) * 3
export const appBarHeight      = cfg.appBarHeight
export const navBarWidth       = cfg.navBarWidth

export const h1Size            = scaleInRem(5 / 5)
export const h2Size            = scaleInRem(3 / 5)
export const h3Size            = scaleInRem(2 / 5)
export const h4Size            = scaleInRem(0 / 5)
export const h5Size            = scaleInRem(-1 / 5)
export const h6Size            = scaleInRem(-1.5 / 5)
