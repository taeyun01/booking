import RangePicker from '@/components/shared/RangePicker'
import qs from 'qs'
import { useEffect, useState } from 'react'

const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string
    endDate?: string
    nights: number
  }>({
    startDate: undefined,
    endDate: undefined,
    nights: 0, // 몇 박인지
  })

  const { hotelId = '', roomId = '' } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { hotelId: string; roomId: string } // ignoreQueryPrefix는 쿼리스트링 앞에 ?를 없애고 가져오는 옵션

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
          // TODO: 출력 안되는 버그
        }}
      />
    </div>
  )
}

export default SchedulePage
