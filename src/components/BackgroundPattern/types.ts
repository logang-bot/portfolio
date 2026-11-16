import type { CSSProperties, ReactNode } from 'react'
import type { Cell } from '../../utils/gridPlacement'

export interface LayerSpec {
  speed: number
  cellSize: number
  fillRatio: number
}

export interface LayerItem {
  index: number
  cell: Cell
  x: number
  y: number
  rand: (salt: number) => number
}

export interface ParallaxLayerProps {
  spec: LayerSpec
  renderItem: (item: LayerItem) => ReactNode
  className?: string
  style?: CSSProperties
}

export interface BackgroundFrameProps {
  children: ReactNode
  className?: string
}
