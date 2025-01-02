import { useParams } from 'react-router-dom'
import useReservations from '@/components/reservation-list/hooks/useReservation'
import Top from '@/components/shared/Top'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { css } from '@emotion/react'

import withSuspense from '@/components/shared/hocs/withSuspense'
import FullPageLoader from '@/components/shared/FullPageLoader'

const ReservationDetails = () => {
  const { id } = useParams() as { id: string }
  const { data } = useReservations()

  // 예약id가 같은 데이터 가져옴
  const reservationData = data?.find((item) => item.reservation.id === id)

  const { hotel, reservation } = reservationData!

  return (
    <div>
      <Top title="예약 내역" subtitle="예약 내역을 확인해보세요" />

      <Flex direction="column" css={containerStyle} gap={4}>
        <img src={hotel.mainImageUrl} alt={hotel.name} css={imageStyle} />

        <Spacing size={12} />

        <Text typography="t5" bold>
          {hotel.name}
        </Text>

        <Text typography="t6">
          예약 날짜: {reservation.startDate} ~ {reservation.endDate}
        </Text>

        <Text typography="t6">예약자: {reservation.formValues.name}</Text>

        <Text typography="t6">
          흡연 유무:{' '}
          {reservation.formValues.isSmoke === 'true'
            ? '흡연함'
            : reservation.formValues.isSmoke === 'false'
              ? '흡연안함'
              : '상관없음'}
        </Text>

        <Text typography="t6">
          총 금액: {reservation.price.toLocaleString()}원
        </Text>

        <Text typography="t6">
          요청사항: {reservation.formValues.special_request || '없음'}
        </Text>
      </Flex>
    </div>
  )
}

const containerStyle = css`
  background-color: #fff;
  padding: 0 24px;
`

const imageStyle = css`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`

const WrappedReservationDetails = withSuspense(ReservationDetails, {
  fallback: (
    <FullPageLoader
      message="데이터를 불러오는 중입니다."
      imgSrc="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-44-718_512.gif"
    />
  ),
})

export default WrappedReservationDetails
