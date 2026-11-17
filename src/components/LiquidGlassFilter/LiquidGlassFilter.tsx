export default function LiquidGlassFilter() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <filter id="liquid-glass" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
        <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="30" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}
