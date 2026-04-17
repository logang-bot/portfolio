import { useEffect, useRef, useState } from 'react'
import styles from './GlowBackground.module.css'

export type GlowVariant = 'purple' | 'green'

interface Props {
  variant: GlowVariant
}

export default function GlowBackground({ variant }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`${styles.glow} ${visible ? styles.visible : ''}`}>
      <div className={`${styles.blob} ${styles[`${variant}1`]}`} />
      <div className={`${styles.blob} ${styles[`${variant}2`]}`} />
      <div className={`${styles.blob} ${styles[`${variant}3`]}`} />
    </div>
  )
}
