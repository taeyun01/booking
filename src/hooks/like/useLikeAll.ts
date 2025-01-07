import { getLikesAll } from '@/remote/like'
import { useQuery } from 'react-query'

const useLikeAll = () => {
  const { data } = useQuery(['likesAll'], () => getLikesAll(), {
    suspense: true,
  })

  return { data }
}

export default useLikeAll
