import { useQuery, useMutation } from 'react-query'
import { getHotelWithRoom } from '@/remote/hotel'
import useAlert from '@/hooks/alert/useAlert'

import { makeReservation } from '@/remote/reservation'
import { Reservation } from '@/models/reservation'

const useReservation = ({
  hotelId,
  roomId,
}: {
  hotelId: string
  roomId: string
}) => {
  const showAlert = useAlert()
  const { data, isLoading } = useQuery({
    queryKey: ['hotelWithRoom', hotelId, roomId],
    queryFn: () => getHotelWithRoom({ hotelId, roomId }),
    onSuccess: ({ room }) => {
      // 예약 가능한 방이 없을 경우 알림창 띄우기
      // 룸에 대한 정보를 가져왔는데 매진이 됐을 경우
      if (room.avaliableCount === 0) {
        showAlert({
          title: '객실이 매진되었습니다.',
          description: '예약 가능한 방이 없습니다.',
          onButtonClick: () => {
            window.history.back()
          },
        })
      }
    },
  })

  const { mutateAsync } = useMutation({
    mutationFn: (newReservation: Reservation) =>
      makeReservation(newReservation),
    onError: () => {
      showAlert({
        title: '예약 실패',
        description:
          '알 수 없는 에러가 발생헀습니다. 잠시 후 다시 시도해주세요',
        onButtonClick: () => {
          window.history.back()
        },
      })
    },
  })

  return { data, isLoading, makeReservation: mutateAsync }
}

export default useReservation
