import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getReviews, removeReview, writeReview } from '@/remote/review'
import useUser from '@/hooks/auth/useUser'

const useReviews = ({ hotelId }: { hotelId: string }) => {
  const user = useUser()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['reviews', hotelId],
    queryFn: () => getReviews({ hotelId }),
  })

  const { mutateAsync: write } = useMutation(
    async (text: string) => {
      const newReview = {
        createdAt: new Date(),
        hotelId,
        userId: user?.uid as string,
        text,
      }

      await writeReview(newReview)

      // 성공적으로 리뷰를 작성했다면 true를 반환
      return true
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['reviews', hotelId] })
      },
    },
  )

  const { mutate: remove } = useMutation(
    ({ reviewId, hotelId }: { reviewId: string; hotelId: string }) => {
      return removeReview({ reviewId, hotelId })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['reviews', hotelId] })
      },
    },
  )

  return { data, isLoading, write, remove }
}

export default useReviews
