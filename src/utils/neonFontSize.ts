const NEON_FONT_SCALE = [16, 18, 20, 24]
const MAX_WORD_PX = 130
const CHAR_EM = 0.78

/**
 * Picks a type-scale size for a sign, capped so its longest word stays about
 * MAX_WORD_PX wide (bold italic caps ≈ CHAR_EM em per character), then snapped
 * down to the largest scale step that fits.
 */
export function neonFontSize(text: string, rand: number): number {
  const longestWord = Math.max(...text.split(/\s+/).map((word) => word.length))
  const fit = MAX_WORD_PX / (longestWord * CHAR_EM)
  const wanted = Math.min(NEON_FONT_SCALE[Math.floor(rand * NEON_FONT_SCALE.length)], fit)
  return NEON_FONT_SCALE.filter((size) => size <= wanted).at(-1) ?? NEON_FONT_SCALE[0]
}
