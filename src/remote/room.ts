import { doc, getDocs, collection } from 'firebase/firestore'

import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants'
import { Room } from '@/models/room'

const getRooms = async (hotelId: string) => {
  // 특정호텔의 room들을 가져옴
  const snapshot = await getDocs(
    collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
  )

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Room), // doc.data()는 현재 문서의 데이터를 반환. 타입을 지정해줘야 어떠 타입이 반환 되는지 추론이됨. getRooms함수 마우스 호버해보면 Room타입이 추론됨.
  }))
}

export { getRooms }
