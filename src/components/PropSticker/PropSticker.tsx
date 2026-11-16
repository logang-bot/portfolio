import styles from './PropSticker.module.css'
import Icon from '../Icon'
import type { PropStickerProps } from './types'

export default function PropSticker({ icon, tilt }: PropStickerProps) {
  return (
    <span className={styles.sticker} style={{ rotate: `${tilt}deg` }}>
      <Icon name={icon} size={32} className={styles.icon} />
    </span>
  )
}
