import { useRef, useState, type CSSProperties } from 'react'
import styles from './BladeRunnerBackground.module.css'
import BackgroundFrame from './BackgroundFrame'
import ParallaxLayer from './ParallaxLayer'
import NeonLogo from '../NeonLogo'
import NeonSign from '../NeonSign'
import { useLanguage } from '../../context/LanguageContext'
import { useScrollFrame } from '../../hooks/useScrollFrame'
import { TECH_LOGOS } from '../../data/backgroundIcons'
import { neonFontSize } from '../../utils/neonFontSize'
import { rightEdgeGap } from '../../utils/signPlacement'
import { shuffledIndices } from '../../utils/shuffledIndices'
import { pageScrollProgress, rangeProgress } from '../../utils/scrollProgress'
import hologram from '../../assets/images/blade-runner/br2049-background-2.webp'
import type { LayerItem, LayerSpec } from './types'

const LOGO_LAYER: LayerSpec = { speed: 0.15, cellSize: 140, fillRatio: 0.18, glowMargin: 16 }
const SIGN_LAYER: LayerSpec = { speed: 0.25, cellSize: 280, fillRatio: 0.35, glowMargin: 24 }
const FAR_STYLE = { '--layer-opacity': 'var(--bg-far-opacity)' } as CSSProperties
const NEAR_STYLE = { '--layer-opacity': 'var(--bg-near-opacity)' } as CSSProperties
const HOLOGRAM_FADE_START = 0.85
const HOLOGRAM_FADE_END = 0.95
const NEON_COLOR_COUNT = 4

export default function BladeRunnerBackground() {
  const { t } = useLanguage()
  const [order] = useState(() => shuffledIndices(t.nav.egg.neonSigns.length))
  const hologramRef = useRef<HTMLDivElement>(null)
  const signs = order.map((i) => t.nav.egg.neonSigns[i])

  useScrollFrame(() => {
    if (!hologramRef.current) return
    const fade = rangeProgress(pageScrollProgress(), HOLOGRAM_FADE_START, HOLOGRAM_FADE_END)
    hologramRef.current.style.opacity = String(fade)
  })

  return (
    <BackgroundFrame>
      <div
        ref={hologramRef}
        className={styles.hologram}
        style={{ backgroundImage: `url(${hologram})` }}
      />
      <ParallaxLayer spec={LOGO_LAYER} style={FAR_STYLE} renderItem={renderLogo} />
      <ParallaxLayer
        spec={SIGN_LAYER}
        style={NEAR_STYLE}
        renderItem={(item) => renderSign(item, signs)}
      />
    </BackgroundFrame>
  )
}

function renderLogo(item: LayerItem) {
  const logo = TECH_LOGOS[Math.floor(item.rand(1) * TECH_LOGOS.length)]
  return (
    <span className={styles.logoSlot}>
      <NeonLogo src={logo} color={neonColor(item.rand(2))} />
    </span>
  )
}

function renderSign(item: LayerItem, signs: string[]) {
  const text = signs[item.index % signs.length]
  const viewportWidth = document.documentElement.clientWidth
  const isLeft = item.x + SIGN_LAYER.cellSize / 2 < viewportWidth / 2
  return (
    <NeonSign
      text={text}
      color={neonColor(item.rand(2))}
      fontSize={neonFontSize(text, item.rand(4))}
      tilt={(item.rand(3) - 0.5) * 6}
      mount={isLeft ? 'left' : 'right'}
      edgeGap={isLeft ? 0 : rightEdgeGap({ x: item.x, cellSize: SIGN_LAYER.cellSize, viewportWidth })}
    />
  )
}

function neonColor(rand: number): string {
  return `var(--neon-${1 + Math.floor(rand * NEON_COLOR_COUNT)})`
}
