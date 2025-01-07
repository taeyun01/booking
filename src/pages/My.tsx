import FixedBottomButton from '@/components/shared/FixedBottomButton'
import ListRow from '@/components/shared/ListRow'
import { Link } from 'react-router-dom'

import useGoogleSignin from '@/hooks/useGoogleSignin'
import Top from '@/components/shared/Top'
import styled from '@emotion/styled'

const MyPage = () => {
  const { signout } = useGoogleSignin()

  return (
    <ContainerStyles>
      <Top title="마이페이지" subtitle="내 정보를 확인해보세요" />
      <ul>
        <li>
          <Link to="/settings/like">
            <ListRow
              as="div"
              contents={
                <ListRow.ListRowTexts
                  title="찜 목록"
                  subTitle="내가 좋아요한 호텔 확인하기"
                />
              }
              withArrow={true}
            />
          </Link>
        </li>
        <li>
          <Link to="/reservation/list">
            <ListRow
              as="div"
              contents={
                <ListRow.ListRowTexts
                  title="예약목록"
                  subTitle="내가 예약한 호텔 보러가기"
                />
              }
              withArrow={true}
            />
          </Link>
        </li>
        <FixedBottomButton color="error" label="로그아웃" onClick={signout} />
      </ul>
    </ContainerStyles>
  )
}

const ContainerStyles = styled.div`
  background-color: white;
  height: 100dvh;
`

export default MyPage
