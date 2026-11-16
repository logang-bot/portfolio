export interface SignCell {
  x: number
  cellSize: number
  viewportWidth: number
}

export function rightEdgeGap({ x, cellSize, viewportWidth }: SignCell): number {
  const isLastColumn = x + 2 * cellSize > viewportWidth
  return isLastColumn ? viewportWidth - (x + cellSize) : 0
}
