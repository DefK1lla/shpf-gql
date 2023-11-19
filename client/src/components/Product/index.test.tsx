import { fireEvent, render, screen } from '@testing-library/react'
import { Product } from '.'
import { ProductEdge } from '../../../../types'

jest.mock('../../../../types', () => ({
  ...(jest.requireActual('../../../../types') as object),
  ImageNode: {
    src: 'test-image.jpg',
  },
  ImageEdge: {
    node: {
      src: 'test-image.jpg',
    },
  },
  ProductNode: {
    id: 'test-id',
    title: 'Test Product',
    bodyHtml: '<p>Product description</p>',
    images: {
      edges: [{ node: { src: 'test-image.jpg' } }],
    },
  },
  ProductEdge: {
    node: {
      id: 'test-id',
      title: 'Test Product',
      bodyHtml: '<p>Product description</p>',
      images: {
        edges: [{ node: { src: 'test-image.jpg' } }],
      },
    },
  },
}))

describe('Product компонент', () => {
  const mockProduct: ProductEdge = {
    node: {
      id: 'test-id',
      title: 'Test Product',
      bodyHtml: '<p>Product description</p>',
      images: {
        edges: [{ node: { src: 'test-image.jpg' } }],
      },
    },
  }

  it('отображает заголовок продукта', () => {
    const { getByText } = render(<Product product={mockProduct} />)
    const titleElement = getByText('Test Product')
    expect(titleElement).toBeInTheDocument()
  })

  it('отображает изображение с использованием Canvas', () => {
    const { container } = render(<Product product={mockProduct} />)
    const canvasElement = container.querySelector('canvas')
    expect(canvasElement).toBeInTheDocument()
  })

  it('корректно обрабатывает клик по кнопке "Подробнее" и отображает/скрывает контент', () => {
    const { container, queryByText, getByText } = render(
      <Product product={mockProduct} />
    )
    const buttonElement = getByText('Подробнее')

    expect(queryByText('Product description')).toBeNull()

    fireEvent.click(buttonElement)

    expect(queryByText('Product description')).toBeInTheDocument()

    fireEvent.click(buttonElement)

    expect(queryByText('Product description')).toBeNull()
  })
})
