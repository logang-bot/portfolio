import type { CSSProperties } from 'react'
import styles from './NeonLogo.module.css'
import type { NeonLogoProps } from './types'

export default function NeonLogo({ src, color }: NeonLogoProps) {
  const glowStyle = { '--neon-color': color } as CSSProperties
  const mask = `url("${src}")`
  const shapeStyle = { maskImage: mask, WebkitMaskImage: mask }
  return (
    <span className={styles.glow} style={glowStyle}>
      <span className={styles.shape} style={shapeStyle} />
    </span>
  )
}
