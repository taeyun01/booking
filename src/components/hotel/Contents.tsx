import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown'

import { typographyMap } from '@/styles/typography'

//* 서버로부터 내용을 받아 HTML을 렌더링 해주는 컴포넌트
const Contents = ({ contents }: { contents: string }) => {
  return (
    <Container>
      <ReactMarkdown>{contents}</ReactMarkdown>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
  ${typographyMap.t6};

  h2 {
    ${typographyMap.t4};
    font-weight: bold;
    margin: 18px 0;
  }

  ul {
    padding-inline-start: 20px;
    margin: 18px 0;
  }

  li {
    list-style-type: disc;
  }

  p {
    margin: 18px 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`

export default Contents
