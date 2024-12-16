import { useQuery } from 'react-query'
import { getHotel } from '@/remote/hotel'

const useHotel = ({ id }: { id: string }) => {
  return useQuery(['hotel', id], () => getHotel(id))
}

export default useHotel
