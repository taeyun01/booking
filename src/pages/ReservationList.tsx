import useReservations from '@/components/reservation-list/hooks/useReservation'
import ListRow from '@/components/shared/ListRow'
import Top from '@/components/shared/Top'

const ReservationListPage = () => {
  const { data, isLoading } = useReservations()

  if (!data || isLoading) return null

  return (
    <div>
      <Top title="내 예약 목록" subtitle="예약 목록을 확인해보세요" />

      {data.map(({ hotel, reservation }) => (
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

export default ReservationListPage
