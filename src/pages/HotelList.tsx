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

const HotelList = () => {
  const { data: hotels, hasNextPage, loadMore } = useHotels()
  const { data: likes, mutate: likeMutate } = useLike()

  return (
    <div>
      <Top title="인기 호텔" subtitle="호텔부터 펜션까지 최저가" />

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

const WrappedHotelListPage = withSuspense(HotelList, {
  fallback: (
    <FullPageLoader
      message="데이터를 불러오는 중입니다."
      imgSrc="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-44-718_512.gif"
    />
  ),
})

export default WrappedHotelListPage
