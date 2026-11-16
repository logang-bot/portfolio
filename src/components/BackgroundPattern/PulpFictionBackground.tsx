import { useRef } from 'react'
import styles from './PulpFictionBackground.module.css'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useScrollFrame } from '../../hooks/useScrollFrame'
import { pageScrollProgress, parallaxTransform, rangeProgress } from '../../utils/scrollProgress'
import pfBg1 from '../../assets/images/pulp-fiction/pf_background-1.webp'
import pfBg2 from '../../assets/images/pulp-fiction/pf_background-2.webp'

const PARALLAX_FACTOR = 0.15
const PF_SLIDE_START = 0.9
const PF_SLIDE_END = 1

export default function PulpFictionBackground() {
  const reducedMotion = usePrefersReducedMotion()
  const parallaxRef = useRef<HTMLDivElement>(null)
  const briefcaseRef = useRef<HTMLDivElement>(null)

  useScrollFrame(() => {
    if (parallaxRef.current) {
      parallaxRef.current.style.transform = reducedMotion ? 'none' : parallaxTransform(PARALLAX_FACTOR)
    }
    if (!briefcaseRef.current) return
    const slide = rangeProgress(pageScrollProgress(), PF_SLIDE_START, PF_SLIDE_END)
    briefcaseRef.current.style.transform = `translateY(${briefcaseOffset(slide, reducedMotion)}px)`
  })

  return (
    <div className={styles.pfWrapper}>
      <div
        ref={parallaxRef}
        className={`${styles.pfImage} ${styles.pfImageParallax} ${styles.pfImageBlur}`}
        style={{ backgroundImage: `url(${pfBg1})` }}
      />
      <div
        ref={briefcaseRef}
        className={`${styles.pfImage} ${styles.pfImageContain}`}
        style={{ backgroundImage: `url(${pfBg2})` }}
      />
    </div>
  )
}

function briefcaseOffset(slide: number, reducedMotion: boolean): number {
  if (reducedMotion) return slide > 0 ? 0 : window.innerHeight
  return (1 - slide) * window.innerHeight
}
