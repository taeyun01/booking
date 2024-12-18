import RecommendHotels from '@/components/hotel/\bRecommendHotels'
import ActionButton from '@/components/hotel/ActionButton'
import Carousel from '@/components/hotel/Carousel'
import Contents from '@/components/hotel/Contents'
import useHotel from '@/components/hotel/hooks/useHotel'
import Map from '@/components/hotel/Map'
import Rooms from '@/components/hotel/Rooms'
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

  const { name, comment, images, contents, location, recommendHotels } = data

  return (
    <div>
      <Top title={name} subtitle={comment} />
      <Carousel images={images} />
      <ActionButton hotel={data} />
      <Rooms hotelId={id} />
      <Contents contents={contents} />
      <Map location={location} />
      <RecommendHotels recommendHotels={recommendHotels} />
    </div>
  )
}

export default HotelPage
