import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants'
import { Review } from '@/models/review'
import { User } from '@/models/user'

// 해당 호텔에 있는 리뷰를 가져오기 때문에 호텔id가 필요함.
export const getReviews = async ({ hotelId }: { hotelId: string }) => {
  // 호텔 정보 가져오기 (HOTLE 컬렉션에 접근하여 hotelId가 가지고 있는 문서를 가져옴)
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId)

  // 호텔이 가지고 있는 리뷰 불러오기
  const reviewsQuery = query(
    collection(hotelRef, COLLECTIONS.REVIEW), // 컬렉션 REVIEW에 접근하겠다. 근데 얘는 HOTEL 컬렉션 아래에 있는 서브 컬렉션이다.
    orderBy('createdAt', 'desc'), // 작성일 순으로 정렬 (내림차순 정렬)
  )

  const reviewSnapshot = await getDocs(reviewsQuery) // 쿼리를 실행하여 리뷰 문서 데이터를 가져옴

  const reviews = reviewSnapshot.docs.map((doc) => {
    const review = doc.data()

    return {
      id: doc.id, // 문서의 id를 정의해주고
      ...review, // 리뷰 데이터를 반환해줌
      createdAt: review.createdAt.toDate() as Date, // createdAt이 Date타입으로 돼있는데, 파이어베이스에서 Date타입을 저장할때 파이어베이스 타임스탬프로 바꿔버림. 그래서 가지고 올때는 다시 Date타입으로 변환해줘야 함.
    } as Review
  })

  // 만약 리뷰가 3개있다고 해보자 1 = A라는 애가 작성, 2 = B, 3 = A 또 작성
  // A라고 하는 유저 정보는 한 번만 부르면 되는데 쭉 순회를 해버리면 A의 정보를 두 번 부르게됨.
  // 그럼 비효율적이니까 캐시를 사용

  const userMap: {
    [key: string]: User
  } = {}

  // 결과를 담을 배열 (배열 타입은 리뷰의 정보도 가지고 있고 유저의 정보도 가지고 있음)
  const result: Array<Review & { user: User }> = []

  // 리뷰를 순회
  for (const review of reviews) {
    const cachedUser = userMap[review.userId] // 이 리뷰가 가지고 있는 유저 아이디를 가지고 캐시된 유저가 있는지 한번 살펴봄

    // 캐시된 유저가 없다면 유정의 정보를 호출해서 가져옴
    if (!cachedUser) {
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), review.userId), // 캐시된 유저가 없다면 유저 아이디로 유저를 찾음
      )
      const user = userSnapshot.data() as User

      userMap[review.userId] = user

      result.push({
        ...review, // 리뷰의 정보를 추가
        user, // 유저의 정보를 추가
      })
    } else {
      // 캐시된 유저가 있다면 캐시된 유저를 사용
      // 같은 유저가 작성한 리뷰라면 유저의 정보를 다시 호출하지 않음 (캐시된 유저를 사용) //* 성능개선
      result.push({
        ...review,
        user: cachedUser,
      })
    }
  }

  return result
}

// 추가할 리뷰에 대한 데이터를 받아서 리뷰를 추가하는 함수
// Review 타입은 지금 id를 가지고 있지만 근데 이 id는 문서가 생성될 때 부여되는 id라서 이렇게 추가할 당시에는 아이디가 없다. 그래서 Omit을 사용해 아이디를 제외한 타입을 받도록 만들어줌
export const writeReview = (review: Omit<Review, 'id'>) => {
  // 호텔 정보 가져오기
  const hotelRef = doc(store, COLLECTIONS.HOTEL, review.hotelId)
  // 생성할 리뷰로의 위치를 잡아줌
  const reviewRef = doc(collection(hotelRef, COLLECTIONS.REVIEW))

  // 리류 저장 (reviewRef 위치에 review를 저장)
  return setDoc(reviewRef, review)
}

// 리뷰 삭제 함수
export const removeReview = ({
  reviewId,
  hotelId,
}: {
  reviewId: string
  hotelId: string
}) => {
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId)
  const reviewRef = doc(collection(hotelRef, COLLECTIONS.REVIEW), reviewId) // 삭제할 대상의 아이디를 넘겨주면 해당 호텔과 리뷰를 찾음

  // 해당 문서의 리뷰 삭제
  return deleteDoc(reviewRef)
}
