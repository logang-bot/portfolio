import { useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import pulpFiction from './NavMarkerPulpFiction.module.css'
import bladeRunner from './NavMarkerBladeRunner.module.css'
import styles from './NavMarker.module.css'
import type { NavMarkerProps } from './types'
import { useMarkerPosition } from './useMarkerPosition'

export default function NavMarker({ target, arrival, variant = 'links' }: NavMarkerProps) {
  const { theme } = useTheme()
  const markerRef = useRef<HTMLSpanElement>(null)
  const arrived = arrival > 0
  const themed = variant === 'links'
  useMarkerPosition({ target, markerRef })

  return (
    <span
      ref={markerRef}
      className={`${styles.marker} ${styles[variant]} ${target ? styles.visible : ''}`}
      aria-hidden="true"
    >
      <span key={arrival} className={styles.inner}>
        {themed && theme === 'pulp-fiction' && (
          <span className={`${pulpFiction.sight} ${arrived ? pulpFiction.lockOn : ''}`}>
            <span className={pulpFiction.ring} />
          </span>
        )}
        {themed && theme === 'blade-runner' && (
          <span className={`${bladeRunner.lamp} ${arrived ? bladeRunner.powerOn : ''}`}>
            <span className={bladeRunner.tube} />
          </span>
        )}
      </span>
    </span>
  )
}
