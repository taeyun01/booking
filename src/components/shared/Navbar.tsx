/** @jsxImportSource @emotion/react */
import { Link, useLocation } from 'react-router-dom'
import Flex from './Flex'
import Button from './Button'
import { css } from '@emotion/react'
import { colors } from '../../styles/colorPalette'
import { useCallback } from 'react'
import useUser from '@/hooks/auth/useUser'

const Navbar = () => {
  const location = useLocation()
  const showSigninButton = ['/signin', '/signup'].includes(location.pathname)

  // 유저 정보 가져오기
  const user = useUser()

  // 유저 상태에 따라 버튼을 다르게 렌더링 해주는 함수
  const renderButton = useCallback(() => {
    // 로그인 상태일 경우 (user가 null이 아닐 경우, user정보가 있을 경우)
    if (user) {
      return (
        <Link to="/my">
          <img
            src={
              user.photoURL ??
              'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-128.png'
            }
            alt="유저의 이미지"
            width={40}
            height={40}
            style={{ borderRadius: '100%' }}
          />
        </Link>
      )
    }

    // /signin', '/signup 경로가 아닐 경우. 로그인 버튼 렌더링
    if (!showSigninButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [user, showSigninButton])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">Booking</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;

  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray};
`
export default Navbar
