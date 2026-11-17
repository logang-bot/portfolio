import { useRef } from 'react'
import styles from './NavMarker.module.css'
import type { NavMarkerProps } from './types'
import { useMarkerPosition } from './useMarkerPosition'

export default function NavMarker({ targetId, arrival, containerRef }: NavMarkerProps) {
  const markerRef = useRef<HTMLSpanElement>(null)
  useMarkerPosition({ targetId, containerRef, markerRef })

  return (
    <span
      ref={markerRef}
      className={`${styles.marker} ${targetId ? styles.visible : ''}`}
      aria-hidden="true"
    >
      <span key={arrival} className={`${styles.inner} ${arrival > 0 ? styles.arrived : ''}`} />
    </span>
  )
}
