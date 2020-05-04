import config from "~/config"
import { parseToHsl, hslToColorString } from "polished"

import {
  TypographyScale,
  floatToMinimalSting,
  wrapFontFamily
} from "./typography"

const cfg = config.style
const ts = new TypographyScale(cfg)

const primaryHsl = parseToHsl(cfg.primaryColor)
const secondaryHsl = parseToHsl(cfg.secondaryColor)
const bodyHsl = parseToHsl(cfg.bodyColor)
const headerHsl = parseToHsl(cfg.headerColor)

export const primaryColor = hslToColorString(primaryHsl)
export const secondaryColor = hslToColorString(secondaryHsl)
export const headerColor = hslToColorString(headerHsl)
export const bodyColor = hslToColorString(bodyHsl)

export function rem(n: number) {
  return floatToMinimalSting(n) + "rem"
}

export function pix(n: number) {
  return n + "px"
}

export const headerFontFamilyString = cfg.headerFontFamily
  .map(wrapFontFamily)
  .join(",")
export const bodyFontFamilyString = cfg.bodyFontFamily
  .map(wrapFontFamily)
  .join(",")

export const pix2rem = ts.rem.bind(ts)
export const getLinesHeightInRem = ts.getLinesHeightInRem.bind(ts)
export const getLinesHeightInPix = ts.getLinesHeightInPix.bind(ts)
export const scaleInRem = ts.scaleInRem.bind(ts)
export const scaleInPix = ts.scaleInPix.bind(ts)
export const lineHeightForFontRem = ts.lineHeightForFontRem.bind(ts)
export const lineHeightForFontPix = ts.lineHeightForFontPix.bind(ts)

export const linesRem = (n: number) => rem(getLinesHeightInRem(n))
export const linesPix = (n: number) => pix(getLinesHeightInPix(n))

export const baseFontSize = ts.baseFontSize

export const baseLineHeight = ts.lineHeightInPix / baseFontSize
export const lineHeightInRem = ts.lineHeightInRem
export const lineHeightInPix = ts.lineHeightInPix

export const headerWeight = cfg.headerWeight.toString()
export const bodyWeight = cfg.bodyWeight.toString()
export const boldWeight = cfg.boldWeight.toString()

export const contentWidth = cfg.contentWidth
export const sidebarWidth = cfg.sidebarWidth
export const gapWidth = cfg.gapWidth
export const pageWidth = contentWidth + sidebarWidth + gapWidth
export const contentHeight16x9 = (contentWidth / 16) * 9
export const contentHeight4x3 = (contentWidth / 4) * 3
export const pageHeight16x9 = (pageWidth / 16) * 9
export const pageHeight4x3 = (pageWidth / 4) * 3
export const appBarHeight = cfg.appBarHeight
