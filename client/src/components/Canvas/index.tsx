import { FC } from 'react'
import { useCanvasImage } from '../../hooks/useCanvasImage'
import styles from './Canvas.module.scss'

export interface CanvasProps {
  imageUrl: string
}

export const Canvas: FC<CanvasProps> = props => {
  const { imageUrl } = props
  const canvasRef = useCanvasImage(imageUrl)

  return <canvas className={styles.canvas} ref={canvasRef} />
}
