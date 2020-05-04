import googleFonts from '../config/googleFonts.json'

export const createGoogleFontLink = (fonts, subsets, display) => {
  const families = fonts
    .reduce((acc, font) => {
      const family = font.font.replace(/ +/g, '+')
      const weights = (font.weights || []).join(',')

      return [...acc, family + (weights && `:${weights}`)]
    }, [])
    .join('|')

  let link = `https://fonts.googleapis.com/css?family=${families}`

  if (subsets && Array.isArray(subsets) && subsets.length > 0) {
    link += `&subset=${subsets.join(',')}`
  }

  if (display) {
    link += `&display=${display}`
  }

  return link
}

const googleFontLink = createGoogleFontLink(
  googleFonts.fonts,
  googleFonts.subsets,
  googleFonts.display
)

export default googleFontLink
