import { useLayoutEffect, type RefObject } from 'react'
import type { NavSectionId } from '../../data/navLinks'

export interface MarkerPlacement {
  targetId: NavSectionId | null
  containerRef: RefObject<HTMLElement | null>
  markerRef: RefObject<HTMLElement | null>
}

export function useMarkerPosition({ targetId, containerRef, markerRef }: MarkerPlacement): void {
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    const place = () => placeMarker(markerRef.current, findLink(container, targetId))
    place()
    const observer = new ResizeObserver(place)
    observer.observe(container)
    return () => observer.disconnect()
  }, [targetId, containerRef, markerRef])
}

function findLink(container: HTMLElement, id: NavSectionId | null): HTMLElement | null {
  return id ? container.querySelector<HTMLElement>(`a[href="#${id}"]`) : null
}

function placeMarker(marker: HTMLElement | null, link: HTMLElement | null): void {
  if (!marker || !link) return
  marker.style.setProperty('--marker-x', `${link.offsetLeft}px`)
  marker.style.setProperty('--marker-w', `${link.offsetWidth}px`)
}
