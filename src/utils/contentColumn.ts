export interface Span {
  left: number
  right: number
}

export interface ColumnMetrics {
  viewportWidth: number
  columnMax: number
  paddingX: number
}

export function readColumnMetrics(): ColumnMetrics {
  const root = document.documentElement
  const style = getComputedStyle(root)
  return {
    viewportWidth: root.clientWidth,
    columnMax: parseFloat(style.getPropertyValue('--content-max')),
    paddingX: parseFloat(style.getPropertyValue('--section-pad-x')),
  }
}

export function textAreaSpan({ viewportWidth, columnMax, paddingX }: ColumnMetrics): Span {
  const halfWidth = Math.min(columnMax, viewportWidth) / 2 - paddingX
  const center = viewportWidth / 2
  return { left: center - halfWidth, right: center + halfWidth }
}

export function overlapsSpan(a: Span, b: Span): boolean {
  return a.left < b.right && a.right > b.left
}

export function expandSpan(span: Span, margin: number): Span {
  return { left: span.left - margin, right: span.right + margin }
}
