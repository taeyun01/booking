import { DateRange, DayPicker } from 'react-day-picker'
import { ko } from 'date-fns/locale'

import { differenceInDays, format, isSameDay, parseISO } from 'date-fns'

interface RangePickerProps {
  startDate?: string
  endDate?: string
  onChange: (dateRange: {
    from?: string
    to?: string
    nights: number // 몇 박인지
  }) => void
}

const RangePicker = ({ startDate, endDate, onChange }: RangePickerProps) => {
  const today = new Date()

  // 날짜 선택 시 호출되는 함수
  const handleDayClick = (dateRange: DateRange | undefined) => {
    // console.log('dateRange', dateRange)
    if (!dateRange) return // dateRange가 undefined일 때는 동작 x

    const { from, to } = dateRange

    // 1. 중복된 날짜 인지 (from, to가 둘 다 같을 때는 동작 x) 중복된 날짜가 선택되지 않도록
    if (from && to && isSameDay(from, to)) return

    onChange({
      from: from ? format(from, 'yyyy-MM-dd') : undefined,
      to: to ? format(to, 'yyyy-MM-dd') : undefined,
      nights: from && to ? differenceInDays(to, from) : 0, // from, to가 둘 다 존재 할 때, 두개 날짜를 계산해서 몇 박인지 계산, 하나라도 선택이 되어있지 않으면 0박
    })
  }

  const selected = {
    from: startDate ? parseISO(startDate) : undefined,
    to: endDate ? parseISO(endDate) : undefined,
  }

  return (
    <DayPicker
      mode="range"
      numberOfMonths={5}
      locale={ko}
      defaultMonth={today}
      onSelect={handleDayClick}
      selected={selected}
    />
  )
}

export default RangePicker
