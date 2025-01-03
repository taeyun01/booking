import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { auth } from '@/remote/firebase'
import { userAtom } from '@/store/atom/user'

// 인증에 대한 처리
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //
      if (!user) {
        setUser(null)
      } else {
        setUser({
          uid: user.uid,
          email: user.email ?? '',
          displayName: user.displayName ?? '',
          photoURL: user.photoURL ?? '',
        })
      }
      setInitialize(true)
    })

    return () => unsubscribe()
  }, [setUser])

  if (!initialize) return null

  return <>{children}</>
}

export default AuthGuard
