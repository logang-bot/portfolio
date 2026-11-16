import { useRef, useState } from 'react'
import styles from './BladeRunnerBackground.module.css'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useScrollFrame } from '../../hooks/useScrollFrame'
import { pageScrollProgress, parallaxTransform, rangeProgress } from '../../utils/scrollProgress'
import brBg1 from '../../assets/images/blade-runner/br2049-background-1.webp'
import brBg2 from '../../assets/images/blade-runner/br2049-background-2.webp'

const PARALLAX_FACTOR = 0.15
const BR_FADE_START = 0.85
const BR_FADE_END = 0.95

export default function BladeRunnerBackground() {
  const reducedMotion = usePrefersReducedMotion()
  const parallaxRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useScrollFrame(() => {
    setScrollProgress(pageScrollProgress())
    if (!parallaxRef.current) return
    parallaxRef.current.style.transform = reducedMotion ? 'none' : parallaxTransform(PARALLAX_FACTOR)
  })

  return (
    <div className={styles.brWrapper}>
      <div
        ref={parallaxRef}
        className={`${styles.brImage} ${styles.brImageParallax}`}
        style={{ backgroundImage: `url(${brBg1})` }}
      />
      <div
        className={styles.brImage}
        style={{
          backgroundImage: `url(${brBg2})`,
          opacity: rangeProgress(scrollProgress, BR_FADE_START, BR_FADE_END),
        }}
      />
    </div>
  )
}
