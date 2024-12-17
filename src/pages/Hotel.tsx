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

  const { name, comment, images, contents, location } = data

  return (
    <div>
      <Top title={name} subtitle={comment} />
      <Carousel images={images} />
      <Rooms hotelId={id} />
      <Contents contents={contents} />
      <Map location={location} />
    </div>
  )
}

export default HotelPage
