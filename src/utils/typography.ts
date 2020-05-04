export interface ITypographyConfig {
  baseFontSize?: number
  baseLineHeight?: number
  scaleRatio?: number
  multiplicity?: number
  roundToNearestHalfLine?: boolean
  minLinePadding?: number
  outputInRem?: boolean
}

export function roundToMultiplicity(num: number, mul: number): number {
  return num + (num % mul)
}

export function modularScale(steps: number, base: number, ratio: number) {
  return base * ratio ** steps
}

export function floatToMinimalSting(
  f: number,
  fractionDigits: number = 4
): string {
  const s1 = f.toString()
  const s2 = f.toFixed(fractionDigits)
  return s1.length < s2.length ? s1 : s2
}

export const genericFontFamilies = [
  "inherit",
  "default",
  "serif",
  "sans-serif",
  "monospace",
  "fantasy",
  "cursive",
  "-apple-system"
]

export function wrapFontFamily(fontFamily: string) {
  return genericFontFamilies.indexOf(fontFamily) !== -1
    ? fontFamily
    : `'${fontFamily}'`
}

export class TypographyScale {
  readonly baseFontSize: number = 16
  readonly baseLineHeight: number = 1.5
  readonly scaleRatio: number = 2
  readonly multiplicity: number = 4
  readonly roundToNearestHalfLine: boolean = true
  readonly minLinePadding: number = 2

  constructor(cfg: ITypographyConfig = {}) {
    this.baseFontSize = cfg.baseFontSize || this.baseFontSize
    this.baseLineHeight = cfg.baseLineHeight || this.baseFontSize
    this.scaleRatio = cfg.scaleRatio || this.scaleRatio
    this.multiplicity = cfg.multiplicity || this.multiplicity
    this.roundToNearestHalfLine =
      cfg.roundToNearestHalfLine || this.roundToNearestHalfLine
    this.minLinePadding = cfg.minLinePadding || this.minLinePadding
  }

  public get lineHeightInPix() {
    return roundToMultiplicity(
      this.baseFontSize * this.baseLineHeight,
      this.multiplicity
    )
  }

  public get lineHeightInRem() {
    return this.lineHeightInPix / this.baseFontSize
  }

  public rem(sizeInPix: number): number {
    return sizeInPix / this.baseFontSize
  }

  public getLinesHeightInPix(lines: number): number {
    if (!lines) lines = 1
    return lines * this.lineHeightInPix
  }

  public getLinesHeightInRem(lines: number): number {
    return this.rem(this.getLinesHeightInPix(lines))
  }

  public scaleInPix(value: number): number {
    const fontSize = modularScale(value, this.baseFontSize, this.scaleRatio)
    return fontSize
  }

  public scaleInRem(value: number): number {
    return this.rem(this.scaleInPix(value))
  }

  public lineHeightForFontPix(fontSizeInPix: number): number {
    const lines = this._linesForFontSize(fontSizeInPix, this.lineHeightInPix)
    return this.getLinesHeightInPix(lines)
  }

  public lineHeightForFontRem(fontSizeInRem: number): number {
    const lines = this._linesForFontSize(
      fontSizeInRem * this.baseFontSize,
      this.lineHeightInPix
    )
    return this.getLinesHeightInRem(lines)
  }

  protected _linesForFontSize(fontSizeInPix: number, lineHeightInPix: number) {
    const { roundToNearestHalfLine, minLinePadding } = this
    let lines = roundToNearestHalfLine
      ? Math.ceil((2 * fontSizeInPix) / lineHeightInPix) / 2
      : Math.ceil(fontSizeInPix / lineHeightInPix)

    if (lines * lineHeightInPix - fontSizeInPix < minLinePadding * 2) {
      lines += roundToNearestHalfLine ? 0.5 : 1
    }

    return lines
  }
}
