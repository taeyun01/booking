interface Hotel {
  comment: string
  contents: string
  id: string
  images: string[]
  location: {
    directions: string
    pointGeolocation: {
      x: number
      y: number
    }
  }
  mainImageUrl: string
  name: string
  price: number
  starRating: number
  event?: {
    name: string
    promoEndTime?: string
    tagThemeStyle: {
      backgroundColor: string
      fontColor: string
    }
  }
  recommendHotels: string[]
  form: []
}

// 폼은 type이 TEXT_FIELD도 있고 SELECT도 있다. 그런데 SELECT type은 옵션들을 가지고 있고. TEXT_FIELD는 옵션이 없기 때문에 폼 별로 타입을 분리해줄 필요가 있다.

// 모든 폼이 필수값으로 가지는 속성인 BaseForm 하나 추가
interface BaseForm {
  id: string
  label: string
  required: boolean
  helpMessage?: string
}

// 텍스트 필드 폼은 기본 폼을 가지고 있고 TEXT_FIELD type을 확장시켜준다. 옵션은 없다.
interface TextFieldForm extends BaseForm {
  type: 'TEXT_FIELD'
}

// 선택 필드 폼은 기본 폼을 가지고 있고 SELECT type을 확장시켜주고 옵션을 가지고 있다.
interface SelectFieldForm extends BaseForm {
  type: 'SELECT'
  options: Array<{ label: string; value: string }>
}

// 예약 폼은 TEXT_FIELD폼과 SELECT필드 폼 둘중 하나를 사용할 것이다. (다양한 폼들이 추가되면 타입만 추가하기)
type ReservationForm = TextFieldForm | SelectFieldForm

export type { Hotel, BaseForm, TextFieldForm, SelectFieldForm, ReservationForm }
