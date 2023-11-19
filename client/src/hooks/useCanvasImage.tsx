import { useEffect, useRef } from 'react'

export const useCanvasImage = (imageUrl: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const image = new Image()
    image.onload = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight

        if (ctx) {
          ctx.drawImage(image, 0, 0)
        }
      }
    }
    image.src = imageUrl
  }, [imageUrl])
  return canvasRef
}
