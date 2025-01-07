import { css } from '@emotion/react'

import HotelItem from '@/components/hotelList/HotelItem'
import Spacing from '@/components/shared/Spacing'
import Top from '@/components/shared/Top'
import useHotels from '@components/hotelList/hooks/useHotels'

import { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import useLike from '@/hooks/like/useLike'

import withSuspense from '@/components/shared/hocs/withSuspense'
import FullPageLoader from '@/components/shared/FullPageLoader'
import useLikeAll from '@/hooks/like/useLikeAll'
import HotelBestItem from '@/components/hotelList/HotelBestItem'

import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import SEO from '@/components/shared/SEO'

const HotelList = () => {
  const { data: hotels, hasNextPage, loadMore } = useHotels()
  const { data: likes, mutate: likeMutate } = useLike()
  const { data: likesAll } = useLikeAll()

  // 좋아요한 호텔의 id값 가져오기
  const likesAlls = likesAll?.map((like) => like.hotelId)

  // 중복된 호텔 수가 많은 순서대로 정렬 (좋아요가 많은 순)
  const likesAllHotel = likesAlls?.sort((a, b) => {
    return (
      likesAlls.filter((v) => v === b).length -
      likesAlls.filter((v) => v === a).length
    )
  })

  // 중복된 id값은 하나씩만 출력
  const likesAllHotels = [
    ...new Set(
      likesAllHotel?.map((like) => {
        return hotels?.find((hotel) => hotel.id === like)
      }),
    ),
  ]

  const { images } = hotels![0]

  return (
    <div>
      <SEO
        title={'Booking'}
        description={'여행의 시작은 Booking에서'}
        image={images[0]}
      />

      <Top title="인기 호텔" subtitle="호텔의 좋아요가 많은 순서" />

      <Swiper css={swiperStyle} pagination={true} modules={[Pagination]}>
        {likesAllHotels?.map((hotel) => {
          if (!hotel) return null
          const isLike = Boolean(
            likes?.find((like) => like.hotelId === hotel?.id),
          )

          return (
            <SwiperSlide key={hotel?.id}>
              <HotelBestItem
                hotel={hotel!}
                isLike={isLike}
                onLike={likeMutate}
              />
              <Spacing size={20} />
            </SwiperSlide>
          )
        })}
      </Swiper>

      <Spacing size={8} backgroundColor="gray100" css={spacingStyle} />

      <Top title="전체 호텔" subtitle="호텔부터 펜션까지 최저가" />

      <InfiniteScroll
        dataLength={hotels?.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        // scrollThreshold={0.9} // 스크롤 임계점 (스크롤 90% 이상 되면 다음 페이지 로드)
      >
        <ul>
          {hotels?.map((hotel, idx) => (
            <Fragment key={hotel.id}>
              <HotelItem
                hotel={hotel}
                isLike={Boolean(
                  likes?.find((like) => like.hotelId === hotel.id),
                )} // 찜한 목록에 있는지 확인
                onLike={likeMutate}
              />
              {idx !== hotels.length - 1 && (
                // 마지막 요소는 여백 제거
                <Spacing
                  size={8}
                  backgroundColor="gray100"
                  css={spacingStyle}
                />
              )}
            </Fragment>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

const spacingStyle = css`
  margin: 20px 0;
`

const swiperStyle = css`
  .swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal {
    margin-bottom: -50px !important;
  }

  .swiper-pagination-bullet-active {
    background-color: #000;
  }
`

const WrappedHotelListPage = withSuspense(HotelList, {
  fallback: (
    <FullPageLoader
      message="데이터를 불러오는 중입니다."
      imgSrc="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-44-718_512.gif"
    />
  ),
})

export default WrappedHotelListPage
