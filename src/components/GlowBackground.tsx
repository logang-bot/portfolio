import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './GlowBackground.module.css'
import { useTheme } from '../context/ThemeContext'
import bulletHole from '../assets/images/bullet-hole.png'

export type GlowVariant = 'purple' | 'green'

interface Props {
  variant: GlowVariant
}

interface Hole {
  top: number
  left: number
  size: number
  rotation: number
  delay: number
}

interface Neon {
  text: string
  top: number
  left: number
  color: string
  fontSize: number
  rotation: number
  delay: number
  mount: 'left' | 'right'
}

const HOLE_COUNT = 6

const NEON_TEXTS = [
  'Projects here',
  'Need a developer? I can fix that',
  'More human than human',
  'Within cells interlinked',
  'Wake up',
  'Like tears in rain',
  'Born, not made',
  'A world built on a wall',
  'Off-world colonies',
  'Los Angeles 2049',
]

const NEON_COLORS = ['#ff36a0', '#00eaff', '#ff7a18', '#ffd166']
const NEON_COUNT = 4

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function generateHoles(): Hole[] {
  const holes: Hole[] = Array.from({ length: HOLE_COUNT }, () => ({
    top: 5 + Math.random() * 80,
    left: 5 + Math.random() * 80,
    size: 70 + Math.random() * 70,
    rotation: Math.random() * 360,
    delay: 0,
  }))
  const delays = shuffle(
    Array.from({ length: HOLE_COUNT }, (_, i) => i * 180 + Math.random() * 80),
  )
  return holes.map((h, i) => ({ ...h, delay: delays[i] }))
}

function generateNeons(): Neon[] {
  const texts = shuffle(NEON_TEXTS).slice(0, NEON_COUNT)
  return texts.map((text, i) => ({
    text,
    top: 15 + Math.random() * 70,
    left: 20 + Math.random() * 60,
    color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
    fontSize: 20 + Math.random() * 14,
    rotation: (Math.random() - 0.5) * 6,
    delay: i * 220 + Math.random() * 120,
    mount: Math.random() < 0.5 ? 'left' : 'right',
  }))
}

export default function GlowBackground({ variant }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const { theme } = useTheme()
  const holes = useMemo(generateHoles, [])
  const neons = useMemo(generateNeons, [])

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

  const isPulp = theme === 'pulp-fiction'
  const isBlade = theme === 'blade-runner'

  return (
    <div ref={ref} className={`${styles.glow} ${visible ? styles.visible : ''}`}>
      {isPulp &&
        holes.map((h, i) => (
          <span
            key={i}
            className={styles.bulletHole}
            style={
              {
                top: `${h.top}%`,
                left: `${h.left}%`,
                '--hole-size': `${h.size}px`,
                '--hole-rot': `${h.rotation}deg`,
                '--hole-img': `url(${bulletHole})`,
                animationDelay: `${h.delay}ms`,
              } as React.CSSProperties
            }
          />
        ))}
      {isBlade &&
        neons.map((n, i) => (
          <span
            key={i}
            className={`${styles.neonSign} ${n.mount === 'left' ? styles.mountLeft : styles.mountRight}`}
            style={
              {
                top: `${n.top}%`,
                left: `${n.left}%`,
                fontSize: `${n.fontSize}px`,
                '--neon-color': n.color,
                '--neon-rot': `${n.rotation}deg`,
                animationDelay: `${n.delay}ms`,
              } as React.CSSProperties
            }
          >
            {n.text}
          </span>
        ))}
      {!isPulp && !isBlade && (
        <>
          <div className={`${styles.blob} ${styles[`${variant}1`]}`} />
          <div className={`${styles.blob} ${styles[`${variant}2`]}`} />
          <div className={`${styles.blob} ${styles[`${variant}3`]}`} />
        </>
      )}
    </div>
  )
}
