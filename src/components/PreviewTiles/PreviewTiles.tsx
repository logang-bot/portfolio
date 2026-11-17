import Icon from '../Icon'
import styles from './PreviewTiles.module.css'
import type { PreviewTilesProps } from './types'

export default function PreviewTiles({ tiles }: PreviewTilesProps) {
  return (
    <ul className={styles.grid}>
      {tiles.map((tile) => (
        <li key={tile.label} className={styles.tile} data-tile>
          <span className={styles.iconTile}>
            <Icon name={tile.icon} size={20} />
          </span>
          <span className={styles.label}>{tile.label}</span>
        </li>
      ))}
    </ul>
  )
}
