import { useAlertContext } from '@/contexts/AlertContext'

interface AlertOptions {
  title?: string
  description?: string
  onButtonClick?: () => void
}

const useAlert = () => {
  const alertContext = useAlertContext()

  if (!alertContext) throw new Error('AlertContext 내부에서 사용해주세요')

  const { open } = alertContext

  const showAlert = ({ title, description, onButtonClick }: AlertOptions) => {
    open({
      title,
      description,
      onButtonClick: onButtonClick ?? (() => {}),
    })
  }

  return showAlert
}

export default useAlert
