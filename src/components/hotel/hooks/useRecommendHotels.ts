import { useQuery } from 'react-query'
import { getRecommendHotels } from '@/remote/hotel'

const useRecommendHotels = ({ hotelIds }: { hotelIds: string[] }) => {
  return useQuery(
    ['recommendHotels', JSON.stringify(hotelIds)],
    () => getRecommendHotels(hotelIds),
    {
      enabled: hotelIds.length > 0, // 추천 호텔에 대한 length가 0보다 클 때만 호출을 하도록 조건 추가
    },
  )
}

export default useRecommendHotels
