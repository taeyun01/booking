import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

const ReservationDonePage = () => {
  const { hotelName } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { hotelName: string }
  const navigate = useNavigate()

  return (
    <div>
      <Spacing size={80} />

      <Flex direction="column" align="center" gap={8}>
        <img
          src="https://cdn4.iconfinder.com/data/icons/general-office/91/General_Office_31-64.png"
          alt="비행기 아이콘 이미지"
          width={100}
          height={100}
        />

        <Spacing size={30} />

        <Text typography="t4" bold>
          {hotelName}
        </Text>
        <Text>예약이 완료되었습니다.</Text>
      </Flex>

      <Spacing size={40} />

      <div style={{ padding: '0 24px' }}>
        <Button.Group>
          <Button onClick={() => navigate('/')}>홈으로</Button>
          <Button onClick={() => navigate('/reservation/list')}>
            예약 확인하기
          </Button>
        </Button.Group>
      </div>
    </div>
  )
}

export default ReservationDonePage
