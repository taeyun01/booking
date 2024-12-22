import { COLLECTIONS } from '@/constants'
import { store } from '@/remote/firebase'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import { Like } from '@/models/like'
import { Hotel } from '@/models/hotel'

export const getLikes = async ({ userId }: { userId: string }) => {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE), // LIKE 컬렉션에 접근해서 찜하기 목록 가져오기
      where('userId', '==', userId), // 찜하기 목록중 userId가 일치하는 데이터만 가져옴
      orderBy('order', 'asc'), // 오름차순으로 정렬해서 가져옴 (1,2,3,4,5...)
    ),
  )

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Like,
  )
}

// 이미 찜하기가 되어있다면 -> 삭제
// 찜이 안되어 있다면 -> 추가(저장)
export const toggleLike = async ({
  hotel,
  userId,
}: {
  hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'>
  userId: string
}) => {
  // 호텔을 찜했다면 호텔 id와 이름과 이미지가 넘어옴
  // 그리고 로그인된 userId가 넘어옴
  // 이 호텔이 찜이 되어있는가 확인
  const findSnapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where('userId', '==', userId),
      where('hotelId', '==', hotel.id),
    ),
  )

  //* 찜한 목록에 있으면 삭제
  if (findSnapshot.docs.length > 0) {
    // TODO: 삭제 로직 추가
    // order: 1, 2, 3 중에 2를 삭제하고 싶으면, order를 1, 3으로 둘 수는 없으니까
    // 3은 2로 땡겨줘야함. ex) 1, 2, 3, 4 -> 3번이 삭제되도 -> 1, 2, 3

    // 1, 2(삭제), 3, 4
    // 우선 삭제될 대상을 찾자.
    const removeTarget = findSnapshot.docs[0]
    const removeTargetOrder = removeTarget.data().order

    // 1, 2(삭제), [3, 4] - 1 => [2, 3]으로 땡겨지게
    // [3, 4]를 가져오는 쿼리 작성 (삭제한 order(2)보다 큰 애들을 가져옴)
    const updateTargetSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        where('order', '>', removeTargetOrder),
      ),
    )

    // 삭제한 order보다 더 큰애가 없다면 그냥 얘를 삭제
    if (updateTargetSnapshot.empty) {
      return await deleteDoc(removeTarget.ref) // 비어있다면 그냥 삭제
    } else {
      // 근데 삭제한 문서보다 큰 애가 있으면 ex) 1, 2(삭제), [3, 4] (3,4 큰 애들)
      // 업데이트 해줌
      const batch = writeBatch(store)

      // 업데이트 대상들을 순회하면서 업데이트 (뒤로 땡겨주는 작업)
      updateTargetSnapshot.forEach((doc) => {
        // 배치를 업데이트 해주는데 순회하고 있는 doc이 가지고 있는 order를 -1씩 빼줌
        batch.update(doc.ref, { order: doc.data().order - 1 })
      })

      await batch.commit() // 배치 실행 (업데이트)

      // 업데이트가 완료되면 삭제
      return await deleteDoc(removeTarget.ref)
    }
  } else {
    //* 찜한 목록에 없으면 생성

    // 만약 문서가 2개 저장돼있으면 order가 order = 2 까지 되어있을 것
    // 이번에 생성되는 애들은 3으로 order가 저장되어야함
    // 이렇게 하려면 맨 마지막 문서가 몇 번째의 order인지 알아야함
    // 그러면 맨 마지막 order + 1을 해주면 3이란 값을 얻게됨
    const lastLikeSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE), // 찜한 목록 전부 가져옴
        where('userId', '==', userId), // 내가 찜한 목록만 가져옴
        orderBy('order', 'desc'), // 내가 찜한 목록은 내림차순으로 정렬 (1,2,3 -> 3,2,1)
        limit(1), // 맨 마지막 문서 하나만 가져옴 (3,2,1 문서에서 3만 가져옴 제일 큰 애가 나옴)
      ),
    )

    // 마지막 문서의 order를 가져옴 (문서가 비었다면 0 첫번째다 라고하고, 문서가 있다면 그 문서의 order를 가져옴)
    const lastOrder = lastLikeSnapshot.empty
      ? 0
      : lastLikeSnapshot.docs[0].data().order // 3번 문서의 order를 가져옴

    // 새로운 찜 문서 생성
    const newLike = {
      order: lastOrder + 1,
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelMainImageUrl: hotel.mainImageUrl,
      userId,
    }

    // 새로운 찜 문서 저장
    return setDoc(doc(collection(store, COLLECTIONS.LIKE)), newLike)
  }
}
