import useRecommendHotels from '@/components/hotel/hooks/useRecommendHotels'
import Button from '@/components/shared/Button'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import addDelimiter from '@/utils/addDelimiter'
import { css } from '@emotion/react'
import { useState } from 'react'

const RecommendHotels = ({
  recommendHotels,
}: {
  recommendHotels: string[]
}) => {
  const { data, isLoading } = useRecommendHotels({ hotelIds: recommendHotels })
  const [showMore, setShowMore] = useState(false)

  console.log('data', data)

  if (!data || isLoading) return null

  // 추천 호텔이 3개 이하면 그대로 보여주고 이상이면 3개만 보여주고 더보기 버튼 추가
  const hotelList = data.length < 3 || showMore ? data : data.slice(0, 3)

  return (
    <div style={{ margin: '24px 0' }}>
      <Text bold typography="t4" style={{ padding: '0 24px' }}>
        추천 호텔
      </Text>
      <Spacing size={16} />
      <ul>
        {hotelList.map((hotel) => (
          <ListRow
            key={hotel.id}
            left={
              <img
                src={hotel.mainImageUrl}
                alt={hotel.name}
                css={imageStyles}
              />
            }
            contents={
              <ListRow.ListRowTexts
                title={hotel.name}
                subTitle={`${addDelimiter(hotel.price)}원`}
              />
            }
          />
        ))}
      </ul>
      {/* 추천 호텔이 3개 이하거나 showMore가 false면 */}
      {data.length > 3 && !showMore ? (
        <div style={{ padding: '0 24px', marginTop: '16px' }}>
          <Button full weak onClick={() => setShowMore((prev) => !prev)}>
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  )
}

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`

export default RecommendHotels
