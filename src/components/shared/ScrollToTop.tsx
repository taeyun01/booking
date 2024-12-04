import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// SPA이다 보니 페이지 이동시, 앞 페이지에 있는 스크롤이 남아있는 경우가 있어서 스크롤 최상단으로 이동
const ScrollToTop = () => {
  const { pathname } = useLocation()

  // pathname이 변경될때마다 스크롤 최상단으로 이동 (즉, 페이지 이동시 스크롤 최상단으로 이동)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
