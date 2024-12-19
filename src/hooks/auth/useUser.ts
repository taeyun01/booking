import { useRecoilValue } from 'recoil'
import { userAtom } from '@/store/atom/user'

// 유저 정보 가져오는 hook
const useUser = () => {
  return useRecoilValue(userAtom)
}

export default useUser
