export type NavMarkerVariant = 'links' | 'compact'

export interface NavMarkerProps {
  target: string | null
  arrival: number
  variant?: NavMarkerVariant
}
