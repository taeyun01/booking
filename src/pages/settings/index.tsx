import FixedBottomButton from '@/components/shared/FixedBottomButton'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import { Link } from 'react-router-dom'

import useGoogleSignin from '@/hooks/useGoogleSignin'

const SettingsPage = () => {
  const { signout } = useGoogleSignin()

  return (
    <div>
      <Spacing size={8} />
      <ul>
        <li>
          <Link to="/settings/like">
            <ListRow
              as="div"
              contents={
                <ListRow.ListRowTexts
                  title="찜하기"
                  subTitle="찜한 호텔 순서 변경"
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
    </div>
  )
}

export default SettingsPage
