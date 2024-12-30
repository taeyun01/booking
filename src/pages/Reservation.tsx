import { parse } from 'qs'
import { useEffect } from 'react'
import useReservation from '@/components/reservation/hooks/useReservation'
import Summary from '@/components/reservation/Summary'
import Spacing from '@/components/shared/Spacing'

const ReservationPage = () => {
  const { hotelId, roomId, startDate, endDate, nights } = parse(
    window.location.search,
    {
      ignoreQueryPrefix: true,
    },
  ) as {
    hotelId: string
    roomId: string
    startDate: string
    endDate: string
    nights: string
  }

  const { data, isLoading } = useReservation({ hotelId, roomId })

  console.log(data)

  useEffect(() => {
    const queryParams = [startDate, roomId, startDate, endDate, nights].some(
      (param) => param === null,
    )

    // 쿼리 값이 유실됐을 경우 뒤로가기
    if (queryParams) {
      window.history.back()
    }
  }, [hotelId, roomId, startDate, endDate, nights])

  if (!data || isLoading) return null

  const { hotel, room } = data

  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />
      <Spacing size={8} backgroundColor="gray100" />
    </div>
  )
}

export default ReservationPage
