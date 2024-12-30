import { css } from '@emotion/react'

import Text from '@/components/shared/Text'
import { Room } from '@/models/room'
import Spacing from '@/components/shared/Spacing'
import Flex from '@/components/shared/Flex'

interface SummaryProps {
  hotelName: string
  room: Room
  startDate: string
  endDate: string
  nights: string
}
const Summary = ({
  hotelName,
  room,
  startDate,
  endDate,
  nights,
}: SummaryProps) => {
  return (
    <div style={{ padding: 24 }}>
      <Text typography="t4" bold>
        {hotelName}
      </Text>

      <Spacing size={8} />

      <img
        src={room.imageUrl}
        alt={`${room.roomName}의 이미지`}
        css={imageStyle}
      />

      <Spacing size={16} />

      <div>
        <Text bold>{room.roomName}</Text>

        <Spacing size={4} />

        <ul css={listStyle}>
          <Flex as="li" justify="space-between">
            <Text color="gray500" typography="t6">
              일정
            </Text>
            <Text typography="t6">{`${startDate} - ${endDate} (${nights}박)`}</Text>
          </Flex>

          {Object.keys(room.basicInfo).map((key) => {
            // 키 값이 INFO_LABEL_MAP에 존재할 경우 렌더링 (타입 해결위해 체크)
            if (key in INFO_LABEL_MAP) {
              return (
                <Flex as="li" justify="space-between" key={key}>
                  <Text color="gray500" typography="t6">
                    {INFO_LABEL_MAP[key as keyof typeof INFO_LABEL_MAP]}{' '}
                    {/* 타입해결 */}
                  </Text>
                  <Text typography="t6">{room.basicInfo[key]}</Text>
                </Flex>
              )
            }
            // 존재하지 않는 키일 경우 렌더링 하지 않음
            return null
          })}
        </ul>
      </div>
    </div>
  )
}

const INFO_LABEL_MAP = {
  bed: '침대',
  maxOccupancy: '최대인원',
  squareMeters: '면적',
  smoke: '흡연여부',
}

const imageStyle = css`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`

const listStyle = css`
  // 마지막 li가 아닐 경우 간격 추가
  li:not(last-child) {
    margin-bottom: 8px;
  }
`
export default Summary
