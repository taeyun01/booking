import { QuerySnapshot, collection, limit, query, startAfter, getDocs } from 'firebase/firestore'

import { COLLECTIONS } from '@/constants'

import { store } from './firebase'
import { Hotel } from '@/models/hotel'

// 호텔 리스트 데이터를 가져오는 함수
export const getHotels = async (pageParams?: QuerySnapshot<Hotel>) => {
  // 페이지 쿼리
  // pageParams가 없다면 최초의 호출인거고, 있다면 다음 페이지에 대한 요청이기 때문에 처음 호출에는 바로 데이터를 불러온다.
  const hotelsQuery = !pageParams
    ? query(collection(store, COLLECTIONS.HOTEL), limit(10))
    : query(collection(store, COLLECTIONS.HOTEL), startAfter(pageParams), limit(10)) //pageParams를 기준을 몇개를 가져올건지 10개

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
