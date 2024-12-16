import Carousel from '@/components/hotel/Carousel'
import useHotel from '@/components/hotel/hooks/useHotel'
import Top from '@/components/shared/Top'
import { useParams } from 'react-router-dom'

const HotelPage = () => {
  const { id } = useParams() as { id: string }

  const { isLoading, data } = useHotel({ id })

  // console.log('isLoading', isLoading)
  // console.log('data', data)

  if (!data || isLoading) {
    return <div>로딩중....</div>
  }

  const { name, comment, images } = data

  return (
    <div>
      <Top title={name} subtitle={comment} />
      <Carousel images={images} />
    </div>
  )
}

export default HotelPage
