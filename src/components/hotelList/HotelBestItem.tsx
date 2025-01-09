import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { Hotel } from '@/models/hotel'
import addDelimiter from '@/utils/addDelimiter'

import { css } from '@emotion/react'
import { MouseEvent } from 'react'

import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

// 인기 호텔 정보
const HotelBestItem = ({
  hotel,
  isLike,
  onLike,
}: {
  hotel: Hotel
  isLike: boolean
  onLike: ({
    hotel,
  }: {
    hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'>
  }) => void
}) => {
  // 찜하기 버튼만 누를때는 페이지가 이동하지 않도록 처리
  const handleLike = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault()

    onLike({
      hotel: {
        name: hotel.name,
        mainImageUrl: hotel.mainImageUrl,
        id: hotel.id,
      },
    })
  }

  return (
    <Link to={`/hotel/${hotel.id}`}>
      <Flex direction="column" css={containerStyles}>
        <Flex justify="space-between" align="center">
          <Text bold css={textStyles}>
            {hotel.name}
          </Text>

          <Text typography="t7" color="gray600" style={{ textAlign: 'right' }}>
            {hotel.starRating} 성급{' '}
          </Text>
        </Flex>

        <Spacing size={4} />

        <LazyLoadImage
          src={hotel.mainImageUrl}
          alt={hotel.name}
          style={{
            width: '100%',
            height: '160px',
            borderRadius: '8px',
            objectFit: 'cover',
          }}
        />

        <Spacing size={8} />

        <Flex direction="column" align="flex-end">
          <img
            css={iconHeartStyles}
            src={
              isLike
                ? 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-64.png'
                : 'https://cdn3.iconfinder.com/data/icons/feather-5/24/heart-64.png'
            }
            alt="찜 이미지"
            onClick={handleLike}
          />

          <Spacing size={4} />

          <Text bold>{addDelimiter(hotel.price)}원</Text>
        </Flex>
      </Flex>
    </Link>
  )
}

const containerStyles = css`
  // padding: 0 24px;
  // padding-left: 24px;
  // padding-right: 16px;
`

const iconHeartStyles = css`
  width: 25px;
  height: 25px;
`

const textStyles = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  flex: 1;
`

export default HotelBestItem
