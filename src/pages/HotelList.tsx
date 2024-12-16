import { css } from '@emotion/react'

import HotelItem from '@/components/hotelList/HotelItem'
import Spacing from '@/components/shared/Spacing'
import Top from '@/components/shared/Top'
import useHotels from '@components/hotelList/hooks/useHotels'

import { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const HotelList = () => {
  const { data: hotels, hasNextPage, loadMore } = useHotels()

  if (!hotels) return <div>호텔 정보를 불러오는중...</div>
  return (
    <div>
      <Top title="인기 호텔" subtitle="호텔부터 펜션까지 최저가" />

      <InfiniteScroll
        dataLength={hotels.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        // scrollThreshold={0.9} // 스크롤 임계점 (스크롤 90% 이상 되면 다음 페이지 로드)
      >
        <ul>
          {hotels.map((hotel, idx) => (
            <Fragment key={hotel.id}>
              <HotelItem hotel={hotel} />
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

export default HotelList
