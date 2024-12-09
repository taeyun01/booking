const formatTime = (ms: number) => {
  // 분, 시간, 일을 초로 환산하기
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  // 넘겨반은 ms(초)를 기준으로 일자를 계산
  const days = Math.floor(ms / day)

  // 남은 일자가 0보다 작다 라는건 이벤트가 종료됐다고 판단
  if (days < 0) {
    return '이벤트 종료'
  }

  // 0보다 크면 이벤트가 진행중이므로 위에서 환산한 초를 기준으로 남은 시간, 분, 초를 계산
  const 남은시간 = Math.floor((ms - days * day) / hour)
  const 남은분 = Math.floor((ms - days * day - 남은시간 * hour) / minute)
  const 남은초 = Math.floor(
    (ms - days * day - 남은시간 * hour - 남은분 * minute) / 1000,
  )

  // 계산한 시간, 분, 초를 2자리로 포맷팅
  const HH = `${남은시간}`.padStart(2, '0') // 2 => 02로 포맷팅
  const MM = `${남은분}`.padStart(2, '0')
  const SS = `${남은초}`.padStart(2, '0')

  // 남은 일자가 0보다 크면 일자를 포함해서 포맷팅, 그게 아니면 당일 이니까 시간만 포맷팅
  return days > 0 ? `${days}일 ${HH}:${MM}:${SS}` : `${HH}:${MM}:${SS}`
}

export default formatTime
