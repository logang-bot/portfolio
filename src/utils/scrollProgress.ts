export function pageScrollProgress(): number {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  if (scrollable <= 0) return 0
  return Math.min(1, Math.max(0, window.scrollY / scrollable))
}

export function rangeProgress(progress: number, start: number, end: number): number {
  if (progress <= start) return 0
  if (progress >= end) return 1
  return (progress - start) / (end - start)
}

export function parallaxLayerHeight(speed: number): number {
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  return window.innerHeight + maxScroll * speed
}

export function parallaxTransform(factor: number): string {
  return `translateY(-${window.scrollY * factor}px)`
}
