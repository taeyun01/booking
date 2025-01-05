import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { useCallback } from 'react'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'

import { useNavigate } from 'react-router-dom'

import { auth, store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants'
import { FirebaseError } from 'firebase/app'

const useGoogleSignin = () => {
  const navigate = useNavigate()

  const signin = useCallback(async () => {
    const provider = new GoogleAuthProvider()

    // 구글 로그인 유저 정보 추가 (USER 컬렉션에 유저 정보 추가)
    try {
      const { user } = await signInWithPopup(auth, provider)

      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), user.uid),
      )

      // 이미 가입한 유저면 메인 페이지 이동
      if (userSnapshot.exists()) return navigate('/')

      // 새로운 유저
      const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }

      await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)

      return navigate('/')
    } catch (error) {
      //* 구글 로그인시 팝업 창이 뜨는데 그냥 닫으면 에러를 발생시킴. 이걸 무시하도록 만듬
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/popup-closed-by-user') {
          // console.log('구글 로그인 팝업에러 무시.')
          return
        }
      }

      console.error('알 수 없는 로그인 에러:', error)
      throw new Error('로그인에 실패했습니다. 잠시 후 다시 시도해주세요.')
    }
  }, [navigate])

  const signout = useCallback(async () => {
    await signOut(auth)
    return navigate('/')
  }, [navigate])

  return { signin, signout }
}

export default useGoogleSignin
