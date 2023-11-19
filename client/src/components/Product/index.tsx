import { FC, useState } from 'react'
import { ProductEdge } from '../../../../types'
import { Canvas } from '../Canvas'
import styles from './Product.module.scss'

interface ProductProps {
  product: ProductEdge
}

export const Product: FC<ProductProps> = props => {
  const { product } = props
  const [isExpanded, setIsExpanded] = useState(false)

  const imageUrl = product.node.images.edges[0].node.src
  const regex = /(https?:\/\/\S+(\.png|\.jpg|\.gif))/g
  const innerHTML = product.node.bodyHtml.replace(regex, '')

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev)
  }

  return (
    <div className={styles.product}>
      <div className={styles.header}>
        <h2>{product.node.title}</h2>
        <Canvas imageUrl={imageUrl} />
      </div>

      <button className={styles.button} onClick={toggleExpanded}>
        {isExpanded ? 'Скрыть' : 'Подробнее'}
      </button>
      {isExpanded && (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: innerHTML }}
        />
      )}
    </div>
  )
}
