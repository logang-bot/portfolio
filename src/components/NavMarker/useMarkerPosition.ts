import { useLayoutEffect, useRef, type RefObject } from 'react'

export interface MarkerPlacement {
  target: string | null
  markerRef: RefObject<HTMLElement | null>
}

export function useMarkerPosition({ target, markerRef }: MarkerPlacement): void {
  const wasHidden = useRef(true)

  useLayoutEffect(() => {
    const marker = markerRef.current
    const container = marker?.parentElement
    if (!marker || !container) return
    const place = () => placeMarker(marker, findTarget(container, target))
    const appearing = target !== null && wasHidden.current
    wasHidden.current = target === null
    return trackPlacement({ container, marker, place, appearing })
  }, [target, markerRef])
}

interface PlacementTracking {
  container: HTMLElement
  marker: HTMLElement
  place: () => void
  appearing: boolean
}

function trackPlacement({ container, marker, place, appearing }: PlacementTracking): () => void {
  if (appearing) snapIntoPlace(marker, place)
  else place()
  return observeResize(container, place)
}

function findTarget(container: HTMLElement, selector: string | null): HTMLElement | null {
  return selector ? container.querySelector<HTMLElement>(selector) : null
}

function placeMarker(marker: HTMLElement, target: HTMLElement | null): void {
  if (!target) return
  marker.style.setProperty('--marker-x', `${target.offsetLeft}px`)
  marker.style.setProperty('--marker-y', `${target.offsetTop}px`)
  marker.style.setProperty('--marker-w', `${target.offsetWidth}px`)
  marker.style.setProperty('--marker-h', `${target.offsetHeight}px`)
}

function snapIntoPlace(marker: HTMLElement, place: () => void): void {
  marker.dataset.snap = ''
  place()
  void marker.getBoundingClientRect()
  delete marker.dataset.snap
}

function observeResize(container: HTMLElement, onResize: () => void): () => void {
  const observer = new ResizeObserver(onResize)
  observer.observe(container)
  return () => observer.disconnect()
}
