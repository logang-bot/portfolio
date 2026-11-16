import { useEffect, useRef, useState, type CSSProperties } from 'react'
import styles from './NeonSign.module.css'
import { observeOnce } from '../../hooks/observeOnce'
import type { NeonSignProps } from './types'

export default function NeonSign({ text, color, fontSize, tilt, mount }: NeonSignProps) {
  const signRef = useRef<HTMLSpanElement>(null)
  const [lit, setLit] = useState(false)

  useEffect(() => {
    if (!signRef.current) return
    return observeOnce(signRef.current, () => setLit(true))
  }, [])

  const mountClass = mount === 'left' ? styles.mountLeft : styles.mountRight
  const style = { fontSize, '--neon-color': color, '--neon-rot': `${tilt}deg` } as CSSProperties
  return (
    <span
      ref={signRef}
      className={`${styles.sign} ${mountClass} ${lit ? styles.lit : ''}`}
      style={style}
    >
      {text}
    </span>
  )
}
