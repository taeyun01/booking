import { useQuery } from 'react-query'
import { getReservations } from '@/remote/reservation'

import useUser from '@/hooks/auth/useUser'

const useReservations = () => {
  const user = useUser()

  const { data, isLoading } = useQuery({
    queryKey: ['reservations', user?.uid],
    queryFn: () => getReservations({ userId: user?.uid as string }),
    enabled: !!user?.uid, // 유저가 있을때만 쿼리 실행
    suspense: true,
  })

  return {
    data,
    isLoading,
  }
}

export default useReservations
