import { render } from '@testing-library/react'
import { Canvas } from '.'
import { useCanvasImage } from '../../hooks/useCanvasImage'

jest.mock('../../hooks/useCanvasImage', () => ({
  useCanvasImage: jest.fn(),
}))

const useCanvasImageMock = useCanvasImage as jest.Mock

describe('Компонент Canvas', () => {
  it('рендерит компонент canvas с предоставленным imageUrl', () => {
    const imageUrl = 'https://example.com/image.jpg'

    useCanvasImageMock.mockReturnValue({
      current: document.createElement('canvas'),
    })

    const { container } = render(<Canvas imageUrl={imageUrl} />)

    const canvasElement = container.querySelector('canvas')

    expect(canvasElement).toBeInTheDocument()
    expect(canvasElement?.className).toContain('canvas')
    expect(useCanvasImageMock.mock.calls[0][0]).toBe(imageUrl)
  })

  it('обновляется при изменении imageUrl', () => {
    const { rerender } = render(<Canvas imageUrl='oldImageUrl' />)

    rerender(<Canvas imageUrl='newImageUrl' />)

    expect(useCanvasImage).toHaveBeenCalledWith('oldImageUrl')
    expect(useCanvasImage).toHaveBeenCalledWith('newImageUrl')
  })

  it('вызывает useCanvasImage с правильным imageUrl', () => {
    const imageUrl = 'testImageUrl'
    render(<Canvas imageUrl={imageUrl} />)
    expect(useCanvasImage).toHaveBeenCalledWith(imageUrl)
  })

  it('рендерит с правильным className', () => {
    const { container } = render(<Canvas imageUrl='testImageUrl' />)
    const canvasElement = container.querySelector('canvas')
    expect(canvasElement?.className).toContain('canvas')
  })

  it('взаимодействует корректно с результатом хука useCanvasImage', () => {
    const mockCanvasRef = {
      current: document.createElement('canvas'),
    }
    useCanvasImageMock.mockReturnValue(mockCanvasRef)

    const { container } = render(<Canvas imageUrl='testImageUrl' />)
    const canvasElement = container.querySelector('canvas')

    expect(canvasElement).toBe(mockCanvasRef.current)
  })
})
