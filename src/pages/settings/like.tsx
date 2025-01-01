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

const LikePage = () => {
  const { data, isEdit, reorder, save } = useEditLike()

  const handleDragEndDrop = (result: DropResult) => {
    // DropResult안에는 목적지에 대한 정보가 들어있음. 목적지가 없으면 아무것도 하지 않음
    if (!result.destination) return

    const from = result.source.index
    const to = result.destination.index

    reorder(from, to)
  }

  if (!data) return null

  return (
    <div>
      <Top title="찜한 목록" subtitle="" />

      {!data.length && (
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
              {data.map((like, index) => (
                <Draggable key={like.id} draggableId={like.id} index={index}>
                  {(draggableProps) => (
                    <li
                      ref={draggableProps.innerRef}
                      {...draggableProps.draggableProps}
                      {...draggableProps.dragHandleProps}
                    >
                      <ListRow
                        as="div"
                        contents={
                          <ListRow.ListRowTexts
                            title={like.order}
                            subTitle={like.hotelName}
                          />
                        }
                      />
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </StrictModeDroppable>
      </DragDropContext>

      {isEdit && <FixedBottomButton label="저장하기" onClick={save} />}
    </div>
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

export default LikePage
