import { iconShapes, type IconShape } from '../../data/iconPaths'
import type { IconProps } from './types'

function Shape({ shape }: { shape: IconShape }) {
  if (shape.kind === 'rect') {
    const { x, y, width, height, rx } = shape
    return <rect x={x} y={y} width={width} height={height} rx={rx} />
  }
  if (shape.kind === 'circle') return <circle cx={shape.cx} cy={shape.cy} r={shape.r} />
  return <path d={shape.d} />
}

export default function Icon({ name, size = 24, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {iconShapes[name].map((shape, i) => (
        <Shape key={i} shape={shape} />
      ))}
    </svg>
  )
}
