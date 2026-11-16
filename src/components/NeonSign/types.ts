export type NeonMount = 'left' | 'right'

export interface NeonSignProps {
  text: string
  color: string
  fontSize: number
  tilt: number
  mount: NeonMount
}
