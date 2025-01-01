import RecommendHotels from '@/components/hotel/RecommendHotels'
import ActionButton from '@/components/hotel/ActionButton'
import Carousel from '@/components/hotel/Carousel'
import Contents from '@/components/hotel/Contents'
import useHotel from '@/components/hotel/hooks/useHotel'
import Map from '@/components/hotel/Map'
import Review from '@/components/hotel/Review'
import Rooms from '@/components/hotel/Rooms'
import Top from '@/components/shared/Top'
import { useParams } from 'react-router-dom'
import ScrollBar from '@/components/shared/ScrollBar'
import { css } from '@emotion/react'

import SEO from '@/components/shared/SEO'

import withSuspense from '@/components/shared/hocs/withSuspense'
import FullPageLoader from '@/components/shared/FullPageLoader'

const HotelPage = () => {
  const { id } = useParams() as { id: string }

  const { data } = useHotel({ id })

  const { name, comment, images, contents, location, recommendHotels } = data!

  return (
    <div>
      <SEO title={name} description={comment} image={images[0]} />
      <ScrollBar style={scrollBarStyle} color="red" />
      <Top title={name} subtitle={comment} />
      <Carousel images={images} />
      <ActionButton hotel={data!} />
      <Rooms hotelId={id} />
      <Contents contents={contents} />
      <Map location={location} />
      <RecommendHotels recommendHotels={recommendHotels} />
      <Review hotelId={id} />
    </div>
  )
}

const scrollBarStyle = css`
  position: sticky;
  top: 64px;
  z-index: 10;
`

const WrappedHotelPage = withSuspense(HotelPage, {
  fallback: (
    <FullPageLoader
      message="데이터를 불러오는 중입니다."
      imgSrc="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-44-718_512.gif"
    />
  ),
})

export default WrappedHotelPage
