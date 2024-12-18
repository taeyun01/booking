import { useEffect } from 'react'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any
  }
}

const useLoadKakao = () => {
  useEffect(() => {
    const kakaoScript = document.createElement('script')
    kakaoScript.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js'
    kakaoScript.async = true // 비동기로 다운받을 수 있도록 설정

    document.head.appendChild(kakaoScript)

    kakaoScript.onload = () => {
      // 윈도우에 있는 카카오가 초기화가 되어있지 않는 상태면 초기화 시켜주기
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_APP_KAKAO_API_KEY)
      }
    }
  }, [])
}

export default useLoadKakao
