import styled from '@emotion/styled'

interface SpacingProps {
  size: number
  direction?: 'vertical' | 'horizontal'
}

// <Spacing size={16} /> 아무런 옵션도 주지 않으면 세로 여백 16px

const Spacing = styled.div<SpacingProps>`
  ${({ size, direction = 'vertical' }) =>
    direction === 'vertical'
      ? `
      height: ${size}px;
    `
      : `
    width: ${size}px;
    `}
`

export default Spacing
