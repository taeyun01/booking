import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { Hotel } from '@/models/hotel'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const Map = ({ location }: { location: Hotel['location'] }) => {
  const {
    directions,
    pointGeolocation: { x, y },
  } = location

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY as string,
  })

  if (!isLoaded) return null

  return (
    <Flex direction="column" style={{ padding: '24px' }}>
      <Text typography="t4" bold>
        기본정보
      </Text>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '250px',
          margin: '16px 0',
          boxSizing: 'border-box',
        }}
        center={{
          lat: y,
          lng: x,
        }} // 어디를 기준으로 지도를 보여줄건지
        zoom={15}
      >
        {/* 호텔 위치 마커 표시 */}
        <Marker
          position={{
            lat: y,
            lng: x,
          }}
        />
      </GoogleMap>
      <Text typography="t6" bold>
        찾아오시는 길
      </Text>
      <Text typography="t6">{directions}</Text>
    </Flex>
  )
}

export default Map
