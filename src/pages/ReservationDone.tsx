import qs from 'qs'

const ReservationDone = () => {
  const { hotelName } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { hotelName: string }

  return <div>{hotelName} 예약완료</div>
}

export default ReservationDone
