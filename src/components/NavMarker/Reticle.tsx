import styles from './NavMarkerPulpFiction.module.css'

export default function Reticle() {
  return (
    <svg className={styles.reticle} viewBox="0 0 56 56" width="56" height="56" aria-hidden="true" focusable="false">
      <circle cx="28" cy="28" r="20" />
      <path d="M0 28h14M42 28h14M28 0v14M28 42v14" />
      <circle cx="28" cy="28" r="1.5" className={styles.dot} />
    </svg>
  )
}
