import { useLayoutEffect, useRef } from 'react'
import styles from './ParallaxLayer.module.css'
import { useLayerItems } from '../../hooks/useLayerItems'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useScrollFrame } from '../../hooks/useScrollFrame'
import { overlapsSpan, readColumnMetrics, textAreaSpan, type Span } from '../../utils/contentColumn'
import { parallaxTransform } from '../../utils/scrollProgress'
import type { LayerItem, ParallaxLayerProps } from './types'

export default function ParallaxLayer({ spec, renderItem, className, style }: ParallaxLayerProps) {
  const reducedMotion = usePrefersReducedMotion()
  const layerRef = useRef<HTMLDivElement>(null)
  const { height, items } = useLayerItems(spec)

  useScrollFrame(() => {
    if (!layerRef.current) return
    layerRef.current.style.transform = reducedMotion ? 'none' : parallaxTransform(spec.speed)
  })

  useLayoutEffect(() => markCellsBehindText(layerRef.current))

  return (
    <div
      ref={layerRef}
      className={`${styles.layer} ${className ?? ''}`}
      style={{ ...style, height }}
    >
      {items.map((item) => (
        <div
          key={cellKey(item)}
          className={styles.cell}
          style={{ top: item.y, left: item.x, width: spec.cellSize, height: spec.cellSize }}
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  )
}

function cellKey({ cell }: LayerItem): string {
  return `${cell.row},${cell.col}`
}

function markCellsBehindText(layer: HTMLElement | null): void {
  if (!layer) return
  const textArea = textAreaSpan(readColumnMetrics())
  for (const cell of layer.children) markCell(cell, textArea)
}

function markCell(cell: Element, textArea: Span): void {
  const item = cell.firstElementChild?.getBoundingClientRect()
  cell.toggleAttribute('data-dim', item !== undefined && overlapsSpan(item, textArea))
}
