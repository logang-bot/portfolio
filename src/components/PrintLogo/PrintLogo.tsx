import styles from './PrintLogo.module.css'
import type { PrintLogoProps } from './types'

export default function PrintLogo({ src, tilt }: PrintLogoProps) {
  const mask = `url("${src}")`
  const maskStyle = { maskImage: mask, WebkitMaskImage: mask }
  return (
    <span className={styles.print} style={{ rotate: `${tilt}deg` }}>
      <span className={`${styles.ink} ${styles.misprint}`} style={maskStyle} />
      <span className={styles.ink} style={maskStyle} />
    </span>
  )
}
