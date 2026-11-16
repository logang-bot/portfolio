import { useMemo, useState } from 'react'
import { useScrollFrame } from './useScrollFrame'
import { hashRand, pickSpacedCells } from '../utils/gridPlacement'
import { parallaxLayerHeight } from '../utils/scrollProgress'
import type { LayerItem, LayerSpec } from '../components/BackgroundPattern/types'

interface LayerViewport {
  width: number
  height: number
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
  return {
    width: document.documentElement.clientWidth,
    height: Math.ceil(parallaxLayerHeight(speed)),
  }
}

function keepIfSame(prev: LayerViewport, next: LayerViewport): LayerViewport {
  return prev.width === next.width && prev.height === next.height ? prev : next
}

function buildItems(spec: LayerSpec, viewport: LayerViewport, seed: number): LayerItem[] {
  const { cellSize } = spec
  return pickSpacedCells({ ...spec, ...viewport }, seed).map((cell, index) => ({
    index,
    cell,
    x: cell.col * cellSize,
    y: cell.row * cellSize,
    rand: (salt: number) => hashRand(cell, salt, seed),
  }))
}
