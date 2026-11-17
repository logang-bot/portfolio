import type { RefObject } from 'react'
import type { NavSectionId } from '../../data/navLinks'

export interface NavMarkerProps {
  targetId: NavSectionId | null
  arrival: number
  containerRef: RefObject<HTMLElement | null>
}
