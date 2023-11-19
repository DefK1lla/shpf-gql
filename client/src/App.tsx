import { useEffect } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { Hourglass } from 'react-loader-spinner'

import { Product } from './components/Product'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { fetchProducts } from './store/reducers/ActionCreators'
import styles from './App.module.scss'

function App() {
  const { products, isLoading, error } = useAppSelector(
    state => state.productReducer
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className={styles.overlay}>
        <Hourglass
          visible={true}
          height='80'
          width='80'
          ariaLabel='hourglass-loading'
          wrapperStyle={{}}
          wrapperClass=''
          colors={['#306cce', '#72a1ed']}
        />
      </div>
    )
  }

  if (error) {
    return <div className={styles.overlay}>{error}</div>
  }

  return (
    <div className={styles.container}>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 900: 2, 1200: 3 }}
      >
        <Masonry gutter='32px'>
          {products.edges.map(edge => (
            <Product key={edge.node.id} product={edge} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}

export default App
