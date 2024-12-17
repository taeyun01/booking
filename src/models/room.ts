interface Room {
  avaliableCount: number // 예약가능한 방 수 (잔여객실)
  basicInfo: {
    [key: string]: string | number // 키는 string, 값은 string일 수도 있고 number일 수도 있음
  }
  imageUrl: string
  price: number
  refundable: boolean // 환불가능 여부
  roomName: string // 방 이름
}

export type { Room }
