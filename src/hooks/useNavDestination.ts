import { useEffect, useState } from 'react'
import type { NavSectionId } from '../data/navLinks'

const NO_SCROLL_GRACE_MS = 300

export interface NavDestination {
  destination: NavSectionId | null
  navigateTo: (id: NavSectionId) => void
}

export function useNavDestination(active: NavSectionId | null): NavDestination {
  const [destination, setDestination] = useState<NavSectionId | null>(null)
  if (destination !== null && destination === active) setDestination(null)
  useEffect(() => {
    if (destination === null) return
    return settleAfterScroll(() => setDestination(null))
  }, [destination])
  return { destination, navigateTo: setDestination }
}

function settleAfterScroll(onSettle: () => void): () => void {
  const fallback = setTimeout(onSettle, NO_SCROLL_GRACE_MS)
  const cancelFallback = () => clearTimeout(fallback)
  window.addEventListener('scroll', cancelFallback, { once: true })
  window.addEventListener('scrollend', onSettle, { once: true })
  return () => {
    clearTimeout(fallback)
    window.removeEventListener('scroll', cancelFallback)
    window.removeEventListener('scrollend', onSettle)
  }
}
