import { parse } from 'qs'
import { useEffect } from 'react'
import useReservation from '@/components/reservation/hooks/useReservation'
import Summary from '@/components/reservation/Summary'
import Spacing from '@/components/shared/Spacing'
import Form from '@/components/reservation/Form'
import addDelimiter from '@/utils/addDelimiter'

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

  // console.log(data)

  // 값을 받아 처리하는것만 신경쓰면 됨
  const handleSubmit = () => {
    console.log('dd')
  }

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

  // 일정에 따라 가격 표시
  const buttonLabel = `${nights}박 ${addDelimiter(room.price * Number(nights))}원 예약하기`

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
      <Form
        onSubmit={handleSubmit}
        forms={hotel.form}
        buttonLabel={buttonLabel}
      />
    </div>
  )
}

export default ReservationPage
