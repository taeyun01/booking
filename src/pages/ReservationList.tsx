import useReservations from '@/components/reservation-list/hooks/useReservation'
import FullPageLoader from '@/components/shared/FullPageLoader'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'

import withSuspense from '@/components/shared/hocs/withSuspense'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const ReservationListPage = () => {
  const { data } = useReservations()

  return (
    <ContainerStyles>
      <Top title="내 예약 목록" subtitle="예약 목록을 확인해보세요" />

      {!data?.length && (
        <Text style={{ padding: '0 24px' }} bold>
          예약 목록이 없습니다.
        </Text>
      )}

      {data?.map(({ hotel, reservation }) => (
        <Link
          to={`/reservation/details/${reservation.id}`}
          key={reservation.id}
        >
          <ListRow
            left={
              <img
                style={{ borderRadius: '4px' }}
                src={hotel.mainImageUrl}
                alt={`${hotel.name} 이미지`}
                width={80}
                height={80}
              />
            }
            contents={
              <ListRow.ListRowTexts
                title={hotel.name}
                subTitle={`${reservation.startDate} ~ ${reservation.endDate}`}
              />
            }
          />
        </Link>
      ))}
    </ContainerStyles>
  )
}

const ContainerStyles = styled.div`
  background-color: white;
  height: 100%;
  min-height: 100dvh;
  max-height: 100%;
`

const WrappedReservationListPage = withSuspense(ReservationListPage, {
  fallback: (
    <FullPageLoader
      message="데이터를 불러오는 중입니다."
      imgSrc="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-44-718_512.gif"
    />
  ),
})

export default WrappedReservationListPage
