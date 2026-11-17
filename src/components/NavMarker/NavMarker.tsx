import { useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import Reticle from './Reticle'
import pulpFiction from './NavMarkerPulpFiction.module.css'
import bladeRunner from './NavMarkerBladeRunner.module.css'
import styles from './NavMarker.module.css'
import type { NavMarkerProps } from './types'
import { useMarkerPosition } from './useMarkerPosition'

export default function NavMarker({ targetId, arrival, containerRef }: NavMarkerProps) {
  const { theme } = useTheme()
  const markerRef = useRef<HTMLSpanElement>(null)
  const arrived = arrival > 0
  useMarkerPosition({ targetId, containerRef, markerRef })

  return (
    <span
      ref={markerRef}
      className={`${styles.marker} ${targetId ? styles.visible : ''}`}
      aria-hidden="true"
    >
      <span key={arrival} className={styles.inner}>
        {theme === 'pulp-fiction' && (
          <span className={arrived ? pulpFiction.lockOn : undefined}>
            <Reticle />
          </span>
        )}
        {theme === 'blade-runner' && (
          <span className={`${bladeRunner.lamp} ${arrived ? bladeRunner.powerOn : ''}`}>
            <span className={bladeRunner.tube} />
          </span>
        )}
      </span>
    </span>
  )
}
