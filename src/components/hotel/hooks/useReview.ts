import { useQuery } from 'react-query'
import { getReviews } from '@/remote/review'

const useReviews = ({ hotelId }: { hotelId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['reviews', hotelId],
    queryFn: () => getReviews({ hotelId }),
  })

  return { data, isLoading }
}

export default useReviews
