import useReservations from '@/components/reservation-list/hooks/useReservation'
import FullPageLoader from '@/components/shared/FullPageLoader'
import ListRow from '@/components/shared/ListRow'
import Top from '@/components/shared/Top'

import withSuspense from '@/components/shared/hocs/withSuspense'

const ReservationListPage = () => {
  const { data } = useReservations()

  return (
    <div>
      <Top title="내 예약 목록" subtitle="예약 목록을 확인해보세요" />

      {data?.map(({ hotel, reservation }) => (
        <ListRow
          key={reservation.id}
          left={
            <img
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
      ))}
    </div>
  )
}

const WrappedReservationListPage = withSuspense(ReservationListPage, {
  fallback: (
    <FullPageLoader
      message="데이터를 불러오는 중입니다."
      imgSrc="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-44-718_512.gif"
    />
  ),
})

export default WrappedReservationListPage
