interface Hotel {
  comment: string
  contents: string
  id: string
  images: string[]
  location: {
    directions: string
    pointGeolocation: {
      x: number
      y: number
    }
  }
  mainImageUrl: string
  name: string
  price: number
  starRating: number
  event?: {
    name: string
    promoEndTime?: string
    tagThemeStyle: {
      backgroundColor: string
      fontColor: string
    }
  }
}

export type { Hotel }
