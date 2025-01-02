import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

import { css } from '@emotion/react'

import { LazyLoadImage } from 'react-lazy-load-image-component'

const Carousel = ({ images }: { images: string[] }) => {
  return (
    <div>
      <Swiper css={containerStyles} spaceBetween={8}>
        {images.map((imageUrl, idx) => (
          <SwiperSlide key={imageUrl}>
            <LazyLoadImage
              css={imageStyles}
              src={imageUrl}
              alt={`${idx + 1}번째 호텔의 이미지`}
              height={300} // 기본 높이값 설정 (이미지를 불러오기 전에는 높이값을 가지고 있지 않기때문에 들썩일 수 있음)
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const containerStyles = css`
  padding: 0 24px;
  height: 300px;
`

const imageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`

export default Carousel
