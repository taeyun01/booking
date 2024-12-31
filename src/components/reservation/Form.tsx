import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Select from '@/components/shared/Select'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import TextField from '@/components/shared/TextField'
import { Hotel, ReservationForm } from '@/models/hotel'
import { Fragment, useCallback } from 'react'
import { useForm } from 'react-hook-form'

// Form컴포넌트: onSubmit을 하기 위해 여러가지 폼에 대한 데이터를 다루는거에만 집중
//* 호텔마다 필요한 정보가 다를수도 있기 때문에 고정된 form이 아닌 호텔마다 다른 form을 적용해야함
//* 서버에서 폼의 데이터를 받고 그 데이터를 기반으로 동적으로 form 구현

type FormData = {
  [key: string]: string
}

const Form = ({
  forms,
  onSubmit,
  buttonLabel,
}: {
  forms: Hotel['form']
  onSubmit: (formValues: FormData) => void
  buttonLabel: string
}) => {
  // handleSubmit에서 폼 데이터를 받기 위해 FormData 타입 적용
  const { register, formState, handleSubmit } = useForm<FormData>({
    mode: 'onBlur',
  }) // onBlur은 폼이 포커스를 잃었을 때 검증을 실행하는 옵션

  const component = useCallback(
    (form: ReservationForm) => {
      if (form.type === 'TEXT_FIELD') {
        return (
          <>
            <TextField
              label={form.label}
              helpMessage={
                // 에러메세지가 있다면 에러를 우선적으로 표시, 없으면 기본 helpMessage표시
                (formState.errors[form.id]?.message as string) ||
                form.helpMessage
              }
              hasError={!!formState.errors[form.id]}
              {...register(form.id, {
                required: form.required,
                pattern: VALIDATION_MESSAGE_MAP[form.id],
              })}
            />
          </>
        )
      }

      if (form.type === 'SELECT') {
        return (
          <>
            <Select
              label={form.label}
              options={form.options}
              // hasError={!!formState.errors[form.id]} // TODO: Select컴포넌트 에러처리 추가하기
              {...register(form.id, {
                required: form.required,
                pattern: VALIDATION_MESSAGE_MAP[form.id],
              })}
            />
          </>
        )
      }

      return null
    },
    [register, formState.errors],
  )
  return (
    <div style={{ padding: 24 }}>
      <Text bold>예약정보</Text>

      <Spacing size={16} />

      <form>
        {forms.map((form, idx) => {
          // console.log(form.id)
          return (
            <Fragment key={form.id}>
              {component(form)}
              {idx !== forms.length - 1 && <Spacing size={8} />}
            </Fragment>
          )
        })}
      </form>

      <Spacing size={60} />

      <FixedBottomButton
        label={buttonLabel}
        disabled={!formState.isValid}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  )
}

const VALIDATION_MESSAGE_MAP: {
  [key: string]: {
    value: RegExp
    message: string
  }
} = {
  name: {
    value: /^[가-힣]+$/, // 한글만 허용
    message: '한글명을 확인해주세요.',
  },
  email: {
    value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // 이메일 형식 확인
    message: '이메일 형식을 확인해주세요.',
  },
  phone: {
    value: /^\d+$/, // 숫자만 허용
    message: '휴대전화 번호를 확인해주세요.',
  },
}

export default Form
