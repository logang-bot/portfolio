import { useRef } from 'react'
import styles from './ParallaxLayer.module.css'
import { useLayerItems } from '../../hooks/useLayerItems'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useScrollFrame } from '../../hooks/useScrollFrame'
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

  return (
    <div
      ref={layerRef}
      className={`${styles.layer} ${className ?? ''}`}
      style={{ ...style, height }}
    >
      {items.map((item) => (
        <div
          key={cellKey(item)}
          className={item.dim ? `${styles.cell} ${styles.dim}` : styles.cell}
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
