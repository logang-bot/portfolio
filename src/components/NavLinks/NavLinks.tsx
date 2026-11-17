import { useRef, useState, type FocusEvent } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { navSectionIds, type NavSectionId } from '../../data/navLinks'
import { useActiveSection } from '../../hooks/useActiveSection'
import NavMarker from '../NavMarker'
import styles from './NavLinks.module.css'
import type { NavLinksProps } from './types'

export default function NavLinks({ onNavigate }: NavLinksProps) {
  const { t } = useLanguage()
  const active = useActiveSection()
  const [pointed, setPointed] = useState<NavSectionId | null>(null)
  const [arrival, setArrival] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)

  const point = (id: NavSectionId) => {
    setPointed(id)
    setArrival((count) => count + 1)
  }
  const pointOnKeyboardFocus = (id: NavSectionId, event: FocusEvent<HTMLAnchorElement>) => {
    if (event.currentTarget.matches(':focus-visible')) point(id)
  }
  const releaseOnFocusExit = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPointed(null)
  }

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      onPointerLeave={() => setPointed(null)}
      onBlur={releaseOnFocusExit}
    >
      <ul className={styles.links}>
        {navSectionIds.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={styles.link}
              aria-current={id === active ? 'true' : undefined}
              onClick={onNavigate}
              onPointerEnter={() => point(id)}
              onFocus={(event) => pointOnKeyboardFocus(id, event)}
            >
              {t.nav[id]}
            </a>
          </li>
        ))}
      </ul>
      <NavMarker targetId={pointed ?? active} arrival={arrival} containerRef={wrapRef} />
    </div>
  )
}
