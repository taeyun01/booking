import { DateRange, DayPicker } from 'react-day-picker'
import { ko } from 'date-fns/locale'

import { differenceInDays, format, isSameDay, parseISO } from 'date-fns'
import styled from '@emotion/styled'
import { colors } from '@/styles/colorPalette'

interface RangePickerProps {
  startDate?: string
  endDate?: string
  onChange: (dateRange: {
    from?: string
    to?: string
    nights: number // 몇 박인지
    isDuplicateDate: boolean
  }) => void
}

const RangePicker = ({ startDate, endDate, onChange }: RangePickerProps) => {
  const today = new Date()

  // 날짜 선택 시 호출되는 함수
  const handleDayClick = (dateRange: DateRange | undefined) => {
    if (!dateRange) {
      return
    } // dateRange가 undefined일 때는 동작 x

    // console.log('dateRange', dateRange)

    const { from, to } = dateRange

    // 1. 중복된 날짜 인지 (from, to가 둘 다 같을 때)
    if (from && to && isSameDay(from, to)) {
      console.log('중복된 날짜')
      onChange({
        from: from ? format(from, 'yyyy-MM-dd') : undefined,
        to: to ? format(to, 'yyyy-MM-dd') : undefined,
        nights: from && to ? differenceInDays(to, from) : 0,
        isDuplicateDate: true,
      })
      return
    }

    onChange({
      from: from ? format(from, 'yyyy-MM-dd') : undefined,
      to: to ? format(to, 'yyyy-MM-dd') : undefined,
      nights: from && to ? differenceInDays(to, from) : 0, // from, to가 둘 다 존재 할 때, 두개 날짜를 계산해서 몇 박인지 계산, 하나라도 선택이 되어있지 않으면 0박
      isDuplicateDate: false,
    })
  }

  const selected = {
    from: startDate ? parseISO(startDate) : undefined,
    to: endDate ? parseISO(endDate) : undefined,
  }

  return (
    <Container>
      <DayPicker
        mode="range"
        numberOfMonths={5}
        locale={ko}
        defaultMonth={today}
        onSelect={handleDayClick}
        selected={selected}
      />
    </Container>
  )
}

const Container = styled.div`
  padding-bottom: 80px;

  .rdp-month {
    position: relative;
    width: 100%;
    text-align: center;
    padding: 60px 0px 30px;
  }

  .rdp-month_caption {
    position: absolute;
    top: 25px;
    left: 20px;
    color: ${colors.black};
    font-weight: bold;
  }

  .rdp-nav {
    display: none;
  }

  .rdp-month table {
    width: 100%;
  }

  thead .rdp-weekdays {
    font-size: 12px;
    height: 45px;
    color: ${colors.gray400};
    font-weight: bold;
  }

  .rdp-weeks .rdp-week {
    height: 45px;
  }

  .rdp-day button {
    position: relative;
    width: 100%;
    line-height: 45px;
  }

  .rdp-range_start,
  .rdp-range_end {
    color: ${colors.white};
    background-color: ${colors.blue980};
  }

  .rdp-range_middle {
    background-color: ${colors.blue200};
  }
`

export default RangePicker
