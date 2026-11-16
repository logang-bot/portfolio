export interface Cell {
  row: number
  col: number
}

export interface GridSpec {
  cellSize: number
  fillRatio: number
  width: number
  height: number
}

const NEIGHBOR_OFFSETS = [-1, 0, 1]
  .flatMap((dr) => [-1, 0, 1].map((dc) => [dr, dc]))
  .filter(([dr, dc]) => dr !== 0 || dc !== 0)

/** Deterministic pseudo-random value in [0, 1) for a cell, from the classic sin-hash. */
export function hashRand({ row, col }: Cell, salt: number, seed: number): number {
  const x = Math.sin(row * 127.1 + col * 311.7 + salt * 74.7 + seed * 53.3) * 43758.5453
  return x - Math.floor(x)
}

export function pickSpacedCells(spec: GridSpec, seed: number): Cell[] {
  const placed = new Set<string>()
  return gridCells(spec).filter((cell) => {
    if (hashRand(cell, 0, seed) >= spec.fillRatio || hasPlacedNeighbor(placed, cell)) return false
    placed.add(cellKey(cell.row, cell.col))
    return true
  })
}

function gridCells({ cellSize, width, height }: GridSpec): Cell[] {
  const cols = Math.floor(width / cellSize)
  const rows = Math.ceil(height / cellSize)
  return Array.from({ length: rows * cols }, (_, i) => ({
    row: Math.floor(i / cols),
    col: i % cols,
  }))
}

function hasPlacedNeighbor(placed: Set<string>, { row, col }: Cell): boolean {
  return NEIGHBOR_OFFSETS.some(([dr, dc]) => placed.has(cellKey(row + dr, col + dc)))
}

function cellKey(row: number, col: number): string {
  return `${row},${col}`
}
