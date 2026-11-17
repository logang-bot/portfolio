export interface EngineHints {
  userAgent: string
  userAgentData?: { brands: { brand: string }[] }
}

export type GlassMode = 'lens' | 'frost'

export function isChromiumEngine(nav: EngineHints): boolean {
  if (nav.userAgentData?.brands.some(({ brand }) => brand === 'Chromium')) return true
  return nav.userAgent.includes('Chrome/') && !nav.userAgent.includes('Firefox')
}

export function glassMode(nav: EngineHints): GlassMode {
  return isChromiumEngine(nav) ? 'lens' : 'frost'
}
