import styles from './ParallaxLayer.module.css'
import type { BackgroundFrameProps } from './types'

export default function BackgroundFrame({ children, className }: BackgroundFrameProps) {
  return (
    <div className={`${styles.frame} ${className ?? ''}`} aria-hidden="true">
      {children}
    </div>
  )
}
