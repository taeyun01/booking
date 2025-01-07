import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Tag from '@/components/shared/Tag'
import Text from '@/components/shared/Text'
import { Hotel } from '@/models/hotel'
import addDelimiter from '@/utils/addDelimiter'

import { css } from '@emotion/react'
import { differenceInMilliseconds, parseISO } from 'date-fns'
import formatTime from '@/utils/fromatTime'
import { MouseEvent, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

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
  // 남은 시간을 저장하는 상태
  const [remainedTime, setRemainedTime] = useState(0)

  // console.log(remainedTime)

  const tagComponent = () => {
    if (!hotel.event) {
      return null
    }

    const { name, tagThemeStyle } = hotel.event

    const promotionText =
      remainedTime > 0 ? `- ${formatTime(remainedTime)}남음` : ''

    return (
      <div>
        <Tag
          color={tagThemeStyle.fontColor}
          backgroundColor={tagThemeStyle.backgroundColor}
        >
          {name.concat(promotionText)}
        </Tag>
        <Spacing size={8} />
      </div>
    )
  }

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

  useEffect(() => {
    // 이벤트가 진행중이 아니거나 이벤드가 진행중인데 핫딜 종료 시간이 없으면 인터벌 안함
    if (!hotel.event || !hotel.event.promoEndTime) {
      return
    }

    const promoEndTime = hotel.event.promoEndTime

    const timer = setInterval(() => {
      const remainingMilliseconds = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date(),
      )

      // 남은 초가 0보다 작으면 타이머 종료
      if (remainingMilliseconds < 0) {
        return clearInterval(timer)
      }

      // 남은 초를 상태에 저장해서 1초마다 실시간으로 업데이트
      setRemainedTime(remainingMilliseconds)
    }, 1000)

    return () => clearInterval(timer)
  }, [hotel.event])

  return (
    <Link to={`/hotel/${hotel.id}`}>
      <Flex direction="column" css={containerStyles}>
        {tagComponent()}
        <Text bold>{hotel.name}</Text>
        <Flex direction="row" justify="space-between">
          <Text typography="t7">{hotel.comment}</Text>
          <Text typography="t7" color="gray600">
            {hotel.starRating} 성급{' '}
          </Text>
        </Flex>

        <Spacing size={8} />

        <img
          src={hotel.mainImageUrl}
          alt={hotel.name}
          style={{
            width: '100%',
            height: '100%',
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
  padding: 0 24px;
`

const iconHeartStyles = css`
  width: 25px;
  height: 25px;
`

export default HotelBestItem
