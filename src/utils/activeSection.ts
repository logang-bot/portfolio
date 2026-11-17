import { navSectionIds, type NavSectionId } from '../data/navLinks.ts'

export function pickActiveSection(
  intersecting: ReadonlySet<NavSectionId>,
  atPageBottom: boolean,
): NavSectionId | null {
  if (atPageBottom) return 'contact'
  return navSectionIds.find((id) => intersecting.has(id)) ?? null
}
