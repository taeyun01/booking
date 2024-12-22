import { getLikes, toggleLike } from '@/remote/like'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import useUser from '@/hooks/auth/useUser'
import { Hotel } from '@/models/hotel'
import { useNavigate } from 'react-router-dom'
import useAlert from '@/hooks/alert/useAlert'

// 찜한 목록을 가져오는 훅 (유저가 있을때만 호출)
const useLike = () => {
  const user = useUser()
  const showAlert = useAlert()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data } = useQuery(
    ['likes'],
    () => getLikes({ userId: user?.uid as string }), // 이게 호출됐다 라는건 무조건 user가 있는 상태니까 as string으로 선언
    {
      enabled: !!user, // 유저가 있을때만 호출
    },
  )

  const { mutate } = useMutation(
    ({ hotel }: { hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'> }) => {
      if (user === null) {
        throw new Error('로그인 필요')
      }

      return toggleLike({ hotel, userId: user.uid })
    },

    {
      onSuccess: () => {
        // 좋아요 버튼을 성공적으로 눌렀을때 ['likes'] 키 값을 가진 캐시 데이터를 버리고 새롭게 갱신 시켜 하트 버튼 상태 업데이트
        queryClient.invalidateQueries(['likes'])
      },
      onError: (e: Error) => {
        if (e.message === '로그인 필요') {
          showAlert({
            title: '로그인이 필요한 기능입니다.',
            onButtonClick: () => {
              navigate('/signin')
            },
          })

          return
        }

        showAlert({
          title: '알 수 없는 에러가 발생했습니다. 잠시후 다시 시도해주세요.',
          onButtonClick: () => {
            // TODO: 다른 액션 처리
          },
        })
      },
    },
  )

  return { data, mutate }
}

export default useLike
