import { collection, writeBatch, getDocs } from 'firebase/firestore'

import Button from '@/components/shared/Button'

import { COLLECTIONS } from '@/constants'
import { store } from '@/remote/firebase'
import { FORMS } from '@/mock/data'

const HotelFormAddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    const snapshots = await getDocs(collection(store, COLLECTIONS.HOTEL)) // 호텔 컬렉션에 있는 모든 데이터 가져오기

    // 가져온 호텔 문서(컬렉션)을 순회하면서
    snapshots.docs.forEach((hotel) => {
      // 해당 호텔에 form키를 추가할건데 그 값은 FORMS를 추가
      batch.update(hotel.ref, {
        form: FORMS,
      })
    })

    await batch.commit()
    alert('폼 데이터 추가 완료')
  }

  return <Button onClick={handleButtonClick}>폼 데이터 추가</Button>
}

export default HotelFormAddButton
