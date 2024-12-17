//* 객실을 담당하는 컴포넌트

import useRooms from '@/components/hotel/hooks/useRooms'
import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import Tag from '@/components/shared/Tag'
import Text from '@/components/shared/Text'
import addDelimiter from '@/utils/addDelimiter'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Rooms = ({ hotelId }: { hotelId: string }) => {
  const { data } = useRooms({ hotelId })

  // console.log('data', data)

  return (
    <Container>
      <Header justify="space-between" align="center">
        <Text bold typography="t4">
          객실정보
        </Text>
        <Text typography="t6" color="gray400">
          1박, 세금포함
        </Text>
      </Header>
      <ul>
        {data?.map((room) => {
          const isClosingToDeadline = room.avaliableCount === 1 // 잔여객실 수가 1개면 마감임박
          const isSoldOut = room.avaliableCount === 0 // 잔여객실 수가 0개면 매진

          return (
            <ListRow
              left={
                <img
                  src={room.imageUrl}
                  alt={`${room.roomName}의 객실 이미지`}
                  css={imageStyles}
                />
              }
              key={room.id}
              contents={
                <ListRow.ListRowTexts
                  title={
                    <Flex>
                      <Text>{room.roomName}</Text>
                      {isClosingToDeadline === true ? (
                        <>
                          <Spacing size={6} direction="horizontal" />
                          <Tag backgroundColor="red">마감임박</Tag>
                        </>
                      ) : null}
                    </Flex>
                  }
                  subTitle={`${addDelimiter(room.price)}원 / `.concat(
                    room.refundable ? '환불가능' : '환불불가',
                  )}
                />
              }
              right={
                <Button size="medium" disabled={isSoldOut}>
                  {isSoldOut ? '매진' : '선택'}
                </Button>
              }
            />
          )
        })}
      </ul>
    </Container>
  )
}

const Container = styled.div`
  margin: 40px 0;
`

//* Flex의 스타일은 가져가되, 스타일을 추가로 확장하여 사용할 수 있음
const Header = styled(Flex)`
  padding: 0 24px;
  margin-bottom: 20px;
`

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`

export default Rooms
