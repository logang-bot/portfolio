import { useEffect, useRef } from 'react'
import styles from './BackgroundPattern.module.css'

// Add your icon imports here, e.g.:
// import kotlinIcon from '../assets/icons/kotlin.svg'
// import reactIcon from '../assets/icons/react.svg'

const PARALLAX_FACTOR = 0.15

// Replace these placeholder strings with your imported icons
const icons: string[] = [
  // kotlinIcon,
  // reactIcon,
  // swiftIcon,
  // dockerIcon,
  // ...
]

export default function BackgroundPattern() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (ref.current) {
          const y = window.scrollY * PARALLAX_FACTOR
          ref.current.style.transform = `translateY(-${y}px)`
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div ref={ref} className={styles.pattern}>
        {/* Grid rendered via CSS background */}
        {icons.length > 0 && (
          <div className={styles.icons}>
            {icons.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className={styles.icon}
                style={{
                  top: `${110 + (i * 320) % 1600}px`,
                  left: `${80 + ((i * 470 + 130) % 90)}%`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
