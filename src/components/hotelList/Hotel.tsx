import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { Hotel as IHotel } from '@/models/hotel'
import addDelimiter from '@/utils/addDelimiter'

import { css } from '@emotion/react'

// 호텔 정보를 표시하는 컴포넌트
const Hotel = ({ hotel }: { hotel: IHotel }) => {
  return (
    <div>
      <ListRow
        contents={
          <Flex direction="column">
            {' '}
            <ListRow.ListRowTexts
              title={hotel.name}
              subTitle={hotel.comment}
            ></ListRow.ListRowTexts>
            <Spacing size={4} />
            <Text typography="t7" color="gray600">
              {hotel.starRating} 성급
            </Text>
          </Flex>
        }
        right={
          <Flex direction="column" align="flex-end">
            <img src={hotel.mainImageUrl} alt={hotel.name} css={imageStyles} />
            <Spacing size={8} />
            <Text bold>{addDelimiter(hotel.price)}원</Text>
          </Flex>
        }
        style={containerStyles}
      />
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
export default Hotel
