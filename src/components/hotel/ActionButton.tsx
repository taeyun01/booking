import { css } from '@emotion/react'
import Flex from '@/components/shared/Flex'

import useShare from '@/hooks/useShare'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { Hotel } from '@/models/hotel'

import { CopyToClipboard } from 'react-copy-to-clipboard'

const ActionButton = ({ hotel }: { hotel: Hotel }) => {
  const share = useShare()
  const { name, comment, mainImageUrl } = hotel

  return (
    <Flex css={containerStyle}>
      <Button
        label="찜하기"
        iconUrl="https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-512.png"
        // TODO: 찜하기 기능 추가하기
        onClick={() => {}}
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
