import { useRef, useState, type FocusEvent } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { navSectionIds, type NavSectionId } from '../../data/navLinks'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useNavDestination } from '../../hooks/useNavDestination'
import NavMarker from '../NavMarker'
import styles from './NavLinks.module.css'
import type { NavLinksProps } from './types'

export default function NavLinks({ onNavigate }: NavLinksProps) {
  const { t } = useLanguage()
  const active = useActiveSection()
  const { destination, navigateTo } = useNavDestination(active)
  const [hovered, setHovered] = useState<NavSectionId | null>(null)
  const [focused, setFocused] = useState<NavSectionId | null>(null)
  const [arrival, setArrival] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)
  const current = destination ?? active

  const hover = (id: NavSectionId) => {
    setHovered(id)
    setArrival((count) => count + 1)
  }
  const focusWithKeyboard = (id: NavSectionId, event: FocusEvent<HTMLAnchorElement>) => {
    if (!event.currentTarget.matches(':focus-visible')) return
    setFocused(id)
    setArrival((count) => count + 1)
  }
  const releaseOnFocusExit = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(null)
  }
  const navigate = (id: NavSectionId) => {
    navigateTo(id)
    onNavigate()
  }

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      onPointerLeave={() => setHovered(null)}
      onBlur={releaseOnFocusExit}
    >
      <ul className={styles.links}>
        {navSectionIds.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={styles.link}
              aria-current={id === current ? 'true' : undefined}
              onClick={() => navigate(id)}
              onPointerEnter={() => hover(id)}
              onFocus={(event) => focusWithKeyboard(id, event)}
            >
              {t.nav[id]}
            </a>
          </li>
        ))}
      </ul>
      <NavMarker targetId={hovered ?? focused ?? current} arrival={arrival} containerRef={wrapRef} />
    </div>
  )
}
