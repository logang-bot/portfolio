import { useRef, type CSSProperties } from 'react'
import styles from './PulpFictionBackground.module.css'
import BackgroundFrame from './BackgroundFrame'
import ParallaxLayer from './ParallaxLayer'
import PrintLogo from '../PrintLogo'
import PropSticker from '../PropSticker'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useScrollFrame } from '../../hooks/useScrollFrame'
import { PF_PROPS, TECH_LOGOS } from '../../data/backgroundIcons'
import { pageScrollProgress, rangeProgress } from '../../utils/scrollProgress'
import briefcaseImage from '../../assets/images/pulp-fiction/pf_background-2.webp'
import type { LayerItem, LayerSpec } from './types'

const LOGO_LAYER: LayerSpec = { speed: 0.15, cellSize: 140, fillRatio: 0.18 }
const PROP_LAYER: LayerSpec = { speed: 0.25, cellSize: 220, fillRatio: 0.25 }
const FAR_STYLE = { '--layer-opacity': 'var(--bg-far-opacity)' } as CSSProperties
const NEAR_STYLE = { '--layer-opacity': 'var(--bg-near-opacity)' } as CSSProperties
const BRIEFCASE_SLIDE_START = 0.9
const BRIEFCASE_SLIDE_END = 1
const MAX_TILT_DEG = 16

export default function PulpFictionBackground() {
  const reducedMotion = usePrefersReducedMotion()
  const briefcaseRef = useRef<HTMLDivElement>(null)

  useScrollFrame(() => {
    if (!briefcaseRef.current) return
    const slide = rangeProgress(pageScrollProgress(), BRIEFCASE_SLIDE_START, BRIEFCASE_SLIDE_END)
    briefcaseRef.current.style.transform = `translateY(${briefcaseOffset(slide, reducedMotion)}px)`
  })

  return (
    <BackgroundFrame className={styles.halftone}>
      <ParallaxLayer spec={LOGO_LAYER} style={FAR_STYLE} renderItem={renderLogo} />
      <ParallaxLayer spec={PROP_LAYER} style={NEAR_STYLE} renderItem={renderProp} />
      <div
        ref={briefcaseRef}
        className={styles.briefcase}
        style={{ backgroundImage: `url(${briefcaseImage})` }}
      />
    </BackgroundFrame>
  )
}

function briefcaseOffset(slide: number, reducedMotion: boolean): number {
  if (reducedMotion) return slide > 0 ? 0 : window.innerHeight
  return (1 - slide) * window.innerHeight
}

function renderLogo(item: LayerItem) {
  const logo = TECH_LOGOS[Math.floor(item.rand(1) * TECH_LOGOS.length)]
  return (
    <span className={styles.logoSlot}>
      <PrintLogo src={logo} tilt={tilt(item)} />
    </span>
  )
}

function renderProp(item: LayerItem) {
  const icon = PF_PROPS[Math.floor(item.rand(1) * PF_PROPS.length)]
  return <PropSticker icon={icon} tilt={tilt(item)} />
}

function tilt(item: LayerItem): number {
  return (item.rand(3) - 0.5) * MAX_TILT_DEG
}
