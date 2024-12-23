import useUser from '@/hooks/auth/useUser'
import { Navigate } from 'react-router-dom'

// 인증을 처리해주는 라우트 (인증을 통과한 유저만 이동가능)
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser()

  if (!user) return <Navigate to="/signin" replace={true} />

  return <>{children}</>
}

export default PrivateRoute
