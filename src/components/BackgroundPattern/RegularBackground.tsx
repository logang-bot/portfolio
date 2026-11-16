import type { CSSProperties } from 'react'
import styles from './RegularBackground.module.css'
import BackgroundFrame from './BackgroundFrame'
import ParallaxLayer from './ParallaxLayer'
import { TECH_LOGOS } from '../../data/backgroundIcons'
import type { LayerItem, LayerSpec } from './types'

const LOGO_LAYER: LayerSpec = { speed: 0.15, cellSize: 140, fillRatio: 0.18 }
const GRID_STYLE = { '--cell': `${LOGO_LAYER.cellSize}px` } as CSSProperties

export default function RegularBackground() {
  return (
    <BackgroundFrame>
      <ParallaxLayer
        spec={LOGO_LAYER}
        className={styles.pattern}
        style={GRID_STYLE}
        renderItem={renderLogo}
      />
    </BackgroundFrame>
  )
}

function renderLogo(item: LayerItem) {
  const logo = TECH_LOGOS[Math.floor(item.rand(1) * TECH_LOGOS.length)]
  return <img src={logo} alt="" className={styles.icon} />
}
