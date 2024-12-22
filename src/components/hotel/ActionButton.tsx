import { css } from '@emotion/react'
import Flex from '@/components/shared/Flex'

import useShare from '@/hooks/useShare'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { Hotel } from '@/models/hotel'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import useLike from '@/hooks/like/useLike'

const ActionButton = ({ hotel }: { hotel: Hotel }) => {
  const share = useShare()
  const { data: likes, mutate: likeMutate } = useLike()

  const { name, comment, mainImageUrl, id } = hotel

  // isLike: 찜이 됐는지 안됐는지 확인
  // data: likes -> 얘는 리스트 전체를 다 가져오는건데 호텔 상세페이지에서는 호텔에 대한 데이터만 뽑아오는게 맞지 않을까??
  // 상황에 따라 다를것 같음 지금은 찜하기 목록도 몇개 없고, 상품목록도 몇개 없어서 이렇게 간단하게 처리해볼 수 있지만
  // 만약에 리스트가 너무 커지면 단일만 뽑아오는 방법을 생각해볼 수 있겠음

  // 지금 리스트를 전부 가져오는 이유는 캐시된 데이터의 싱크를 맞추고 캐싱된 데이터를 활용하기 위해서 이렇게 처리함.
  const isLike = Boolean(likes?.find((like) => like.hotelId === hotel.id))

  return (
    <Flex css={containerStyle}>
      <Button
        label="찜하기"
        iconUrl={
          isLike
            ? 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-64.png'
            : 'https://cdn3.iconfinder.com/data/icons/feather-5/24/heart-64.png'
        }
        // TODO: 찜하기 기능 추가하기
        onClick={() => {
          likeMutate({
            hotel: {
              name,
              mainImageUrl,
              id,
            },
          })
        }}
      />
      <Button
        label="공유하기"
        iconUrl="https://cdn1.iconfinder.com/data/icons/rounded-social-media/512/kakao-64.png"
        onClick={() => {
          share({
            title: name,
            description: comment,
            imageUrl: mainImageUrl,
            buttonLabel: '예약하러 가기',
          })
        }}
      />
      <CopyToClipboard
        text={window.location.href} // 어떤걸 복사할 건지
        onCopy={() => alert('링크가 복사 되었습니다!')}
      >
        <Button
          label="링크복사"
          iconUrl="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/paste-clipboard-copy-512.png"
        />
      </CopyToClipboard>
    </Flex>
  )
}

const Button = ({
  label,
  iconUrl,
  onClick,
}: {
  label: string
  iconUrl: string
  onClick?: () => void
}) => {
  return (
    <Flex direction="column" align="center" onClick={onClick}>
      <img src={iconUrl} alt={label} width={30} height={30} />
      <Spacing size={6} />
      <Text typography="t7">{label}</Text>
    </Flex>
  )
}

const containerStyle = css`
  padding: 24px;
  cursor: pointer;

  // 아래있는 모든 요소들의 flex를 1로 줘서 균등하게 배치하도록 설정
  & * {
    flex: 1;
  }
`

export default ActionButton
