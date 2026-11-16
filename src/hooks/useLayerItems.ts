import { useMemo, useState } from 'react'
import { useScrollFrame } from './useScrollFrame'
import { hashRand, pickSpacedCells } from '../utils/gridPlacement'
import { isInContentColumnFor } from '../utils/contentColumn'
import { parallaxLayerHeight } from '../utils/scrollProgress'
import type { LayerItem, LayerSpec } from '../components/BackgroundPattern/types'

interface LayerViewport {
  width: number
  height: number
  columnMax: number
}

export interface LayerItems {
  height: number
  items: LayerItem[]
}

export function useLayerItems(spec: LayerSpec): LayerItems {
  const [seed] = useState(() => Math.random() * 1000)
  const [viewport, setViewport] = useState(() => readViewport(spec.speed))
  useScrollFrame(() => setViewport((prev) => keepIfSame(prev, readViewport(spec.speed))))
  const items = useMemo(() => buildItems(spec, viewport, seed), [spec, viewport, seed])
  return { height: viewport.height, items }
}

function readViewport(speed: number): LayerViewport {
  const root = document.documentElement
  return {
    width: root.clientWidth,
    height: Math.ceil(parallaxLayerHeight(speed)),
    columnMax: parseFloat(getComputedStyle(root).getPropertyValue('--content-max')),
  }
}

function keepIfSame(prev: LayerViewport, next: LayerViewport): LayerViewport {
  const same =
    prev.width === next.width && prev.height === next.height && prev.columnMax === next.columnMax
  return same ? prev : next
}

function buildItems(spec: LayerSpec, viewport: LayerViewport, seed: number): LayerItem[] {
  const { cellSize } = spec
  return pickSpacedCells({ ...spec, ...viewport }, seed).map((cell, index) => ({
    index,
    cell,
    x: cell.col * cellSize,
    y: cell.row * cellSize,
    dim: isInContentColumnFor((cell.col + 0.5) * cellSize, viewport.width, viewport.columnMax),
    rand: (salt: number) => hashRand(cell, salt, seed),
  }))
}
