export function isInContentColumn(x: number): boolean {
  const root = document.documentElement
  const columnMax = parseFloat(getComputedStyle(root).getPropertyValue('--content-max'))
  return isInContentColumnFor(x, root.clientWidth, columnMax)
}

export function isInContentColumnFor(x: number, viewportWidth: number, columnMax: number): boolean {
  const halfColumn = Math.min(columnMax, viewportWidth) / 2
  return Math.abs(x - viewportWidth / 2) <= halfColumn
}
