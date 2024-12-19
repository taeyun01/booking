import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { auth } from '@/remote/firebase'
import { userAtom } from '@/store/atom/user'

// 인증에 대한 처리
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  // 유저의 상태가 변하는걸 캐치
  onAuthStateChanged(auth, (user) => {
    // console.log('user', user)

    // 유저 정보가 없으면
    if (!user) return setUser(null)

    // 유저 정보가 있으면 리코일에 저장
    setUser({
      uid: user.uid,
      email: user.email ?? '', // 이메일은 무조건 있을 거라서 as string으로 타입 단언을 해줘도 됨
      displayName: user.displayName ?? '',
      photoURL: user.photoURL ?? '',
    })

    setInitialize(true)
  })

  if (!initialize) return null

  return <>{children}</>
}

export default AuthGuard
