import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'
import { store } from './firebase'

import { Reservation } from '@/models/reservation'
import { Room } from '@/models/room'
import { getHotel } from '@/remote/hotel'

export const makeReservation = async (newReservation: Reservation) => {
  // 예약을 하기 위해 먼저 호텔과 객실에 대한 정보를 가져옴
  // 예약을 한다는건 객실의 숫자가 하나 줄어들게 되는데, 그때 다른 사람이 먼저 예약을 해서 잔여 개수가 0일 수도 있다.
  // 그럼 매진이 된 상품이기 때문에 예약을 할 수 없도록 만들어 준다.

  const hotelSnapshot = doc(store, COLLECTIONS.HOTEL, newReservation.hotelId) // 특정 호텔 정보 가져오기
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot, COLLECTIONS.ROOM, newReservation.roomId),
  ) // 호텔이 가지고 있는 방의 정보를 가져옴

  const room = roomSnapshot.data() as Room

  // 현재 잔여 객실 수
  const currentAvailableRooms = room.avaliableCount

  // 잔여 객실 수가 0일 때
  if (currentAvailableRooms === 0) {
    throw new Error('매진된 상품입니다.')
  }

  // await을 각자 붙여줘도 좋지만 두개가 함께 완료되어야 하는 상황에는 Promise.all을 사용
  return Promise.all([
    // 잔여 객실 수가 있으면 하나 줄여줌
    updateDoc(roomSnapshot.ref, {
      avaliableCount: currentAvailableRooms - 1, // 현재 객실 수 에서 하나 줄이기
    }),

    // 예약된 문서 데이터 생성
    setDoc(doc(collection(store, COLLECTIONS.RESERVATION)), newReservation),
  ])
}

// 예약 목록 조회
export const getReservations = async ({ userId }: { userId: string }) => {
  // 해당 유저의 예약 목록 조회 쿼리
  const reservationQuery = query(
    collection(store, COLLECTIONS.RESERVATION), // RESERVATION 컬렉션을 조회해서 모든 데이터를 가져와서
    where('userId', '==', userId), // 해당 유저의 예약 정보 데이터만 가져오기
  )

  // 쿼리 결과 가져오기
  const reservationSnapshot = await getDocs(reservationQuery)

  // 예약 정보랑 예약 정보 안에 있는 호텔 정보를 통해 호텔에 대한 정보를 가지고 와서 합쳐줌
  const result = [] // 합친 정보를 담아두기 위한 배열

  // 쿼리 결과 배열 순회
  for (const reservationDoc of reservationSnapshot.docs) {
    // 문서안에 들어있는 hotelId를 통해서 호텔의 정보를 빼와야함

    // 일단 reservation을 먼저 정의해주고
    const reservation = {
      id: reservationDoc.id,
      ...(reservationDoc.data() as Reservation),
    }

    // reservation 안에 들어있는 호텔 데이터를 통해서 호텔 정보를 가져옴
    const hotel = await getHotel(reservation.hotelId)

    // 예약 정보랑 호텔 정보를 합쳐서 배열에 넣어줌
    result.push({
      reservation,
      hotel,
    })
  }

  return result
}
