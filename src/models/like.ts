interface Like {
  id: string
  hotelId: string
  hotelName: string
  hotelMainImageUrl: string
  userId: string // 찜한 사용자의 id
  order: number // 찜한 순서
}

export type { Like }

// 지금 호텔에 대한 정보를 다 저장을 하고 있는데
// 이런식으로 저장하는것보다는 호텔의 id만 저장을 해서
// 호텔 id를 기준으로 호텔 데이터를 뽑아오도록 만들어주는게 좋음

// 찜하기 자체가 좀 복잡도가 있다 보니까 복잡도를 낮추기 위해 일단
// 호텔에 대한 저옵를 한 번에 다 저장.

// 나중에 리팩토링 할 때 hotelName이랑 hotelMainImageUrl은 빼고
// hotelId를 기준으로 호텔의 정보를 뽑아오도록 만들어주는게 좋음
