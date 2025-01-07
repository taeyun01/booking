import { parse } from 'qs'
import { useEffect } from 'react'
import useReservation from '@/components/reservation/hooks/useReservation'
import Summary from '@/components/reservation/Summary'
import Spacing from '@/components/shared/Spacing'
import Form from '@/components/reservation/Form'
import addDelimiter from '@/utils/addDelimiter'
import useUser from '@/hooks/auth/useUser'
import { useNavigate } from 'react-router-dom'

import withSuspense from '@/components/shared/hocs/withSuspense'
import FullPageLoader from '@/components/shared/FullPageLoader'

const ReservationPage = () => {
  const user = useUser()
  const navigate = useNavigate()

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

  const { data, isLoading, makeReservation } = useReservation({
    hotelId,
    roomId,
  })

  // console.log(data)

  // 값을 받아 처리하는것만 신경쓰면 됨
  const handleSubmit = async (formValues: { [key: string]: string }) => {
    // console.log('formValues', formValues) // 예약 정보 폼 데이터
    const newReservation = {
      userId: user?.uid as string,
      hotelId,
      roomId,
      startDate,
      endDate,
      price: room.price * Number(nights),
      formValues,
    }

    // 예약하기
    await makeReservation(newReservation)

    // 예약 완료 후 예약 완료 페이지로 이동
    navigate(`/reservation/done?hotelName=${hotel.name}`)
  }

  useEffect(() => {
    const queryParams = [
      user,
      startDate,
      roomId,
      startDate,
      endDate,
      nights,
    ].some((param) => param === null)

    // 유저나, 쿼리 값이 유실됐을 경우 뒤로가기 (유저 세션이 만료됐을 경우도)
    if (queryParams) {
      window.history.back()
    }
  }, [user, hotelId, roomId, startDate, endDate, nights])

  if (!data || isLoading) return null

  const { hotel, room } = data

  // 일정에 따라 가격 표시
  const buttonLabel = `${nights}박 ${Number(nights) + 1}일 ${addDelimiter(room.price * Number(nights))}원 예약하기`

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

const WrappedReservationPage = withSuspense(ReservationPage, {
  fallback: (
    <FullPageLoader
      message="데이터를 불러오는 중입니다."
      imgSrc="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-44-718_512.gif"
    />
  ),
})

export default WrappedReservationPage
