import { collection, writeBatch, getDocs } from 'firebase/firestore'

import Button from '@/components/shared/Button'
import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants'

const RecommendHotelButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    // 1. 전체 호텔 가져오기
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL))

    // 2. 전체 호텔 루프 돌기
    snapshot.docs.forEach((hotel) => {
      const recommendedHotelList = []

      for (const doc of snapshot.docs) {
        if (recommendedHotelList.length === 5) {
          break
        }
        // 3. 호텔 + 추천호텔 아이디 5개 추가하기
        // id를 추가하는 이유는 호텔 이름으로 추가하면 호텔의 이름이 바뀌었을 때, 추천 호텔 이름은 안바뀜
        // A = 가나다 B = { 추천호텔 : {A, name: 가나다}} 여기서 A호텔의 이름이 바뀌면
        // A = 가나다2 로 바뀌면 B의 추천호텔의 가나다2가 되어야 하는데, 계속 가나다로 나올거임. 왜냐면 데이터가 저장됐을 당시 이 호텔의 정보가 그대로 고정이 돼 있음
        // 호텔의 id를 넣어줘서 B = { 추천호텔 : [A - id, C - id, D - id]} 이렇게 되면 A가 바뀌더라도 A에 바뀐 정보를 계속 받아올 수 있음
        if (doc.id !== hotel.id) {
          recommendedHotelList.push(doc.id)
        }
      }

      // 업데이트할 데이터
      batch.update(hotel.ref, {
        recommendHotels: recommendedHotelList, // 추천호텔리스트를 업데이트 해주기
      })
    })

    await batch.commit()

    alert('업데이트가 완료되었습니다.')
  }
  return <Button onClick={handleButtonClick}>추천 호텔 데이터 추가하기</Button>
}

export default RecommendHotelButton
