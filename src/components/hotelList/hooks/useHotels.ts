import { getHotels } from '@/remote/hotel'
import { useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'

//* 데이터를 불러오는 쪽이랑 화면을 그리는 쪽을 완벽히 분리하기
// 호텔에 대한 데이터를 불러주는 곳
// 밖에서는 이 훅을 통해서 호텔 데이터를 불러오고, 그때 받아지는 데이터들을 그리기만 하도록 만들어줌.
const useHotels = () => {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(['hotels'], ({ pageParam }) => getHotels(pageParam), {
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
  })

  // 다음 페이지를 호출할 수 있나 없나 체크하고 호출하는 함수
  const loadMore = useCallback(() => {
    // 다음 페이지가 없거나 현재 다음 페이지를 가져오는 중이라면 아무런 일도 하지 않음
    if (hasNextPage === false || isFetchingNextPage) {
      return
    }

    // 그게 아니면 다음 페이지를 호출
    fetchNextPage()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  // 페이지 데이터를 펼쳐서 하나의 배열로 만들어줌
  const hotels = data?.pages.flatMap((page) => page.items)

  // console.log(hotels)

  return { data: hotels, loadMore, isFetchingNextPage, hasNextPage }
}

export default useHotels
