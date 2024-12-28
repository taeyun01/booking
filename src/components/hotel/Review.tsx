import useReviews from '@/components/hotel/hooks/useReview'
import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import TextField from '@/components/shared/TextField'
import useUser from '@/hooks/auth/useUser'
import { format } from 'date-fns'
import { useCallback, useState } from 'react'

const Review = ({ hotelId }: { hotelId: string }) => {
  const { data: reviews, isLoading, write, remove } = useReviews({ hotelId })
  const user = useUser()
  const [text, setText] = useState('')

  const reviewRows = useCallback(() => {
    // 작성된 리뷰가 없으면
    if (reviews?.length === 0) {
      return (
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{ margin: '40px 0' }}
        >
          <img
            src="https://cdn2.iconfinder.com/data/icons/essential-web-4/50/commenting-more-typing-chat-review-64.png"
            alt=""
          />
          <Spacing size={20} />
          <Text>아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!</Text>
        </Flex>
      )
    }

    // 작성된 리뷰가 있으면
    return (
      <ul>
        {reviews?.map((review) => (
          <ListRow
            key={review.id}
            left={
              review.user.photoURL && (
                <img src={review.user.photoURL} alt="" width={40} height={40} />
              )
            }
            contents={
              <ListRow.ListRowTexts
                title={review.text}
                subTitle={format(review.createdAt, 'yyyy-MM-dd')}
              />
            }
            right={
              // 리뷰 작성한 유저와 현재 로그인한 유저가 같으면 삭제 버튼 보여주기
              review.userId === user?.uid && (
                <Button
                  onClick={() => {
                    const isRemove = confirm('정말 삭제하시겠습니까?')
                    if (isRemove) {
                      remove({
                        reviewId: review.id,
                        hotelId: review.hotelId,
                      })
                    }
                  }}
                >
                  삭제
                </Button>
              )
            }
          />
        ))}
      </ul>
    )
  }, [reviews, user, remove])

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value)
    },
    [],
  )

  if (isLoading) return null

  return (
    <div style={{ margin: '40px 0' }}>
      <Text bold typography="t4" style={{ padding: '0 24px' }}>
        리뷰
      </Text>
      <Spacing size={16} />
      {reviewRows()}
      {user && (
        <div style={{ padding: '0 24px' }}>
          <TextField value={text} onChange={handleTextChange} />
          <Spacing size={6} />
          <Flex justify="flex-end">
            <Button
              disabled={text.length === 0}
              onClick={async () => {
                const success = await write(text)
                if (success) setText('')
              }}
            >
              작성
            </Button>
          </Flex>
        </div>
      )}
    </div>
  )
}

export default Review
