import useAlert from '@/hooks/alert/useAlert'
import useLike from '@/hooks/like/useLike'
import { Like } from '@/models/like'
import { updateOrder } from '@/remote/like'
import { useCallback, useState, useEffect } from 'react'

import { useQueryClient } from 'react-query'

const useEditLike = () => {
  const { data } = useLike()
  const showAlert = useAlert()
  const queryClient = useQueryClient()

  // 유저가 찜목록 순서를 바꿨을 때, 바뀐 순서를 렌더링
  const [updatedLikes, setUpdatedLikes] = useState<Like[]>([])

  // 유저가 순서를 변경했는지 않했는지 구분하는 값
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    // data가 있으면 updatedLikes(찜목록) 기본값을 data로 설정
    if (data) setUpdatedLikes(data)
  }, [data])

  // 순서 재정렬
  const reorder = useCallback((from: number, to: number) => {
    setIsEdit(true) // 순서 재정렬 시 순서 수정을 했다는 상태 값 설정
    // console.log('from: ', from, 'to: ', to) // 순서 변경 확인

    // 계속 변화된 최신 데이터를 누적할 수 있도록 함수형 업데이트를 사용
    setUpdatedLikes((prevUpdatedLikes) => {
      const newItems = [...prevUpdatedLikes]

      const [fromItem] = newItems.splice(from, 1)

      if (fromItem) {
        newItems.splice(to, 0, fromItem)
      }

      // 순서 변경 후 순서 번호 재정렬
      newItems.forEach((like, index) => {
        like.order = index + 1
      })

      return newItems
    })
  }, [])

  const save = async () => {
    try {
      await updateOrder(updatedLikes)

      // likes키 값을 가진 쿼리의 데이터를 업데이트 된 대상으로 업데이트. 새롭게 패치를 하지 않더라도 캐시된 데이터를 갈아치우면서 업데이트가 된 효과를 낼 수 있다.
      // 순서가 변경되면 바로 반영되도록 캐시 데이터를 업데이트
      queryClient.setQueryData(['likes'], updatedLikes)

      showAlert({
        title: '저장되었습니다.',
        description: '찜 목록의 순서가 저장되었습니다.',
      })
      setIsEdit(false) // 순서 수정 상태값 초기화
    } catch (error) {
      showAlert({
        title: '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
        description: `${error}`,
        onButtonClick: () => {
          setIsEdit(false) // 순서 수정 상태값 초기화
        },
      })
    }
  }

  return { data: isEdit ? updatedLikes : data, isEdit, reorder, save }
}

export default useEditLike
