import { useQuery, useQueryClient } from 'react-query'
import { getRooms } from '@/remote/room'

import { doc, collection, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants'
import { Room } from '@/models/room'

const useRooms = ({ hotelId }: { hotelId: string }) => {
  const client = useQueryClient()

  //* 실시간으로 문서를 구독해서 문서가 변하는걸 감지 (문서를 계속 감시하여 변경 감지)
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
      (snapshot) => {
        // console.log('snapshot', snapshot)
        const newRooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Room),
        }))
        // console.log('newRooms', newRooms)

        //* 변경된 문서를 받아와서 새롭게 갱신된 newRooms를 캐싱된 데이터를 갈아치우면 됨
        //* 캐시 키, 값을 똑같이 넣어주고 이 값을 newRooms로 변경.
        client.setQueryData(['rooms', hotelId], newRooms)
      },
    )

    //* 컴포넌트가 언마운트 될 때 구독을 해제 (이벤트를 끊어줌) 계속 이벤트를 발생시키면 메모리 누수가 발생할 수 있음
    return () => unsubscribe()
  }, [hotelId, client])

  //* 캐싱된 데이터를 가져오는 함수
  return useQuery(['rooms', hotelId], () => getRooms(hotelId))
}

export default useRooms
