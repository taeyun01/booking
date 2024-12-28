// 리뷰의 정보
interface Review {
  id: string // 리뷰id
  text: string // 리뷰 내용
  userId: string // 작성자id
  hotelId: string // 어떤 호텔에 대한 정보. 호텔id
  createdAt: Date // 작성일
}

export type { Review }
