import ListRow from '@/components/shared/ListRow'
import FixedBottomButton from '@/components/shared/FixedBottomButton'

import {
  DragDropContext,
  Droppable,
  Draggable,
  // DraggableProps,
  DropResult,
  DroppableProps,
} from 'react-beautiful-dnd'
import { useEffect, useState } from 'react'
import useEditLike from '@/components/settings/like/hooks/useEditLike'
import Top from '@/components/shared/Top'
import Text from '@/components/shared/Text'

import { Virtuoso } from 'react-virtuoso'

import withSuspense from '@/components/shared/hocs/withSuspense'
import FullPageLoader from '@/components/shared/FullPageLoader'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

// react-beautiful-dnd 참고 : https://highero.tistory.com/entry/react-beautiful-dnd-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%A1%9C-%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD-%EC%B0%A2%EA%B8%B0
const LikePage = () => {
  const { data, isEdit, reorder, save } = useEditLike()

  // console.log(data)

  const handleDragEndDrop = (result: DropResult) => {
    // DropResult안에는 목적지에 대한 정보가 들어있음. 목적지가 없으면 아무것도 하지 않음
    if (!result.destination) return

    const from = result.source.index
    const to = result.destination.index

    reorder(from, to)
  }

  return (
    <ContainerStyles>
      <Top
        title="찜한 목록"
        subtitle="찜한 목록을 드래그하여 순서를 변경해보세요"
      />

      {!data!.length && (
        <Text style={{ padding: '0 24px' }} typography="t6">
          찜한 목록이 없습니다.
        </Text>
      )}

      <DragDropContext onDragEnd={handleDragEndDrop}>
        <StrictModeDroppable droppableId="likes">
          {(droppableProps) => (
            <ul
              ref={droppableProps.innerRef}
              {...droppableProps.droppableProps}
            >
              <Virtuoso
                useWindowScroll // 가상 스크롤 사용
                increaseViewportBy={0} // 시작점
                itemContent={(index, like) => {
                  return (
                    <Draggable
                      key={like.id}
                      draggableId={like.id}
                      index={index}
                    >
                      {(draggableProps) => (
                        <li
                          ref={draggableProps.innerRef}
                          {...draggableProps.draggableProps}
                          {...draggableProps.dragHandleProps}
                        >
                          <ListRow
                            as="div"
                            left={
                              <img
                                src={`${like.hotelMainImageUrl}`}
                                alt={`${like.hotelName}의 이미지`}
                                width={80}
                                height={80}
                                style={{ borderRadius: '4px' }}
                              />
                            }
                            contents={
                              <ListRow.ListRowTexts
                                title={like.hotelName}
                                subTitle={
                                  <Link to={`/hotel/${like.hotelId}`}>
                                    예약하기
                                  </Link>
                                }
                                titleFontSize="t6"
                                isTitleBold={false}
                                subTitleColor="blue"
                                isSubTitleBold={true}
                                spacing={4}
                              />
                            }
                          />
                        </li>
                      )}
                    </Draggable>
                  )
                }}
                data={data}
              />
            </ul>
          )}
        </StrictModeDroppable>
      </DragDropContext>

      {isEdit && <FixedBottomButton label="저장하기" onClick={save} />}
    </ContainerStyles>
  )
}

// 리액트18이상 strict mode에서 Droppable가 버그가 있어서 만든 컴포넌트
const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    // 언마운트 됐을 때
    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (!enabled) return null

  return <Droppable {...props}>{children}</Droppable>
}

const ContainerStyles = styled.div`
  background-color: white;
  height: 100%;
  min-height: 100dvh;
  max-height: 100%;
`

const WrappedLikePage = withSuspense(LikePage, {
  fallback: (
    <FullPageLoader
      message="데이터를 불러오는 중입니다."
      imgSrc="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-44-718_512.gif"
    />
  ),
})

export default WrappedLikePage
