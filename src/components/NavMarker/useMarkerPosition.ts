import { useLayoutEffect, useRef, type RefObject } from 'react'
import type { NavSectionId } from '../../data/navLinks'

export interface MarkerPlacement {
  targetId: NavSectionId | null
  containerRef: RefObject<HTMLElement | null>
  markerRef: RefObject<HTMLElement | null>
}

export function useMarkerPosition({ targetId, containerRef, markerRef }: MarkerPlacement): void {
  const wasHidden = useRef(true)

  useLayoutEffect(() => {
    const container = containerRef.current
    const marker = markerRef.current
    if (!container || !marker) return
    const place = () => placeMarker(marker, findLink(container, targetId))
    if (targetId && wasHidden.current) snapIntoPlace(marker, place)
    else place()
    wasHidden.current = targetId === null
    return observeResize(container, place)
  }, [targetId, containerRef, markerRef])
}

function findLink(container: HTMLElement, id: NavSectionId | null): HTMLElement | null {
  return id ? container.querySelector<HTMLElement>(`a[href="#${id}"]`) : null
}

function placeMarker(marker: HTMLElement, link: HTMLElement | null): void {
  if (!link) return
  marker.style.setProperty('--marker-x', `${link.offsetLeft}px`)
  marker.style.setProperty('--marker-w', `${link.offsetWidth}px`)
}

function snapIntoPlace(marker: HTMLElement, place: () => void): void {
  marker.dataset.snap = ''
  place()
  requestAnimationFrame(() => delete marker.dataset.snap)
}

function observeResize(container: HTMLElement, onResize: () => void): () => void {
  const observer = new ResizeObserver(onResize)
  observer.observe(container)
  return () => observer.disconnect()
}
