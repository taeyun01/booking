import { useQuery } from 'react-query'
import { getHotelWithRoom } from '@/remote/hotel'
import useAlert from '@/hooks/alert/useAlert'

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

  return { data, isLoading }
}

export default useReservation
