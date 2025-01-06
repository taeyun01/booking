import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
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

// 호텔 정보를 표시하는 컴포넌트
const HotelItem = ({
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

    // promoEndTime과 현재 시간을 비교해서 남은 시간을 초 단위로 출력

    return (
      <div>
        {/* 서버에서 내려주는 tagThemeStyle마다 다른 색상 값을 표현 */}
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

  // 찜하기 버튼을 누르면 현재 감싸져있는 a태그 때문에 페이지가 이동하는 이슈가 있음
  // 찜하기 버튼만 누를때는 페이지가 이동하지 않도록 처리
  const handleLike = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault() // 페이지 이동을 죽여놓기

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
    <div>
      <Link to={`/hotel/${hotel.id}`}>
        <ListRow
          contents={
            <Flex direction="column">
              {/* 태그 (이벤트가 진행중인 호텔들만 태그 추가) 조건문 같은게 들어가면 지저분해 지니까 위에 따로 빼서 사용*/}
              {tagComponent()}
              <ListRow.ListRowTexts
                title={hotel.name}
                subTitle={hotel.comment}
              ></ListRow.ListRowTexts>
              <Spacing size={4} />
              <Text typography="t7" color="gray600">
                {hotel.starRating} 성급{' '}
              </Text>
              <Spacing size={4} />
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
            </Flex>
          }
          right={
            <Flex
              direction="column"
              align="flex-end"
              style={{ position: 'relative' }}
            >
              <img
                src={hotel.mainImageUrl}
                alt={hotel.name}
                css={imageStyles}
              />
              <Spacing size={8} />
              <Text bold>{addDelimiter(hotel.price)}원</Text>
            </Flex>
          }
          style={containerStyles}
        />
      </Link>
    </div>
  )
}

const containerStyles = css`
  align-items: flex-start;
`

// 이미지는 고정된 스타일을 가지고 있기 때문에 리렌더링 될때마다 새로운 스타일을 생성하지 않기위해 이렇게 한번 만들어놓고 가져다 쓰는게 성능적으로 좋음
const imageStyles = css`
  width: 90px;
  height: 110px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 16px;
`

const iconHeartStyles = css`
  width: 25px;
  height: 25px;
`

export default HotelItem
