import FixedBottomButton from '@/components/shared/FixedBottomButton'
import RangePicker from '@/components/shared/RangePicker'
import qs from 'qs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SchedulePage = () => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string
    endDate?: string
    nights: number
    isDuplicateDate: boolean
  }>({
    startDate: undefined,
    endDate: undefined,
    nights: 0, // 몇 박인지
    isDuplicateDate: true,
  })

  const { hotelId = '', roomId = '' } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { hotelId: string; roomId: string } // ignoreQueryPrefix는 쿼리스트링 앞에 ?를 없애고 가져오는 옵션

  // const isDateRangeSelected = selectedDate.startDate && selectedDate.endDate
  const buttonLabel = selectedDate.startDate
    ? `${selectedDate.startDate} - ${selectedDate.endDate} (${selectedDate.nights}박)`
    : '예약 날짜를 선택해주세요'

  const moveToReservationPage = () => {
    const params = qs.stringify(
      {
        hotelId,
        roomId,
        ...selectedDate,
      },
      {
        addQueryPrefix: true,
      },
    )
    navigate(`/reservation${params}`)
  }

  //* 쿼리 값이 유실될 수도 있으니 혹시 모를 상황을 대비해 없을 경우 대응 (뒤로가기 처리)
  useEffect(() => {
    if (hotelId === '' || roomId === '') return window.history.back()
  }, [hotelId, roomId])

  return (
    <div>
      캘린더 페이지
      <RangePicker
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChange={(dateRange) => {
          console.log('사용처', dateRange)
          setSelectedDate({
            startDate: dateRange.from,
            endDate: dateRange.to,
            nights: dateRange.nights,
            isDuplicateDate: dateRange.isDuplicateDate,
          })
        }}
      />
      <FixedBottomButton
        label={buttonLabel}
        disabled={selectedDate.isDuplicateDate}
        onClick={moveToReservationPage}
      />
    </div>
  )
}

export default SchedulePage
