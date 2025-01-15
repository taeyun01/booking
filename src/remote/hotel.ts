import {
  QuerySnapshot,
  collection,
  limit,
  query,
  startAfter,
  getDocs,
  doc,
  getDoc,
  where,
  documentId,
} from 'firebase/firestore'

import { COLLECTIONS } from '@/constants'

import { store } from './firebase'
import { Hotel } from '@/models/hotel'
import { Room } from '@/models/room'

// 호텔 리스트 데이터를 가져오는 함수
export const getHotels = async (pageParams?: QuerySnapshot<Hotel>) => {
  // 페이지 쿼리
  // pageParams가 없다면 최초의 호출인거고, 있다면 다음 페이지에 대한 요청이기 때문에 처음 호출에는 바로 데이터를 불러온다.
  const hotelsQuery = !pageParams
    ? query(collection(store, COLLECTIONS.HOTEL), limit(10))
    : query(
        collection(store, COLLECTIONS.HOTEL),
        startAfter(pageParams),
        limit(10),
      ) //pageParams를 기준을 몇개를 가져올건지 10개

  // console.log('hotelsQuery', hotelsQuery)

  // 호텔들을 가져옴
  const hotelsSnapshot = await getDocs(hotelsQuery)
  // console.log('hotelsSnapshot', hotelsSnapshot)

  // hotelsSnapshot의 문서를 맵을 돌면서 데이터를 가져옴 (hotelsSnapshot객체안에 docs라는 배열을 돌면서 id는 문서의 id, ...doc.data()는 기존 데이터를 풀어서 넘겨줌)
  const items = hotelsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id, // id는 문서의 id
        ...doc.data(), // 나머지는 문서의 데이터를 풀어서 넘겨줌
      }) as Hotel,
  )

  // console.log('items', items)

  // hotelsSnapshot 문서중에 마지막 문서를 가져옴
  const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1]

  // console.log('lastVisible', lastVisible)

  // 다음 커서때 참조할 수 있도록 두가지를 반환 (페이지 스크롤 시 다음 페이지에 대한 정보를 참조해서 보여줌)
  return {
    items,
    lastVisible,
  }
}

export const getHotel = async (id: string) => {
  const snapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, id))

  return {
    id,
    ...snapshot.data(),
  } as Hotel // 이렇게 뽑아진 data의 타입은 Hotel이다.
}

export const getRecommendHotels = async (hotelIds: string[]) => {
  const recommendQuery = query(
    collection(store, COLLECTIONS.HOTEL), // 호텔 컬렉션 불러오기
    where(documentId(), 'in', hotelIds), // 호텔 컬렉션(문서) 중에 문서의 id의 hotelsId가 포함되어있는 호텔들만 가지고 올 수 있도록 해주는 쿼리
  )

  // 추천 호텔 데이터 가져오기
  const snapshot = await getDocs(recommendQuery)

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Hotel,
  )
}

export const getHotelWithRoom = async ({
  hotelId,
  roomId,
}: {
  hotelId: string
  roomId: string
}) => {
  const hotelSnapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, hotelId)) // 호텔 데이터 가져오기
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot.ref, COLLECTIONS.ROOM, roomId),
  ) // 호텔을 기반으로 호텔이 가지고 있는 방 데이터 가져오기

  return {
    hotel: hotelSnapshot.data() as Hotel,
    room: roomSnapshot.data() as Room,
  }
}

// 해당 키워드로 시작하는 카드들을 찾도록 간단하게 구현
export const getSearchCards = async (keyword: string) => {
  // 검색 쿼리
  const searchQuery = query(
    collection(store, COLLECTIONS.HOTEL),
    where('name', '>=', keyword),
    where('name', '<=', keyword + '\uf8ff'), // '\uf8ff') 이 유니코드 문자는 문자들 중에 가장 큰 값을 의미
  ) // 키워드로 시작하는 모든 카드들을 찾으라는 의미

  const cardSnapshot = await getDocs(searchQuery)

  const items = cardSnapshot.docs.map((doc) => ({
    ...(doc.data() as Hotel),
    id: doc.id,
  }))

  return items
}
