import Button from '@components/shared/Button'
import { HOTEL_NAMES, IMAGES, HOTEL, EVENTS, ROOMS } from '@mock/data'

import { doc, collection, writeBatch } from 'firebase/firestore'
import { store } from '@remote/firebase'

import { COLLECTIONS } from '@constants'

// min ~ max 사이의 랜덤 숫자 반환
const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const HotelListAddButton = () => {
  const batch = writeBatch(store)

  const handleButtonClick = () => {
    console.log('button clicked')
    const hotels = HOTEL_NAMES.map((hotelName, idx) => {
      return {
        name: hotelName,
        mainImageUrl: IMAGES[random(0, IMAGES.length - 1)],
        images: IMAGES,
        price: random(130000, 200000), // 최저가 13만원 부터 ~ 최고가 20만원 까지
        starRating: random(1, 5), // 호텔 1성급 ~ 5성급
        ...HOTEL,
        // EVENTS 인덱스가 null이 아니면 event 추가 (EVENTS의 0,1,2,3에 해당하는 애들만 이벤트를 가지게됨)
        ...(EVENTS[idx] && {
          event: EVENTS[idx],
        }),
      }
    })
    console.log(hotels)

    hotels.forEach((hotel) => {
      const hotelDocRef = doc(collection(store, COLLECTIONS.HOTEL)) // HOTEL 컬렉션에 데이터 추가

      // batch에다가 저장함 (hotelDocRef: 우리 호텔에 대한 정보를 저장, hotel: 어떤 데이터를 넣을건지 )
      // 즉, hotel데이터를 HOTEL 컬렉션에 저장할 것이라고 해줌
      batch.set(hotelDocRef, hotel)

      // HOTEL 컬렉션에 데이터를 저장하고 나서 그 안에 ROOM 컬렉션에 데이터를 저장함
      // 그럼 계층을 가진 구조가 만들어지게됨
      ROOMS.forEach((room) => {
        // collection대상을 store에 넣게되면 store에 완전히 다른 컬렉션으로 분류가됨. HOTEL 컬렉션안에 포함하고 싶으니까 컬렉션의 대상을 hotelDocRef로 변경
        const subDocRef = doc(collection(hotelDocRef, COLLECTIONS.ROOM))
        batch.set(subDocRef, room)
      })
    })

    // 모든 데이터를 저장함
    batch.commit() // 배치 실행
  }
  return <Button onClick={handleButtonClick}>호텔 리스트 추가</Button>
}

export default HotelListAddButton
