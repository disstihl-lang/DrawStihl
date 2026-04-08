const MAX_DIMENSION = 1400
const EXPORT_QUALITY = 0.82
const EXPORT_TYPE = 'image/jpeg'

const calcTargetSize = (width: number, height: number): { width: number; height: number } => {
  if (width <= MAX_DIMENSION && height <= MAX_DIMENSION) {
    return { width, height }
  }

  if (width > height) {
    return {
      width: MAX_DIMENSION,
      height: Math.round(height * (MAX_DIMENSION / width)),
    }
  }

  return {
    width: Math.round(width * (MAX_DIMENSION / height)),
    height: MAX_DIMENSION,
  }
}

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Failed to read file'))
        return
      }

      resolve(reader.result)
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to decode image'))
    img.src = src
  })

const toCompressedDataUrl = (img: HTMLImageElement): string => {
  const { width, height } = calcTargetSize(img.naturalWidth, img.naturalHeight)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Canvas context is unavailable')
  }

  context.drawImage(img, 0, 0, width, height)
  return canvas.toDataURL(EXPORT_TYPE, EXPORT_QUALITY)
}

export const imageService = {
  async prepareFile(file: File): Promise<string> {
    const sourceDataUrl = await readFileAsDataUrl(file)
    const image = await loadImage(sourceDataUrl)
    return toCompressedDataUrl(image)
  },
}
