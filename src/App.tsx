/* @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const Container = styled.div`
  color: red;
`

function App() {
  return (
    <>
      <Container>
        <h1>프로젝트 셋팅</h1>
      </Container>
      <h2
        css={css`
          color: pink;
        `}
      >
        프로젝트 셋팅2
      </h2>
    </>
  )
}

export default App
