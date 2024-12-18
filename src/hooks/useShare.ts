import { useCallback } from 'react'

interface ShareProps {
  title: string
  description: string
  imageUrl: string
  buttonLabel: string
}

// 다른 곳에서 이런식으로 사용이 가능하도록
// const share = useShare()

const useShare = () => {
  const handleShare = useCallback(
    ({ title, description, imageUrl, buttonLabel }: ShareProps) => {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description,
          imageUrl,
          link: {
            mobileWebUrl: window.location.href, // 현재 페이지 주소가 그대로 공유 되게끔
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: buttonLabel,
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      })
    },
    [],
  )

  return handleShare
}

export default useShare
