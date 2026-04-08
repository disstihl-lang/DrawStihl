import { useMemo } from 'react'
import styles from './canvas.module.css'

type Props = {
  visible: boolean
  linesCount?: number
}

const DEFAULT_LINES_COUNT = 10

export const GridOverlay = ({ visible, linesCount = DEFAULT_LINES_COUNT }: Props) => {
  const lines = useMemo(() => {
    return Array.from({ length: linesCount + 1 }, (_, index) => {
      const offset = (index / linesCount) * 100

      return {
        key: `line-${index}`,
        x1: `${offset}%`,
        y1: '0%',
        x2: `${offset}%`,
        y2: '100%',
        hX1: '0%',
        hY1: `${offset}%`,
        hX2: '100%',
        hY2: `${offset}%`,
      }
    })
  }, [linesCount])

  if (!visible) return null

  return (
    <svg className={styles.gridOverlay} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      {lines.map((line) => (
        <g key={line.key}>
          <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
          <line x1={line.hX1} y1={line.hY1} x2={line.hX2} y2={line.hY2} />
        </g>
      ))}
    </svg>
  )
}
