import { useEffect, useState } from 'react'
import { navSectionIds, type NavSectionId } from '../data/navLinks'
import { pickActiveSection } from '../utils/activeSection'
import { useScrollFrame } from './useScrollFrame'

const READING_BAND = '-35% 0px -60% 0px'

export function useActiveSection(): NavSectionId | null {
  const [intersecting, setIntersecting] = useState<ReadonlySet<NavSectionId>>(new Set())
  const [atPageBottom, setAtPageBottom] = useState(false)
  useEffect(() => observeSections(setIntersecting), [])
  useScrollFrame(() => setAtPageBottom(isAtPageBottom()))
  return pickActiveSection(intersecting, atPageBottom)
}

function observeSections(onChange: (ids: ReadonlySet<NavSectionId>) => void): () => void {
  const visible = new Set<NavSectionId>()
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => toggleVisible(visible, entry))
      onChange(new Set(visible))
    },
    { rootMargin: READING_BAND },
  )
  sectionElements().forEach((section) => observer.observe(section))
  return () => observer.disconnect()
}

function toggleVisible(visible: Set<NavSectionId>, entry: IntersectionObserverEntry): void {
  const id = entry.target.id as NavSectionId
  if (entry.isIntersecting) visible.add(id)
  else visible.delete(id)
}

function sectionElements(): HTMLElement[] {
  return navSectionIds
    .map((id) => document.getElementById(id))
    .filter((section): section is HTMLElement => section !== null)
}

function isAtPageBottom(): boolean {
  return innerHeight + scrollY >= document.documentElement.scrollHeight - 2
}
